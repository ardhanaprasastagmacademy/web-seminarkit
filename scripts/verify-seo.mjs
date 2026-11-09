import fs from 'node:fs';

const pages = [
  'dist/index.html',
  'dist/tentang/index.html',
  'dist/produk/index.html',
  'dist/produk/paket-seminar-kit-eksekutif/index.html',
  'dist/blog/index.html',
  'dist/blog/panduan-memilih-souvenir-kantor/index.html',
  'dist/galeri/index.html',
  'dist/kontak/index.html',
  'dist/faq/index.html',
  'dist/kebijakan-privasi/index.html',
  'dist/syarat-ketentuan/index.html',
  'dist/404.html'
];

console.log('--- VERIFYING BUILT HTML PAGES ---');

for (const p of pages) {
  if (!fs.existsSync(p)) {
    console.error(`MISSING FILE: ${p}`);
    continue;
  }
  const content = fs.readFileSync(p, 'utf8');

  // Check title
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'NONE';

  // Check canonical
  const canonicalMatch = content.match(/<link rel="canonical" href="(.*?)"/);
  const canonical = canonicalMatch ? canonicalMatch[1] : 'NONE';

  // Check h1
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/s);
  const h1 = h1Match ? h1Match[1].replace(/\s+/g, ' ').trim() : 'NONE';

  // Check json-ld
  const jsonLdMatches = content.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs) || [];
  const schemas = jsonLdMatches.map(m => {
    try {
      const parsed = JSON.parse(m.replace(/<script type="application\/ld\+json">|<\/script>/g, ''));
      return parsed['@type'];
    } catch {
      return 'INVALID_JSON';
    }
  });

  console.log(`\nPage: ${p}`);
  console.log(`  Title: ${title}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  H1: ${h1}`);
  console.log(`  JSON-LD Schemas: ${schemas.join(', ')}`);
}

