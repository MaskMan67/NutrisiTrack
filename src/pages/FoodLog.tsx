import { useState, useMemo } from 'react';
import { FoodEntry, FoodItem } from '../types';
import { searchFoods, FOOD_CATEGORIES } from '../services/foodDatabase';
import { calculateFoodTotals } from '../utils/calculator';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    foods: FoodEntry[];
    onAddFood: (food: FoodItem, amount: number, meal: string) => void;
    onRemoveFood: (index: number) => void;
}

export default function FoodLog({ foods, onAddFood, onRemoveFood }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [portion, setPortion] = useState(100);
    const [mealTime, setMealTime] = useState('Sarapan');

    const searchResults = useMemo(() => {
        return searchFoods(searchQuery, { category: selectedCategory });
    }, [searchQuery, selectedCategory]);

    const handleAdd = () => {
        if (!selectedFood) return;
        onAddFood(selectedFood, portion, mealTime);
        setSelectedFood(null);
        setSearchQuery('');
        setPortion(100);
    };

    const totals = calculateFoodTotals(foods);
    const chartData = {
        labels: ['Protein', 'Lemak', 'Karbo'],
        datasets: [{
            data: [totals.protein, totals.fat, totals.carbs],
            backgroundColor: ['#3b82f6', '#f59e0b', '#22c55e'],
            borderWidth: 0,
        }]
    };

    // Group foods by meal
    const groupedFoods = foods.reduce((acc, food, index) => {
        if (!acc[food.meal]) acc[food.meal] = [];
        acc[food.meal].push({ ...food, originalIndex: index });
        return acc;
    }, {} as Record<string, (FoodEntry & { originalIndex: number })[]>);

    return (
        <div className="page__content">
            {/* Find Food Card */}
            <div className="card">
                <div className="card__header">
                    <span className="card__icon">🍽️</span>
                    <h2 className="card__title">Tambah Makanan</h2>
                </div>

                <div className="form-group">
                    <label className="form-label">🏷️ Kategori</label>
                    <div className="category-tabs">
                        {FOOD_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-tab ${selectedCategory === cat.id ? 'category-tab--active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group food-search">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="🔍 Cari makanan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery.length > 0 && (
                        <div className="search-results active" style={{ position: 'static', maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border-light)', marginTop: '0.5rem' }}>
                            {searchResults.slice(0, 10).map(food => (
                                <div
                                    key={food.name}
                                    className="search-item"
                                    onClick={() => setSelectedFood(food)}
                                >
                                    <span className="search-item__name">{food.name}</span>
                                    <span className="search-item__cal">{food.cal} kkal/100g</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedFood && (
                    <div className="selected-food-preview" style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                        <h3 onClick={() => setSelectedFood(null)} style={{ cursor: 'pointer' }}>Selected: {selectedFood.name} (Click to cancel)</h3>
                        <div className="form-group portion-slider-group">
                            <label className="form-label">⚖️ Porsi: {portion}g</label>
                            <div className="portion-slider-container">
                                <input
                                    type="range"
                                    min="25"
                                    max="500"
                                    step="25"
                                    value={portion}
                                    onChange={(e) => setPortion(Number(e.target.value))}
                                    className="portion-slider"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <select
                                className="form-select"
                                value={mealTime}
                                onChange={(e) => setMealTime(e.target.value)}
                            >
                                <option value="Sarapan">🌅 Sarapan</option>
                                <option value="Makan Siang">☀️ Makan Siang</option>
                                <option value="Makan Malam">🌙 Makan Malam</option>
                                <option value="Snack">🍿 Snack</option>
                            </select>
                        </div>
                        <button className="btn btn--primary btn--block" onClick={handleAdd}>Tambah</button>
                    </div>
                )}

                <div className="food-list">
                    {Object.keys(groupedFoods).map(meal => (
                        <div key={meal} className="meal-group">
                            <h4 className="meal-group__title">{meal}</h4>
                            {groupedFoods[meal].map(food => (
                                <div key={food.originalIndex} className="food-item">
                                    <div>
                                        <div className="food-item__name">{food.name}</div>
                                        <div className="food-item__details">{food.amount}g • {Math.round(food.cal * food.amount / 100)} kkal</div>
                                    </div>
                                    <button className="food-item__remove" onClick={() => onRemoveFood(food.originalIndex)}>×</button>
                                </div>
                            ))}
                        </div>
                    ))}
                    {foods.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state__icon">🥗</div>
                            <div>Belum ada menu hari ini</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Nutrition Summary Chart */}
            <div className="card">
                <div className="card__header">
                    <span className="card__icon">📊</span>
                    <h2 className="card__title">Ringkasan Nutrisi</h2>
                </div>
                <div className="chart-container" style={{ height: '200px' }}>
                    <Doughnut data={chartData} options={{ maintainAspectRatio: false, cutout: '70%' }} />
                </div>
                <div className="nutrition-totals">
                    <div className="nutrition-totals__item" style={{ color: '#ff6384' }}>Kalori: {Math.round(totals.calories)}</div>
                    <div className="nutrition-totals__item" style={{ color: '#36a2eb' }}>Protein: {totals.protein.toFixed(1)}g</div>
                    <div className="nutrition-totals__item" style={{ color: '#ffcd56' }}>Lemak: {totals.fat.toFixed(1)}g</div>
                    <div className="nutrition-totals__item" style={{ color: '#4bc0c0' }}>Karbo: {totals.carbs.toFixed(1)}g</div>
                </div>
            </div>
        </div>
    );
}
