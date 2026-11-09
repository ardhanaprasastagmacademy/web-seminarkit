# DESIGN.md — Seminarkit

Sistem desain untuk website souvenir kantor Seminarkit (Astro, CSS native, vanilla JS).
Karakter: **elegan, tenang, premium**. Seperti katalog cetak untuk klien korporat, bukan template landing page.

---

## 1. Prinsip

1. **Dua warna, dipakai tegas.** Biru tua dan cornsilk. Selebihnya netral. Kesan premium datang dari pembatasan, bukan dari tambahan efek.
2. **Tipografi yang bekerja.** Huruf serif untuk judul, sans-serif bersih untuk teks. Hierarki dibuat dengan ukuran, berat, dan jarak, bukan dengan dekorasi.
3. **Ruang kosong lapang.** Padding section besar, teks tidak dijejalkan.
4. **Garis tipis, bukan bayangan.** Pemisah memakai garis 1px. Tidak ada kartu melayang dengan shadow tebal.
5. **Foto produk adalah bintangnya.** Layout memberi ruang untuk foto, bukan ikon.
6. **Tanpa ikon hiasan.** Lihat bagian 11.

---

## 2. Warna

Catatan: warna CSS bernama `darkblue` (#00008B) terlalu jenuh dan terkesan "digital", kurang cocok untuk tampilan premium. Karena itu "darkblue" di desain ini memakai biru tua yang lebih dalam dan sedikit redup. Cornsilk memakai nilai standar.

| Token | Nilai | Pemakaian |
|---|---|---|
| `--navy-900` | `#07142F` | footer, overlay, latar paling gelap |
| `--navy-700` | `#0B1F4D` | **warna utama (darkblue)**: navbar, tombol utama, banner, section gelap |
| `--navy-500` | `#26407A` | hover tombol, tautan di latar terang |
| `--cream-100` | `#FFF8DC` | **cornsilk**: latar halaman, teks di atas biru |
| `--cream-50` | `#FFFCEB` | latar card dan form |
| `--cream-300` | `#EFE3B8` | garis pemisah, border di latar cornsilk |
| `--ink` | `#121A2E` | teks utama di latar terang |
| `--ink-soft` | `#4A5570` | teks sekunder, deskripsi, tanggal |
| `--brass` (opsional) | `#A8864A` | hanya untuk garis tipis dekoratif dan angka kecil; boleh dibuang |

Kontras (perkiraan): cornsilk di atas `--navy-700` sekitar 14:1; `--ink` di atas cornsilk sekitar 15:1; `--ink-soft` di atas cornsilk sekitar 6:1. Semua lolos WCAG AA.

Aturan pakai:
- Latar halaman: `--cream-100`. Selang-seling section: cornsilk dan `--cream-50`, dengan satu section gelap (`--navy-700`) per beberapa section agar ritme tidak monoton.
- Teks di latar biru selalu `--cream-100`. Teks di latar terang selalu `--ink`.
- Dilarang: gradasi ungu/pink, gradasi mesh, glow, neon, warna ketiga yang mencolok.

```css
:root {
  --navy-900: #07142F;
  --navy-700: #0B1F4D;
  --navy-500: #26407A;
  --cream-100: #FFF8DC;
  --cream-50: #FFFCEB;
  --cream-300: #EFE3B8;
  --ink: #121A2E;
  --ink-soft: #4A5570;
  --brass: #A8864A;

  --font-display: "Cormorant Garamond", "Times New Roman", serif;
  --font-body: "Hanken Grotesk", system-ui, sans-serif;

  --radius: 2px;
  --line: 1px solid var(--cream-300);
  --container: 1200px;
  --header-h: 76px;
  --ease: cubic-bezier(.22,.61,.36,1);
}
```

---

## 3. Tipografi

Dua keluarga font, di-host sendiri (`font-display: swap`), hanya bobot yang dipakai.

- **Judul**: Cormorant Garamond, bobot 500 dan 600.
- **Teks dan UI**: Hanken Grotesk, bobot 400, 500, 700.

| Peran | Ukuran (desktop / mobile) | Bobot | Line-height | Catatan |
|---|---|---|---|---|
| H1 hero | 64px / 40px | 600 | 1.05 | letter-spacing -0.01em |
| H1 page banner | 48px / 34px | 600 | 1.1 | |
| H2 section | 40px / 30px | 500 | 1.15 | |
| H3 card | 26px / 22px | 600 | 1.2 | |
| Eyebrow (label kecil) | 13px | 500 | 1.4 | huruf kapital, letter-spacing 0.14em |
| Body | 17px / 16px | 400 | 1.7 | maks. 68 karakter per baris |
| Harga | 22px | 600 (serif) | 1.2 | |
| Meta (tanggal, penulis) | 14px | 400 | 1.5 | `--ink-soft` |

Aturan: tidak ada teks rata kanan atau rata kiri-kanan untuk paragraf, tidak ada huruf kapital semua untuk judul panjang, tidak ada lebih dari satu eyebrow per section.

---

## 4. Layout dan Spasi

- Container: maks. 1200px, padding samping 24px (mobile 20px).
- Grid 12 kolom di desktop; gap 32px (mobile 20px).
- Skala spasi: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Padding vertikal section: 112px desktop, 72px mobile.
- Radius: **2px** untuk tombol, input, card. Foto tidak dibulatkan.
- Bayangan: tidak dipakai. Pengecualian: lightbox dan sidebar boleh memakai scrim gelap, bukan shadow.
- Breakpoint: 640px, 900px, 1200px.

---

## 5. Navbar (Desktop)

- Tinggi 76px, **latar `--navy-700`**, **teks `--cream-100`**, posisi sticky di atas.
- Kiri: logo. Tengah/kanan: menu Beranda, Tentang, Produk, Blog, Galeri, Kontak. Paling kanan: tombol "Pesan via WA" (latar cornsilk, teks biru tua).
- Teks menu: Hanken Grotesk 15px, bobot 500, jarak antar menu 36px.
- **Efek hover dan halaman aktif: hanya bold** (bobot 500 menjadi 700). Tanpa garis bawah, tanpa outline, tanpa kotak latar, tanpa perubahan warna.
- Agar tidak ada lonjakan lebar saat bold, lebar teks bold dicadangkan di awal:

```css
.nav-link {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  color: var(--cream-100);
  font-weight: 500;
  text-decoration: none;
  transition: font-weight .15s var(--ease);
}
.nav-link::after {
  content: attr(data-label);
  font-weight: 700;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
}
.nav-link:hover,
.nav-link[aria-current="page"] { font-weight: 700; }
.nav-link:focus { outline: none; }
```

- Aksesibilitas: untuk pengguna keyboard, fokus ditandai dengan `:focus-visible` berupa outline cornsilk 2px. Ini hanya muncul saat navigasi keyboard, tidak muncul saat hover atau klik mouse, jadi efek bold tetap bersih.
- Saat discroll, navbar tetap biru tua; tambahkan garis bawah 1px `rgba(255,248,220,.12)` agar terpisah dari konten.

---

## 6. Navbar (Mobile) — Sidebar

Di bawah 900px menu desktop disembunyikan dan diganti sidebar (drawer) dari sisi kanan.

**Bilah atas**: logo di kiri, tombol "Menu" di kanan. Tombol berupa dua garis tipis (CSS, 22px lebar, 1.5px tebal) dengan teks "Menu" di sampingnya. Tanpa ikon hamburger bawaan library.

**Sidebar**:
- Lebar `min(86vw, 340px)`, tinggi penuh layar, latar `--navy-700`, teks `--cream-100`.
- Masuk dari kanan dengan transisi 320ms (`transform: translateX(100%)` ke `0`).
- Di belakangnya scrim `rgba(7,20,47,.6)`; klik scrim menutup sidebar.
- Bagian atas sidebar: logo dan tombol teks **"Tutup"** (tanpa ikon X).
- Daftar menu vertikal, setiap item tinggi 56px, huruf serif 26px, dipisahkan garis 1px `rgba(255,248,220,.14)`.
- Item aktif dan item yang disentuh: **bold saja**, sama seperti desktop.
- Bagian bawah: tombol "Pesan via WA" lebar penuh (latar cornsilk, teks biru tua), lalu satu baris teks kecil jam kerja dan nomor WA.

**Perilaku (JS)**:
- Buka/tutup dengan `aria-expanded` dan `aria-controls` pada tombol Menu.
- Tutup dengan tombol Tutup, klik scrim, tombol Esc, atau saat salah satu link diklik.
- Saat terbuka: `body` tidak bisa discroll, fokus berpindah ke tombol Tutup, fokus dijaga di dalam sidebar (focus trap), dan konten di belakang diberi `inert`.
- Saat ditutup, fokus kembali ke tombol Menu.
- `prefers-reduced-motion`: transisi dimatikan.

---

## 7. Komponen

### Tombol
- **Primer** (latar terang): latar `--navy-700`, teks cornsilk, padding 16px 32px, radius 2px, bobot 500, huruf biasa (tidak kapital semua). Hover: latar `--navy-500`.
- **Primer terbalik** (latar biru): latar cornsilk, teks `--navy-700`. Hover: latar `--cream-50`.
- **Sekunder**: transparan, border 1px `--navy-700`, teks biru tua. Hover: latar `--navy-700`, teks cornsilk.
- **Tautan teks**: bobot 500, garis bawah 1px dengan `text-underline-offset: 6px`. **Tidak ada ikon panah atau karakter panah** di ujung tombol atau tautan. Kata kerja yang jelas sudah cukup: "Lihat produk", "Baca artikel".
- Transisi 200ms. Tidak ada efek naik-turun, bounce, atau glow.

### Hero
- Dua kolom di desktop: teks di kiri (eyebrow, H1, paragraf, dua tombol), satu foto produk besar di kanan dengan rasio 4:5.
- Latar cornsilk. Satu garis tipis `--brass` (opsional) 48px di atas eyebrow sebagai penanda.
- Mobile: foto di atas, teks di bawah.

### Page Banner dan Breadcrumb
- Latar `--navy-700`, tinggi 240px desktop / 200px mobile, teks cornsilk, H1 serif rata kiri.
- Breadcrumb di atas judul, ukuran 14px. **Pemisah memakai garis miring "/"**, bukan chevron. Halaman saat ini bobot 700, tidak bisa diklik.

### Card Produk
- Latar `--cream-50`, border 1px `--cream-300`, radius 2px, tanpa shadow.
- Foto rasio 4:5 di bagian atas, tanpa padding. Isi card: nama (H3 serif), deskripsi singkat (2 baris, dipotong), harga (serif), lalu dua tombol: "Detail produk" (sekunder) dan "Pesan WA" (primer).
- Hover: foto zoom halus 1.03 selama 500ms di dalam bingkai (overflow hidden). Tidak ada card yang terangkat.

### Card Blog
- Foto sampul rasio 3:2, tanggal (meta), judul serif, meta description 2 sampai 3 baris. Seluruh card bisa diklik. Hover: judul menjadi bold-ish (bobot 600 ke 700 dengan ruang dicadangkan) atau garis bawah tipis; pilih satu dan pakai konsisten.

### Section "Kenapa Pilih Kami" dan Keunggulan
- **Tanpa ikon.** Setiap poin memakai nomor serif besar ("01", "02", "03") berwarna `--brass` atau `--navy-500`, judul pendek, dan satu kalimat penjelasan.
- Layout daftar bergaris (satu baris per poin, dipisah garis 1px) atau grid dua kolom, bukan deretan tiga kotak identik dengan lingkaran ikon.

### Testimoni
- Satu kutipan besar bergantian (atau tiga kolom di desktop) dengan huruf serif miring 24px. Di bawahnya nama, jabatan, dan nama perusahaan.
- Tanpa foto avatar bulat dan tanpa bintang rating hiasan. Tanda kutip dibuat dengan tipografi (“ ”), bukan gambar.

### FAQ
- Accordion dengan garis pemisah 1px. Pertanyaan serif 22px. Indikator buka/tutup berupa tanda plus tipis yang dibuat dengan CSS (dua garis 1.5px) dan berputar menjadi minus. Bukan ikon panah.

### CTA
- Section gelap `--navy-700`, teks cornsilk, judul serif 40px rata tengah, satu paragraf pendek, satu tombol primer terbalik ("Konsultasi via WhatsApp"). Tidak ada ilustrasi dan tidak ada gradasi.

### Galeri
- Grid kolom dengan gap 12px (3 kolom desktop, 2 tablet, 2 mobile), rasio foto bervariasi tetapi rapi (masonry sederhana atau baris dengan tinggi sama).
- Tidak ada teks di atas foto. Hover: sedikit meredup (`opacity .9`) dan kursor `zoom-in`.
- **Lightbox**: scrim `rgba(7,20,47,.94)`, foto di tengah dengan batas 90vw x 86vh. Kontrol berupa teks: "Tutup", "Sebelumnya", "Berikutnya", dan penanda posisi kecil "3 / 12". Navigasi dengan panah keyboard dan Esc, geser jari di mobile, fokus terkunci di dalam lightbox.

### Detail Produk
- Kiri: foto utama (rasio 4:5) dan tiga thumbnail di bawahnya (rasio 1:1, border 1px; thumbnail aktif memakai border `--navy-700` 2px). Kanan: nama (H1), harga, deskripsi, daftar spesifikasi dalam tabel dua kolom bergaris tipis, tombol "Pesan via WA".
- Produk terkait memakai komponen card produk yang sama.

### Detail Blog
- Kolom artikel lebar maks. 720px, sidebar 320px dengan garis kiri 1px. Judul H1 serif, meta (tanggal dan penulis) dipisah garis miring. Foto utama lebar penuh kolom, foto pendukung di tengah artikel dengan keterangan kecil opsional.
- Sidebar "Artikel terkait": daftar judul bergaris tanpa thumbnail, tanggal di bawah judul.

### Form Kontak
- Input: latar `--cream-50`, border 1px `--cream-300`, radius 2px, tinggi 52px. Label di atas input (bukan placeholder saja), 14px bobot 500.
- Fokus: border `--navy-700` dan outline 2px `--navy-500` offset 2px. Error: teks dan border merah bata `#9B2C2C` dengan pesan teks di bawah field.

### Footer
- Latar `--navy-900`, teks cornsilk (kontras pada teks sekunder `rgba(255,248,220,.72)`). Empat kolom: brand dan deskripsi singkat, tautan cepat, produk, kontak dan jam kerja. Garis 1px di atas baris hak cipta.

### Tombol WhatsApp Mengambang
- Pojok kanan bawah, berbentuk pil persegi halus (radius 2px) bertuliskan "Pesan via WA", latar cornsilk, teks dan border biru tua. Tanpa animasi berdenyut. Di mobile ukurannya ringkas dan tidak menutupi tombol penting.

---

## 8. Foto dan Gambar

- Foto produk dengan latar bersih (putih gading, biru tua, atau cornsilk), pencahayaan lembut, sudut konsisten di semua produk.
- Rasio tetap: produk 4:5, blog 3:2, thumbnail 1:1, hero 4:5.
- Tanpa stok foto generik berisi orang tersenyum bersalaman. Pakai foto produk dan suasana acara yang nyata.
- Filter warna: jangan beri tint warna pada foto. Biarkan alami.
- Semua gambar punya `width`, `height`, dan `alt` yang deskriptif.

---

## 9. Gerak

- Durasi: 150 sampai 320ms untuk interaksi, 500ms untuk zoom foto, 400ms untuk muncul saat scroll.
- Animasi muncul saat scroll hanya berupa fade dan geser 12px ke atas, sekali saja, tidak diulang. Jangan dipakai pada konten yang dimuat belakangan lewat JS.
- Hormati `prefers-reduced-motion: reduce` (matikan semua transisi non-esensial).
- Tidak ada parallax, tilt, cursor khusus, partikel, atau marquee.

---

## 10. Aksesibilitas

- Kontras minimal AA pada semua teks.
- Semua elemen interaktif bisa dijangkau keyboard; `:focus-visible` selalu ada.
- Target sentuh minimal 44 x 44px.
- Sidebar dan lightbox memakai focus trap, `aria-modal`, dan mengembalikan fokus saat ditutup.
- Satu H1 per halaman; urutan heading tidak melompat.
- Link "Pesan WA" yang berulang diberi `aria-label` berisi nama produk.

---

## 11. Daftar Larangan (anti "AI slop")

Jangan gunakan:
- Emoji di mana pun (judul, tombol, daftar, footer).
- Karakter atau ikon panah (→, ›, ↗, chevron) pada tombol, tautan, breadcrumb, dan accordion.
- Ikon dalam lingkaran atau kotak berwarna di atas judul fitur; deretan tiga kartu identik dengan ikon.
- Gradasi ungu, biru-ke-pink, mesh gradient, glow, efek neon.
- Glassmorphism (blur transparan), bayangan besar yang lembut pada semua card, radius besar (16px ke atas) pada semuanya.
- Badge "Terbaik", "Terlaris", "Premium" yang ditaruh sembarangan, bintang rating hiasan, tanda centang hijau massal.
- Blob, gelombang pemisah section, pola titik, ilustrasi vektor generik, ikon "sparkle".
- Judul bergaya klise: "Solusi terbaik untuk kebutuhan Anda", "Kami hadir untuk...", "Tingkatkan bisnis Anda". Tulis kalimat spesifik tentang produk dan cara pemesanan.
- Teks tengah-rata untuk semua section. Variasikan: sebagian rata kiri dengan komposisi asimetris.

Boleh dipakai: garis tipis, nomor serif, tipografi besar, foto yang dipotong rapi, ruang kosong, kontras biru tua dan cornsilk.

---

## 12. Panduan Implementasi (Astro)

- Token pada bagian 2 ditaruh di `src/styles/tokens.css`, diimpor sekali di `BaseLayout.astro`.
- Gaya komponen memakai CSS scoped di tiap komponen `.astro`. Untuk elemen yang disuntik lewat JS (lightbox, sidebar), gunakan `:global()`.
- Navbar menjadi satu komponen `Navbar.astro` dengan atribut `data-label` pada tiap link (untuk teknik cadangan lebar bold) dan `aria-current="page"` ditentukan dari `Astro.url.pathname`.
- Font di-host di `public/fonts/` dan dimuat dengan `<link rel="preload">` untuk bobot yang dipakai di hero.
- Setelah halaman jadi, uji di lebar 360px, 768px, dan 1280px, serta uji sidebar dengan keyboard dan layar sentuh.
