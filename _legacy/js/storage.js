/**
 * NutriScan - Storage Module
 * Handles all LocalStorage operations for data persistence
 */

const STORAGE_KEYS = {
    PROFILE: 'nutriscan_profile',
    FOODS: 'nutriscan_foods',
    WATER: 'nutriscan_water',
    STREAK: 'nutriscan_streak',
    LAST_VISIT: 'nutriscan_last_visit',
    THEME: 'nutriscan_theme',
    DAILY_HISTORY: 'nutriscan_daily_history'
};

/**
 * Save theme preference to LocalStorage
 * @param {string} theme - 'light' or 'dark'
 */
export function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        return true;
    } catch (e) {
        console.error('Error saving theme:', e);
        return false;
    }
}

/**
 * Load theme preference from LocalStorage
 * @returns {string|null} 'light', 'dark', or null
 */
export function loadTheme() {
    try {
        return localStorage.getItem(STORAGE_KEYS.THEME);
    } catch (e) {
        console.error('Error loading theme:', e);
        return null;
    }
}

/**
 * Save user profile to LocalStorage
 * @param {Object} profile - User profile data
 */
export function saveProfile(profile) {
    try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
        return true;
    } catch (e) {
        console.error('Error saving profile:', e);
        return false;
    }
}

/**
 * Load user profile from LocalStorage
 * @returns {Object|null} Profile data or null if not found
 */
export function loadProfile() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading profile:', e);
        return null;
    }
}

/**
 * Save added foods to LocalStorage
 * @param {Array} foods - Array of food items
 */
export function saveFoods(foods) {
    try {
        localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
        return true;
    } catch (e) {
        console.error('Error saving foods:', e);
        return false;
    }
}

/**
 * Load added foods from LocalStorage
 * @returns {Array} Array of food items or empty array
 */
export function loadFoods() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.FOODS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error loading foods:', e);
        return [];
    }
}

/**
 * Save water count to LocalStorage
 * @param {number} count - Number of glasses
 */
export function saveWater(count) {
    try {
        localStorage.setItem(STORAGE_KEYS.WATER, count.toString());
        return true;
    } catch (e) {
        console.error('Error saving water:', e);
        return false;
    }
}

/**
 * Load water count from LocalStorage
 * @returns {number} Water count or 0
 */
export function loadWater() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.WATER);
        return data ? parseInt(data, 10) : 0;
    } catch (e) {
        console.error('Error loading water:', e);
        return 0;
    }
}

/**
 * Save streak data to LocalStorage
 * @param {number} streak - Current streak count
 * @param {string} lastVisit - Last visit date string
 */
export function saveStreak(streak, lastVisit) {
    try {
        localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
        localStorage.setItem(STORAGE_KEYS.LAST_VISIT, lastVisit);
        return true;
    } catch (e) {
        console.error('Error saving streak:', e);
        return false;
    }
}

/**
 * Load streak data from LocalStorage
 * @returns {Object} Streak data { streak, lastVisit }
 */
export function loadStreak() {
    try {
        const streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);
        const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT) || null;
        return { streak, lastVisit };
    } catch (e) {
        console.error('Error loading streak:', e);
        return { streak: 0, lastVisit: null };
    }
}

/**
 * Clear all NutriScan data from LocalStorage
 */
export function clearAllData() {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (e) {
        console.error('Error clearing data:', e);
        return false;
    }
}

// ============================================
// Date-Based Storage Functions
// ============================================

/**
 * Get today's date as YYYY-MM-DD string
 * @returns {string} Today's date
 */
export function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Load all daily history data
 * @returns {Object} Object with date keys and data values
 */
function loadAllDailyHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.DAILY_HISTORY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error('Error loading daily history:', e);
        return {};
    }
}

/**
 * Save all daily history data
 * @param {Object} history - Object with date keys and data values
 */
function saveAllDailyHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEYS.DAILY_HISTORY, JSON.stringify(history));
        return true;
    } catch (e) {
        console.error('Error saving daily history:', e);
        return false;
    }
}

/**
 * Save foods for a specific date
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @param {Array} foods - Array of food items
 * @param {number} waterCount - Water count for the day
 */
export function saveDailyData(dateStr, foods, waterCount = 0) {
    try {
        const history = loadAllDailyHistory();
        history[dateStr] = {
            foods: foods,
            water: waterCount,
            updatedAt: new Date().toISOString()
        };
        return saveAllDailyHistory(history);
    } catch (e) {
        console.error('Error saving daily data:', e);
        return false;
    }
}

/**
 * Load foods for a specific date
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {Object} Object with foods array and water count
 */
export function loadDailyData(dateStr) {
    try {
        const history = loadAllDailyHistory();
        const dayData = history[dateStr];
        if (dayData) {
            return {
                foods: dayData.foods || [],
                water: dayData.water || 0
            };
        }
        return { foods: [], water: 0 };
    } catch (e) {
        console.error('Error loading daily data:', e);
        return { foods: [], water: 0 };
    }
}

/**
 * Load weekly data (last 7 days)
 * @returns {Array} Array of daily data objects with date
 */
export function loadWeeklyData() {
    try {
        const history = loadAllDailyHistory();
        const weekData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const dayData = history[dateStr] || { foods: [], water: 0 };
            weekData.push({
                date: dateStr,
                dayName: getDayName(date),
                foods: dayData.foods || [],
                water: dayData.water || 0
            });
        }

        return weekData;
    } catch (e) {
        console.error('Error loading weekly data:', e);
        return [];
    }
}

/**
 * Get short day name in Indonesian
 * @param {Date} date - Date object
 * @returns {string} Short day name
 */
function getDayName(date) {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[date.getDay()];
}

/**
 * Get list of dates that have saved data
 * @returns {Array<string>} Array of date strings
 */
export function getDatesWithData() {
    try {
        const history = loadAllDailyHistory();
        return Object.keys(history).sort();
    } catch (e) {
        console.error('Error getting dates with data:', e);
        return [];
    }
}

export default {
    saveProfile,
    loadProfile,
    saveFoods,
    loadFoods,
    saveWater,
    loadWater,
    saveStreak,
    loadStreak,
    saveTheme,
    loadTheme,
    clearAllData,
    getTodayDateString,
    saveDailyData,
    loadDailyData,
    loadWeeklyData,
    getDatesWithData
};
