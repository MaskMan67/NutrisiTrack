/**
 * NutriScan - Storage Module
 * Handles all LocalStorage operations for data persistence
 */

const STORAGE_KEYS = {
    PROFILE: 'nutriscan_profile',
    FOODS: 'nutriscan_foods',
    WATER: 'nutriscan_water',
    STREAK: 'nutriscan_streak',
    LAST_VISIT: 'nutriscan_last_visit'
};

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

export default {
    saveProfile,
    loadProfile,
    saveFoods,
    loadFoods,
    saveWater,
    loadWater,
    saveStreak,
    loadStreak,
    clearAllData
};
