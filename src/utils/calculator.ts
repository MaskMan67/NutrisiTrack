import { ActivityLevel, BMICategory, DailyNeeds, FoodEntry, NutritionTotals, UserProfile } from '../types';

export const ACTIVITY_LEVELS: Record<string, ActivityLevel> = {
    SEDENTARY: { value: 1.2, label: 'Sedentari (jarang olahraga)' },
    LIGHT: { value: 1.375, label: 'Ringan (1-3x/minggu)' },
    MODERATE: { value: 1.55, label: 'Moderat (3-5x/minggu)' },
    ACTIVE: { value: 1.725, label: 'Aktif (6-7x/minggu)' },
    VERY_ACTIVE: { value: 1.9, label: 'Sangat Aktif (atlet)' }
};

export const BMI_CATEGORIES: Record<string, BMICategory> = {
    UNDERWEIGHT: { max: 18.5, label: 'Kurus (Underweight)', color: '#3b82f6', tip: '⚠️ Perbanyak asupan protein dan karbohidrat kompleks.' },
    NORMAL: { max: 25, label: 'Normal (Ideal)', color: '#22c55e', tip: '✅ Pertahankan gaya hidup sehat Anda!' },
    OVERWEIGHT: { max: 30, label: 'Gemuk (Overweight)', color: '#f59e0b', tip: '⚠️ Kurangi gula/lemak, tambah aktivitas fisik.' },
    OBESE: { max: Infinity, label: 'Obesitas', color: '#ef4444', tip: '🚨 Segera konsultasikan ke dokter/ahli gizi.' }
};

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
    const baseBMR = (10 * weight) + (6.25 * height) - (5 * age);

    if (gender === 'male') {
        return baseBMR + 5;
    } else {
        return baseBMR - 161;
    }
}

export function calculateTDEE(bmr: number, activityFactor: number): number {
    return Math.round(bmr * activityFactor);
}

export function calculateBMI(weight: number, height: number): number {
    if (!weight || !height) return 0;
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): BMICategory {
    if (bmi < BMI_CATEGORIES.UNDERWEIGHT.max) {
        return BMI_CATEGORIES.UNDERWEIGHT;
    } else if (bmi < BMI_CATEGORIES.NORMAL.max) {
        return BMI_CATEGORIES.NORMAL;
    } else if (bmi < BMI_CATEGORIES.OVERWEIGHT.max) {
        return BMI_CATEGORIES.OVERWEIGHT;
    } else {
        return BMI_CATEGORIES.OBESE;
    }
}

export function calculateMacros(weight: number, tdee: number): { protein: number; fat: number; carbs: number } {
    return {
        protein: Math.round(weight * 1.2),
        fat: Math.round((tdee * 0.25) / 9),
        carbs: Math.round((tdee * 0.50) / 4)
    };
}

export function calculateDailyNeeds(profile: UserProfile): DailyNeeds {
    const { age, weight, height, gender, activity } = profile;

    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activity);
    const macros = calculateMacros(weight, tdee);
    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);

    return {
        bmr: Math.round(bmr),
        tdee,
        bmi: bmi.toFixed(1),
        bmiCategory,
        calories: tdee,
        protein: macros.protein,
        fat: macros.fat,
        carbs: macros.carbs
    };
}

export function calculateFoodTotals(foods: FoodEntry[]): NutritionTotals {
    return foods.reduce((totals, food) => {
        const ratio = food.amount / 100;
        return {
            calories: totals.calories + (food.cal * ratio),
            protein: totals.protein + (food.prot * ratio),
            fat: totals.fat + (food.fat * ratio),
            carbs: totals.carbs + (food.carb * ratio)
        };
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });
}

export function getBMIIndicatorPosition(bmi: number): number {
    const minBMI = 15;
    const maxBMI = 35;
    const percent = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.max(0, Math.min(100, percent));
}

export default {
    ACTIVITY_LEVELS,
    BMI_CATEGORIES,
    calculateBMR,
    calculateTDEE,
    calculateBMI,
    getBMICategory,
    calculateMacros,
    calculateDailyNeeds,
    calculateFoodTotals,
    getBMIIndicatorPosition
};
