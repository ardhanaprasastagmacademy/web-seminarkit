import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Helper to render SVG to WebP or JPEG
async function renderSvgToImage(svgString, outputPath, format = 'webp', quality = 90) {
  const buffer = Buffer.from(svgString);
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (format === 'jpeg' || format === 'jpg') {
    await sharp(buffer).jpeg({ quality }).toFile(outputPath);
  } else {
    await sharp(buffer).webp({ quality }).toFile(outputPath);
  }
}

// Generates SVG markup for product/item graphic
function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function makeProductSvg(w, h, title, subtitle, items = [], isDark = false) {
  const bg = isDark ? '#07142F' : '#FFFCEB';
  const cardBg = isDark ? '#0B1F4D' : '#FFF8DC';
  const borderCol = isDark ? '#26407A' : '#EFE3B8';
  const primaryText = isDark ? '#FFF8DC' : '#0B1F4D';
  const secondaryText = isDark ? '#EFE3B8' : '#4A5570';
  const accent = '#A8864A';

  const cleanTitle = escapeXml(title);
  const cleanSubtitle = escapeXml(subtitle.toUpperCase());

  const itemsXml = items.map((item, idx) => {
    const yPos = h - 220 + (idx * 34);
    return `
      <g transform="translate(60, ${yPos})">
        <rect x="0" y="0" width="8" height="8" fill="${accent}" rx="1" />
        <text x="20" y="8" font-family="'Cormorant Garamond', serif" font-size="18" fill="${secondaryText}" font-style="italic">${escapeXml(item)}</text>
      </g>
    `;
  }).join('');

  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad-${title.replace(/[^a-zA-Z0-9]/g, '')}" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${isDark ? '#0F265C' : '#FFFFFF'}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#grad-${title.replace(/[^a-zA-Z0-9]/g, '')})"/>
      
      <!-- Framing border -->
      <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${borderCol}" stroke-width="1"/>
      <rect x="30" y="30" width="${w - 60}" height="${h - 60}" fill="none" stroke="${borderCol}" stroke-width="0.5" stroke-dasharray="4,4"/>

      <!-- Centerpiece composition -->
      <g transform="translate(${w / 2}, ${h * 0.42})">
        <!-- Shadow/pedestal -->
        <ellipse cx="0" cy="140" rx="${w * 0.32}" ry="18" fill="${isDark ? '#040B1A' : '#E5D6A7'}" opacity="0.6"/>
        
        <!-- Corporate Gift Box / Item Representation -->
        <rect x="-140" y="-80" width="280" height="200" rx="3" fill="${cardBg}" stroke="${borderCol}" stroke-width="1.5"/>
        <line x1="-140" y1="-20" x2="140" y2="-20" stroke="${borderCol}" stroke-width="1"/>
        <!-- Ribbon / accent -->
        <rect x="-18" y="-80" width="36" height="200" fill="${accent}" opacity="0.85"/>
        <line x1="-18" y1="-80" x2="-18" y2="120" stroke="#87652E" stroke-width="0.5"/>
        <line x1="18" y1="-80" x2="18" y2="120" stroke="#87652E" stroke-width="0.5"/>

        <!-- Gold seal/badge -->
        <circle cx="0" cy="-20" r="32" fill="${accent}"/>
        <circle cx="0" cy="-20" r="28" fill="none" stroke="#FFF8DC" stroke-width="1"/>
        <text x="0" y="-14" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="16" font-weight="600" fill="#FFF8DC" letter-spacing="2">SK</text>

        <!-- Elegant items surrounding -->
        <!-- Pen metal -->
        <g transform="translate(110, -50) rotate(18)">
          <rect x="-6" y="-60" width="12" height="150" rx="3" fill="#26407A" stroke="${accent}" stroke-width="1"/>
          <rect x="-6" y="-60" width="12" height="30" fill="${accent}"/>
          <polygon points="-6,90 6,90 0,115" fill="${accent}"/>
        </g>

        <!-- Tumbler / Bottle silhouette -->
        <g transform="translate(-115, -45)">
          <rect x="-24" y="-70" width="48" height="150" rx="8" fill="${cardBg}" stroke="${accent}" stroke-width="1"/>
          <rect x="-16" y="-85" width="32" height="15" rx="3" fill="${accent}"/>
          <text x="0" y="20" text-anchor="middle" font-family="'Hanken Grotesk', sans-serif" font-size="9" fill="${secondaryText}" letter-spacing="3" transform="rotate(-90 0 20)">500ML VACUUM</text>
        </g>
      </g>

      <!-- Labeling and Typography -->
      <g transform="translate(60, 90)">
        <text x="0" y="0" font-family="'Hanken Grotesk', sans-serif" font-size="11" font-weight="600" fill="${accent}" letter-spacing="3">${cleanSubtitle}</text>
        <text x="0" y="32" font-family="'Cormorant Garamond', serif" font-size="28" font-weight="600" fill="${primaryText}">${cleanTitle}</text>
      </g>

      ${itemsXml}

      <!-- Bottom Brand Mark -->
      <text x="${w - 60}" y="${h - 55}" text-anchor="end" font-family="'Cormorant Garamond', serif" font-size="16" font-weight="600" fill="${primaryText}" letter-spacing="2">SEMINARKIT</text>
      <line x1="${w - 180}" y1="${h - 45}" x2="${w - 60}" y2="${h - 45}" stroke="${borderCol}" stroke-width="1"/>
    </svg>
  `;
}

function makeArticleSvg(w, h, category, title, author, isDark = false) {
  const bg = isDark ? '#0B1F4D' : '#FFFCEB';
  const borderCol = isDark ? '#26407A' : '#EFE3B8';
  const primaryText = isDark ? '#FFF8DC' : '#0B1F4D';
  const secondaryText = isDark ? '#EFE3B8' : '#4A5570';
  const accent = '#A8864A';

  const cleanTitle = escapeXml(title);
  const cleanCategory = escapeXml(category.toUpperCase());
  const cleanAuthor = escapeXml(author);

  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="${bg}"/>
      <rect x="20" y="20" width="${w - 40}" height="${h - 40}" fill="none" stroke="${borderCol}" stroke-width="1"/>
      
      <!-- Architectural / Editorial Grid Graphic -->
      <g opacity="0.3">
        <line x1="20" y1="${h * 0.4}" x2="${w - 20}" y2="${h * 0.4}" stroke="${borderCol}" stroke-width="1"/>
        <line x1="${w * 0.6}" y1="20" x2="${w * 0.6}" y2="${h - 20}" stroke="${borderCol}" stroke-width="1"/>
      </g>

      <!-- Geometry graphic -->
      <g transform="translate(${w * 0.75}, ${h * 0.5})">
        <circle cx="0" cy="0" r="100" fill="none" stroke="${borderCol}" stroke-width="1"/>
        <circle cx="0" cy="0" r="80" fill="none" stroke="${accent}" stroke-width="0.75" stroke-dasharray="3,3"/>
        <rect x="-45" y="-45" width="90" height="90" fill="none" stroke="${borderCol}" stroke-width="1" transform="rotate(45)"/>
        <text x="0" y="6" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" font-weight="600" fill="${accent}" letter-spacing="2">SK</text>
      </g>

      <!-- Article Header Info -->
      <g transform="translate(60, ${h * 0.32})">
        <text x="0" y="0" font-family="'Hanken Grotesk', sans-serif" font-size="12" font-weight="600" fill="${accent}" letter-spacing="3">${cleanCategory}</text>
        <text x="0" y="44" font-family="'Cormorant Garamond', serif" font-size="30" font-weight="600" fill="${primaryText}">${cleanTitle.slice(0, 36)}</text>
        <text x="0" y="80" font-family="'Cormorant Garamond', serif" font-size="24" font-weight="500" fill="${primaryText}">${cleanTitle.slice(36, 75)}</text>
        <text x="0" y="140" font-family="'Hanken Grotesk', sans-serif" font-size="14" fill="${secondaryText}">Oleh ${cleanAuthor} · Seminarkit Editorial</text>
      </g>
    </svg>
  `;
}

function makeGallerySvg(w, h, num, caption) {
  const isDark = num % 2 === 0;
  const bg = isDark ? '#0B1F4D' : '#FFFCEB';
  const borderCol = isDark ? '#26407A' : '#EFE3B8';
  const textCol = isDark ? '#FFF8DC' : '#0B1F4D';
  const accent = '#A8864A';

  const cleanCaption = escapeXml(caption.toUpperCase());

  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="${bg}"/>
      <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${borderCol}" stroke-width="1"/>
      
      <!-- Abstract clean merchandise layout -->
      <g transform="translate(${w / 2}, ${h / 2})">
        <rect x="-120" y="-120" width="240" height="240" rx="2" fill="${isDark ? '#07142F' : '#FFF8DC'}" stroke="${borderCol}" stroke-width="1"/>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="${borderCol}" stroke-width="0.5"/>
        <line x1="0" y1="-120" x2="0" y2="120" stroke="${borderCol}" stroke-width="0.5"/>
        
        <circle cx="0" cy="0" r="44" fill="${accent}" opacity="0.9"/>
        <text x="0" y="8" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="24" font-weight="600" fill="#FFF8DC">${num < 10 ? '0' + num : num}</text>
      </g>

      <text x="32" y="${h - 32}" font-family="'Hanken Grotesk', sans-serif" font-size="12" font-weight="500" fill="${textCol}" letter-spacing="1.5">${cleanCaption}</text>
      <text x="${w - 32}" y="${h - 32}" text-anchor="end" font-family="'Cormorant Garamond', serif" font-size="14" font-weight="600" fill="${accent}">SEMINARKIT</text>
    </svg>
  `;
}

function makeOgDefaultSvg(w = 1200, h = 630) {
  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#07142F"/>
      <!-- Inner subtle border -->
      <rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="#0B1F4D" stroke="#26407A" stroke-width="1"/>
      <rect x="52" y="52" width="${w - 104}" height="${h - 104}" fill="none" stroke="#26407A" stroke-width="0.5" stroke-dasharray="6,6"/>

      <!-- Gold accent bar -->
      <rect x="100" y="120" width="48" height="3" fill="#A8864A"/>

      <text x="100" y="160" font-family="'Hanken Grotesk', sans-serif" font-size="16" font-weight="600" fill="#A8864A" letter-spacing="4">SEMINARKIT · SOUVENIR KANTOR &amp; MERCHANDISE</text>
      
      <text x="100" y="250" font-family="'Cormorant Garamond', serif" font-size="64" font-weight="600" fill="#FFF8DC">Souvenir Kantor &amp; Seminar Kit</text>
      <text x="100" y="320" font-family="'Cormorant Garamond', serif" font-size="48" font-weight="500" fill="#EFE3B8">Custom Logo Perusahaan</text>

      <text x="100" y="400" font-family="'Hanken Grotesk', sans-serif" font-size="20" fill="rgba(255,248,220,0.8)" width="800">
        Paket seminar kit eksklusif, tote bag kanvas, dan merchandise korporat premium.
      </text>
      <text x="100" y="435" font-family="'Hanken Grotesk', sans-serif" font-size="20" fill="rgba(255,248,220,0.8)">
        Cepat, rapi, dan terpercaya untuk instansi serta perusahaan seluruh Indonesia.
      </text>

      <g transform="translate(100, 500)">
        <rect x="0" y="0" width="220" height="52" rx="2" fill="#FFF8DC"/>
        <text x="110" y="32" text-anchor="middle" font-family="'Hanken Grotesk', sans-serif" font-size="16" font-weight="600" fill="#0B1F4D">WhatsApp: 0822-3273-0246</text>
      </g>

      <text x="${w - 100}" y="534" text-anchor="end" font-family="'Hanken Grotesk', sans-serif" font-size="16" fill="#A8864A">seminarkit.com</text>
    </svg>
  `;
}

function makeFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="4" fill="#0B1F4D"/>
    <rect x="4" y="4" width="56" height="56" rx="2" fill="none" stroke="#A8864A" stroke-width="1.5"/>
    <text x="32" y="45" font-family="'Cormorant Garamond', serif" font-size="42" font-weight="600" fill="#FFF8DC" text-anchor="middle">S</text>
  </svg>`;
}

async function main() {
  console.log('Generating assets for Seminarkit...');

  // 1. Favicon & OG Default
  fs.writeFileSync('public/favicon.svg', makeFaviconSvg().trim());
  await renderSvgToImage(makeOgDefaultSvg(), 'public/og-default.jpg', 'jpeg', 92);
  console.log('Created favicon.svg & og-default.jpg');

  // 2. Hero Asset
  const heroSvg = makeProductSvg(800, 1000, 'Paket Seminar Kit Eksekutif', 'Katalog Pilihan', [
    'Agenda Kulit Premium Hardcover',
    'Pen Metal Grafir Logo Presisi',
    'Tumbler Stainless 500ml Vacuum',
    'Hardbox Eksklusif Finishing Doff'
  ], true);
  await renderSvgToImage(heroSvg, 'src/assets/hero/hero-seminarkit.webp', 'webp');
  console.log('Created hero-seminarkit.webp');

  // 3. About Asset
  const aboutSvg = makeArticleSvg(960, 720, 'Tentang Kami', 'Standar Mutu Souvenir Kantor & Konveksi Terpadu', 'Tim Produksi', false);
  await renderSvgToImage(aboutSvg, 'src/assets/about/workshop-seminarkit.webp', 'webp');
  console.log('Created workshop-seminarkit.webp');

  // 4. Products (3 products, 1 main + 3 support each)
  const products = [
    {
      slug: 'paket-seminar-kit-eksekutif',
      name: 'Paket Seminar Kit Eksekutif',
      mainSvg: makeProductSvg(800, 1000, 'Paket Seminar Kit Eksekutif', 'Paket Terlengkap', [
        'Agenda Agenda Hardcover Kulit A5',
        'Pen Metal Laser Grafir Logo',
        'Tumbler Stainless Vacuum 500ml',
        'Hardbox Custom Finishing Doff'
      ], false),
      thumbs: [
        makeProductSvg(800, 800, 'Agenda Kulit A5', 'Detail Komponen 01', ['Bahan Synthetic Leather', 'Halaman Bergaris 80 gsm'], false),
        makeProductSvg(800, 800, 'Pen Metal Grafir', 'Detail Komponen 02', ['Laser Marking Anti Luntur', 'Tinta Gel Hitam 0.5mm'], true),
        makeProductSvg(800, 800, 'Tumbler Stainless', 'Detail Komponen 03', ['Tahan Panas/Dingin 12 Jam', 'Food Grade SUS 304'], false),
      ]
    },
    {
      slug: 'tote-bag-seminar-kanvas-premium',
      name: 'Tote Bag Seminar Kanvas Premium',
      mainSvg: makeProductSvg(800, 1000, 'Tote Bag Seminar Kanvas', 'Merchandise Favorit', [
        'Bahan Kanvas Katun 12oz Tebal',
        'Sablon Presisi / Bordir Komputer',
        'Ukuran 35 x 40 cm (Alas 8 cm)',
        'Ritsleting YKK & Kantong Dalam'
      ], false),
      thumbs: [
        makeProductSvg(800, 800, 'Jahitan & Ritsleting', 'Detail Komponen 01', ['Ritsleting YKK Original', 'Jahitan Double Stitch'], true),
        makeProductSvg(800, 800, 'Hasil Sablon Logo', 'Detail Komponen 02', ['Tinta Rubber High Density', 'Warna Tajam Sesuai Pantone'], false),
        makeProductSvg(800, 800, 'Pilihan Warna Kanvas', 'Detail Komponen 03', ['Navy, Hitam, Broken White', 'Bahan Ramah Lingkungan'], false),
      ]
    },
    {
      slug: 'paket-merchandise-kantor-onboarding',
      name: 'Paket Merchandise Kantor Onboarding',
      mainSvg: makeProductSvg(800, 1000, 'Paket Merchandise Onboarding', 'Paket Karyawan & Klien', [
        'Tumbler LED Smart Temperatur',
        'Lanyard Kulit + ID Card Holder',
        'Notebook Softcover Dotted B5',
        'Pouch Spunbond Tebal Ramah Lingkungan'
      ], false),
      thumbs: [
        makeProductSvg(800, 800, 'Lanyard & Card Holder', 'Detail Komponen 01', ['Kulit Sintetis Premium', 'Emboss Logo Perusahaan'], false),
        makeProductSvg(800, 800, 'Tumbler LED Temp', 'Detail Komponen 02', ['Display Suhu Sentuh', 'Kapasitas 500ml'], true),
        makeProductSvg(800, 800, 'Packaging & Greeting Card', 'Detail Komponen 03', ['Pouch Spunbond 100 gsm', 'Kartu Sambutan Karyawan Baru'], false),
      ]
    }
  ];

  for (const prod of products) {
    await renderSvgToImage(prod.mainSvg, `src/assets/products/${prod.slug}-main.webp`, 'webp');
    for (let i = 0; i < prod.thumbs.length; i++) {
      await renderSvgToImage(prod.thumbs[i], `src/assets/products/${prod.slug}-thumb-${i + 1}.webp`, 'webp');
    }
    console.log(`Created assets for ${prod.slug}`);
  }

  // 5. Blog Assets (4 articles, main + support each)
  const articles = [
    {
      slug: 'panduan-memilih-souvenir-kantor',
      title: 'Panduan Memilih Souvenir Kantor untuk Karyawan dan Klien',
      category: 'Panduan Pengadaan',
      author: 'Dewi Lestari'
    },
    {
      slug: 'isi-seminar-kit-yang-ideal',
      title: 'Isi Seminar Kit yang Ideal dan Bermanfaat untuk Acara Korporat',
      category: 'Tips Event',
      author: 'Ahmad Fauzi'
    },
    {
      slug: 'ide-souvenir-acara-perusahaan',
      title: 'Ide Souvenir untuk Acara Perusahaan Sesuai Budget dan Kebutuhan',
      category: 'Inspirasi Budget',
      author: 'Dewi Lestari'
    },
    {
      slug: 'cara-memesan-souvenir-custom',
      title: 'Cara Memesan Souvenir Custom: Dari Desain Logo sampai Pengiriman',
      category: 'Proses & SOP',
      author: 'Bambang Santoso'
    }
  ];

  for (const art of articles) {
    const mainSvg = makeArticleSvg(900, 600, art.category, art.title, art.author, false);
    const supportSvg = makeArticleSvg(800, 533, art.category, `Rincian: ${art.title}`, art.author, true);
    await renderSvgToImage(mainSvg, `src/assets/blog/${art.slug}-main.webp`, 'webp');
    await renderSvgToImage(supportSvg, `src/assets/blog/${art.slug}-support.webp`, 'webp');
    console.log(`Created blog assets for ${art.slug}`);
  }

  // 6. Gallery Assets (12 items)
  const galleryItems = [
    { num: 1, caption: 'Paket Seminar Kit Kementerian' },
    { num: 2, caption: 'Tote Bag Kanvas Event Nasional' },
    { num: 3, caption: 'Onboarding Kit Karyawan Fintech' },
    { num: 4, caption: 'Tumbler Stainless Grafir Laser' },
    { num: 5, caption: 'Agenda Kulit Emboss Gold' },
    { num: 6, caption: 'Lanyard & Card Holder BUMN' },
    { num: 7, caption: 'Hardbox Packaging Eksklusif' },
    { num: 8, caption: 'Pen Metal Hitam Doff Grafir' },
    { num: 9, caption: 'Pouch Serut Spunbond Custom' },
    { num: 10, caption: 'Goodie Bag Seminar Medis' },
    { num: 11, caption: 'Souvenir Temu Alumni Universitas' },
    { num: 12, caption: 'Paket Akhir Tahun Mitra Bisnis' }
  ];

  for (const item of galleryItems) {
    const gSvg = makeGallerySvg(800, 800, item.num, item.caption);
    await renderSvgToImage(gSvg, `src/assets/gallery/galeri-${item.num < 10 ? '0' + item.num : item.num}.webp`, 'webp');
  }
  console.log('Created 12 gallery images');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
