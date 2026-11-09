# SEO Strategy — Seminarkit (Souvenir Kantor)

Dokumen strategi SEO, AEO, dan GEO untuk website Seminarkit (Astro, statis, tanpa database).
Target pasar: Indonesia. Bahasa: Indonesia. Konversi utama: klik dan pesan masuk lewat WhatsApp (082232730246).

> **Catatan jujur tentang data.** Dokumen ini tidak memuat angka volume pencarian karena angka itu harus diambil dari alat riset (Google Keyword Planner, Google Trends, Search Console setelah situs tayang). Daftar keyword di bawah adalah **hipotesis yang harus divalidasi** sebelum dikunci. Tidak ada strategi yang bisa menjamin peringkat tertentu; yang bisa dikendalikan adalah kualitas halaman, struktur, kecepatan, dan konsistensi konten.

---

## 1. Tujuan

1. Muncul untuk pencarian yang bermaksud membeli: "souvenir kantor", "seminar kit", "merchandise perusahaan" dan variasinya.
2. Mengubah kunjungan menjadi klik WhatsApp (ukuran utama keberhasilan).
3. Membangun otoritas topik lewat blog yang menjawab pertanyaan pembeli korporat.
4. Siap tampil di jawaban AI dan fitur jawaban Google (AEO/GEO) dengan konten yang jelas, faktual, dan konsisten.

Target pencari: HRD, panitia acara, staf pengadaan/GA, event organizer, sekolah, kampus, dan instansi.

---

## 2. Pembaruan Penting: FAQ Rich Results

Menurut beberapa laporan industri yang saya cek, Google menghentikan tampilan FAQ rich results di hasil pencarian per **7 Mei 2026** (sebelumnya sejak 2023 sudah dibatasi hanya untuk situs pemerintah dan kesehatan). Markup `FAQPage` masih valid secara teknis dan Google disebut tidak mengharuskan menghapusnya, tetapi **tidak lagi menghasilkan tampilan khusus** di Google.

Dampak untuk Seminarkit:
- Tetap tulis FAQ yang bagus **sebagai konten** (menjawab pertanyaan nyata, bagus untuk pengunjung dan AEO).
- `FAQPage` JSON-LD **opsional dan bukan prioritas**. Jangan menghabiskan waktu untuk itu sebelum item di bagian 8 selesai.
- Jenis schema yang masih relevan untuk rich results: `Product`, `Article`, `BreadcrumbList`, `Organization`. Verifikasi di dokumentasi Google saat implementasi karena aturan bisa berubah lagi.

---

## 3. Strategi Keyword

### 3.1 Prinsip
- **Satu halaman, satu keyword utama.** Hindari dua halaman bersaing untuk keyword yang sama (kanibalisasi).
- Pisahkan berdasarkan maksud pencarian: beli (halaman produk), bandingkan (halaman produk + blog), belajar (blog).
- Keyword panjang (long-tail) lebih realistis untuk situs baru daripada keyword umum.
- Ganti contoh produk di bawah dengan **3 produk asli** Seminarkit begitu dikonfirmasi.

### 3.2 Klaster keyword (hipotesis awal)

**A. Inti (transaksional, kompetisi tinggi)**
- souvenir kantor
- souvenir perusahaan
- merchandise kantor
- merchandise perusahaan
- seminar kit
- paket seminar kit

**B. Custom dan pemesanan (niat beli kuat, kompetisi sedang)**
- souvenir kantor custom
- souvenir custom logo perusahaan
- seminar kit custom
- seminar kit custom logo
- souvenir seminar custom
- cetak logo di souvenir kantor
- souvenir kantor sablon / bordir

**C. Komersial (membandingkan, menanyakan harga)**
- harga seminar kit
- harga souvenir kantor
- souvenir kantor murah
- souvenir kantor minimal order
- vendor souvenir kantor
- supplier seminar kit
- toko / jasa pembuatan souvenir kantor

**D. Produk (isi sesuai 3 produk asli)**
- [produk 1] custom, [produk 1] seminar, [produk 1] untuk karyawan
- [produk 2] custom, [produk 2] untuk acara perusahaan
- [produk 3] custom, [produk 3] grosir
- Contoh pola jika produknya tas, tote bag, atau perlengkapan seminar: "tote bag seminar custom", "tas seminar custom", "goodie bag seminar"

**E. Lokal (tambahkan setelah kota/wilayah layanan dipastikan)**
- souvenir kantor [kota]
- seminar kit [kota]
- vendor merchandise [kota]
Isi [kota] dengan kota tempat usaha berada atau wilayah layanan utama. Jangan memasang kota yang bukan wilayah layanan sebenarnya.

**F. Informasional (blog)**
- ide souvenir kantor untuk karyawan
- ide souvenir seminar yang bermanfaat
- isi seminar kit yang ideal
- souvenir untuk acara perusahaan
- souvenir HUT perusahaan
- souvenir akhir tahun kantor
- souvenir untuk klien dan relasi bisnis
- perbedaan sablon dan bordir untuk merchandise
- cara memesan souvenir custom
- budget souvenir kantor per orang

### 3.3 Pemetaan keyword ke halaman

| Halaman | Keyword utama | Keyword pendukung |
|---|---|---|
| Beranda `/` | souvenir kantor | seminar kit, merchandise kantor, vendor souvenir kantor |
| Produk `/produk/` | souvenir kantor custom | merchandise perusahaan, seminar kit custom, harga souvenir kantor |
| Detail produk `/produk/[slug]/` | [nama produk] custom | [nama produk] untuk seminar, harga [nama produk], minimal order |
| Tentang `/tentang/` | Seminarkit (brand) | vendor souvenir kantor [kota], produsen merchandise perusahaan |
| Galeri `/galeri/` | contoh souvenir kantor custom | (SEO gambar via nama file dan `alt`) |
| Kontak `/kontak/` | pesan souvenir kantor | kontak Seminarkit, order seminar kit |
| FAQ `/faq/` | pertanyaan seputar memesan souvenir kantor | minimal order, waktu produksi, desain logo, pengiriman |
| Blog | satu keyword informasional per artikel | lihat bagian 6 |

### 3.4 Cara memvalidasi keyword (lakukan sebelum build final)
1. Masukkan klaster A sampai F ke Google Keyword Planner dan catat volume relatif serta tingkat persaingan.
2. Ketik tiap keyword inti di Google dan lihat 10 hasil teratas: apakah hasilnya halaman produk, kategori, atau artikel? Buat halaman sesuai jenis yang Google tampilkan.
3. Catat bagian "Orang juga bertanya" dan "Pencarian terkait" sebagai bahan FAQ dan judul blog.
4. Lihat 3 sampai 5 kompetitor teratas: struktur halaman, kelengkapan info harga dan minimal order, jumlah artikel.
5. Setelah tayang, gunakan Search Console (Performance → Queries) sebagai sumber data utama dan sesuaikan.

---

## 4. SEO On-Page

### 4.1 Rumus title dan meta description

- **Title**: maks. sekitar 60 karakter. Keyword utama di depan, brand di belakang.
- **Meta description**: sekitar 140 sampai 155 karakter. Berisi manfaat, penawaran spesifik, dan ajakan bertindak. Tidak diisi keyword berulang.

| Halaman | Contoh title | Contoh meta description |
|---|---|---|
| Beranda | Souvenir Kantor Custom dan Seminar Kit — Seminarkit | Souvenir kantor dan seminar kit custom logo perusahaan. Pilih produk, konsultasi, dan pesan langsung via WhatsApp. |
| Produk | Souvenir Kantor Custom Logo — Katalog Seminarkit | Lihat katalog souvenir kantor dan seminar kit dengan harga jelas. Bisa cetak logo perusahaan. Pesan via WhatsApp. |
| Detail produk | [Nama Produk] Custom Logo untuk Seminar — Seminarkit | [Nama produk]: [bahan/ukuran singkat], bisa custom logo, minimal order [jumlah]. Lihat harga dan pesan via WhatsApp. |
| Tentang | Tentang Seminarkit — Vendor Souvenir dan Seminar Kit | Kenali Seminarkit, penyedia souvenir kantor dan seminar kit [kota]. Proses produksi, pengalaman, dan layanan kami. |
| Blog (index) | Blog Souvenir Kantor — Tips dan Ide | Panduan memilih souvenir kantor, isi seminar kit, dan merchandise perusahaan untuk berbagai acara. |
| Galeri | Galeri Souvenir dan Seminar Kit — Seminarkit | Contoh hasil souvenir kantor dan seminar kit yang pernah kami kerjakan. |
| Kontak | Kontak dan Pemesanan — Seminarkit | Hubungi Seminarkit via WhatsApp 0822-3273-0246 atau isi form pemesanan souvenir kantor dan seminar kit. |

Aturan: setiap halaman punya title dan description **unik**. Untuk blog, pakai field `metaTitle` dan `description` di frontmatter (sudah ada di PRD).

### 4.2 Heading dan isi
- Satu `<h1>` per halaman dengan keyword utama secara natural.
- `<h2>` untuk sub-topik, `<h3>` untuk detail. Jangan melompati level.
- Beranda dan halaman produk perlu **teks asli minimal 300 sampai 500 kata** (tidak hanya gambar dan tombol): jelaskan jenis produk, bahan, opsi cetak, minimal order, waktu produksi.
- Detail produk wajib memuat: deskripsi unik per produk (jangan copy-paste antar produk), spesifikasi, opsi custom, minimal order, harga atau kisaran harga, waktu produksi, dan cara pesan.

### 4.3 URL
- Huruf kecil, pakai tanda hubung, ringkas, mengandung keyword: `/produk/tote-bag-seminar-custom/`, `/blog/ide-souvenir-kantor-untuk-karyawan/`.
- Tentukan satu format: **dengan garis miring di akhir** (`trailingSlash: 'always'` di Astro) dan terapkan konsisten di sitemap, canonical, dan link internal.
- Jangan mengubah URL setelah tayang; jika terpaksa, buat redirect 301.

### 4.4 Gambar
- Nama file deskriptif: `tote-bag-seminar-custom-logo.jpg`, bukan `IMG_2034.jpg`.
- `alt` menjelaskan isi gambar secara singkat dan jujur (bukan daftar keyword). Contoh: "Tote bag seminar warna navy dengan sablon logo perusahaan".
- Galeri tanpa deskripsi yang terlihat tetap wajib memiliki `alt`.
- Format WebP/AVIF, ukuran sesuai tampilan, `width` dan `height` selalu diisi.

### 4.5 Tautan internal
- Setiap artikel blog memuat minimal **2 tautan ke halaman produk** dan 1 tautan ke artikel lain, dengan teks tautan yang deskriptif ("seminar kit custom", bukan "klik di sini").
- Setiap halaman produk menaut ke 1 sampai 2 artikel yang relevan.
- Beranda menaut ke semua halaman penting; footer memuat tautan cepat ke produk dan blog.
- Breadcrumb di semua halaman selain beranda.

---

## 5. Konten Halaman Penting

**Beranda**: hero dengan satu kalimat nilai yang spesifik (apa yang dijual, untuk siapa), bukan slogan umum. Section "Kenapa pilih kami" memuat fakta yang bisa dibuktikan: minimal order, waktu produksi, opsi cetak, jumlah klien, pengalaman. Hindari klaim kosong seperti "terbaik" tanpa bukti.

**Tentang**: cerita usaha, kapan berdiri, siapa pendirinya, lokasi, proses produksi, dan klien yang pernah dilayani (dengan izin). Ini penting untuk kepercayaan (E-E-A-T) dan GEO karena AI dan mesin pencari mencari entitas yang jelas.

**Produk**: harga atau kisaran harga ditampilkan. Pencarian komersial sangat sensitif terhadap harga; halaman tanpa harga sering kalah dari yang menampilkannya.

**Kontak**: nama usaha, alamat, nomor WA, email, dan jam kerja ditulis **persis sama** dengan di footer, Google Business Profile, dan media sosial (konsistensi NAP).

---

## 6. Rencana Blog

Situs awal punya 4 artikel. Targetkan **2 artikel per bulan** setelahnya. Setiap artikel menargetkan satu keyword informasional.

### 6.1 Empat artikel awal (usulan)

| # | Judul usulan | Keyword utama | Menaut ke |
|---|---|---|---|
| 1 | Panduan Memilih Souvenir Kantor untuk Karyawan dan Klien | souvenir kantor | halaman produk, artikel 2 |
| 2 | Isi Seminar Kit yang Ideal dan Tidak Terbuang Percuma | isi seminar kit | produk seminar kit, artikel 1 |
| 3 | Ide Souvenir untuk Acara Perusahaan Sesuai Budget | souvenir acara perusahaan | produk, artikel 4 |
| 4 | Cara Memesan Souvenir Custom: Dari Desain Logo sampai Pengiriman | cara memesan souvenir custom | kontak, produk |

### 6.2 Antrean artikel berikutnya
- Perbedaan sablon, bordir, dan printing untuk merchandise
- Budget souvenir kantor per orang: cara menghitungnya
- Souvenir HUT perusahaan: ide dan timeline pemesanan
- Souvenir akhir tahun untuk klien dan relasi
- Souvenir seminar kampus dan sekolah
- Kesalahan umum saat memesan souvenir custom
- Studi kasus pesanan (dengan foto dan izin klien)

### 6.3 Struktur artikel yang dianjurkan
1. Judul (H1) dan **jawaban singkat 40 sampai 60 kata** di paragraf pertama.
2. Daftar isi otomatis dari heading.
3. Isi dengan H2/H3 yang menjawab pertanyaan spesifik, tabel jika membandingkan, daftar jika langkah.
4. Penulis, tanggal terbit, dan tanggal diperbarui.
5. Tautan ke produk yang relevan dan CTA WhatsApp di akhir.
6. Panjang mengikuti kebutuhan topik (umumnya 800 sampai 1.500 kata), bukan dipanjangkan untuk memenuhi angka.

Kalender musiman (publikasikan 4 sampai 8 minggu sebelum puncak pencarian): akhir tahun dan tahun baru, Ramadan dan Lebaran (parsel/hampers kantor), HUT RI dan HUT perusahaan, periode seminar dan wisuda kampus. Validasi waktunya dengan Google Trends.

---

## 7. Technical SEO untuk Astro

- `astro.config.mjs`: isi `site` dengan domain final, `trailingSlash: 'always'`, `output: 'static'`.
- `@astrojs/sitemap` untuk sitemap otomatis; kirim ke Search Console. `robots.txt` menunjuk ke sitemap dan tidak memblokir CSS/JS/gambar.
- `<html lang="id">`, satu `<link rel="canonical">` per halaman (absolut), `<meta name="viewport">`.
- Open Graph dan Twitter Card lengkap (judul, deskripsi, gambar 1200x630). Setiap artikel dan produk punya gambar OG sendiri bila memungkinkan.
- Halaman 404 mengembalikan status 404 (bukan 200). Halaman tidak penting (misalnya hasil pencarian internal, jika ada) diberi `noindex`.
- Redirect: samakan `www` dan non-`www`, `http` ke `https`, dan satu format garis miring di akhir.
- **Core Web Vitals (target mobile)**: LCP di bawah 2,5 detik, INP di bawah 200 ms, CLS di bawah 0,1.
  - Hero: gambar di-preload, `fetchpriority="high"`, ukuran tepat, tanpa lazy loading.
  - Gambar lain `loading="lazy"`; `width` dan `height` selalu diisi.
  - Font self-host, maksimal 2 keluarga, `font-display: swap`, preload bobot yang dipakai di hero.
  - JavaScript minimal dan per halaman; tidak ada library berat untuk menu, lightbox, atau accordion.
  - Skrip pihak ketiga (analytics) dimuat `defer`/async.
- Tes dengan PageSpeed Insights dan Lighthouse pada versi mobile sebelum rilis dan setiap perubahan besar.
- Hindari konten penting yang hanya muncul setelah klik JavaScript (misalnya tab yang isinya dimuat belakangan); pastikan teks ada di HTML awal.

---

## 8. Structured Data (JSON-LD)

Prioritas implementasi:

| Prioritas | Schema | Halaman | Catatan |
|---|---|---|---|
| 1 | `Organization` + `WebSite` | semua (di layout) | nama, URL, logo, nomor kontak, tautan media sosial |
| 1 | `BreadcrumbList` | semua selain beranda | harus sama dengan breadcrumb yang terlihat |
| 1 | `Product` | detail produk | nama, gambar, deskripsi, brand. Tambahkan `offers` (harga, mata uang IDR) **hanya jika harga tetap dan tampil di halaman** |
| 1 | `Article` / `BlogPosting` | detail blog | headline, gambar, `datePublished`, `dateModified`, penulis |
| 2 | `LocalBusiness` | kontak dan tentang | hanya jika ada alamat usaha yang nyata; alamat dan jam kerja harus sama dengan halaman |
| 3 (opsional) | `FAQPage` | beranda, FAQ | lihat bagian 2: tidak menghasilkan rich result lagi |

Aturan:
- Data di JSON-LD **harus cocok dengan isi yang terlihat** di halaman. Markup yang menyesatkan bisa membuat halaman kehilangan kelayakan rich result.
- Jangan mengarang `aggregateRating` atau ulasan. Pakai hanya jika ada ulasan nyata yang tampil di halaman.
- Halaman daftar produk (`/produk/`) tidak diberi schema `Product`; cukup di halaman detail.
- Validasi dengan Rich Results Test dan Schema Markup Validator, lalu pantau di Search Console.

---

## 9. AEO dan GEO (Jawaban AI dan Mesin Pencari)

Tidak ada cara yang bisa menjamin dikutip AI. Yang bisa dilakukan adalah membuat konten mudah dipahami, dipercaya, dan dikutip.

1. **Jawaban dulu.** Mulai tiap artikel dan FAQ dengan jawaban langsung 40 sampai 60 kata, lalu rinciannya.
2. **Pertanyaan nyata.** Heading ditulis seperti pertanyaan yang diketik orang: "Berapa minimal order souvenir custom?", "Berapa lama produksi seminar kit?".
3. **Fakta spesifik.** Angka, rentang harga, bahan, ukuran, waktu produksi, dan syarat pemesanan ditulis jelas. Konten yang samar jarang dikutip.
4. **Entitas jelas.** Nama brand, alamat, nomor, pendiri, dan tahun berdiri konsisten di seluruh situs dan di profil luar (Google Business Profile, media sosial, direktori).
5. **Penulis dan keahlian.** Setiap artikel punya penulis dengan profil singkat (pengalaman di bidang souvenir/merchandise). Halaman Tentang memuat bukti pengalaman.
6. **Tabel dan daftar** untuk perbandingan (sablon vs bordir, harga per kuantitas) karena mudah diekstrak.
7. **Bukti sosial nyata.** Testimoni dengan nama dan perusahaan asli, foto hasil pekerjaan, dan studi kasus.
8. **Crawlable.** Jangan blokir bot penting di `robots.txt` jika ingin tampil di mesin pencari dan asisten AI. File `llms.txt` bersifat opsional; manfaatnya belum terbukti, jadi jangan dijadikan prioritas.
9. Perbarui artikel yang kedaluwarsa dan isi `dateModified` dengan jujur hanya ketika isi benar-benar diubah.

---

## 10. Off-Page dan SEO Lokal

- **Google Business Profile**: buat dan verifikasi jika ada alamat usaha atau area layanan. Isi kategori, jam kerja, foto produk, nomor WA, tautan website, dan minta ulasan dari pelanggan nyata.
- **Direktori dan marketplace**: daftarkan nama, alamat, dan nomor yang sama persis di direktori bisnis yang relevan. Jika berjualan di marketplace, tautkan ke website.
- **Backlink yang realistis**: situs klien (halaman "partner" atau testimoni dengan izin), komunitas event organizer, portal UMKM, media lokal, artikel tamu di blog event atau HR, pemasok bahan. Hindari membeli tautan massal.
- **Media sosial**: gunakan untuk menampilkan foto hasil produksi dan proses; tautkan ke halaman produk. Pengaruh langsung ke peringkat kecil, tetapi membantu pengenalan brand dan lalu lintas.
- **Pencarian merek**: pastikan "Seminarkit" mengarah ke website, GBP, dan profil sosial. Pilih nama brand yang konsisten penulisannya (satu kata, huruf kapital di awal).

---

## 11. Pengukuran

### 11.1 Alat
- Google Search Console (verifikasi domain, kirim sitemap) dan Bing Webmaster Tools.
- Google Analytics 4 (atau alat analitik yang ringan dan ramah privasi).
- PageSpeed Insights / Lighthouse untuk performa.

### 11.2 Konversi WhatsApp
Karena tidak ada database, ukur konversi lewat event klik:
- Beri atribut `data-wa-source` pada semua tombol WA (misalnya `hero`, `produk-card`, `produk-detail`, `float`, `form-kontak`, `cta`).
- Kirim event (misalnya `click_whatsapp`) ke GA4 dengan parameter sumber dan nama produk saat tombol diklik atau form dikirim.
- Tulis di Kebijakan Privasi bahwa situs memakai analitik.

### 11.3 KPI
| Indikator | Dilihat di | Frekuensi |
|---|---|---|
| Halaman terindeks | Search Console → Pages | mingguan di bulan pertama, lalu bulanan |
| Impresi, klik, CTR, posisi per query | Search Console → Performance | mingguan |
| Klik WhatsApp per sumber | GA4 | mingguan |
| LCP, INP, CLS | Search Console → Core Web Vitals, PageSpeed | bulanan |
| Backlink baru | Search Console → Links | bulanan |
| Keyword inti: posisi | Search Console | bulanan |

Peringkat butuh waktu. Untuk domain baru, yang wajar dipantau di bulan 1 sampai 3 adalah indeksasi, impresi, dan query yang mulai muncul; bukan posisi puncak. Jangan menetapkan target peringkat pasti tanpa data kompetitor.

---

## 12. Peta Jalan 90 Hari

**Sebelum rilis (minggu 0)**
- [ ] Validasi keyword (bagian 3.4) dan kunci pemetaan keyword per halaman.
- [ ] Siapkan konten asli: 3 produk (deskripsi, spesifikasi, harga, 4 foto masing-masing), 4 artikel, testimoni, FAQ, foto galeri.
- [ ] Title dan meta description unik di semua halaman.
- [ ] Sitemap, robots.txt, canonical, `lang="id"`, Open Graph, favicon.
- [ ] JSON-LD prioritas 1 dan validasi.
- [ ] Tes PageSpeed mobile, perbaiki sampai target.
- [ ] Pelacakan klik WhatsApp terpasang.

**Minggu 1 sampai 2 (setelah rilis)**
- [ ] Verifikasi Search Console dan Bing, kirim sitemap, minta indeksasi halaman utama.
- [ ] Buat dan verifikasi Google Business Profile (jika memenuhi syarat).
- [ ] Daftarkan profil media sosial dan direktori dengan NAP identik.

**Bulan 1**
- [ ] Publikasikan 2 artikel baru dan tautkan internal.
- [ ] Minta 3 sampai 5 testimoni/ulasan nyata dari pelanggan.
- [ ] Tinjau query pertama di Search Console; sesuaikan title halaman yang impresinya tinggi tetapi CTR rendah.

**Bulan 2**
- [ ] 2 artikel baru (satu musiman).
- [ ] Mulai membangun backlink: klien, komunitas, media lokal.
- [ ] Perluas halaman produk dengan FAQ per produk (konten, bukan sekadar schema).

**Bulan 3**
- [ ] Audit: halaman yang tidak terindeks, query yang naik, artikel yang perlu diperbarui.
- [ ] Tambah halaman baru berdasarkan query nyata (misalnya halaman per kota atau per jenis acara, hanya jika ada permintaan dan isi unik).
- [ ] Tetapkan target kuartal berikutnya berdasarkan data, bukan tebakan.

---

## 13. Hal yang Perlu Dikonfirmasi

1. Tiga produk final (nama, spesifikasi, harga, minimal order, waktu produksi).
2. Kota atau wilayah layanan, dan apakah ada alamat usaha untuk Google Business Profile.
3. Domain final dan tempat hosting.
4. Nama penulis blog dan bukti pengalaman usaha (tahun berdiri, klien yang boleh disebut).
5. Siapa kompetitor utama yang ingin dikalahkan, untuk dianalisis di bagian 3.4.
6. Apakah akan memakai GA4 atau alat analitik lain.
