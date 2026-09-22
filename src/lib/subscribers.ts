import fs from 'fs';
import path from 'path';
import { syncContactToBrevo } from './brevo';

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  created_at: string;
  synced_to_brevo?: boolean;
  notes?: string;
}

const ROOT_DB_PATH = path.join(process.cwd(), 'data', 'subscribers.json');
const TMP_DB_PATH = path.join('/tmp', 'carbon_subscribers.json');

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    try {
      fs.mkdirSync(dirname, { recursive: true });
    } catch {
      // ignore
    }
  }
}

export function getSubscribers(): Subscriber[] {
  // Try reading from TMP first (most up-to-date in serverless runtime)
  try {
    if (fs.existsSync(TMP_DB_PATH)) {
      const data = fs.readFileSync(TMP_DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading TMP_DB_PATH:', err);
  }

  // Fallback to ROOT_DB_PATH
  try {
    if (fs.existsSync(ROOT_DB_PATH)) {
      const data = fs.readFileSync(ROOT_DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading ROOT_DB_PATH:', err);
  }

  return [];
}

function saveSubscribers(subscribers: Subscriber[]) {
  const json = JSON.stringify(subscribers, null, 2);

  // Write to ROOT if possible
  try {
    ensureDirectoryExistence(ROOT_DB_PATH);
    fs.writeFileSync(ROOT_DB_PATH, json, 'utf-8');
  } catch {
    // Might fail in read-only serverless filesystem, proceed to TMP
  }

  // Write to TMP
  try {
    ensureDirectoryExistence(TMP_DB_PATH);
    fs.writeFileSync(TMP_DB_PATH, json, 'utf-8');
  } catch (err) {
    console.error('Error writing to TMP_DB_PATH:', err);
  }
}

export async function addSubscriber(
  rawEmail: string,
  source: string = 'Private Access Section'
): Promise<{ subscriber: Subscriber; isNew: boolean }> {
  const email = rawEmail.trim().toLowerCase();
  if (!email || !email.includes('@')) {
    throw new Error('Valid email address is required');
  }

  const subscribers = getSubscribers();
  const existing = subscribers.find((s) => s.email.toLowerCase() === email);

  if (existing) {
    return { subscriber: existing, isNew: false };
  }

  // Attempt Brevo sync in background
  let synced = false;
  try {
    synced = await syncContactToBrevo(email, {
      SOURCE: source,
      ACQUISITION_DATE: new Date().toISOString(),
    });
  } catch (e) {
    console.error('Brevo sync error:', e);
  }

  const newSubscriber: Subscriber = {
    id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    email,
    source,
    created_at: new Date().toISOString(),
    synced_to_brevo: synced,
    notes: 'Registered for Manila Wine rare cuvées & allocations',
  };

  subscribers.unshift(newSubscriber);
  saveSubscribers(subscribers);

  return { subscriber: newSubscriber, isNew: true };
}

export function deleteSubscriber(id: string): boolean {
  const subscribers = getSubscribers();
  const initialLength = subscribers.length;
  const filtered = subscribers.filter((s) => s.id !== id && s.email !== id);

  if (filtered.length !== initialLength) {
    saveSubscribers(filtered);
    return true;
  }
  return false;
}

export function exportSubscribersCsv(): string {
  const subscribers = getSubscribers();
  const headers = ['ID', 'Email', 'Source', 'Subscribed At (UTC)', 'Subscribed At (Manila Time)', 'Brevo Synced', 'Notes'];

  const rows = subscribers.map((s) => {
    let manilaTime = '';
    try {
      manilaTime = new Date(s.created_at).toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      manilaTime = s.created_at;
    }

    return [
      s.id,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.source || '').replace(/"/g, '""')}"`,
      s.created_at,
      `"${manilaTime}"`,
      s.synced_to_brevo ? 'Yes' : 'No',
      `"${(s.notes || '').replace(/"/g, '""')}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
