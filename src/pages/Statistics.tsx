
import WeeklyChart from '../components/WeeklyChart';
import { UserProfile } from '../types';
import { calculateDailyNeeds } from '../utils/calculator';
import { useStreak } from '../hooks/useStreak';

interface Props {
    profile: UserProfile | null;
}

export default function Statistics({ profile }: Props) {
    const { streak, level } = useStreak();
    const needs = profile ? calculateDailyNeeds(profile) : null;

    return (
        <div className="page__content">
            <WeeklyChart />

            {/* Streak Info */}
            <div className="card">
                <div className="card__header">
                    <span className="card__icon">🔥</span>
                    <h2 className="card__title">Streak Saat Ini</h2>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{ fontSize: '3rem' }}>{level.emoji}</div>
                    <h3>{streak} Hari Streak</h3>
                    <p style={{ color: level.color, fontWeight: 'bold' }}>{level.name}</p>
                </div>
            </div>

            {/* Energy Info Card */}
            {needs && (
                <div className="card energy-card">
                    <div className="card__header">
                        <span className="card__icon">⚡</span>
                        <h2 className="card__title">Kebutuhan Energi</h2>
                    </div>

                    <div className="energy-stats">
                        <div className="energy-stat">
                            <div className="energy-stat__icon">🔋</div>
                            <div className="energy-stat__info">
                                <div className="energy-stat__label">BMR</div>
                                <div className="energy-stat__value">{needs.bmr} kkal/hari</div>
                            </div>
                        </div>

                        <div className="energy-stat energy-stat--highlight">
                            <div className="energy-stat__icon">🔥</div>
                            <div className="energy-stat__info">
                                <div className="energy-stat__label">TDEE</div>
                                <div className="energy-stat__value">{needs.tdee} kkal/hari</div>
                            </div>
                        </div>

                        <div className="energy-breakdown">
                            <div className="energy-breakdown__title">📐 Distribusi Makro Ideal:</div>
                            <div className="energy-breakdown__items">
                                <div className="energy-breakdown__item">
                                    <span className="energy-breakdown__dot energy-breakdown__dot--protein"></span>
                                    <span>Protein: <strong>{needs.protein}g</strong> (20%)</span>
                                </div>
                                <div className="energy-breakdown__item">
                                    <span className="energy-breakdown__dot energy-breakdown__dot--fat"></span>
                                    <span>Lemak: <strong>{needs.fat}g</strong> (25%)</span>
                                </div>
                                <div className="energy-breakdown__item">
                                    <span className="energy-breakdown__dot energy-breakdown__dot--carbs"></span>
                                    <span>Karbo: <strong>{needs.carbs}g</strong> (50%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
