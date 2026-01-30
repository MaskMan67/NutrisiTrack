/**
 * NutriScan - Hydration Module
 * Water tracking with animated visual feedback
 */

import { saveWater, loadWater } from './storage.js';

// Daily water target: 8 glasses (2 liters)
const WATER_TARGET = 8;
const GLASS_SIZE_ML = 250;

// State
let waterCount = 0;

// DOM Elements (initialized on setup)
let waterCountEl = null;
let waterLevelEl = null;
let waterProgressEl = null;

/**
 * Initialize hydration tracker
 */
export function initHydration() {
    waterCountEl = document.getElementById('waterCount');
    waterLevelEl = document.getElementById('waterLevel');
    waterProgressEl = document.getElementById('waterProgress');

    // Load saved water count
    waterCount = loadWater();

    // Update visual
    updateWaterVisual();
}

/**
 * Add one glass of water
 * @returns {boolean} True if water was added (not at max)
 */
export function addWater() {
    if (waterCount >= WATER_TARGET) {
        return false;
    }

    waterCount++;
    saveWater(waterCount);
    updateWaterVisual();

    // Return true to indicate success (for toast notification)
    return true;
}

/**
 * Reset water count to zero
 */
export function resetWater() {
    waterCount = 0;
    saveWater(waterCount);
    updateWaterVisual();
}

/**
 * Get current water count
 * @returns {number} Current water count
 */
export function getWaterCount() {
    return waterCount;
}

/**
 * Get water target
 * @returns {number} Daily water target in glasses
 */
export function getWaterTarget() {
    return WATER_TARGET;
}

/**
 * Get total water consumed in milliliters
 * @returns {number} Water consumed in ml
 */
export function getWaterInML() {
    return waterCount * GLASS_SIZE_ML;
}

/**
 * Get water progress percentage
 * @returns {number} Percentage 0-100
 */
export function getWaterProgress() {
    return Math.min((waterCount / WATER_TARGET) * 100, 100);
}

/**
 * Check if water target is reached
 * @returns {boolean} True if target reached
 */
export function isWaterTargetReached() {
    return waterCount >= WATER_TARGET;
}

/**
 * Update all water visual elements
 */
function updateWaterVisual() {
    if (!waterCountEl || !waterLevelEl || !waterProgressEl) return;

    const percentage = getWaterProgress();

    // Update count display
    waterCountEl.textContent = waterCount;

    // Update glass water level (animated via CSS)
    waterLevelEl.style.height = percentage + '%';

    // Update progress bar
    waterProgressEl.style.width = percentage + '%';

    // Add celebration effect when target reached
    if (isWaterTargetReached()) {
        waterLevelEl.style.background = 'linear-gradient(180deg, #4ade80, #22c55e)';
    } else {
        waterLevelEl.style.background = 'linear-gradient(180deg, #38bdf8, #0284c7)';
    }
}

export default {
    initHydration,
    addWater,
    resetWater,
    getWaterCount,
    getWaterTarget,
    getWaterInML,
    getWaterProgress,
    isWaterTargetReached
};
