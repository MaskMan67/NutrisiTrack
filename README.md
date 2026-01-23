# 🔬 NutriScan

**Kalkulator Gizi & Analisis Zat Aditif Berbasis Sains**

Aplikasi web edukatif untuk membantu pengguna memahami kebutuhan nutrisi harian, menganalisis zat gizi makro, dan mengenali zat aditif makanan beserta dampak kesehatannya.

---

## ✨ Fitur Utama

### � Kalkulator Gizi
- **BMR** (Basal Metabolic Rate) - Mifflin-St Jeor Equation
- **TDEE** (Total Daily Energy Expenditure)
- **BMI** (Body Mass Index) dengan indikator visual

### 🍽️ Pelacak Makanan
- 72+ makanan Indonesia dengan data nutrisi akurat
- Kategorisasi per waktu makan (Sarapan, Siang, Malam, Snack)
- Grafik distribusi makronutrien (Chart.js)

### ⚗️ Analisis Zat Aditif
- 35+ zat aditif dengan informasi lengkap:
  - Rumus kimia & struktur molekul
  - Fungsi dalam makanan
  - Dampak kesehatan
  - Level keamanan (Aman/Perhatian/Bahaya)

### � Hidrasi Harian
- Target 8 gelas air per hari
- Animasi visual level air
- Progress bar tracking

### 🔥 Gamifikasi Streak
- Sistem streak harian
- Level pengguna (Pemula → Legenda)
- Pesan motivasi

### 📱 PWA Ready
- Installable (Android & iOS)
- Offline support
- Responsive design

---

## �️ Teknologi

| Kategori | Teknologi |
|----------|-----------|
| Frontend | HTML5, CSS3 (Glassmorphism), JavaScript ES6+ |
| Arsitektur | Modular (6 JS modules) |
| Chart | Chart.js |
| PWA | Service Worker, Web Manifest |
| Data | LocalStorage |

---

## 📁 Struktur Proyek

```
NutriScan/
├── index.html              # Main HTML
├── css/
│   └── style.css           # Design system
├── js/
│   ├── storage.js          # LocalStorage management
│   ├── calculator.js       # BMR/TDEE/BMI calculations
│   ├── foodDatabase.js     # Indonesian food database
│   ├── hydration.js        # Water tracker
│   ├── streak.js           # Daily streak system
│   └── app.js              # Main app coordinator
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── manifest.json           # PWA manifest
└── service-worker.js       # Offline caching
```

---

## 🚀 Cara Menjalankan

1. Clone repository ini
2. Jalankan local server:
   ```bash
   npx -y serve -l 3000
   ```
3. Buka `http://localhost:3000`

---

## � Referensi Ilmiah

- **BMR**: Mifflin MD, St Jeor ST, et al. (1990). "A new predictive equation for resting energy expenditure in healthy individuals"
- **BMI Categories**: WHO Classification
- **Data Nutrisi**: TKPI (Tabel Komposisi Pangan Indonesia) - Kemenkes RI
- **Zat Aditif**: European Food Safety Authority (EFSA) - E-number Database

---

## ⚠️ Disclaimer

Aplikasi ini bersifat **edukatif** dan **bukan pengganti konsultasi medis profesional**. Untuk masalah kesehatan serius, selalu konsultasikan dengan dokter atau ahli gizi.

---

## � Lisensi

Dibuat untuk Tugas Akhir SMA | © 2026 NutriScan
