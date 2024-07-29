## Start

Petunjuk ini akan membuat Anda mendapatkan salinan proyek dan berjalan di mesin lokal Anda untuk tujuan pengembangan dan pengujian.

### Setup

Hal-hal apa saja yang Anda perlukan untuk menginstal perangkat lunak dan cara menginstalnya.

```
NPM / Yarn
Code Editor (This app was built on VSCode)
Git
Cloudinary Account
OAuth 2.0 Clients (Google API)
```

**Cloudinary**

Cloudinary adalah solusi manajemen gambar dan video menyeluruh untuk situs web dan aplikasi seluler, yang mencakup segala hal mulai dari pengunggahan gambar dan video, penyimpanan, manipulasi, optimalisasi hingga pengiriman.

Semua gambar dan/atau video yang diunggah dalam aplikasi ini disimpan di akun cloudinary. Anda harus membuat akun jika ingin menguji fungsi ini secara lokal dengan benar.

*Mempersiapkan:*

1. Buat akun di [Cloudinary](https://cloudinary.com/).

2. Navigasikan ke dasbor Cloudinary Anda untuk menemukan variabel yang nantinya perlu Anda tambahkan ke file ```.env``` (Lihat bagian Cara Menggunakan di bawah)


**Google API (OAuth 2.0)**

Google API adalah antarmuka pemrograman aplikasi yang dikembangkan oleh Google yang memungkinkan komunikasi dengan Layanan Google dan integrasinya ke layanan lain.

Proses autentikasi aplikasi ini menggunakan [Lokal](http://www.passportjs.org/packages/passport-local/) dan [Strategi Google](http://www.passportjs.org/docs/google/) Paspor .

Agar Google dapat mengidentifikasi Passport aplikasi mana yang berinteraksi dengan API mereka, Anda perlu mendapatkan clientID dan clientSecret di [Google Developers Console](https://console.developers.google.com). Anda dapat membaca [panduan] ini(https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret) untuk mengetahui langkah-langkahnya.


### Menginstal

Untuk mendapatkan proyek ini di mesin lokal Anda, Anda harus mengkloningnya terlebih dahulu menggunakan perintah `git clone`.

```
git clone https://github.com/sudyhardy/nodevolt.git
```

Menjalankan ini di terminal Anda akan memastikan Anda menerima versi terbaru dengan semua perubahannya.

Setelah Anda mengkloningnya, instal semua dependensi menggunakan:

```
npm install
```

Ini akan mengambil semua dependensi yang diperlukan yang disebutkan dalam file [package.json](https://github.com/reMRKableDev/OnLearn/blob/main/package.json).

### Cara Penggunaan:

Setelah dependensi diinstal, pastikan untuk menyertakan file ```.env``` dengan variabel lingkungan yang diperlukan:

```
LOCAL_MONGO_URI = <mongodb uri masuk ke sini...>
SESSION_SECRET = <rahasia sesi ada di sini...>
PORT = <nomor port ada di sini...>

DUMMY_PASSWORD = <pwd tiruan khusus ada di sini...>
DUMMY_EDIT_PASSWORD_WEAK = <pwd tiruan lemah khusus ada di sini...>
DUMMY_EDIT_PASSWORD_STRONG = <pwd tiruan kuat khusus ada di sini...>

GOOGLE_CLIENT_ID = <ID klien Google Anda ada di sini...>
GOOGLE_CLIENT_SECRET = <rahasia klien Google Anda ada di sini...>

CLOUDINARY_NAME = <nama awan Anda ada di sini...>
CLOUDINARY_KEY = <kunci cloudinary Anda ada di sini...>
CLOUDINARY_SECRET = <rahasia keruh Anda ada di sini...>
```

Ketika semuanya sudah siap, aplikasi dapat dijalankan secara lokal menggunakan:

```
npm run dev
```

## Tes Run 🧪

Kerangka pengujian yang digunakan adalah Jest. Pengujian dapat dijalankan dengan menggunakan perintah:

```
npm test

ATAU

npm run test
```

Untuk menjalankan tes dan melihat cakupan kode. Jalankan menggunakan perintah:
```
npm run coverage
```
