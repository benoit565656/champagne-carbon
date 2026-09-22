import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
  getSubscribers,
  deleteSubscriber,
  exportSubscribersCsv,
} from '@/lib/subscribers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');

    if (format === 'csv') {
      const csv = exportSubscribersCsv();
      const filename = `carbon_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    const subscribers = getSubscribers();
    return NextResponse.json({
      success: true,
      subscribers,
      total: subscribers.length,
    });
  } catch (err: any) {
    console.error('Error fetching subscribers:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {
        // query param was empty
      }
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID or email is required' },
        { status: 400 }
      );
    }

    const deleted = deleteSubscriber(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    console.error('Error deleting subscriber:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}
