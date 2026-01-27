/**
 * NutriScan - Streak Module
 * Daily usage tracking with gamification
 */

import { saveStreak, loadStreak } from './storage.js';

// State
let currentStreak = 0;
let lastVisitDate = null;

// DOM Elements
let streakDisplayEl = null;

/**
 * Initialize streak system
 * Called on app startup
 */
export function initStreak() {
    streakDisplayEl = document.getElementById('streakDisplay');

    // Load saved streak data
    const { streak, lastVisit } = loadStreak();

    const today = new Date().toDateString();

    if (lastVisit !== today) {
        // New day - calculate streak
        if (lastVisit) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastVisit === yesterday.toDateString()) {
                // Consecutive day - increment streak
                currentStreak = streak + 1;
            } else {
                // Streak broken - reset to 1
                currentStreak = 1;
            }
        } else {
            // First visit ever
            currentStreak = 1;
        }

        // Save new streak data
        lastVisitDate = today;
        saveStreak(currentStreak, today);
    } else {
        // Same day - keep current streak
        currentStreak = streak;
        lastVisitDate = today;
    }

    // Update display
    updateStreakDisplay();
}

/**
 * Get current streak count
 * @returns {number} Current streak in days
 */
export function getStreak() {
    return currentStreak;
}

/**
 * Get streak level/tier based on streak count
 * @returns {Object} Level info { name, emoji, color }
 */
export function getStreakLevel() {
    if (currentStreak >= 365) {
        return { name: 'Legenda', emoji: '👑', color: '#fbbf24' };
    } else if (currentStreak >= 100) {
        return { name: 'Master', emoji: '💎', color: '#a855f7' };
    } else if (currentStreak >= 30) {
        return { name: 'Pro', emoji: '🌟', color: '#22c55e' };
    } else if (currentStreak >= 7) {
        return { name: 'Rajin', emoji: '🔥', color: '#f59e0b' };
    } else {
        return { name: 'Pemula', emoji: '🌱', color: '#94a3b8' };
    }
}

/**
 * Update streak display in UI
 */
function updateStreakDisplay() {
    if (!streakDisplayEl) return;

    const level = getStreakLevel();

    streakDisplayEl.innerHTML = `
        <span class="streak-badge__emoji">${level.emoji}</span>
        <span class="streak-badge__count">${currentStreak} Hari Streak</span>
    `;

    // Apply level color
    streakDisplayEl.style.borderColor = level.color;
    streakDisplayEl.style.color = level.color;
}

/**
 * Get motivational message based on streak
 * @returns {string} Motivational message
 */
export function getStreakMessage() {
    if (currentStreak === 1) {
        return "Selamat datang! Mulai perjalanan sehatmu hari ini! 🌱";
    } else if (currentStreak < 7) {
        return `${currentStreak} hari berturut-turut! Terus semangat! 💪`;
    } else if (currentStreak < 30) {
        return `Luar biasa! ${currentStreak} hari streak! Kamu hebat! 🔥`;
    } else if (currentStreak < 100) {
        return `WOW! ${currentStreak} hari! Kamu sudah jadi Pro! 🌟`;
    } else {
        return `LEGENDARIS! ${currentStreak} hari streak! 👑`;
    }
}

export default {
    initStreak,
    getStreak,
    getStreakLevel,
    getStreakMessage
};
