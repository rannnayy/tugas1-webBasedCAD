# Tugas 1 IF3260 Grafika Komputer

2D Web Based CAD (Computer-Aided Design)

## Deskripsi Singkat

Dalam tugas ini, dibuat sebuah aplikasi berbasis web untuk menggambar beberapa bentuk geometri dan manipulasinya. Kode dibuat dalam bahasa Javascript dan menggunakan API WebGL2. WebGL merupakan API Javascript untuk me-render grafika 2 dan 3 dimensi menggunakan browser. Kami menggunakan browser Google Chrome dengan mengaktifkan WebGL developer extension yang telah tersedia.

## Cara Menjalankan

- Clone repository ini
- _Double click_ atau buka index.html pada browser yang mendukung WebGL developer extension

## Model

- Garis (Line)
  - Metode spesial: Ubah panjang
    - Drag and Drop
    - Kolom `Change Line Length`
      - Arahkan kursor pada garis yang hendak diubah panjangnya hingga muncul titik hitam pada garis tersebut
      - Ubah nilai kolom masukan
      - Enter
- Persegi (Square)
  - Metode spesial: Ubah panjang sisi
    - Drag and Drop
    - Kolom `Change Sides Length`
      Sama dengan garis
- Persegi panjang (Rectangle)
  - Metode spesial: Ubah lebar dan panjang
    - Drag and Drop
    - Kolom `Change Sides Length`
      Mirip dengan garis dan persegi
- Poligon (Polygon)
  - Metode spesial: Penambahan dan penghapusan titik sudut
    - Klik tombol tambah/hapus vertex
    - Klik titik sudut yang hendak dihapus atau klik lokasi untuk meletakkan titik sudut baru

Semua model dapat dimodifikasi (memindahkan salah satu titik sudut ke posisi lain) dengan cara mengklik titik sudut yang dimaksud, menggeser kursor, lalu mengklik pada posisi tujuan.

## Transformasi Geometri

- Translasi
  - Klik tombol `Translation`
  - Klik di dalam area bangun hingga muncul titik hitam di pusat
  - Geser kursor
  - Klik untuk meletakkan bangun pada posisi tersebut
- Dilatasi
  - Klik tombol `Dilatation`
  - Klik pada salah satu titik sudut hingga muncul titik hitam pada titik tersebut
  - Geser kursor
  - Klik untuk berhenti dilatasi
- Rotasi
  - Klik tombol `Rotation`
  - Klik pada salah satu titik sudut hingga muncul titik hitam pada titik tersebut
  - Geser kursor ke arah berlawanan dengan arah putar
  - Klik untuk berhenti merotasi
- Shear
  - Arahkan kursor pada bangun yang hendak di-_shear_ hingga muncul titik hitam pada bangun tersebut
  - Klik tombol `Shear`
  - Klik titik di sekitar bangun untuk melakukan _shear_

## Pewarnaan

1. Membuat bangun dengan warna spesifik
   - Sebelum membuat bangun, pilih warna
   - Buat bangun
2. Mengubah warna bangun
   - Pilih warna pada kolom masukan
   - Klik `Color`
   - Klik area dalam bangun mendekati titik tengah yang hendak diubah warnanya
3. Mengubah warna titik sudut pada bangun
   - Pilih warna pada kolom masukan
   - Klik `Color`
   - Klik area dekat titik sudut bangun yang hendak diubah warnanya

## Penyimpanan

1. Save
   - Arahkan kursor pada bangun yang hendak disimpan hingga muncul titik hitam pada bangun tersebut
   - Klik `Save`
2. Load
   - Klik `Choose file`
   - Pilih model yang hendak diunggah
   - Klik `Load`
   - Geser kursor di area kanvas

## Fitur Lanjutan

1. Convex Hull
2. Animasi Rotasi

## Dibuat Oleh:

- Bariza Haqi (13520018)
- Maharani Ayu Putri Irawan (13520019)
- Gede Sumerta Yoga (13520021)
