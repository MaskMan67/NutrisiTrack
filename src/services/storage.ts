import { DailyHistory, FoodEntry, StreakData, UserProfile, WeeklyStats } from '../types';

const STORAGE_KEYS = {
    PROFILE: 'nutriscan_profile',
    FOODS: 'nutriscan_foods',
    WATER: 'nutriscan_water',
    STREAK: 'nutriscan_streak',
    LAST_VISIT: 'nutriscan_last_visit',
    THEME: 'nutriscan_theme',
    DAILY_HISTORY: 'nutriscan_daily_history'
};

export const saveTheme = (theme: 'light' | 'dark'): boolean => {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        return true;
    } catch (e) {
        console.error('Error saving theme:', e);
        return false;
    }
};

export const loadTheme = (): 'light' | 'dark' | null => {
    try {
        return localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | null;
    } catch (e) {
        console.error('Error loading theme:', e);
        return null;
    }
};

export const saveProfile = (profile: UserProfile): boolean => {
    try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
        return true;
    } catch (e) {
        console.error('Error saving profile:', e);
        return false;
    }
};

export const loadProfile = (): UserProfile | null => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading profile:', e);
        return null;
    }
};

export const saveFoods = (foods: FoodEntry[]): boolean => {
    try {
        localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
        return true;
    } catch (e) {
        console.error('Error saving foods:', e);
        return false;
    }
};

export const loadFoods = (): FoodEntry[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.FOODS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error loading foods:', e);
        return [];
    }
};

export const saveWater = (count: number): boolean => {
    try {
        localStorage.setItem(STORAGE_KEYS.WATER, count.toString());
        return true;
    } catch (e) {
        console.error('Error saving water:', e);
        return false;
    }
};

export const loadWater = (): number => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.WATER);
        return data ? parseInt(data, 10) : 0;
    } catch (e) {
        console.error('Error loading water:', e);
        return 0;
    }
};

export const saveStreak = (streak: number, lastVisit: string): boolean => {
    try {
        localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
        localStorage.setItem(STORAGE_KEYS.LAST_VISIT, lastVisit);
        return true;
    } catch (e) {
        console.error('Error saving streak:', e);
        return false;
    }
};

export const loadStreak = (): StreakData => {
    try {
        const streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);
        const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT) || null;
        return { streak, lastVisit };
    } catch (e) {
        console.error('Error loading streak:', e);
        return { streak: 0, lastVisit: null };
    }
};

export const clearAllData = (): boolean => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (e) {
        console.error('Error clearing data:', e);
        return false;
    }
};

export const getTodayDateString = (): string => {
    return new Date().toISOString().split('T')[0];
};

const loadAllDailyHistory = (): DailyHistory => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.DAILY_HISTORY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error('Error loading daily history:', e);
        return {};
    }
};

const saveAllDailyHistory = (history: DailyHistory): boolean => {
    try {
        localStorage.setItem(STORAGE_KEYS.DAILY_HISTORY, JSON.stringify(history));
        return true;
    } catch (e) {
        console.error('Error saving daily history:', e);
        return false;
    }
};

export const saveDailyData = (dateStr: string, foods: FoodEntry[], waterCount: number = 0): boolean => {
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
};

export const loadDailyData = (dateStr: string): { foods: FoodEntry[]; water: number } => {
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
};

const getDayName = (date: Date): string => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[date.getDay()];
};

export const loadWeeklyData = (): WeeklyStats[] => {
    try {
        const history = loadAllDailyHistory();
        const weekData: WeeklyStats[] = [];

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
};

export const getDatesWithData = (): string[] => {
    try {
        const history = loadAllDailyHistory();
        return Object.keys(history).sort();
    } catch (e) {
        console.error('Error getting dates with data:', e);
        return [];
    }
};

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
