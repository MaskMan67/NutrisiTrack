// Database Makanan & Zat Aditif Lengkap
const foodDatabase = [
    { name: "Nasi Putih", cal: 130, prot: 2.7, fat: 0.3, carb: 28, per: 100, additives: [] },
    { name: "Ayam Goreng", cal: 246, prot: 27, fat: 14, carb: 0, per: 100, additives: [] },
    { name: "Telur Rebus", cal: 155, prot: 13, fat: 11, carb: 1.1, per: 100, additives: [] },
    { name: "Tempe Goreng", cal: 192, prot: 19, fat: 10, carb: 7.8, per: 100, additives: [] },
    { name: "Tahu Goreng", cal: 271, prot: 17, fat: 20, carb: 6, per: 100, additives: [] },
    { name: "Mie Instan", cal: 436, prot: 9, fat: 17, carb: 63, per: 100, additives: ["E621", "E627", "E631", "E150c", "E501"] },
    { name: "Sosis Sapi", cal: 228, prot: 12, fat: 18, carb: 4, per: 100, additives: ["E250", "E316", "E621", "E451"] },
    { name: "Nugget Ayam", cal: 245, prot: 13, fat: 15, carb: 15, per: 100, additives: ["E450", "E452", "E621", "E412"] },
    { name: "Roti Tawar", cal: 265, prot: 9, fat: 3, carb: 49, per: 100, additives: ["E282", "E471"] },
    { name: "Susu UHT Coklat", cal: 80, prot: 3, fat: 2, carb: 12, per: 100, additives: ["E407", "E471"] },
    { name: "Biskuit Coklat", cal: 502, prot: 6, fat: 22, carb: 68, per: 100, additives: ["E322", "E503", "E500"] },
    { name: "Keripik Kentang", cal: 536, prot: 7, fat: 35, carb: 53, per: 100, additives: ["E621", "E627", "E631"] },
    { name: "Minuman Soda", cal: 41, prot: 0, fat: 0, carb: 10, per: 100, additives: ["E150d", "E331", "E338", "E211"] },
    { name: "Es Krim", cal: 207, prot: 3.5, fat: 11, carb: 24, per: 100, additives: ["E410", "E412", "E407"] },
    { name: "Saus Sambal", cal: 93, prot: 2, fat: 0.4, carb: 20, per: 100, additives: ["E211", "E202", "E110", "E124"] },
    { name: "Kecap Manis", cal: 290, prot: 6, fat: 0.1, carb: 67, per: 100, additives: ["E150c", "E621"] },
    { name: "Bakso Sapi", cal: 202, prot: 10, fat: 12, carb: 8, per: 100, additives: ["E621", "E451"] },
    { name: "Permen Karet", cal: 360, prot: 0, fat: 0, carb: 90, per: 100, additives: ["E133", "E102", "E129", "E422"] },
    { name: "Sayur Bayam", cal: 23, prot: 2.9, fat: 0.4, carb: 3.6, per: 100, additives: [] },
    { name: "Kangkung", cal: 19, prot: 2.6, fat: 0.2, carb: 3.1, per: 100, additives: [] },
    { name: "Pisang", cal: 89, prot: 1.1, fat: 0.3, carb: 23, per: 100, additives: [] },
    { name: "Apel", cal: 52, prot: 0.3, fat: 0.2, carb: 14, per: 100, additives: [] },
    { name: "Alpukat", cal: 160, prot: 2, fat: 15, carb: 9, per: 100, additives: [] },
    { name: "Mangga", cal: 60, prot: 0.8, fat: 0.4, carb: 15, per: 100, additives: [] },
    { name: "Jeruk", cal: 47, prot: 0.9, fat: 0.1, carb: 12, per: 100, additives: [] },
    { name: "Nasi Goreng", cal: 163, prot: 6, fat: 6, carb: 22, per: 100, additives: ["E621", "E150c"] },
    { name: "Sate Ayam (5 tusuk)", cal: 170, prot: 15, fat: 10, carb: 5, per: 100, additives: ["E621", "E150c"] },
    { name: "Pizza (1 slice)", cal: 266, prot: 11, fat: 10, carb: 33, per: 100, additives: ["E450", "E282", "E322"] },
    { name: "Cilok (5 butir)", cal: 180, prot: 2, fat: 4, carb: 35, per: 100, additives: ["E621"] },
    { name: "Seblak", cal: 260, prot: 8, fat: 12, carb: 30, per: 100, additives: ["E621", "E124"] },
    { name: "Donat", cal: 452, prot: 4, fat: 25, carb: 51, per: 100, additives: ["E102", "E471", "E202"] },
    { name: "Keripik Singkong", cal: 160, prot: 1, fat: 10, carb: 20, per: 100, additives: ["E621", "E319"] },
    { name: "Yoghurt Buah", cal: 95, prot: 5, fat: 2, carb: 15, per: 100, additives: ["E124", "E440"] },
    { name: "Kornet Sapi", cal: 220, prot: 14, fat: 18, carb: 2, per: 100, additives: ["E250", "E316"] },
    { name: "Martabak Manis (1 potong)", cal: 270, prot: 4, fat: 12, carb: 38, per: 100, additives: ["E500", "E503", "E102"] }
];

const additiveInfo = {
    "E621": { name: "Monosodium Glutamat", formula: "C₅H₈NO₄Na", desc: "Penguat rasa gurih (umami).", impact: "Sindrom restoran Cina (sakit kepala, mual) pada orang sensitif. Neurotoksin eksitotoksik dalam dosis tinggi.", level: "caution" },
    "E627": { name: "Disodium Guanylate", formula: "C₁₀H₁₂N₅Na₂O₈P", desc: "Penguat rasa, sering dipakai bersama MSG.", impact: "Dapat memicu asam urat karena dimetabolisme menjadi purin. Hindari bagi penderita gout.", level: "caution" },
    "E631": { name: "Disodium Inosinate", formula: "C₁₀H₁₁N₄Na₂O₈P", desc: "Penguat rasa hewani.", impact: "Sama seperti E627, dapat meningkatkan kadar asam urat.", level: "caution" },
    "E150c": { name: "Karamel Amonia", formula: "Complex Polymer", desc: "Pewarna coklat tua (cola/kecap).", impact: "Dapat mengandung 4-MEI (4-methylimidazole) yang bersifat karsinogenik (penyebab kanker) pada hewan lab.", level: "caution" },
    "E150d": { name: "Karamel Sulfit Amonia", formula: "Complex Polymer", desc: "Pewarna coklat tahan asam (soda).", impact: "Berpotensi mengandung 4-MEI lebih tinggi. Dapat memicu masalah usus.", level: "caution" },
    "E250": { name: "Sodium Nitrit", formula: "NaNO₂", desc: "Pengawet daging & pemberi warna merah.", impact: "Sangat Bahaya! Dapat bereaksi membentuk Nitrosamin (karsinogen kuat) saat dimasak suhu tinggi. Mengurangi oksigen darah.", level: "danger" },
    "E451": { name: "Triphosphate", formula: "Na₅P₃O₁₀", desc: "Pengenyal & pengikat air pada daging olahan.", impact: "Konsumsi fosfat berlebih merusak ginjal dan memicu pengeroposan tulang (osteoporosis).", level: "caution" },
    "E452": { name: "Polyphosphate", formula: "(NaPO₃)n", desc: "Emulsifier & stabilizer.", impact: "Dapat mengganggu penyerapan mineral (kalsium, magnesium, zat besi) dalam tubuh.", level: "caution" },
    "E282": { name: "Calcium Propionate", formula: "C₆H₁₀CaO₄", desc: "Anti-jamur pada roti.", impact: "Dapat memicu migrain dan perubahan perilaku/iritabilitas pada anak-anak.", level: "safe" },
    "E471": { name: "Mono & Diglycerides", formula: "-", desc: "Emulsifier lemak.", impact: "Umumnya aman, namun sering berasal dari minyak nabati hidrogenasi yang mungkin mengandung lamak trans.", level: "safe" },
    "E211": { name: "Sodium Benzoat", formula: "C₇H₅NaO₂", desc: "Pengawet minuman asam/sambal.", impact: "Dapat bereaksi dengan Vitamin C membentuk BENZENA (penyebab leukemia/kanker darah). Pemicu hiperaktivitas.", level: "danger" },
    "E202": { name: "Potassium Sorbate", formula: "C₆H₇KO₂", desc: "Pengawet anti-jamur.", impact: "Relatif aman, namun bisa menyebabkan reaksi alergi kulit pada sedikit orang.", level: "safe" },
    "E110": { name: "Sunset Yellow FCF", formula: "C₁₆H₁₀N₂Na₂O₇S₂", desc: "Pewarna kuning-oranye.", impact: "Dilarang di beberapa negara Eropa. Pemicu kuat hiperaktivitas (ADHD) pada anak dan alergi aspirin.", level: "danger" },
    "E124": { name: "Ponceau 4R", formula: "C₂₀H₁₁N₂Na₃O₁₀S₃", desc: "Pewarna merah strawberry.", impact: "Karsinogenik pada hewan. Memicu asma dan ADHD.", level: "danger" },
    "E133": { name: "Brilliant Blue FCF", formula: "C₃₇H₃₄N₂Na₂O₉S₃", desc: "Pewarna biru sintetis.", impact: "Dicurigai neurotoksik. Sulit dicerna tubuh.", level: "caution" },
    "E102": { name: "Tartrazine", formula: "C₁₆H₉N₄Na₃O₉S₂", desc: "Pewarna kuning lemon.", impact: "Penyebab reaksi alergi paling umum (ruam, asma). Terkait penurunan jumlah sperma.", level: "danger" },
    "E407": { name: "Carrageenan", formula: "Polysaccharide", desc: "Pengental dari rumput laut.", impact: "Dapat menyebabkan peradangan usus (inflamasi) dan gangguan pencernaan kronis.", level: "caution" },
    "E338": { name: "Phosphoric Acid", formula: "H₃PO₄", desc: "Pemberi rasa asam pada soda.", impact: "Menggerus enamel gigi dan menurunkan kepadatan tulang secara signifikan.", level: "caution" },
    "E322": { name: "Lecithin", formula: "Phospholipid", desc: "Emulsifier alami (kedelai/telur).", impact: "Sangat aman, bahkan baik untuk kesehatan otak (sumber kolin).", level: "safe" }
};

// State & Persistence
let selectedFood = null;
let addedFoods = [];
let waterCount = 0;
let nutritionChart = null;
const WATER_TARGET = 8;
let streak = 0;
let lastVisit = null;

// Load Data on Startup
function loadData() {
    const savedProfil = JSON.parse(localStorage.getItem('nutriscan_profile'));
    if (savedProfil) {
        document.getElementById('age').value = savedProfil.age;
        document.getElementById('weight').value = savedProfil.weight;
        document.getElementById('height').value = savedProfil.height;
        document.getElementById('gender').value = savedProfil.gender;
        document.getElementById('activity').value = savedProfil.activity;
    }

    const savedFoods = JSON.parse(localStorage.getItem('nutriscan_foods'));
    if (savedFoods) addedFoods = savedFoods;

    const savedWater = localStorage.getItem('nutriscan_water');
    if (savedWater) waterCount = parseInt(savedWater);

    // Streak Logic
    const savedStreak = parseInt(localStorage.getItem('nutriscan_streak') || 0);
    const savedLastVisit = localStorage.getItem('nutriscan_last_visit');
    const today = new Date().toDateString();

    if (savedLastVisit !== today) {
        if (savedLastVisit) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (savedLastVisit === yesterday.toDateString()) {
                streak = savedStreak + 1;
            } else {
                streak = 1;
            }
        } else {
            streak = 1;
        }
        localStorage.setItem('nutriscan_last_visit', today);
        localStorage.setItem('nutriscan_streak', streak);
    } else {
        streak = savedStreak;
    }
    document.getElementById('streakDisplay').innerHTML = `🔥 ${streak} Hari Streak`;

    calculateNeeds();
    renderFoodList();
    updateWaterVisual();
}

function saveData() {
    const profile = {
        age: document.getElementById('age').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        gender: document.getElementById('gender').value,
        activity: document.getElementById('activity').value
    };
    localStorage.setItem('nutriscan_profile', JSON.stringify(profile));
    localStorage.setItem('nutriscan_foods', JSON.stringify(addedFoods));
    localStorage.setItem('nutriscan_water', waterCount);
    showToast();
}

function clearAllData() {
    if (confirm('Yakin ingin menghapus semua data? Ini akan mereset progress Anda.')) {
        localStorage.clear();
        location.reload();
    }
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Logic Utama
let dailyNeeds = { cal: 0, prot: 0, fat: 0, carb: 0 };

function calculateNeeds() {
    const age = +document.getElementById('age').value || 17;
    const weight = +document.getElementById('weight').value || 60;
    const height = +document.getElementById('height').value || 165;
    const gender = document.getElementById('gender').value;
    const activity = +document.getElementById('activity').value;

    // Mifflin-St Jeor Equation
    let bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = Math.round(bmr * activity);

    dailyNeeds = {
        cal: tdee,
        prot: Math.round(weight * 1.2), // 1.2g per kg for active students
        fat: Math.round(tdee * 0.25 / 9),
        carb: Math.round(tdee * 0.50 / 4)
    };

    document.getElementById('needCal').textContent = dailyNeeds.cal;
    document.getElementById('needProt').textContent = dailyNeeds.prot + 'g';
    document.getElementById('needFat').textContent = dailyNeeds.fat + 'g';
    document.getElementById('needCarb').textContent = dailyNeeds.carb + 'g';

    calculateBMI();
    updateNutritionDisplay();
}

function calculateBMI() {
    const weight = +document.getElementById('weight').value;
    const height = +document.getElementById('height').value;
    if (!weight || !height) return;

    const bmi = weight / ((height / 100) ** 2);
    const bmiEl = document.getElementById('bmiValue');
    const statusEl = document.getElementById('bmiStatus');
    const tipEl = document.getElementById('bmiTip');
    const indEl = document.getElementById('bmiIndicator');

    bmiEl.textContent = bmi.toFixed(1);

    // Posisi Indicator (0-100%)
    // Scale: 15 (min) to 35 (max)
    let percent = ((bmi - 15) / (35 - 15)) * 100;
    percent = Math.max(0, Math.min(100, percent));
    indEl.style.left = percent + '%';

    if (bmi < 18.5) {
        statusEl.textContent = "Kurus (Underweight)"; statusEl.style.color = "#3b82f6";
        tipEl.textContent = "⚠️ Perbanyak asupan protein dan karbohidrat kompleks.";
    } else if (bmi < 25) {
        statusEl.textContent = "Normal (Ideal)"; statusEl.style.color = "#10b981";
        tipEl.textContent = "✅ Pertahankan gaya hidup sehat Anda!";
    } else if (bmi < 30) {
        statusEl.textContent = "Gemuk (Overweight)"; statusEl.style.color = "#f59e0b";
        tipEl.textContent = "⚠️ Kurangi gula/lemak, tambah aktivitas fisik.";
    } else {
        statusEl.textContent = "Obesitas"; statusEl.style.color = "#ef4444";
        tipEl.textContent = "🚨 Segera konsultasikan ke dokter/ahli gizi.";
    }
}

// Search & Add Food
function searchFood(query) {
    const results = document.getElementById('searchResults');
    if (query.length < 2) { results.classList.remove('active'); return; }

    const filtered = foodDatabase.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
    results.innerHTML = filtered.map(f => `
        <div class="search-item" onclick="selectFood('${f.name}')">
            <span>${f.name}</span>
            <small style="color:var(--text-muted)">${f.cal} kkal/100g</small>
        </div>
    `).join('');

    if (filtered.length > 0) results.classList.add('active');
    else results.classList.remove('active');
}

function selectFood(name) {
    selectedFood = foodDatabase.find(f => f.name === name);
    document.getElementById('foodSearch').value = name;
    document.getElementById('searchResults').classList.remove('active');
}

function addSelectedFood() {
    if (!selectedFood) return alert('Pilih makanan dari daftar pencarian dulu!');
    const amount = +document.getElementById('foodAmount').value || 100;
    const meal = document.getElementById('mealTime').value;

    addedFoods.push({ ...selectedFood, amount: amount, meal: meal }); // Include meal time
    selectedFood = null;
    document.getElementById('foodSearch').value = '';

    saveData();
    renderFoodList();
    updateNutritionDisplay();
}

function removeFood(index) {
    addedFoods.splice(index, 1);
    saveData();
    renderFoodList();
    updateNutritionDisplay();
}

function renderFoodList() {
    const list = document.getElementById('foodList');
    const addList = document.getElementById('additivesList');

    if (addedFoods.length === 0) {
        list.innerHTML = '<div class="empty-state"><span>🥗</span>Belum ada menu hari ini</div>';
        addList.innerHTML = '<div class="empty-state"><span>🧪</span>Data zat aditif akan muncul di sini</div>';
        return;
    }

    // Group foods by meal
    const grouped = addedFoods.reduce((acc, food, index) => {
        const meal = food.meal || 'Lainnya';
        if (!acc[meal]) acc[meal] = [];
        acc[meal].push({ ...food, index });
        return acc;
    }, {});

    // Render Grouped List
    const mealOrder = ['Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Lainnya'];
    list.innerHTML = mealOrder.map(meal => {
        if (!grouped[meal]) return '';
        return `
            <div style="margin-bottom: 1rem;">
                <h4 style="color:var(--primary); margin-bottom:0.5rem; text-transform:uppercase; font-size:0.8rem; letter-spacing:1px;">${meal}</h4>
                ${grouped[meal].map(f => `
                    <div class="food-item">
                        <div>
                            <div class="food-item-name">${f.name}</div>
                            <div class="food-item-cal">${f.amount}g • ${Math.round(f.cal * f.amount / 100)} kkal</div>
                        </div>
                        <button class="remove-btn" onclick="removeFood(${f.index})">×</button>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');

    // Render Additives with Modal Trigger
    const allAdditives = [...new Set(addedFoods.flatMap(f => f.additives))];
    if (allAdditives.length === 0) {
        addList.innerHTML = '<div class="empty-state"><span>✅</span>Makanan Bebas Zat Aditif!</div>';
    } else {
        addList.innerHTML = allAdditives.map(code => {
            const info = additiveInfo[code] || { name: "Unknown", formula: "-", desc: "-", impact: "-", level: "caution" };
            const badges = { safe: "Aman", caution: "Perhatian", danger: "Bahaya" };
            return `
                <div class="additive-item ${info.level}" onclick="showModal('${code}')">
                    <div class="additive-name">
                        ${code} - ${info.name} 
                        <span class="badge badge-${info.level}">${badges[info.level]}</span>
                    </div>
                    <div class="additive-desc">${info.desc}</div>
                </div>
            `;
        }).join('');
    }
}

function updateNutritionDisplay() {
    let totals = { cal: 0, prot: 0, fat: 0, carb: 0 };
    addedFoods.forEach(f => {
        const ratio = f.amount / 100;
        totals.cal += f.cal * ratio;
        totals.prot += f.prot * ratio;
        totals.fat += f.fat * ratio;
        totals.carb += f.carb * ratio;
    });

    // Update Text
    document.getElementById('totalCalories').textContent = Math.round(totals.cal);
    document.getElementById('totalProtein').textContent = totals.prot.toFixed(1);
    document.getElementById('totalFat').textContent = totals.fat.toFixed(1);
    document.getElementById('totalCarbs').textContent = totals.carb.toFixed(1);

    // Update Chart
    const ctx = document.getElementById('nutritionChart').getContext('2d');

    if (nutritionChart) {
        nutritionChart.data.datasets[0].data = [totals.prot, totals.fat, totals.carb];
        nutritionChart.update();
    } else {
        nutritionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Protein', 'Lemak', 'Karbo'],
                datasets: [{
                    data: [totals.prot, totals.fat, totals.carb],
                    backgroundColor: ['#36a2eb', '#ffcd56', '#4bc0c0'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.label + ': ' + context.raw.toFixed(1) + 'g';
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// Water Tracker Logic
function addWater() {
    if (waterCount < WATER_TARGET) {
        waterCount++;
        saveData();
        updateWaterVisual();
    }
}

function resetWater() {
    waterCount = 0;
    saveData();
    updateWaterVisual();
}

function updateWaterVisual() {
    document.getElementById('waterCount').textContent = waterCount;
    const pct = (waterCount / WATER_TARGET) * 100;
    document.getElementById('waterLevel').style.height = pct + '%';
    document.getElementById('waterProgressBar').style.width = pct + '%';
}

// Modal Functions
function showModal(code) {
    const info = additiveInfo[code];
    if (!info) return;

    document.getElementById('modalTitle').textContent = `${code} - ${info.name}`;
    document.getElementById('modalFormula').textContent = info.formula;
    document.getElementById('modalDesc').textContent = info.desc;
    document.getElementById('modalImpact').textContent = info.impact;

    const badge = document.getElementById('modalBadge');
    badge.className = `chem-badge badge-${info.level}`; // Use CSS from main style
    // Reset modal badge style manually based on level
    if (info.level === 'safe') { badge.style.background = 'rgba(16,185,129,0.2)'; badge.style.color = 'var(--primary)'; badge.textContent = 'Aman'; }
    if (info.level === 'caution') { badge.style.background = 'rgba(245,158,11,0.2)'; badge.style.color = 'var(--warning)'; badge.textContent = 'Perhatian'; }
    if (info.level === 'danger') { badge.style.background = 'rgba(239,68,68,0.2)'; badge.style.color = 'var(--danger)'; badge.textContent = 'Bahaya'; }

    document.getElementById('chemModal').classList.add('active');
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('chemModal').classList.remove('active');
}

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.food-search')) {
        document.getElementById('searchResults').classList.remove('active');
    }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered:', reg.scope))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// Initialize
loadData();
