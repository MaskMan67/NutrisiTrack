import { useState, useEffect } from 'react';
import { loadStreak, saveStreak, getTodayDateString } from '../services/storage';
import { StreakData } from '../types';

export function useStreak() {
    const [streakData, setStreakData] = useState<StreakData>({ streak: 0, lastVisit: null });

    useEffect(() => {
        const { streak, lastVisit } = loadStreak();
        const today = getTodayDateString();

        let currentStreak = streak;
        let newStreakData = { streak, lastVisit };

        if (lastVisit !== today) {
            // Logic to calculate new streak
            if (lastVisit) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastVisit === yesterdayStr) {
                    currentStreak = streak + 1;
                } else {
                    currentStreak = 1;
                }
            } else {
                currentStreak = 1;
            }

            saveStreak(currentStreak, today);
            newStreakData = { streak: currentStreak, lastVisit: today };
        }

        setStreakData(newStreakData);
    }, []);

    const getStreakLevel = () => {
        const { streak } = streakData;
        if (streak >= 365) return { name: 'Legenda', emoji: '👑', color: '#fbbf24' };
        if (streak >= 100) return { name: 'Master', emoji: '💎', color: '#a855f7' };
        if (streak >= 30) return { name: 'Pro', emoji: '🌟', color: '#22c55e' };
        if (streak >= 7) return { name: 'Rajin', emoji: '🔥', color: '#f59e0b' };
        return { name: 'Pemula', emoji: '🌱', color: '#94a3b8' };
    };

    const getStreakMessage = () => {
        const { streak } = streakData;
        if (streak === 1) return "Selamat datang! Mulai perjalanan sehatmu hari ini! 🌱";
        if (streak < 7) return `${streak} hari berturut-turut! Terus semangat! 💪`;
        if (streak < 30) return `Luar biasa! ${streak} hari streak! Kamu hebat! 🔥`;
        if (streak < 100) return `WOW! ${streak} hari! Kamu sudah jadi Pro! 🌟`;
        return `LEGENDARIS! ${streak} hari streak! 👑`;
    };

    return {
        streak: streakData.streak,
        level: getStreakLevel(),
        message: getStreakMessage()
    };
}
