import { useState, useEffect } from 'react';
import { loadWater, saveWater } from '../services/storage';

const WATER_TARGET = 8;
const GLASS_SIZE_ML = 250;

export function useHydration() {
    const [count, setCount] = useState(0);

    // Initial load
    useEffect(() => {
        const saved = loadWater();
        setCount(saved);
    }, []);

    const addWater = () => {
        if (count >= WATER_TARGET) return false;
        const newCount = count + 1;
        setCount(newCount);
        saveWater(newCount);
        return true;
    };

    const resetWater = () => {
        setCount(0);
        saveWater(0);
    };

    const percentage = Math.min((count / WATER_TARGET) * 100, 100);
    const volumeML = count * GLASS_SIZE_ML;
    const isTargetReached = count >= WATER_TARGET;

    return {
        count,
        target: WATER_TARGET,
        percentage,
        volumeML,
        isTargetReached,
        addWater,
        resetWater
    };
}
