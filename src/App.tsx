import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import { useStreak } from './hooks/useStreak';
import { loadProfile, loadDailyData, saveDailyData, getTodayDateString } from './services/storage';
import { FoodEntry, FoodItem, UserProfile } from './types';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [foods, setFoods] = useState<FoodEntry[]>([]);
    const { streak, level } = useStreak();

    // Load initial data
    useEffect(() => {
        const savedProfile = loadProfile();
        setProfile(savedProfile);
        loadTodayFoods();
    }, []);

    const loadTodayFoods = () => {
        const today = getTodayDateString();
        const data = loadDailyData(today);
        setFoods(data.foods);
    };

    const handleAddFood = (foodItem: FoodItem, amount: number, meal: string) => {
        const newEntry: FoodEntry = { ...foodItem, amount, meal };
        const updatedFoods = [...foods, newEntry];
        setFoods(updatedFoods);

        // Persist
        const today = getTodayDateString();
        // Note: We should ideally also save water, but here we might prefer to just update foods.
        // However, saveDailyData overwrites the entry. We need to be careful not to lose water data.
        // The clean way is to re-load the current day object, update foods, and save back.
        // Optimistic update:
        const currentData = loadDailyData(today);
        saveDailyData(today, updatedFoods, currentData.water);
    };

    const handleRemoveFood = (index: number) => {
        const updatedFoods = foods.filter((_, i) => i !== index);
        setFoods(updatedFoods);
        const today = getTodayDateString();
        const currentData = loadDailyData(today);
        saveDailyData(today, updatedFoods, currentData.water);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard profile={profile} foods={foods} onNavigate={setCurrentPage} />;
            case 'food':
                return <FoodLog foods={foods} onAddFood={handleAddFood} onRemoveFood={handleRemoveFood} />;
            case 'stats':
                return <Statistics profile={profile} />;
            case 'profile':
                return <Profile profile={profile} onProfileUpdate={setProfile} />;
            default:
                return <Dashboard profile={profile} foods={foods} onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="app-container">
            {/* Header */}
            <header className="app-header app-header--compact">
                <div className="app-header__content">
                    <h1 className="app-header__logo">🔬 NutriScan</h1>
                    <div className="streak-badge" style={{ borderColor: level.color, color: level.color }}>
                        <span className="streak-badge__emoji">{level.emoji}</span>
                        <span className="streak-badge__count">{streak} Hari</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="page-container">
                <section className="page page--active">
                    {renderPage()}
                </section>
            </main>

            {/* Navigation */}
            <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
    );
}

export default App;
