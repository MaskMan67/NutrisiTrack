
import { useHydration } from '../hooks/useHydration';

import { calculateDailyNeeds, calculateFoodTotals, getBMIIndicatorPosition } from '../utils/calculator';
import { FoodEntry, UserProfile } from '../types';

interface Props {
    profile: UserProfile | null;
    foods: FoodEntry[];
    onNavigate: (page: string) => void;
}

export default function Dashboard({ profile, foods, onNavigate }: Props) {
    const { count: waterCount, addWater, resetWater, percentage: waterPercent, isTargetReached } = useHydration();


    // Derived state
    const needs = profile ? calculateDailyNeeds(profile) : null;
    const totals = calculateFoodTotals(foods);

    // Progress percentages
    const getPercent = (current: number, target: number) => {
        if (!target) return 0;
        return Math.min((current / target) * 100, 100);
    };

    const calPercent = needs ? getPercent(totals.calories, needs.calories) : 0;
    const protPercent = needs ? getPercent(totals.protein, needs.protein) : 0;
    const fatPercent = needs ? getPercent(totals.fat, needs.fat) : 0;
    const carbPercent = needs ? getPercent(totals.carbs, needs.carbs) : 0;

    const bmiPosition = needs ? getBMIIndicatorPosition(parseFloat(needs.bmi)) : 0;

    if (!profile || !needs) {
        return (
            <div className="page__content">
                <div className="card">
                    <div className="card__header">
                        <h2 className="card__title">Selamat Datang!</h2>
                    </div>
                    <p>Silakan lengkapi profil Anda terlebih dahulu.</p>
                    <button className="btn btn--primary btn--block mt-md" onClick={() => onNavigate('profile')}>
                        Buka Profil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page__content">
            {/* BMI Card */}
            <div className="card">
                <div className="card__header">
                    <span className="card__icon">⚖️</span>
                    <h2 className="card__title">Indeks Massa Tubuh</h2>
                </div>
                <div className="bmi-display">
                    <div className="bmi-value">{needs.bmi}</div>
                    <div className="bmi-status" style={{ color: needs.bmiCategory.color }}>
                        {needs.bmiCategory.label}
                    </div>
                    <div className="bmi-bar">
                        <div
                            className="bmi-indicator"
                            style={{ left: `${bmiPosition}%` }}
                        ></div>
                    </div>
                    <p className="bmi-tip">{needs.bmiCategory.tip}</p>
                </div>
            </div>

            {/* Daily Progress Card */}
            <div className="card stats-card">
                <div className="card__header">
                    <span className="card__icon">📊</span>
                    <h2 className="card__title">Progress Hari Ini</h2>
                </div>

                <div className="progress-stats">
                    {/* Calories */}
                    <div className="progress-stat">
                        <div className="progress-stat__header">
                            <span className="progress-stat__label">🔥 Kalori</span>
                            <span className="progress-stat__percent">{Math.round(calPercent)}%</span>
                            <span className="progress-stat__values">{Math.round(totals.calories)} / {needs.calories} kkal</span>
                        </div>
                        <div className="progress-bar-track">
                            <div
                                className={`progress-bar-fill progress-bar-fill--calories ${calPercent > 100 ? 'overflow' : ''}`}
                                style={{ width: `${calPercent}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Protein */}
                    <div className="progress-stat">
                        <div className="progress-stat__header">
                            <span className="progress-stat__label">🥩 Protein</span>
                            <span className="progress-stat__percent">{Math.round(protPercent)}%</span>
                            <span className="progress-stat__values">{totals.protein.toFixed(1)} / {needs.protein}g</span>
                        </div>
                        <div className="progress-bar-track">
                            <div
                                className="progress-bar-fill progress-bar-fill--protein"
                                style={{ width: `${protPercent}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Fat */}
                    <div className="progress-stat">
                        <div className="progress-stat__header">
                            <span className="progress-stat__label">🧈 Lemak</span>
                            <span className="progress-stat__percent">{Math.round(fatPercent)}%</span>
                            <span className="progress-stat__values">{totals.fat.toFixed(1)} / {needs.fat}g</span>
                        </div>
                        <div className="progress-bar-track">
                            <div
                                className="progress-bar-fill progress-bar-fill--fat"
                                style={{ width: `${fatPercent}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Carbs */}
                    <div className="progress-stat">
                        <div className="progress-stat__header">
                            <span className="progress-stat__label">🍚 Karbohidrat</span>
                            <span className="progress-stat__percent">{Math.round(carbPercent)}%</span>
                            <span className="progress-stat__values">{totals.carbs.toFixed(1)} / {needs.carbs}g</span>
                        </div>
                        <div className="progress-bar-track">
                            <div
                                className="progress-bar-fill progress-bar-fill--carbs"
                                style={{ width: `${carbPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Remaining Display */}
                <div className={`remaining-display ${calPercent >= 100 ? 'complete' : ''}`}>
                    <div className="remaining-display__title">Sisa Kebutuhan:</div>
                    <div className="remaining-display__values">
                        <span className="remaining-item remaining-item--calories">
                            {Math.max(0, needs.calories - Math.round(totals.calories))} kkal
                        </span>
                        <span className="remaining-item remaining-item--protein">
                            {Math.max(0, needs.protein - totals.protein).toFixed(1)}g protein
                        </span>
                    </div>
                </div>
            </div>

            {/* Water Tracker */}
            <div className="card">
                <div className="card__header">
                    <span className="card__icon">💧</span>
                    <h2 className="card__title">Hidrasi Harian</h2>
                </div>

                <div className="water-tracker">
                    <div className="water-visual">
                        <div className="water-glass">
                            <div
                                className="water-level"
                                style={{
                                    height: `${waterPercent}%`,
                                    background: isTargetReached ? 'linear-gradient(180deg, #4ade80, #22c55e)' : undefined
                                }}
                            ></div>
                        </div>
                        <div className="water-stats">
                            <div className="water-count">{waterCount}</div>
                            <div className="water-label">Gelas (250ml)</div>
                        </div>
                    </div>
                    <div className="water-progress">
                        <div
                            className="water-progress__fill"
                            style={{ width: `${waterPercent}%` }}
                        ></div>
                    </div>
                    <div className="water-controls">
                        <button className="btn btn--water-add" onClick={addWater}>+ Minum</button>
                        <button className="btn btn--secondary btn--sm" onClick={resetWater}>Reset</button>
                    </div>
                </div>
            </div>

            {/* Quick Add Button */}
            <button className="btn btn--primary btn--block btn--fab" onClick={() => onNavigate('food')}>
                🍽️ Tambah Makanan
            </button>
        </div>
    );
}
