# NutriScan 🔬

**Kalkulator Gizi & Zat Aditif Berbasis Sains**

NutriScan adalah aplikasi web interaktif yang membantu pengguna memantau asupan nutrisi harian dan menganalisis kandungan zat aditif dalam makanan. Proyek ini dibuat sebagai Tugas Akhir SMA untuk materi Biologi (Sistem Pencernaan & Nutrisi) dan Kimia (Zat Aditif).

## ✨ Fitur Utama

- **👤 Profil Pengguna Cerdas**: Menghitung kebutuhan kalori harian (BMR & TDEE) berdasarkan umur, berat, tinggi, dan aktivitas.
- **⚖️ Kalkulator BMI**: Menghitung Indeks Massa Tubuh dengan indikator visual dan tips kesehatan.
- **🍽️ Database Makanan Lokal**: Input makanan Indonesia (Nasi, Tempe, Ayam, dll) dengan data nutrisi lengkap.
- **⚗️ Analisis Zat Aditif Detail**: Deteksi otomatis kode E-number dengan **modal interaktif** yang menampilkan rumus kimia, fungsi, dan dampak kesehatan (Aman/Perhatian/Bahaya).
- **🔥 Streak Harian**: Motivasi konsistensi mencatat nutrisi dengan sistem streak harian.
- **💧 Water Tracker**: Memantau hidrasi harian dengan animasi gelas interaktif.
- **📊 Ringkasan Nutrisi**: Grafik progres kalori, protein, lemak, dan karbohidrat real-time.

## 📱 Dukungan PWA & Mobile

Aplikasi ini adalah **Progressive Web App (PWA)**. Anda dapat menginstalnya di HP (Android/iOS) agar terlihat seperti aplikasi native:
- **Android**: Buka di Chrome -> Titik tiga -> "Install app" atau "Tambahkan ke Layar Utama".
- **iOS**: Buka di Safari -> Share -> "Add to Home Screen".

## 🚀 Cara Menggunakan

1.  Buka aplikasi di browser (Desktop/Mobile).
2.  Isi data diri di panel **Profil Pengguna** untuk mendapatkan target nutrisi harian.
3.  Gunakan fitur **Tambah Makanan** untuk mencari dan memasukkan menu harian Anda.
4.  Lihat analisis gizi dan klik pada **badge zat aditif** untuk melihat detail kimia & efek sampingnya.
5.  Jangan lupa catat minum air di panel **Hidrasi Harian**!

## 🛠️ Teknologi

- **HTML5**: Struktur semantik.
- **CSS3**: Styling modern (Glassmorphism, Gradient, Dark Mode) tanpa framework.
- **JavaScript**: Logika kalkulasi, interaktivitas DOM, dan **LocalStorage** untuk mnyimpan data pengguna tanpa database server.
- **PWA**: Manifest & Service Worker untuk kemampuan install dan cache offline.

## 📦 Instalasi & Pengembangan

Cukup clone repository ini dan buka `index.html` di browser Anda. Tidak perlu instalasi server atau dependensi (Node.js/Python) karena ini adalah aplikasi *Static Web* murni.

```bash
git clone https://github.com/username-anda/NutriScan.git
cd NutriScan
# Buka index.html di browser
```

## 📝 Lisensi

Dibuat untuk tujuan pendidikan.
