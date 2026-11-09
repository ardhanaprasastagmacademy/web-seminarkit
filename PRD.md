# PRD — Website Seminarkit (Souvenir Kantor)

Versi 1.0 · Framework: Astro (static, tanpa database) · Bahasa konten: Indonesia

---

## 1. Ringkasan

Seminarkit adalah brand souvenir kantor (seminar kit dan merchandise perusahaan). Website ini berfungsi sebagai katalog dan media konversi: pengunjung melihat produk, lalu memesan lewat WhatsApp. Tidak ada database, tidak ada login, tidak ada keranjang. Semua data produk dan blog disimpan sebagai file di dalam project.

**Tujuan utama**
1. Mengarahkan pengunjung ke WhatsApp (pesan produk, form pemesanan, tombol WA mengambang).
2. Tampil baik di Google (SEO, AEO, GEO) untuk kata kunci souvenir kantor, seminar kit, dan merchandise perusahaan.
3. Cepat dibuka di HP (target PageSpeed mobile 90+).

**Target pengunjung**: HRD, panitia acara, staf pengadaan, event organizer, dan instansi yang mencari souvenir atau perlengkapan seminar dalam jumlah banyak.

**Kontak pemesanan**: WhatsApp 082232730246 → format link `https://wa.me/6282232730246`.

---

## 2. Tech Stack

| Kebutuhan | Pilihan |
|---|---|
| Framework | Astro (output `static`) |
| Styling | CSS native dengan custom property (design token), tanpa framework CSS berat |
| JavaScript | Vanilla JS (menu mobile, lightbox, form WA, FAQ accordion, animasi ringan) |
| Data produk | `src/data/products.js` |
| Data blog | Astro Content Collections (`src/content/blog/*.md`) |
| Data lain | `src/data/` (testimoni, FAQ, galeri, site config) |
| Gambar | `astro:assets` (`<Image />`), format WebP/AVIF, lazy loading |
| SEO | `@astrojs/sitemap`, JSON-LD, Open Graph, canonical |
| Deploy | Vercel atau shared hosting (hasil `npm run build` → folder `dist/`) |

---

## 3. Struktur Halaman dan URL

| Halaman | URL | Keterangan |
|---|---|---|
| Beranda | `/` | |
| Tentang | `/tentang/` | |
| Produk | `/produk/` | 3 card produk |
| Detail produk | `/produk/[slug]/` | dibuat otomatis per produk (`getStaticPaths`) |
| Blog | `/blog/` | 4 card artikel |
| Detail blog | `/blog/[slug]/` | dibuat otomatis per artikel |
| Galeri | `/galeri/` | |
| Kontak | `/kontak/` | form pemesanan → WA |
| **Tambahan:** FAQ | `/faq/` | versi lengkap FAQ, bagus untuk AEO |
| **Tambahan:** Kebijakan Privasi | `/kebijakan-privasi/` | wajib karena ada form |
| **Tambahan:** Syarat dan Ketentuan | `/syarat-ketentuan/` | pemesanan, pembayaran, pengiriman, revisi desain |
| **Tambahan:** 404 | `/404` | halaman tidak ditemukan, ada tombol kembali dan WA |
| **Tambahan:** Sitemap | `/sitemap-index.xml` | otomatis dari `@astrojs/sitemap` |
| **Tambahan:** Robots | `/robots.txt` | |

Catatan: halaman FAQ, kebijakan privasi, dan syarat ketentuan memakai layout yang sama dengan halaman biasa (page banner + breadcrumb + konten).

---

## 4. Komponen Global

**Navbar** (sticky): logo, menu Beranda · Tentang · Produk · Blog · Galeri · Kontak, tombol "Pesan via WA". Di mobile menjadi menu hamburger.

**Footer**: logo dan deskripsi singkat, tautan cepat, daftar produk, kontak (WA, alamat, email, jam kerja), tautan kebijakan privasi dan syarat ketentuan, hak cipta.

**Tombol WhatsApp mengambang**: pojok kanan bawah di semua halaman, dengan pesan awal otomatis.

**Page Banner + Breadcrumb**: komponen `PageBanner.astro` dengan props `title`, `description`, `breadcrumb[]`. Dipakai di semua halaman kecuali beranda. Breadcrumb juga mengeluarkan JSON-LD `BreadcrumbList`.

**CTA Section**: komponen `CtaSection.astro` dengan props judul, teks, dan teks tombol. Tombol mengarah ke WA.

**Tombol WA produk**: helper `waLink(text)` supaya semua link WA dibuat dari satu tempat.

---

## 5. Spesifikasi Per Halaman

### 5.1 Beranda `/`
Urutan section:
1. **Hero** — headline, subheadline, dua tombol (Lihat Produk, Pesan via WA), foto produk utama.
2. **Tentang** — ringkasan singkat brand + foto + tombol "Selengkapnya" ke `/tentang/`.
3. **Kenapa Pilih Kami** — 4 sampai 6 poin keunggulan (judul + penjelasan singkat).
4. **Produk** — menampilkan 3 produk (data dari `products.js`) + tombol "Lihat Semua Produk".
5. **Galeri** — 6 foto pilihan + tombol "Lihat Galeri".
6. **Testimoni** — 3 sampai 4 testimoni (nama, perusahaan/instansi, isi).
7. **FAQ** — 5 sampai 6 pertanyaan (accordion) + tautan ke `/faq/`.
8. **CTA** — ajakan konsultasi dan pesan via WA.

### 5.2 Tentang `/tentang/`
1. Page banner + breadcrumb
2. Section tentang (cerita brand, foto)
3. Section keunggulan
4. CTA

Tambahan yang disarankan: blok visi dan misi singkat di dalam section tentang.

### 5.3 Produk `/produk/`
1. Page banner + breadcrumb
2. Section produk: **3 card**. Setiap card berisi foto, nama produk, deskripsi singkat, harga, tombol **Detail Produk** (ke `/produk/[slug]/`) dan tombol **Pesan WA** (pesan otomatis berisi nama produk).
3. CTA

Format harga: "Mulai Rp 000.000" atau "Rp 000.000 / pcs" (ditentukan klien). Jika harga bergantung jumlah, tulis "Mulai dari".

### 5.4 Detail Produk `/produk/[slug]/`
1. Page banner (judul = nama produk) + breadcrumb: Beranda › Produk › Nama Produk
2. Section detail produk:
   - 1 foto utama + 3 foto pendukung (klik thumbnail untuk mengganti foto utama)
   - Nama, harga, deskripsi lengkap, daftar spesifikasi (bahan, ukuran, minimal order, opsi cetak logo)
   - Tombol Pesan via WA (pesan otomatis berisi nama produk)
3. Section produk terkait (produk lain di luar produk yang sedang dibuka; dengan 3 produk maka tampil 2 card)
4. CTA

SEO: `<title>` dan meta description per produk, JSON-LD `Product` (tanpa `offers` yang menjanjikan stok jika harga tidak tetap).

### 5.5 Blog `/blog/`
1. Page banner + breadcrumb
2. Section blog: **4 card**. Setiap card berisi judul, meta description, dan tanggal (ditambah foto sampul agar card tidak polos).
3. CTA

### 5.6 Detail Blog `/blog/[slug]/`
Layout dua kolom: artikel di kiri, sidebar di kanan.
- Page banner + breadcrumb: Beranda › Blog › Judul Artikel
- Data artikel: **meta title**, **meta description**, **tanggal**, **penulis**
- **2 foto**: 1 foto utama (di atas artikel) dan 1 foto pendukung (di tengah artikel)
- Isi artikel (heading H2/H3, daftar isi otomatis dari heading)
- **Sidebar artikel terkait** (3 artikel lain) + kotak CTA kecil "Konsultasi via WA"
- Di mobile sidebar turun ke bawah artikel

Frontmatter artikel:
```yaml
---
title: "Judul Artikel"
metaTitle: "Meta title (maks. ±60 karakter)"
description: "Meta description (±150 sampai 160 karakter)"
date: 2026-11-09
author: "Nama Penulis"
image: "../../assets/blog/slug-utama.jpg"
imageAlt: "Deskripsi foto utama"
supportImage: "../../assets/blog/slug-pendukung.jpg"
supportImageAlt: "Deskripsi foto pendukung"
---
```
JSON-LD `Article` memakai `metaTitle`, `description`, `date`, `author`, dan `image`.

### 5.6 Galeri `/galeri/`
1. Page banner + breadcrumb
2. Section galeri: grid foto **tanpa deskripsi** yang terlihat. Klik foto → **lightbox** (foto besar, tombol tutup, panah sebelumnya/berikutnya, navigasi keyboard, tutup dengan Esc atau klik area luar).
3. (opsional) CTA

Catatan: teks `alt` tetap diisi di kode untuk aksesibilitas dan SEO gambar, walau tidak ditampilkan.

### 5.7 Kontak `/kontak/`
1. Page banner + breadcrumb
2. Section kontak:
   - Info kontak: WhatsApp, alamat, email, jam kerja, tautan media sosial
   - **Form pemesanan** dengan field: Nama, Nama perusahaan/instansi, Produk (pilihan dari 3 produk), Jumlah, Tanggal dibutuhkan, Catatan (kebutuhan cetak logo, dll.)
   - Saat dikirim, JavaScript menyusun pesan dan membuka `https://wa.me/6282232730246?text=...` (di-encode dengan `encodeURIComponent`)
   - Validasi: nama, produk, jumlah wajib diisi; jumlah hanya angka
3. (opsional) Peta Google Maps (embed, dimuat lazy) jika alamat toko tersedia

Contoh pesan WA:
```
Halo Seminarkit, saya ingin memesan.
Nama: ...
Perusahaan/Instansi: ...
Produk: ...
Jumlah: ...
Dibutuhkan tanggal: ...
Catatan: ...
```

---

## 6. Struktur Folder

```
seminarkit/
├─ public/
│  ├─ favicon.svg
│  ├─ og-default.jpg
│  └─ robots.txt
├─ src/
│  ├─ assets/            # gambar (products, blog, gallery, hero)
│  ├─ components/
│  │  ├─ Navbar.astro
│  │  ├─ Footer.astro
│  │  ├─ PageBanner.astro
│  │  ├─ CtaSection.astro
│  │  ├─ ProductCard.astro
│  │  ├─ BlogCard.astro
│  │  ├─ FaqAccordion.astro
│  │  ├─ TestimonialCard.astro
│  │  ├─ Lightbox.astro
│  │  ├─ WhatsappFloat.astro
│  │  └─ SeoHead.astro
│  ├─ content/
│  │  ├─ config.ts       # schema koleksi blog
│  │  └─ blog/*.md
│  ├─ data/
│  │  ├─ site.js         # nama brand, WA, alamat, sosmed
│  │  ├─ products.js
│  │  ├─ gallery.js
│  │  ├─ testimonials.js
│  │  └─ faq.js
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ tentang.astro
│  │  ├─ faq.astro
│  │  ├─ galeri.astro
│  │  ├─ kontak.astro
│  │  ├─ kebijakan-privasi.astro
│  │  ├─ syarat-ketentuan.astro
│  │  ├─ 404.astro
│  │  ├─ produk/index.astro
│  │  ├─ produk/[slug].astro
│  │  ├─ blog/index.astro
│  │  └─ blog/[slug].astro
│  ├─ scripts/           # menu.js, lightbox.js, wa-form.js, product-gallery.js
│  ├─ styles/            # tokens.css, base.css, components.css
│  └─ utils/wa.js        # helper waLink()
├─ astro.config.mjs
└─ package.json
```

Contoh struktur data produk (`products.js`):
```js
export const products = [
  {
    slug: "nama-produk",
    name: "Nama Produk",
    shortDescription: "Deskripsi singkat untuk card.",
    description: "Deskripsi lengkap untuk halaman detail.",
    price: "Mulai Rp 000.000",
    images: { main: "...", support: ["...", "...", "..."] },
    specs: [{ label: "Bahan", value: "..." }],
    metaTitle: "...",
    metaDescription: "..."
  }
];
```

---

## 7. SEO, AEO, dan GEO

- Satu `<h1>` per halaman, urutan heading rapi.
- `<title>`, meta description, canonical, dan Open Graph/Twitter Card di setiap halaman lewat `SeoHead.astro`.
- JSON-LD: `Organization` + `WebSite` (semua halaman), `LocalBusiness` (kontak, jika alamat tersedia), `BreadcrumbList` (semua halaman selain beranda), `Product` (detail produk), `Article` (detail blog), `FAQPage` (beranda dan `/faq/`).
- Jawaban singkat 40 sampai 60 kata di awal artikel dan FAQ untuk AEO.
- Sebut wilayah layanan dan kota secara natural di halaman tentang dan kontak untuk GEO.
- Tautan internal: artikel blog ke halaman produk, produk ke artikel terkait.
- Sitemap otomatis dan `robots.txt` yang menunjuk ke sitemap.

---

## 8. Performa dan Aksesibilitas

- Gambar lewat `astro:assets`, ukuran `width`/`height` selalu diisi (mencegah CLS), `loading="lazy"` kecuali hero; hero memakai `fetchpriority="high"`.
- Font: maksimal 2 keluarga font, self-host, `font-display: swap`.
- JavaScript hanya yang diperlukan, dimuat per halaman.
- Kontras warna memenuhi WCAG AA, fokus keyboard terlihat, tombol dan link berukuran nyaman disentuh di HP.
- Animasi ringan dan menghormati `prefers-reduced-motion`.
- Responsif: 360px sampai desktop lebar.

---

## 9. Konten Sementara (placeholder)

Sebelum konten asli tersedia, gunakan data contoh yang mudah diganti:
- 3 produk contoh (misalnya paket seminar kit, tas/ tote bag seminar, dan paket merchandise kantor) dengan harga placeholder.
- 4 artikel contoh (misalnya ide souvenir kantor, tips memilih seminar kit, souvenir untuk acara perusahaan, cara memesan merchandise custom).
- 8 sampai 12 foto galeri, 3 testimoni, 6 FAQ.

Semua teks placeholder ditandai agar tidak ikut tayang tanpa diganti.

---

## 10. Kriteria Selesai

- [ ] Semua URL pada bagian 3 terbuka tanpa error dan masuk sitemap.
- [ ] Beranda memuat 8 section sesuai urutan.
- [ ] Halaman selain beranda memiliki page banner dan breadcrumb.
- [ ] `/produk/` menampilkan 3 card; setiap detail produk punya 1 foto utama + 3 foto pendukung, produk terkait, dan CTA.
- [ ] `/blog/` menampilkan 4 card; setiap detail blog punya meta title, meta description, tanggal, penulis, 2 foto, dan sidebar artikel terkait.
- [ ] Galeri tanpa deskripsi terlihat dan lightbox berfungsi (mouse, sentuh, keyboard).
- [ ] Form kontak membuka WhatsApp ke 6282232730246 dengan pesan terisi.
- [ ] Semua tombol "Pesan WA" membawa nama produk dalam pesan.
- [ ] Skor Lighthouse mobile: Performance, Accessibility, Best Practices, SEO masing-masing 90+.
- [ ] JSON-LD lolos uji Rich Results Test.

---

## 11. Hal yang Perlu Dikonfirmasi

1. Warna brand dan logo Seminarkit (belum ada → perlu DESIGN.md).
2. Tiga produk yang akan tampil: nama, harga, spesifikasi, dan foto.
3. Alamat, email, jam kerja, dan akun media sosial.
4. Nama penulis blog dan topik 4 artikel awal.
5. Domain dan tempat hosting (Vercel atau shared hosting).
6. Apakah halaman FAQ, kebijakan privasi, dan syarat ketentuan disetujui sebagai halaman tambahan.
