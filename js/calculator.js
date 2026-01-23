/**
 * NutriScan - Calculator Module
 * Scientific calculations for BMR, TDEE, BMI, and macro distribution
 * Based on Mifflin-St Jeor Equation (most accurate for modern populations)
 */

/**
 * Activity level multipliers for TDEE calculation
 */
export const ACTIVITY_LEVELS = {
    SEDENTARY: { value: 1.2, label: 'Sedentari (jarang olahraga)' },
    LIGHT: { value: 1.375, label: 'Ringan (1-3x/minggu)' },
    MODERATE: { value: 1.55, label: 'Moderat (3-5x/minggu)' },
    ACTIVE: { value: 1.725, label: 'Aktif (6-7x/minggu)' },
    VERY_ACTIVE: { value: 1.9, label: 'Sangat Aktif (atlet)' }
};

/**
 * BMI Categories according to WHO classification
 */
export const BMI_CATEGORIES = {
    UNDERWEIGHT: { max: 18.5, label: 'Kurus (Underweight)', color: '#3b82f6', tip: '⚠️ Perbanyak asupan protein dan karbohidrat kompleks.' },
    NORMAL: { max: 25, label: 'Normal (Ideal)', color: '#22c55e', tip: '✅ Pertahankan gaya hidup sehat Anda!' },
    OVERWEIGHT: { max: 30, label: 'Gemuk (Overweight)', color: '#f59e0b', tip: '⚠️ Kurangi gula/lemak, tambah aktivitas fisik.' },
    OBESE: { max: Infinity, label: 'Obesitas', color: '#ef4444', tip: '🚨 Segera konsultasikan ke dokter/ahli gizi.' }
};

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
 * This is the most accurate equation for modern populations
 * 
 * @param {number} weight - Weight in kilograms
 * @param {number} height - Height in centimeters
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in kcal/day
 */
export function calculateBMR(weight, height, age, gender) {
    // Mifflin-St Jeor Equation:
    // Male:   BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5
    // Female: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161

    const baseBMR = (10 * weight) + (6.25 * height) - (5 * age);

    if (gender === 'male') {
        return baseBMR + 5;
    } else {
        return baseBMR - 161;
    }
}

/**
 * Calculate Total Daily Energy Expenditure
 * TDEE = BMR × Activity Factor
 * 
 * @param {number} bmr - Basal Metabolic Rate
 * @param {number} activityFactor - Activity level multiplier (1.2 - 1.9)
 * @returns {number} TDEE in kcal/day (rounded)
 */
export function calculateTDEE(bmr, activityFactor) {
    return Math.round(bmr * activityFactor);
}

/**
 * Calculate Body Mass Index
 * BMI = weight(kg) / height(m)²
 * 
 * @param {number} weight - Weight in kilograms
 * @param {number} height - Height in centimeters
 * @returns {number} BMI value
 */
export function calculateBMI(weight, height) {
    if (!weight || !height) return 0;

    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

/**
 * Get BMI category based on WHO classification
 * 
 * @param {number} bmi - BMI value
 * @returns {Object} Category object with label, color, and tip
 */
export function getBMICategory(bmi) {
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

/**
 * Calculate recommended macronutrient distribution
 * Based on active student requirements
 * 
 * Protein: 1.2g per kg body weight (higher for active youth)
 * Fat: 25% of TDEE (9 kcal per gram)
 * Carbohydrates: 50% of TDEE (4 kcal per gram)
 * 
 * @param {number} weight - Weight in kilograms
 * @param {number} tdee - Total Daily Energy Expenditure
 * @returns {Object} Macro distribution in grams
 */
export function calculateMacros(weight, tdee) {
    return {
        protein: Math.round(weight * 1.2),        // 1.2g per kg for active students
        fat: Math.round((tdee * 0.25) / 9),       // 25% of calories, 9 kcal/g
        carbs: Math.round((tdee * 0.50) / 4)      // 50% of calories, 4 kcal/g
    };
}

/**
 * Calculate all nutritional needs based on user profile
 * 
 * @param {Object} profile - User profile { age, weight, height, gender, activity }
 * @returns {Object} Complete nutritional requirements
 */
export function calculateDailyNeeds(profile) {
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

/**
 * Calculate nutrition totals from a list of foods
 * 
 * @param {Array} foods - Array of food items with amounts
 * @returns {Object} Total nutrition { calories, protein, fat, carbs }
 */
export function calculateFoodTotals(foods) {
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

/**
 * Get BMI indicator position as percentage (for visual bar)
 * Maps BMI 15-35 to 0-100%
 * 
 * @param {number} bmi - BMI value
 * @returns {number} Position percentage (0-100)
 */
export function getBMIIndicatorPosition(bmi) {
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
