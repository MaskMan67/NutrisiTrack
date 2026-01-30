export type AdditiveLevel = 'safe' | 'caution' | 'danger';

export interface Additive {
    name: string;
    formula: string;
    structure: string;
    desc: string;
    impact: string;
    level: AdditiveLevel;
}

export interface FoodCategory {
    id: string;
    name: string;
    icon: string;
}

export interface FoodItem {
    name: string;
    cal: number;
    prot: number;
    fat: number;
    carb: number;
    per: number;
    category: string;
    additives: string[];
}

export interface FoodFilter {
    category?: string;
    maxCalories?: number;
    minProtein?: number;
}

export interface UserProfile {
    age: number;
    weight: number;
    height: number;
    gender: 'male' | 'female';
    activity: number;
}

export interface FoodEntry extends FoodItem {
    amount: number;
    meal: string;
}

export interface StreakData {
    streak: number;
    lastVisit: string | null;
}

export interface NutritionTotals {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface ActivityLevel {
    value: number;
    label: string;
}

export interface BMICategory {
    max: number;
    label: string;
    color: string;
    tip: string;
}

export interface DailyNeeds {
    bmr: number;
    tdee: number;
    bmi: string;
    bmiCategory: BMICategory;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface DailyHistory {
    [date: string]: {
        foods: FoodEntry[];
        water: number;
        updatedAt: string;
    };
}

export interface WeeklyStats {
    date: string;
    dayName: string;
    foods: FoodEntry[];
    water: number;
}
