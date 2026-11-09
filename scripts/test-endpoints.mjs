const urls = [
  'http://localhost:4321/',
  'http://localhost:4321/tentang/',
  'http://localhost:4321/produk/',
  'http://localhost:4321/produk/paket-seminar-kit-eksekutif/',
  'http://localhost:4321/blog/',
  'http://localhost:4321/blog/panduan-memilih-souvenir-kantor/',
  'http://localhost:4321/galeri/',
  'http://localhost:4321/kontak/',
  'http://localhost:4321/faq/',
  'http://localhost:4321/kebijakan-privasi/',
  'http://localhost:4321/syarat-ketentuan/',
  'http://localhost:4321/404/'
];

async function run() {
  console.log('Testing live dev server endpoints:');
  let success = 0;
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`[${res.status}] ${url}`);
      if (res.status === 200 || res.status === 404) success++;
    } catch (e) {
      console.error(`[ERROR] ${url}: ${e.message}`);
    }
  }
  console.log(`Finished: ${success}/${urls.length} working.`);
}

run();

