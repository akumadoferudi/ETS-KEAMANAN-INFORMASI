# ETS KEAMANAN INFORMASI D

Achmad Ferdiansyah
<br>
5025201245
<br>
### Untuk Source Code bisa buka di src/controller.js

## Cara penggunaan
*note: Sebelum clone pastikan download git, postman, nodeJS, dan NPM

1. Cek versi nodeJS dan NPM (sudah terinstall atau belum)
```
node -v & npm -v
```

2. Clone repo
```
git clone https://github.com/akumadoferudi/ETS-KEAMANAN-INFORMASI.git
```

3. Masuk ke directory
```
cd ./ETS-KEAMANAN-INFORMASI
```

4. Install dependency yg diperlukan
```
npm install
```

5. Jalankan server
```
npm run dev
```

6. Buka postman (untuk menjalankan fungsi controller dan tes API)

7.1. Masukkan urlnya untuk encrypt: <baseURL>/encrypt
8.1. Lalu isi body key dan message (masing-masing harus 8 karakter) dan jalankan
```
{
  "key": [key_kalian],
  "message": [message_kalian]
}
```

7.2. Masukkan urlnya untuk decrypt: <baseURL>/decrypt ini masih belum bisa
8.2. Lalu isi body key dan cyphertext (masing-masing harus 8 karakter) dan jalankan
```
{
  "key": [key_kalian],
  "message": [cyphertext_kalian]
}
```
