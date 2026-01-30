/**
 * NutriScan - Food Database Module
 * Indonesian foods with nutritional data (per 100g)
 * Data sources: Kemenkes RI, TKPI (Tabel Komposisi Pangan Indonesia)
 * Last updated: January 2026
 */

/**
 * Food Categories
 */
export const FOOD_CATEGORIES = [
    { id: 'all', name: 'Semua', icon: '🍽️' },
    { id: 'pokok', name: 'Makanan Pokok', icon: '🍚' },
    { id: 'hewani', name: 'Lauk Hewani', icon: '🍗' },
    { id: 'nabati', name: 'Lauk Nabati', icon: '🥜' },
    { id: 'sayuran', name: 'Sayuran', icon: '🥬' },
    { id: 'buah', name: 'Buah-buahan', icon: '🍎' },
    { id: 'masakan', name: 'Masakan Indonesia', icon: '🍛' },
    { id: 'snack', name: 'Jajanan & Snack', icon: '🍿' },
    { id: 'minuman', name: 'Minuman & Dairy', icon: '🥛' },
    { id: 'bumbu', name: 'Bumbu & Saus', icon: '🫙' },
    { id: 'fastfood', name: 'Fast Food', icon: '🍔' }
];

/**
 * Indonesian Food Database
 * Each entry contains:
 * - name: Food name in Indonesian
 * - cal: Calories (kcal) per 100g
 * - prot: Protein (g) per 100g
 * - fat: Fat (g) per 100g
 * - carb: Carbohydrates (g) per 100g
 * - per: Base weight (always 100g)
 * - category: Food category ID
 * - additives: Array of E-number additives
 */
export const foodDatabase = [
    // ========== MAKANAN POKOK ==========
    { name: "Nasi Putih", cal: 130, prot: 2.7, fat: 0.3, carb: 28, per: 100, category: 'pokok', additives: [] },
    { name: "Nasi Merah", cal: 110, prot: 2.5, fat: 0.8, carb: 23, per: 100, category: 'pokok', additives: [] },
    { name: "Mie Instan", cal: 436, prot: 9, fat: 17, carb: 63, per: 100, category: 'pokok', additives: ["E621", "E627", "E631", "E150c", "E501"] },
    { name: "Roti Tawar", cal: 265, prot: 9, fat: 3, carb: 49, per: 100, category: 'pokok', additives: ["E282", "E471"] },
    { name: "Kentang Rebus", cal: 87, prot: 1.9, fat: 0.1, carb: 20, per: 100, category: 'pokok', additives: [] },
    { name: "Singkong Rebus", cal: 154, prot: 1.4, fat: 0.3, carb: 36, per: 100, category: 'pokok', additives: [] },

    // ========== LAUK HEWANI ==========
    { name: "Ayam Goreng", cal: 246, prot: 27, fat: 14, carb: 0, per: 100, category: 'hewani', additives: [] },
    { name: "Ayam Bakar", cal: 190, prot: 28, fat: 8, carb: 0, per: 100, category: 'hewani', additives: [] },
    { name: "Telur Rebus", cal: 155, prot: 13, fat: 11, carb: 1.1, per: 100, category: 'hewani', additives: [] },
    { name: "Telur Dadar", cal: 196, prot: 14, fat: 15, carb: 1, per: 100, category: 'hewani', additives: [] },
    { name: "Ikan Goreng", cal: 199, prot: 22, fat: 11, carb: 2, per: 100, category: 'hewani', additives: [] },
    { name: "Ikan Bakar", cal: 166, prot: 25, fat: 7, carb: 0, per: 100, category: 'hewani', additives: [] },
    { name: "Udang Goreng", cal: 242, prot: 21, fat: 16, carb: 3, per: 100, category: 'hewani', additives: [] },
    { name: "Daging Sapi Rendang", cal: 193, prot: 22, fat: 10, carb: 4, per: 100, category: 'hewani', additives: [] },
    { name: "Bakso Sapi", cal: 202, prot: 10, fat: 12, carb: 8, per: 100, category: 'hewani', additives: ["E621", "E451"] },
    { name: "Sosis Sapi", cal: 228, prot: 12, fat: 18, carb: 4, per: 100, category: 'hewani', additives: ["E250", "E316", "E621", "E451"] },
    { name: "Nugget Ayam", cal: 245, prot: 13, fat: 15, carb: 15, per: 100, category: 'hewani', additives: ["E450", "E452", "E621", "E412"] },
    { name: "Kornet Sapi", cal: 220, prot: 14, fat: 18, carb: 2, per: 100, category: 'hewani', additives: ["E250", "E316"] },

    // ========== LAUK NABATI ==========
    { name: "Tempe Goreng", cal: 192, prot: 19, fat: 10, carb: 7.8, per: 100, category: 'nabati', additives: [] },
    { name: "Tahu Goreng", cal: 271, prot: 17, fat: 20, carb: 6, per: 100, category: 'nabati', additives: [] },
    { name: "Tempe Bacem", cal: 158, prot: 16, fat: 8, carb: 8, per: 100, category: 'nabati', additives: [] },
    { name: "Tahu Bacem", cal: 165, prot: 12, fat: 10, carb: 8, per: 100, category: 'nabati', additives: [] },
    { name: "Oncom Goreng", cal: 180, prot: 13, fat: 11, carb: 8, per: 100, category: 'nabati', additives: [] },

    // ========== SAYURAN ==========
    { name: "Sayur Bayam", cal: 23, prot: 2.9, fat: 0.4, carb: 3.6, per: 100, category: 'sayuran', additives: [] },
    { name: "Kangkung", cal: 19, prot: 2.6, fat: 0.2, carb: 3.1, per: 100, category: 'sayuran', additives: [] },
    { name: "Wortel", cal: 41, prot: 0.9, fat: 0.2, carb: 10, per: 100, category: 'sayuran', additives: [] },
    { name: "Brokoli", cal: 34, prot: 2.8, fat: 0.4, carb: 7, per: 100, category: 'sayuran', additives: [] },
    { name: "Sayur Sop", cal: 45, prot: 2, fat: 1.5, carb: 6, per: 100, category: 'sayuran', additives: [] },
    { name: "Capcay", cal: 55, prot: 3, fat: 2, carb: 7, per: 100, category: 'sayuran', additives: [] },
    { name: "Tumis Kacang Panjang", cal: 67, prot: 3, fat: 3, carb: 8, per: 100, category: 'sayuran', additives: [] },

    // ========== BUAH-BUAHAN ==========
    { name: "Pisang", cal: 89, prot: 1.1, fat: 0.3, carb: 23, per: 100, category: 'buah', additives: [] },
    { name: "Apel", cal: 52, prot: 0.3, fat: 0.2, carb: 14, per: 100, category: 'buah', additives: [] },
    { name: "Jeruk", cal: 47, prot: 0.9, fat: 0.1, carb: 12, per: 100, category: 'buah', additives: [] },
    { name: "Mangga", cal: 60, prot: 0.8, fat: 0.4, carb: 15, per: 100, category: 'buah', additives: [] },
    { name: "Pepaya", cal: 43, prot: 0.5, fat: 0.3, carb: 11, per: 100, category: 'buah', additives: [] },
    { name: "Semangka", cal: 30, prot: 0.6, fat: 0.2, carb: 8, per: 100, category: 'buah', additives: [] },
    { name: "Alpukat", cal: 160, prot: 2, fat: 15, carb: 9, per: 100, category: 'buah', additives: [] },
    { name: "Anggur", cal: 69, prot: 0.7, fat: 0.2, carb: 18, per: 100, category: 'buah', additives: [] },
    { name: "Salak", cal: 82, prot: 0.4, fat: 0, carb: 22, per: 100, category: 'buah', additives: [] },
    { name: "Durian", cal: 147, prot: 1.5, fat: 5, carb: 27, per: 100, category: 'buah', additives: [] },

    // ========== MASAKAN INDONESIA ==========
    { name: "Nasi Goreng", cal: 163, prot: 6, fat: 6, carb: 22, per: 100, category: 'masakan', additives: ["E621", "E150c"] },
    { name: "Nasi Uduk", cal: 175, prot: 4, fat: 6, carb: 27, per: 100, category: 'masakan', additives: [] },
    { name: "Nasi Kuning", cal: 180, prot: 4, fat: 5, carb: 30, per: 100, category: 'masakan', additives: ["E100"] },
    { name: "Sate Ayam (5 tusuk)", cal: 170, prot: 15, fat: 10, carb: 5, per: 100, category: 'masakan', additives: ["E621", "E150c"] },
    { name: "Gado-Gado", cal: 150, prot: 8, fat: 9, carb: 12, per: 100, category: 'masakan', additives: [] },
    { name: "Soto Ayam", cal: 75, prot: 6, fat: 4, carb: 4, per: 100, category: 'masakan', additives: [] },
    { name: "Rawon", cal: 85, prot: 8, fat: 5, carb: 2, per: 100, category: 'masakan', additives: [] },
    { name: "Gudeg", cal: 180, prot: 4, fat: 8, carb: 25, per: 100, category: 'masakan', additives: [] },
    { name: "Pecel Lele", cal: 195, prot: 18, fat: 12, carb: 3, per: 100, category: 'masakan', additives: [] },
    { name: "Mie Goreng", cal: 350, prot: 8, fat: 14, carb: 48, per: 100, category: 'masakan', additives: ["E621", "E627", "E150c"] },
    { name: "Mie Ayam", cal: 280, prot: 12, fat: 10, carb: 35, per: 100, category: 'masakan', additives: ["E621"] },
    { name: "Bakmi Goreng", cal: 320, prot: 10, fat: 12, carb: 42, per: 100, category: 'masakan', additives: ["E621"] },

    // ========== JAJANAN & SNACK ==========
    { name: "Cilok (5 butir)", cal: 180, prot: 2, fat: 4, carb: 35, per: 100, category: 'snack', additives: ["E621"] },
    { name: "Seblak", cal: 260, prot: 8, fat: 12, carb: 30, per: 100, category: 'snack', additives: ["E621", "E124"] },
    { name: "Batagor (5 pcs)", cal: 220, prot: 10, fat: 12, carb: 18, per: 100, category: 'snack', additives: ["E621"] },
    { name: "Risoles (2 pcs)", cal: 285, prot: 7, fat: 15, carb: 30, per: 100, category: 'snack', additives: [] },
    { name: "Pastel (2 pcs)", cal: 265, prot: 6, fat: 14, carb: 28, per: 100, category: 'snack', additives: [] },
    { name: "Donat", cal: 452, prot: 4, fat: 25, carb: 51, per: 100, category: 'snack', additives: ["E102", "E471", "E202"] },
    { name: "Martabak Manis (1 potong)", cal: 270, prot: 4, fat: 12, carb: 38, per: 100, category: 'snack', additives: ["E500", "E503", "E102"] },
    { name: "Pempek Lenjer", cal: 150, prot: 7, fat: 4, carb: 22, per: 100, category: 'snack', additives: ["E621"] },
    { name: "Keripik Kentang", cal: 536, prot: 7, fat: 35, carb: 53, per: 100, category: 'snack', additives: ["E621", "E627", "E631"] },
    { name: "Keripik Singkong", cal: 160, prot: 1, fat: 10, carb: 20, per: 100, category: 'snack', additives: ["E621", "E319"] },
    { name: "Biskuit Coklat", cal: 502, prot: 6, fat: 22, carb: 68, per: 100, category: 'snack', additives: ["E322", "E503", "E500"] },
    { name: "Permen Karet", cal: 360, prot: 0, fat: 0, carb: 90, per: 100, category: 'snack', additives: ["E133", "E102", "E129", "E422"] },

    // ========== MINUMAN & DAIRY ==========
    { name: "Susu UHT Coklat", cal: 80, prot: 3, fat: 2, carb: 12, per: 100, category: 'minuman', additives: ["E407", "E471"] },
    { name: "Susu Full Cream", cal: 61, prot: 3.2, fat: 3.3, carb: 4.8, per: 100, category: 'minuman', additives: [] },
    { name: "Yoghurt Buah", cal: 95, prot: 5, fat: 2, carb: 15, per: 100, category: 'minuman', additives: ["E124", "E440"] },
    { name: "Es Krim", cal: 207, prot: 3.5, fat: 11, carb: 24, per: 100, category: 'minuman', additives: ["E410", "E412", "E407"] },
    { name: "Minuman Soda", cal: 41, prot: 0, fat: 0, carb: 10, per: 100, category: 'minuman', additives: ["E150d", "E331", "E338", "E211"] },
    { name: "Jus Jeruk", cal: 45, prot: 0.7, fat: 0.2, carb: 10, per: 100, category: 'minuman', additives: [] },
    { name: "Teh Manis", cal: 40, prot: 0, fat: 0, carb: 10, per: 100, category: 'minuman', additives: [] },
    { name: "Kopi Susu", cal: 65, prot: 2, fat: 2, carb: 10, per: 100, category: 'minuman', additives: [] },

    // ========== BUMBU & SAUS ==========
    { name: "Saus Sambal", cal: 93, prot: 2, fat: 0.4, carb: 20, per: 100, category: 'bumbu', additives: ["E211", "E202", "E110", "E124"] },
    { name: "Kecap Manis", cal: 290, prot: 6, fat: 0.1, carb: 67, per: 100, category: 'bumbu', additives: ["E150c", "E621"] },
    { name: "Mayonaise", cal: 680, prot: 1, fat: 75, carb: 1, per: 100, category: 'bumbu', additives: ["E202", "E385"] },

    // ========== FAST FOOD ==========
    { name: "Pizza (1 slice)", cal: 266, prot: 11, fat: 10, carb: 33, per: 100, category: 'fastfood', additives: ["E450", "E282", "E322"] },
    { name: "Burger Daging", cal: 295, prot: 17, fat: 14, carb: 24, per: 100, category: 'fastfood', additives: ["E621", "E451", "E282"] },
    { name: "French Fries", cal: 312, prot: 3.4, fat: 15, carb: 41, per: 100, category: 'fastfood', additives: ["E330"] },
    { name: "Ayam Crispy", cal: 260, prot: 18, fat: 16, carb: 12, per: 100, category: 'fastfood', additives: ["E621", "E471"] }
];

/**
 * Complete Additive Information Database
 * Contains detailed info about food additives by E-number
 */
export const additiveDatabase = {
    // ========== PENGUAT RASA ==========
    "E621": {
        name: "Monosodium Glutamat (MSG)",
        formula: "C₅H₈NO₄Na",
        structure: "Garam natrium dari asam glutamat",
        desc: "Penguat rasa gurih (umami), ditemukan oleh ilmuwan Jepang Kikunae Ikeda tahun 1908.",
        impact: "Dapat menyebabkan 'Chinese Restaurant Syndrome' (sakit kepala, mual, keringat) pada orang sensitif. Dalam dosis tinggi bersifat neurotoksin eksitotoksik.",
        level: "caution"
    },
    "E627": {
        name: "Disodium Guanylate",
        formula: "C₁₀H₁₂N₅Na₂O₈P",
        structure: "Garam disodium dari guanosine-5'-monophosphate",
        desc: "Penguat rasa nukleotida, sering dikombinasikan dengan MSG untuk efek sinergis.",
        impact: "Dimetabolisme menjadi purin yang dapat meningkatkan kadar asam urat. Berbahaya bagi penderita gout/asam urat.",
        level: "caution"
    },
    "E631": {
        name: "Disodium Inosinate",
        formula: "C₁₀H₁₁N₄Na₂O₈P",
        structure: "Garam disodium dari inosinic acid",
        desc: "Penguat rasa yang berasal dari daging/ikan, memberikan rasa umami kuat.",
        impact: "Seperti E627, dapat meningkatkan kadar asam urat dan memicu serangan gout.",
        level: "caution"
    },

    // ========== PEWARNA ==========
    "E100": {
        name: "Kurkumin (Turmeric)",
        formula: "C₂₁H₂₀O₆",
        structure: "Diferuloylmethane - senyawa polifenol",
        desc: "Pewarna kuning alami dari kunyit. Juga memiliki sifat antioksidan.",
        impact: "Aman dikonsumsi. Bahkan memiliki manfaat anti-inflamasi dan antioksidan.",
        level: "safe"
    },
    "E102": {
        name: "Tartrazine",
        formula: "C₁₆H₉N₄Na₃O₉S₂",
        structure: "Pewarna azo sintetis - mengandung gugus azo (-N=N-)",
        desc: "Pewarna kuning lemon sintetis, banyak digunakan di makanan dan obat.",
        impact: "Penyebab reaksi alergi paling umum (ruam, asma, urtikaria). Terkait dengan penurunan jumlah sperma dan hiperaktivitas anak.",
        level: "danger"
    },
    "E110": {
        name: "Sunset Yellow FCF",
        formula: "C₁₆H₁₀N₂Na₂O₇S₂",
        structure: "Pewarna azo sulfonat - monoazo",
        desc: "Pewarna kuning-oranye sintetis untuk makanan dan minuman.",
        impact: "Dilarang di beberapa negara Eropa. Pemicu kuat hiperaktivitas (ADHD) pada anak dan reaksi pada penderita alergi aspirin.",
        level: "danger"
    },
    "E124": {
        name: "Ponceau 4R (Cochineal Red)",
        formula: "C₂₀H₁₁N₂Na₃O₁₀S₃",
        structure: "Pewarna azo trisulfonat",
        desc: "Pewarna merah strawberry sintetis untuk makanan, minuman, dan kosmetik.",
        impact: "Bersifat karsinogenik pada hewan uji. Dapat memicu asma, urtikaria, dan hiperaktivitas pada anak.",
        level: "danger"
    },
    "E129": {
        name: "Allura Red AC",
        formula: "C₁₈H₁₄N₂Na₂O₈S₂",
        structure: "Pewarna azo disulfonat",
        desc: "Pewarna merah sintetis pengganti amaranth (E123).",
        impact: "Dapat memicu reaksi alergi dan dikaitkan dengan perubahan perilaku pada anak-anak.",
        level: "caution"
    },
    "E133": {
        name: "Brilliant Blue FCF",
        formula: "C₃₇H₃₄N₂Na₂O₉S₃",
        structure: "Pewarna triarylmethane",
        desc: "Pewarna biru sintetis untuk makanan, minuman, dan obat-obatan.",
        impact: "Dicurigai neurotoksik dan sulit dicerna oleh tubuh. Dapat menyebabkan reaksi alergi.",
        level: "caution"
    },
    "E150c": {
        name: "Karamel Amonia",
        formula: "Polimer Kompleks",
        structure: "Produk reaksi Maillard antara gula dan amonia",
        desc: "Pewarna coklat tua untuk cola, kecap, dan saus.",
        impact: "Dapat mengandung 4-MEI (4-methylimidazole) yang bersifat karsinogenik pada hewan laboratorium.",
        level: "caution"
    },
    "E150d": {
        name: "Karamel Sulfit Amonia",
        formula: "Polimer Kompleks",
        structure: "Produk reaksi gula dengan amonia dan sulfit",
        desc: "Pewarna coklat tahan asam untuk minuman soda dan bir.",
        impact: "Kadar 4-MEI lebih tinggi dari E150c. Berpotensi memicu masalah pencernaan.",
        level: "caution"
    },

    // ========== PENGAWET ==========
    "E200": {
        name: "Sorbic Acid",
        formula: "C₆H₈O₂",
        structure: "Asam karboksilat tak jenuh - CH₃-CH=CH-CH=CH-COOH",
        desc: "Pengawet anti-jamur alami, pertama diisolasi dari buah rowan.",
        impact: "Aman untuk sebagian besar orang. Jarang menyebabkan reaksi alergi kulit.",
        level: "safe"
    },
    "E202": {
        name: "Potassium Sorbate",
        formula: "C₆H₇KO₂",
        structure: "Garam kalium dari asam sorbat",
        desc: "Pengawet anti-jamur yang larut air, sering digunakan dalam minuman.",
        impact: "Relatif aman, namun bisa menyebabkan reaksi alergi kulit pada sebagian kecil orang.",
        level: "safe"
    },
    "E211": {
        name: "Sodium Benzoate",
        formula: "C₇H₅NaO₂",
        structure: "Garam natrium dari asam benzoat - C₆H₅COONa",
        desc: "Pengawet untuk minuman asam, sambal, dan saus.",
        impact: "BAHAYA! Dapat bereaksi dengan Vitamin C (asam askorbat) membentuk BENZENA yang bersifat karsinogenik (penyebab leukemia). Juga pemicu hiperaktivitas.",
        level: "danger"
    },
    "E250": {
        name: "Sodium Nitrite",
        formula: "NaNO₂",
        structure: "Garam natrium dari asam nitrit - Na⁺ NO₂⁻",
        desc: "Pengawet daging olahan dan pemberi warna merah karakteristik.",
        impact: "SANGAT BAHAYA! Dapat bereaksi dengan amina membentuk NITROSAMIN (karsinogen kuat) terutama saat dimasak suhu tinggi. Juga mengurangi kapasitas oksigen darah.",
        level: "danger"
    },
    "E282": {
        name: "Calcium Propionate",
        formula: "C₆H₁₀CaO₄",
        structure: "Garam kalsium dari asam propionat - Ca(C₂H₅COO)₂",
        desc: "Anti-jamur untuk roti dan produk bakery.",
        impact: "Umumnya aman, namun dapat memicu migrain dan perubahan perilaku/iritabilitas pada anak-anak sensitif.",
        level: "safe"
    },
    "E316": {
        name: "Sodium Erythorbate",
        formula: "C₆H₇NaO₆",
        structure: "Stereoisomer dari sodium ascorbate",
        desc: "Antioksidan untuk mencegah oksidasi dan mempertahankan warna daging.",
        impact: "Relatif aman. Dapat menyebabkan gangguan pencernaan ringan jika dikonsumsi berlebihan.",
        level: "safe"
    },
    "E319": {
        name: "TBHQ (Tert-Butylhydroquinone)",
        formula: "C₁₀H₁₄O₂",
        structure: "Turunan hidroquinon dengan gugus tert-butil",
        desc: "Antioksidan sintetis untuk minyak dan lemak.",
        impact: "Dalam dosis tinggi dapat menyebabkan mual. Potensi karsinogenik masih diteliti.",
        level: "caution"
    },

    // ========== EMULSIFIER & STABILIZER ==========
    "E322": {
        name: "Lecithin",
        formula: "Fosfolipid Kompleks",
        structure: "Campuran fosfatidilkolin, fosfatidiletanolamin, dll",
        desc: "Emulsifier alami dari kedelai atau telur.",
        impact: "Sangat aman, bahkan bermanfaat untuk kesehatan otak (sumber kolin/fosfatidilkolin).",
        level: "safe"
    },
    "E330": {
        name: "Citric Acid",
        formula: "C₆H₈O₇",
        structure: "Asam trikarboksilat - HOOC-CH₂-C(OH)(COOH)-CH₂-COOH",
        desc: "Pengatur keasaman dan antioksidan alami dari jeruk.",
        impact: "Sangat aman. Berperan dalam siklus Krebs metabolisme tubuh.",
        level: "safe"
    },
    "E331": {
        name: "Sodium Citrate",
        formula: "Na₃C₆H₅O₇",
        structure: "Garam trisodium dari asam sitrat",
        desc: "Pengatur keasaman dan pengontrol rasa pada minuman.",
        impact: "Aman untuk konsumsi. Juga digunakan sebagai antikoagulan dalam transfusi darah.",
        level: "safe"
    },
    "E338": {
        name: "Phosphoric Acid",
        formula: "H₃PO₄",
        structure: "Asam anorganik triprotik",
        desc: "Pemberi rasa asam khas pada minuman cola.",
        impact: "Mengikis email gigi dan menurunkan kepadatan tulang secara signifikan jika dikonsumsi berlebihan.",
        level: "caution"
    },
    "E385": {
        name: "Calcium Disodium EDTA",
        formula: "C₁₀H₁₂CaN₂Na₂O₈",
        structure: "Kompleks khelat EDTA dengan kalsium dan natrium",
        desc: "Sekuestran logam untuk menjaga warna dan rasa makanan.",
        impact: "Dapat mengganggu penyerapan mineral esensial (zinc, besi). Hindari konsumsi berlebihan.",
        level: "caution"
    },
    "E407": {
        name: "Carrageenan",
        formula: "Polisakarida",
        structure: "Galaktan tersulfat dari rumput laut merah",
        desc: "Pengental dan stabilizer dari rumput laut, umum di produk susu.",
        impact: "Dapat menyebabkan peradangan usus (inflamasi) dan gangguan pencernaan kronis pada beberapa orang.",
        level: "caution"
    },
    "E410": {
        name: "Locust Bean Gum",
        formula: "Polisakarida",
        structure: "Galaktomanan dari biji carob",
        desc: "Pengental alami dari biji pohon carob.",
        impact: "Aman untuk konsumsi. Dapat membantu menurunkan kolesterol.",
        level: "safe"
    },
    "E412": {
        name: "Guar Gum",
        formula: "Polisakarida",
        structure: "Galaktomanan dari biji guar",
        desc: "Pengental dan stabilizer dari biji tanaman guar.",
        impact: "Umumnya aman. Dalam jumlah besar dapat menyebabkan kembung dan gas.",
        level: "safe"
    },
    "E422": {
        name: "Glycerol",
        formula: "C₃H₈O₃",
        structure: "Triol - HOCH₂-CHOH-CH₂OH",
        desc: "Humektan dan pemanis dalam permen karet dan makanan.",
        impact: "Sangat aman. Merupakan komponen alami lemak dalam tubuh.",
        level: "safe"
    },
    "E440": {
        name: "Pectin",
        formula: "Polisakarida",
        structure: "Poligalakturonat dari kulit jeruk/apel",
        desc: "Pengental dan gelling agent alami dari buah.",
        impact: "Sangat aman. Bermanfaat sebagai serat larut untuk kesehatan pencernaan.",
        level: "safe"
    },
    "E450": {
        name: "Diphosphates",
        formula: "Na₄P₂O₇ / K₄P₂O₇",
        structure: "Garam dari asam pirofosfat",
        desc: "Emulsifier dan pengembang untuk roti dan daging olahan.",
        impact: "Konsumsi fosfat berlebih dapat mengganggu keseimbangan kalsium dan menyebabkan masalah tulang.",
        level: "caution"
    },
    "E451": {
        name: "Triphosphates",
        formula: "Na₅P₃O₁₀",
        structure: "Sodium tripolyphosphate",
        desc: "Pengenyal dan pengikat air pada daging olahan.",
        impact: "Konsumsi fosfat berlebih dapat merusak ginjal dan memicu osteoporosis.",
        level: "caution"
    },
    "E452": {
        name: "Polyphosphates",
        formula: "(NaPO₃)n",
        structure: "Polimer fosfat rantai panjang",
        desc: "Emulsifier dan stabilizer untuk keju dan daging.",
        impact: "Dapat mengganggu penyerapan mineral (kalsium, magnesium, zat besi).",
        level: "caution"
    },
    "E471": {
        name: "Mono & Diglycerides",
        formula: "-",
        structure: "Ester parsial gliserol dengan asam lemak",
        desc: "Emulsifier lemak untuk roti, margarin, dan es krim.",
        impact: "Umumnya aman, namun sering berasal dari minyak hidrogenasi yang mungkin mengandung lemak trans.",
        level: "safe"
    },

    // ========== PENGEMBANG ==========
    "E500": {
        name: "Sodium Bicarbonate",
        formula: "NaHCO₃",
        structure: "Sodium hydrogen carbonate - baking soda",
        desc: "Pengembang dan pengatur pH dalam kue dan biskuit.",
        impact: "Sangat aman untuk makanan. Juga digunakan sebagai antasida.",
        level: "safe"
    },
    "E501": {
        name: "Potassium Carbonate",
        formula: "K₂CO₃",
        structure: "Garam kalium dari asam karbonat",
        desc: "Pengembang dan pengatur keasaman.",
        impact: "Aman untuk konsumsi dalam jumlah normal pada makanan.",
        level: "safe"
    },
    "E503": {
        name: "Ammonium Carbonate",
        formula: "(NH₄)₂CO₃",
        structure: "Garam amonium dari asam karbonat",
        desc: "Pengembang untuk biskuit dan kue kering.",
        impact: "Aman karena terurai menjadi gas saat pemanggangan.",
        level: "safe"
    }
};

/**
 * Search foods by name with optional filters
 * @param {string} query - Search query
 * @param {Object} filters - Optional filters { category, maxCalories, minProtein }
 * @returns {Array} Matching food items
 */
export function searchFoods(query, filters = {}) {
    let results = [...foodDatabase];

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
        results = results.filter(food => food.category === filters.category);
    }

    // Apply calorie filter
    if (filters.maxCalories && filters.maxCalories > 0) {
        results = results.filter(food => food.cal <= filters.maxCalories);
    }

    // Apply protein filter
    if (filters.minProtein && filters.minProtein > 0) {
        results = results.filter(food => food.prot >= filters.minProtein);
    }

    // Apply name search
    if (query && query.length >= 2) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(food =>
            food.name.toLowerCase().includes(lowerQuery)
        );
    }

    return results;
}

/**
 * Get foods by category
 * @param {string} categoryId - Category ID
 * @returns {Array} Foods in that category
 */
export function getFoodsByCategory(categoryId) {
    if (!categoryId || categoryId === 'all') return [...foodDatabase];
    return foodDatabase.filter(food => food.category === categoryId);
}

/**
 * Get food by exact name
 * @param {string} name - Food name
 * @returns {Object|null} Food item or null
 */
export function getFoodByName(name) {
    return foodDatabase.find(food => food.name === name) || null;
}

/**
 * Get additive info by E-number
 * @param {string} code - E-number code (e.g., "E621")
 * @returns {Object} Additive info with defaults if not found
 */
export function getAdditiveInfo(code) {
    return additiveDatabase[code] || {
        name: "Unknown Additive",
        formula: "-",
        structure: "-",
        desc: "Informasi tidak tersedia.",
        impact: "Dampak kesehatan tidak diketahui.",
        level: "caution"
    };
}

/**
 * Get all unique additives from a list of foods
 * @param {Array} foods - Array of food items
 * @returns {Array} Unique additive codes
 */
export function getUniqueAdditives(foods) {
    const allAdditives = foods.flatMap(food => food.additives || []);
    return [...new Set(allAdditives)];
}

/**
 * Get category info by ID
 * @param {string} categoryId - Category ID
 * @returns {Object|null} Category object or null
 */
export function getCategoryById(categoryId) {
    return FOOD_CATEGORIES.find(cat => cat.id === categoryId) || null;
}

export default {
    foodDatabase,
    additiveDatabase,
    FOOD_CATEGORIES,
    searchFoods,
    getFoodsByCategory,
    getFoodByName,
    getAdditiveInfo,
    getUniqueAdditives,
    getCategoryById
};
