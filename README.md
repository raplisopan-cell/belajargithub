# Belajar Express.js

Project pembelajaran **Express.js, Supabase, JWT, Prisma, dan Frontend Login**.

Project ini dibuat untuk latihan membuat API, autentikasi user, koneksi database, middleware, serta halaman login sederhana.

## 🚀 Teknologi

* Node.js
* Express.js
* Supabase
* PostgreSQL
* Prisma
* JWT
* bcryptjs
* HTML
* CSS
* JavaScript

## 📁 Struktur Project

```text
belajar-express/
│
├── middleware/
│   ├── authMiddleware.js
│   └── validationMiddleware.js
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   ├── index.html
│   ├── landing.html
│   ├── landing.css
│   ├── login.html
│   ├── style.css
│   ├── script.js
│   ├── success.html
│   ├── success.css
│   └── success.js
│
├── prisma.config.ts
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Instalasi

Clone repository:

```bash
git clone https://github.com/raplisopan-cell/belajargithub.git
```

Masuk ke folder project:

```bash
cd belajar-express
```

Install dependency:

```bash
npm install
```

## 🔐 Environment

Buat file `.env` di folder utama project.

```env
SUPABASE_URL=URL_SUPABASE_KAMU
SUPABASE_ANON_KEY=ANON_KEY_SUPABASE_KAMU
JWT_SECRET=SECRET_JWT_KAMU
```

> Jangan upload file `.env` ke GitHub karena berisi data rahasia.

## ▶️ Menjalankan Project

Jalankan server:

```bash
npm start
```

Server berjalan di:

```text
http://localhost:3000
```

## 🔑 API Authentication

### Register

```http
POST /register
```

Contoh request:

```json
{
  "username": "rapli999",
  "name": "Rapli Sopan",
  "email": "rapli999@gmail.com",
  "password": "123456"
}
```

### Login

```http
POST /login
```

Contoh request:

```json
{
  "email": "rapli999@gmail.com",
  "password": "123456"
}
```

Jika login berhasil, server memberikan **JWT token**.

### User Profile

```http
GET /me
```

Gunakan token JWT pada header:

```text
Authorization: Bearer TOKEN
```

Endpoint `/me` menggunakan middleware untuk memeriksa token sebelum memberikan data user.

## 📚 API Buku

### Semua buku

```http
GET /books
```

### Detail buku

```http
GET /books/:slug
```

Contoh:

```text
/books/laskar-pelangi
```

## 👤 API Author

### Semua author

```http
GET /authors
```

### Detail author

```http
GET /authors/:slug
```

## 🌐 Frontend

Project juga memiliki halaman frontend sederhana untuk login.

Buka:

```text
http://localhost:3000/login.html
```

Alur login:

```text
Login
  ↓
POST /login
  ↓
JWT Token
  ↓
GET /me
  ↓
Success Page
```

## 🛡️ Middleware

Project menggunakan middleware untuk:

* Validasi data register
* Verifikasi JWT
* Melindungi endpoint `/me`

File middleware:

```text
middleware/authMiddleware.js
middleware/validationMiddleware.js
```

## 🗄️ Database

Database menggunakan **Supabase PostgreSQL**.

Beberapa tabel yang digunakan:

```text
users
authors
books
```

Data password user disimpan dalam bentuk **hash menggunakan bcryptjs**, bukan password biasa.

## 📌 Fitur

* [x] Express.js server
* [x] Supabase database
* [x] API books
* [x] API authors
* [x] Register user
* [x] Login user
* [x] Password hashing
* [x] JWT authentication
* [x] Protected endpoint `/me`
* [x] Validation middleware
* [x] Frontend login
* [x] Success page
* [x] Git & GitHub

## 👨‍💻 Author

**Rapli Sopan**

Project latihan Express.js dan backend web.
