# **BE-VideoEdukasi**

## **Project Overview**

**BE-VideoEdukasi** adalah backend API untuk platform video edukasi daring. Proyek ini dibangun menggunakan **Express.js** dengan basis data **MySQL** dan menyediakan fitur manajemen akun, video, komentar, serta autentikasi dan otorisasi berbasis token JWT.

Platform ini dirancang untuk mendukung pembelajaran daring dengan memungkinkan pengguna untuk mengunggah, melihat, dan memberikan tanggapan terhadap video pendidikan berdasarkan kategori tingkat pendidikan dan mata pelajaran.

---

## **Features**

- **Authentication & Authorization**:
  - Login dengan **JWT token**.
  - Middleware untuk autentikasi dan peran pengguna (`tutor`, `student`).
- **Account Management**:
  - CRUD akun pengguna.
  - Pengunggahan foto profil.
- **Video Management**:
  - CRUD video dengan unggahan file video dan thumbnail.
  - Filter berdasarkan tingkat pendidikan dan mata pelajaran.
  - Fitur like, dislike, dan view counter.
- **Comment Management**:
  - CRUD komentar pada video.
  - Komentar hanya dapat dihapus oleh pemilik atau admin.
- **API Documentation**:
  - Dokumentasi Swagger UI tersedia di `/api-docs`.

---

## **Getting Started**

### **1. Prerequisites**

Pastikan Anda memiliki perangkat lunak berikut:

- **Node.js** (v14 atau lebih baru)
- **MySQL Server**

### **2. Installation**

1. Clone repository:

   ```bash
   git clone https://github.com/barudak-developer-EVOS/BE-VideoEdukasi.git
   cd BE-VideoEdukasi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Konfigurasi file `.env` untuk pengaturan database dan JWT:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=db_edukasivid
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Jalankan migrasi database (opsional jika Anda menggunakan ORM seperti Sequelize).

5. Jalankan server dalam mode pengembangan:

   ```bash
   npm run dev
   ```

6. Jalankan server dalam mode produksi:

   ```bash
   npm start
   ```

7. Jalankan swagger dalam mode pengembangan:
   ```bash
   npm run swagger
   ```

---

## **API Documentation**

API lengkap didokumentasikan menggunakan **Swagger** dan dapat diakses di:

```
http://localhost:3000/api-docs
```

Contoh respons untuk endpoint:

### **1. Login**

**Endpoint**: `POST /auth/login`  
**Request Body**:

```json
{
  "email": "example@gmail.com",
  "password": "yourpassword"
}
```

**Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **2. Get All Videos**

**Endpoint**: `GET /getAll-videos`  
**Headers**:

```json
{
  "Authorization": "Bearer <YOUR_JWT_TOKEN>"
}
```

**Response**:

```json
[
  {
    "video_id": 1,
    "title": "Matematika Dasar",
    "description": "Belajar matematika untuk SD",
    "educationLevel": "SD",
    "subject": "Matematika",
    "views": 200,
    "likes": 50,
    "dislikes": 2
  }
]
```

---

## **Project Structure**

```plaintext
BE-VideoEdukasi/
├── server/
│   ├── controllers/       # Logic untuk handling request
│   ├── middleware/        # Middleware seperti autentikasi dan validasi
│   ├── models/            # Model database
│   ├── routes/            # Routing untuk API
│   ├── config/            # Konfigurasi aplikasi (database, swagger)
│   ├── uploads/           # Penyimpanan file video dan thumbnail
│   └── app.js             # Konfigurasi server Express
├── package.json           # Dependency dan script aplikasi
├── .env                   # Konfigurasi lingkungan
├── README.md              # Dokumentasi proyek
└── server.js              # Entry point aplikasi
```

---

## **Contributing**

Kontribusi sangat diterima! Ikuti langkah-langkah berikut untuk berkontribusi:

1. Fork repositori ini.
2. Buat branch fitur baru:
   ```bash
   git checkout -b feature-name
   ```
3. Commit perubahan Anda:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push ke branch Anda:
   ```bash
   git push origin feature-name
   ```
5. Buat Pull Request di GitHub.

---

## **License**

Proyek ini dilisensikan di bawah **MIT License**. Lihat detailnya di [MIT License](https://spdx.org/licenses/MIT.html).

---

## **Contributors**

- **[Sastraaaa](https://github.com/Sastraaaa)**
