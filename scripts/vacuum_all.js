const fs = require('fs');
const https = require('https');
const path = require('path');

const html = fs.readFileSync('src/data/carbon_home.html', 'utf8');
fs.mkdirSync('public/images/carbon', { recursive: true });

const pattern = /\/cdn\/shop\/files\/([a-zA-Z0-9_\-.%+q]+\.(?:png|jpg|jpeg|webp|svg|gif))/gi;
let m;
const files = new Set();
while ((m = pattern.exec(html)) !== null) {
  files.add(decodeURIComponent(m[1]));
}
console.log('Unique Carbon filenames found:', files.size);


function downloadFile(filename) {
  return new Promise((resolve) => {
    const url = 'https://www.champagnecarbon.com/cdn\/shop/files/' + encodeURIComponent(filename);
    const dest = path.join('public/images/carbon', filename.replace(/%/g, '_'));
    if (fs.existsSync(dest)) {
      console.log('Exists:', filename);
      return resolve();
    }
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
      }
    };
    https.get(url, opts, (res) => {
      if (res.statusCode !== 200) {
        console.log('http', res.statusCode, 'for:', filename);
        return resolve();
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log('Downloaded:', filename, fs.statSync(dest).size, 'bytes');
        resolve();
      });
    }).on('error', (err) => {
      console.error('Err:', filename, err.message);
      resolve();
    });
  });
}

async function run() {
  for (const f of files) {
    await downloadFile(f);
  }
  console.log('All files processed!');
}
run();
