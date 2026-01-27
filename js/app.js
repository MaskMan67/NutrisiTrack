/**
 * NutriScan - Main Application Module
 * Initializes and coordinates all modules
 */

// Import modules
import { saveProfile, loadProfile, saveFoods, loadFoods, clearAllData, saveTheme, loadTheme, getTodayDateString, saveDailyData, loadDailyData, loadWeeklyData } from './storage.js';
import { calculateDailyNeeds, calculateFoodTotals, getBMIIndicatorPosition, ACTIVITY_LEVELS } from './calculator.js';
import { foodDatabase, searchFoods, getFoodByName, getAdditiveInfo, getUniqueAdditives } from './foodDatabase.js';
import { initHydration, addWater, resetWater, getWaterCount, isWaterTargetReached } from './hydration.js';
import { initStreak, getStreak, getStreakMessage } from './streak.js';
import { initWeeklyChart, updateWeeklyChart } from './weeklyChart.js';
import { initRouter, navigateTo, getCurrentPage } from './router.js';

// ============================================
// State
// ============================================
let selectedFood = null;
let addedFoods = [];
let dailyNeeds = null;
let nutritionChart = null;
let currentSelectedDate = getTodayDateString(); // Track which date we're adding food to

// ============================================
// DOM Elements (cached on init)
// ============================================
const elements = {};

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    cacheElements();

    // Initialize Theme
    initTheme();

    // Initialize router
    initRouter();

    // Initialize modules
    initStreak();
    initHydration();

    // Initialize date picker
    initDatePicker();

    // Load saved data
    loadSavedData();

    // Setup event listeners
    setupEventListeners();

    // Initial calculations
    calculateAndDisplay();

    // Initialize weekly chart (after a small delay for Chart.js to load)
    setTimeout(() => {
        initWeeklyChart();
    }, 100);

    // Register service worker
    registerServiceWorker();

    console.log('🔬 NutriScan initialized successfully!');
});

/**
 * Initialize Theme (Light/Dark)
 */
function initTheme() {
    const savedTheme = loadTheme();

    // Check system preference if no saved theme
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemDark ? 'dark' : 'light'); // Default to light/cheerful if no preference

    // Apply theme
    applyTheme(theme);
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (elements.themeToggle) elements.themeToggle.textContent = '🌙';
    } else {
        document.body.removeAttribute('data-theme');
        if (elements.themeToggle) elements.themeToggle.textContent = '☀️';
    }
}

/**
 * Toggle Theme
 */
window.toggleTheme = function () {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);
    saveTheme(newTheme);
};

/**
 * Cache frequently accessed DOM elements
 */
function cacheElements() {
    // Profile inputs
    elements.age = document.getElementById('age');
    elements.weight = document.getElementById('weight');
    elements.height = document.getElementById('height');
    elements.gender = document.getElementById('gender');
    elements.activity = document.getElementById('activity');

    // Theme Toggle
    elements.themeToggle = document.getElementById('themeToggle');

    // BMI display
    elements.bmiValue = document.getElementById('bmiValue');
    elements.bmiStatus = document.getElementById('bmiStatus');
    elements.bmiIndicator = document.getElementById('bmiIndicator');
    elements.bmiTip = document.getElementById('bmiTip');

    // Food search
    elements.foodSearch = document.getElementById('foodSearch');
    elements.searchResults = document.getElementById('searchResults');
    elements.mealTime = document.getElementById('mealTime');
    elements.foodAmount = document.getElementById('foodAmount');
    elements.foodList = document.getElementById('foodList');

    // Additives
    elements.additivesList = document.getElementById('additivesList');

    // Nutrition
    elements.totalCalories = document.getElementById('totalCalories');
    elements.totalProtein = document.getElementById('totalProtein');
    elements.totalFat = document.getElementById('totalFat');
    elements.totalCarbs = document.getElementById('totalCarbs');
    elements.needCal = document.getElementById('needCal');
    elements.needProt = document.getElementById('needProt');
    elements.needFat = document.getElementById('needFat');
    elements.needCarb = document.getElementById('needCarb');
    elements.nutritionChart = document.getElementById('nutritionChart');

    // Modal
    elements.chemModal = document.getElementById('chemModal');
    elements.modalTitle = document.getElementById('modalTitle');
    elements.modalBadge = document.getElementById('modalBadge');
    elements.modalFormula = document.getElementById('modalFormula');
    elements.modalStructure = document.getElementById('modalStructure');
    elements.modalDesc = document.getElementById('modalDesc');
    elements.modalImpact = document.getElementById('modalImpact');

    // Toast
    elements.toast = document.getElementById('toast');

    // Statistics Dashboard - Progress bars
    elements.caloriesProgress = document.getElementById('caloriesProgress');
    elements.caloriesBar = document.getElementById('caloriesBar');
    elements.caloriesPercent = document.getElementById('caloriesPercent');
    elements.proteinProgress = document.getElementById('proteinProgress');
    elements.proteinBar = document.getElementById('proteinBar');
    elements.proteinPercent = document.getElementById('proteinPercent');
    elements.fatProgress = document.getElementById('fatProgress');
    elements.fatBar = document.getElementById('fatBar');
    elements.fatPercent = document.getElementById('fatPercent');
    elements.carbsProgress = document.getElementById('carbsProgress');
    elements.carbsBar = document.getElementById('carbsBar');
    elements.carbsPercent = document.getElementById('carbsPercent');

    // Statistics Dashboard - Energy values
    elements.bmrValueDisplay = document.getElementById('bmrValue');
    elements.tdeeValue = document.getElementById('tdeeValue');
    elements.idealProtein = document.getElementById('idealProtein');
    elements.idealFat = document.getElementById('idealFat');
    elements.idealCarbs = document.getElementById('idealCarbs');

    // Statistics Dashboard - Remaining display
    elements.remainingDisplay = document.getElementById('remainingDisplay');
    elements.remainingCalories = document.getElementById('remainingCalories');
    elements.remainingProtein = document.getElementById('remainingProtein');

    // Date picker
    elements.entryDate = document.getElementById('entryDate');
    elements.selectedDateDisplay = document.getElementById('selectedDateDisplay');
}

/**
 * Load saved data from LocalStorage
 */
function loadSavedData() {
    // Load profile
    const savedProfile = loadProfile();
    if (savedProfile) {
        elements.age.value = savedProfile.age || 17;
        elements.weight.value = savedProfile.weight || 60;
        elements.height.value = savedProfile.height || 165;
        elements.gender.value = savedProfile.gender || 'male';
        elements.activity.value = savedProfile.activity || 1.55;
    }

    // Load foods for current date
    loadFoodsForDate(currentSelectedDate);
}

/**
 * Load foods for a specific date
 */
function loadFoodsForDate(dateStr) {
    const dayData = loadDailyData(dateStr);
    addedFoods = dayData.foods || [];

    // Also update legacy storage for backwards compatibility
    saveFoods(addedFoods);

    renderFoodList();
    updateNutritionDisplay();
}

/**
 * Initialize date picker
 */
function initDatePicker() {
    const today = getTodayDateString();
    currentSelectedDate = today;

    if (elements.entryDate) {
        elements.entryDate.value = today;
        elements.entryDate.max = today; // Can't add food for future dates
        updateSelectedDateDisplay();
    }
}

/**
 * Update the selected date display text
 */
function updateSelectedDateDisplay() {
    if (!elements.selectedDateDisplay) return;

    const today = getTodayDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (currentSelectedDate === today) {
        elements.selectedDateDisplay.textContent = '📅 Hari Ini';
    } else if (currentSelectedDate === yesterdayStr) {
        elements.selectedDateDisplay.textContent = '📅 Kemarin';
    } else {
        const date = new Date(currentSelectedDate);
        const options = { weekday: 'long', day: 'numeric', month: 'short' };
        elements.selectedDateDisplay.textContent = '📅 ' + date.toLocaleDateString('id-ID', options);
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }

    // Date picker change
    if (elements.entryDate) {
        elements.entryDate.addEventListener('change', (e) => {
            handleDateChange(e.target.value);
        });
    }

    // Profile input changes
    ['age', 'weight', 'height', 'gender', 'activity'].forEach(id => {
        elements[id].addEventListener('change', () => {
            saveCurrentProfile();
            calculateAndDisplay();
        });
    });

    // BMI live update on weight/height input
    elements.weight.addEventListener('input', calculateAndDisplay);
    elements.height.addEventListener('input', calculateAndDisplay);

    // Food search
    elements.foodSearch.addEventListener('input', (e) => {
        handleFoodSearch(e.target.value);
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.food-search')) {
            elements.searchResults.classList.remove('active');
        }
    });

    // Modal close on overlay click
    elements.chemModal.addEventListener('click', (e) => {
        if (e.target === elements.chemModal) {
            closeModal();
        }
    });

    // Keyboard escape closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ============================================
// Profile & Calculations
// ============================================

/**
 * Save current profile to LocalStorage
 */
function saveCurrentProfile() {
    const profile = {
        age: elements.age.value,
        weight: elements.weight.value,
        height: elements.height.value,
        gender: elements.gender.value,
        activity: elements.activity.value
    };
    saveProfile(profile);
    showToast('Data tersimpan');
}

/**
 * Calculate and display all nutritional data
 */
function calculateAndDisplay() {
    const profile = {
        age: +elements.age.value || 17,
        weight: +elements.weight.value || 60,
        height: +elements.height.value || 165,
        gender: elements.gender.value || 'male',
        activity: +elements.activity.value || 1.55
    };

    // Calculate daily needs
    dailyNeeds = calculateDailyNeeds(profile);

    // Update BMI display
    updateBMIDisplay();

    // Update daily needs display
    updateDailyNeedsDisplay();

    // Update nutrition totals
    updateNutritionDisplay();
}

/**
 * Update BMI visual display
 */
function updateBMIDisplay() {
    if (!dailyNeeds) return;

    elements.bmiValue.textContent = dailyNeeds.bmi;
    elements.bmiStatus.textContent = dailyNeeds.bmiCategory.label;
    elements.bmiStatus.style.color = dailyNeeds.bmiCategory.color;
    elements.bmiTip.textContent = dailyNeeds.bmiCategory.tip;

    // Update indicator position
    const position = getBMIIndicatorPosition(parseFloat(dailyNeeds.bmi));
    elements.bmiIndicator.style.left = position + '%';
}

/**
 * Update daily needs display
 */
function updateDailyNeedsDisplay() {
    if (!dailyNeeds) return;

    elements.needCal.textContent = dailyNeeds.calories + ' kkal';
    elements.needProt.textContent = dailyNeeds.protein + 'g';
    elements.needFat.textContent = dailyNeeds.fat + 'g';
    elements.needCarb.textContent = dailyNeeds.carbs + 'g';

    // Update BMR and TDEE display in energy card
    if (elements.bmrValueDisplay) {
        elements.bmrValueDisplay.textContent = dailyNeeds.bmr + ' kkal/hari';
    }
    if (elements.tdeeValue) {
        elements.tdeeValue.textContent = dailyNeeds.tdee + ' kkal/hari';
    }
    if (elements.idealProtein) {
        elements.idealProtein.textContent = dailyNeeds.protein + 'g';
    }
    if (elements.idealFat) {
        elements.idealFat.textContent = dailyNeeds.fat + 'g';
    }
    if (elements.idealCarbs) {
        elements.idealCarbs.textContent = dailyNeeds.carbs + 'g';
    }
}

/**
 * Update progress bars and remaining display
 */
function updateProgressDisplay() {
    if (!dailyNeeds) return;

    const totals = calculateFoodTotals(addedFoods);

    // Calculate percentages
    const caloriesPercent = dailyNeeds.calories > 0 ? (totals.calories / dailyNeeds.calories) * 100 : 0;
    const proteinPercent = dailyNeeds.protein > 0 ? (totals.protein / dailyNeeds.protein) * 100 : 0;
    const fatPercent = dailyNeeds.fat > 0 ? (totals.fat / dailyNeeds.fat) * 100 : 0;
    const carbsPercent = dailyNeeds.carbs > 0 ? (totals.carbs / dailyNeeds.carbs) * 100 : 0;

    // Update progress text
    if (elements.caloriesProgress) {
        elements.caloriesProgress.textContent = `${Math.round(totals.calories)} / ${dailyNeeds.calories} kkal`;
        elements.caloriesBar.style.width = Math.min(caloriesPercent, 100) + '%';
        elements.caloriesPercent.textContent = Math.round(caloriesPercent) + '%';
        if (caloriesPercent > 100) elements.caloriesBar.classList.add('overflow');
        else elements.caloriesBar.classList.remove('overflow');
    }

    if (elements.proteinProgress) {
        elements.proteinProgress.textContent = `${totals.protein.toFixed(1)} / ${dailyNeeds.protein}g`;
        elements.proteinBar.style.width = Math.min(proteinPercent, 100) + '%';
        elements.proteinPercent.textContent = Math.round(proteinPercent) + '%';
        if (proteinPercent > 100) elements.proteinBar.classList.add('overflow');
        else elements.proteinBar.classList.remove('overflow');
    }

    if (elements.fatProgress) {
        elements.fatProgress.textContent = `${totals.fat.toFixed(1)} / ${dailyNeeds.fat}g`;
        elements.fatBar.style.width = Math.min(fatPercent, 100) + '%';
        elements.fatPercent.textContent = Math.round(fatPercent) + '%';
        if (fatPercent > 100) elements.fatBar.classList.add('overflow');
        else elements.fatBar.classList.remove('overflow');
    }

    if (elements.carbsProgress) {
        elements.carbsProgress.textContent = `${totals.carbs.toFixed(1)} / ${dailyNeeds.carbs}g`;
        elements.carbsBar.style.width = Math.min(carbsPercent, 100) + '%';
        elements.carbsPercent.textContent = Math.round(carbsPercent) + '%';
        if (carbsPercent > 100) elements.carbsBar.classList.add('overflow');
        else elements.carbsBar.classList.remove('overflow');
    }

    // Update remaining display
    if (elements.remainingCalories) {
        const remainingCal = Math.max(0, dailyNeeds.calories - Math.round(totals.calories));
        const remainingProt = Math.max(0, dailyNeeds.protein - totals.protein).toFixed(1);

        if (remainingCal <= 0 && caloriesPercent >= 100) {
            elements.remainingCalories.textContent = '✓ Tercapai!';
            elements.remainingProtein.textContent = '';
            elements.remainingDisplay.classList.add('complete');
        } else {
            elements.remainingCalories.textContent = remainingCal + ' kkal';
            elements.remainingProtein.textContent = remainingProt + 'g protein';
            elements.remainingDisplay.classList.remove('complete');
        }
    }
}

// ============================================
// Food Management
// ============================================

/**
 * Handle food search input
 */
function handleFoodSearch(query) {
    const results = searchFoods(query);

    if (results.length === 0) {
        elements.searchResults.classList.remove('active');
        return;
    }

    elements.searchResults.innerHTML = results.map(food => `
        <div class="search-item" data-food="${food.name}">
            <span class="search-item__name">${food.name}</span>
            <span class="search-item__cal">${food.cal} kkal/100g</span>
        </div>
    `).join('');

    elements.searchResults.classList.add('active');

    // Add click handlers to results
    elements.searchResults.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', () => {
            selectFood(item.dataset.food);
        });
    });
}

/**
 * Select a food from search results
 */
function selectFood(name) {
    selectedFood = getFoodByName(name);
    elements.foodSearch.value = name;
    elements.searchResults.classList.remove('active');
}

/**
 * Add selected food to the list (global function for onclick)
 */
window.addSelectedFood = function () {
    if (!selectedFood) {
        showToast('Pilih makanan dulu!', 'warning');
        return;
    }

    const amount = +elements.foodAmount.value || 100;
    const meal = elements.mealTime.value;

    addedFoods.push({
        ...selectedFood,
        amount,
        meal
    });

    // Save to date-based storage
    saveDailyData(currentSelectedDate, addedFoods, getWaterCount());

    // Also update legacy storage for backwards compatibility
    saveFoods(addedFoods);

    selectedFood = null;
    elements.foodSearch.value = '';

    // Update displays
    renderFoodList();
    updateNutritionDisplay();

    // Update weekly chart
    updateWeeklyChart();

    showToast('Makanan ditambahkan');
};

/**
 * Remove food from list (global function for onclick)
 */
window.removeFood = function (index) {
    addedFoods.splice(index, 1);

    // Save to date-based storage
    saveDailyData(currentSelectedDate, addedFoods, getWaterCount());

    // Also update legacy storage for backwards compatibility
    saveFoods(addedFoods);

    renderFoodList();
    updateNutritionDisplay();

    // Update weekly chart
    updateWeeklyChart();
};

/**
 * Render the food list grouped by meal time
 */
function renderFoodList() {
    if (addedFoods.length === 0) {
        elements.foodList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">🥗</div>
                <div>Belum ada menu hari ini</div>
            </div>
        `;
        elements.additivesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">🧪</div>
                <div>Data zat aditif akan muncul di sini</div>
            </div>
        `;
        return;
    }

    // Group foods by meal
    const grouped = addedFoods.reduce((acc, food, index) => {
        const meal = food.meal || 'Lainnya';
        if (!acc[meal]) acc[meal] = [];
        acc[meal].push({ ...food, index });
        return acc;
    }, {});

    // Render grouped list
    const mealOrder = ['Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Lainnya'];

    elements.foodList.innerHTML = mealOrder.map(meal => {
        if (!grouped[meal]) return '';

        return `
            <div class="meal-group">
                <h4 class="meal-group__title">${meal}</h4>
                ${grouped[meal].map(f => `
                    <div class="food-item">
                        <div>
                            <div class="food-item__name">${f.name}</div>
                            <div class="food-item__details">${f.amount}g • ${Math.round(f.cal * f.amount / 100)} kkal</div>
                        </div>
                        <button class="food-item__remove" onclick="removeFood(${f.index})">×</button>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');

    // Render additives
    renderAdditives();
}

/**
 * Render additives list
 */
function renderAdditives() {
    const additives = getUniqueAdditives(addedFoods);

    if (additives.length === 0) {
        elements.additivesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">✅</div>
                <div>Makanan Bebas Zat Aditif!</div>
            </div>
        `;
        return;
    }

    const levelLabels = { safe: 'Aman', caution: 'Perhatian', danger: 'Bahaya' };

    elements.additivesList.innerHTML = additives.map(code => {
        const info = getAdditiveInfo(code);
        return `
            <div class="additive-item additive-item--${info.level}" onclick="showAdditiveModal('${code}')">
                <div class="additive-item__header">
                    <span class="additive-item__name">${code} - ${info.name}</span>
                    <span class="badge badge--${info.level}">${levelLabels[info.level]}</span>
                </div>
                <div class="additive-item__desc">${info.desc}</div>
            </div>
        `;
    }).join('');
}

// ============================================
// Nutrition Display & Chart
// ============================================

/**
 * Update nutrition totals and chart
 */
function updateNutritionDisplay() {
    const totals = calculateFoodTotals(addedFoods);

    // Update text
    elements.totalCalories.textContent = Math.round(totals.calories);
    elements.totalProtein.textContent = totals.protein.toFixed(1);
    elements.totalFat.textContent = totals.fat.toFixed(1);
    elements.totalCarbs.textContent = totals.carbs.toFixed(1);

    // Update chart
    updateNutritionChart(totals);

    // Update progress bars and remaining display
    updateProgressDisplay();
}

/**
 * Update or create nutrition doughnut chart
 */
function updateNutritionChart(totals) {
    const ctx = elements.nutritionChart.getContext('2d');

    const data = [totals.protein, totals.fat, totals.carbs];
    const hasData = data.some(v => v > 0);

    if (nutritionChart) {
        nutritionChart.data.datasets[0].data = hasData ? data : [1, 1, 1];
        nutritionChart.update();
    } else {
        nutritionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Protein', 'Lemak', 'Karbohidrat'],
                datasets: [{
                    data: hasData ? data : [1, 1, 1],
                    backgroundColor: hasData
                        ? ['#3b82f6', '#f59e0b', '#22c55e']
                        : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)'],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: hasData,
                        callbacks: {
                            label: (ctx) => `${ctx.label}: ${ctx.raw.toFixed(1)}g`
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// ============================================
// Modal
// ============================================

/**
 * Show additive detail modal (global function for onclick)
 */
window.showAdditiveModal = function (code) {
    const info = getAdditiveInfo(code);

    elements.modalTitle.textContent = `${code} - ${info.name}`;
    elements.modalFormula.textContent = info.formula;
    elements.modalStructure.textContent = info.structure || '-';
    elements.modalDesc.textContent = info.desc;
    elements.modalImpact.textContent = info.impact;

    // Update badge
    const levelLabels = { safe: 'Aman', caution: 'Perhatian', danger: 'Bahaya' };
    elements.modalBadge.textContent = levelLabels[info.level];
    elements.modalBadge.className = `badge badge--${info.level}`;

    elements.chemModal.classList.add('active');
};

/**
 * Close modal (global function)
 */
window.closeModal = function () {
    elements.chemModal.classList.remove('active');
};

// ============================================
// Water & Other Actions
// ============================================

/**
 * Add water (global function for onclick)
 */
window.handleAddWater = function () {
    const added = addWater();
    if (added) {
        if (isWaterTargetReached()) {
            showToast('🎉 Target hidrasi tercapai!', 'success');
        } else {
            showToast('💧 +1 gelas');
        }
    } else {
        showToast('Target sudah tercapai!', 'warning');
    }
};

/**
 * Reset water (global function for onclick)
 */
window.handleResetWater = function () {
    resetWater();
    showToast('Water tracker direset');
};

/**
 * Calculate needs button (global function for onclick)
 */
window.handleCalculateNeeds = function () {
    saveCurrentProfile();
    calculateAndDisplay();
    showToast('Kebutuhan dihitung ulang');
};

/**
 * Clear all data (global function for onclick)
 */
window.handleClearData = function () {
    if (confirm('Yakin ingin menghapus semua data? Ini akan mereset progress Anda.')) {
        clearAllData();
        location.reload();
    }
};

// ============================================
// Date Navigation
// ============================================

/**
 * Handle date change from picker
 */
function handleDateChange(dateStr) {
    if (!dateStr) return;

    currentSelectedDate = dateStr;
    if (elements.entryDate) {
        elements.entryDate.value = dateStr;
    }
    updateSelectedDateDisplay();
    loadFoodsForDate(dateStr);
    showToast('Data tanggal diubah');
}

/**
 * Select today's date (global function for onclick)
 */
window.selectToday = function () {
    const today = getTodayDateString();
    handleDateChange(today);
};

/**
 * Select yesterday's date (global function for onclick)
 */
window.selectYesterday = function () {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    handleDateChange(yesterdayStr);
};

/**
 * Navigate to page (global function for onclick)
 */
window.navigateTo = navigateTo;

/**
 * Toggle theme (global function for onclick)
 */
window.toggleTheme = toggleTheme;

// ============================================
// Toast Notifications
// ============================================

let toastTimeout = null;

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const icons = { info: '💾', success: '✅', warning: '⚠️', error: '❌' };

    elements.toast.innerHTML = `
        <span class="toast__icon">${icons[type]}</span>
        <span class="toast__message">${message}</span>
    `;

    elements.toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2500);
}

// ============================================
// Service Worker
// ============================================

/**
 * Register service worker for PWA
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('✅ Service Worker registered:', reg.scope))
                .catch(err => console.log('❌ Service Worker failed:', err));
        });
    }
}
