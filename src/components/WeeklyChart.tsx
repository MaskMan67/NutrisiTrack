import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { loadWeeklyData } from '../services/storage';
import { calculateFoodTotals } from '../utils/calculator';
import { WeeklyStats } from '../types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function WeeklyChart() {
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        labels: [],
        datasets: []
    });
    const [summary, setSummary] = useState({ avgCalories: 0, activeDays: 0 });

    useEffect(() => {
        const weekData = loadWeeklyData();
        processData(weekData);
    }, []);

    const processData = (weekData: WeeklyStats[]) => {
        const labels = weekData.map(d => d.dayName);
        const caloriesData = weekData.map(d => Math.round(calculateFoodTotals(d.foods).calories));
        const proteinData = weekData.map(d => Number(calculateFoodTotals(d.foods).protein.toFixed(1)));

        // Calculate summary
        let totalCalories = 0;
        let activeDays = 0;
        weekData.forEach(d => {
            const cals = calculateFoodTotals(d.foods).calories;
            if (cals > 0) {
                totalCalories += cals;
                activeDays++;
            }
        });
        const avgCalories = activeDays > 0 ? Math.round(totalCalories / activeDays) : 0;
        setSummary({ avgCalories, activeDays });

        // Set Chart Data
        setChartData({
            labels,
            datasets: [
                {
                    label: 'Kalori (kkal)',
                    data: caloriesData,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    yAxisID: 'y',
                },
                {
                    label: 'Protein (g)',
                    data: proteinData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    yAxisID: 'y1',
                },
            ],
        });
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: { display: true, text: 'Kalori (kkal)', color: 'rgba(255, 99, 132, 1)' }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: { display: true, text: 'Protein (g)', color: 'rgba(54, 162, 235, 1)' },
                grid: { drawOnChartArea: false },
            },
            x: {
                grid: { display: false }
            }
        },
    };

    return (
        <div className="card weekly-chart-card">
            <div className="card__header">
                <span className="card__icon">📈</span>
                <h2 className="card__title">Statistik Mingguan</h2>
            </div>
            <div className="chart-container weekly-chart">
                <Bar options={options} data={chartData} />
            </div>
            <div className="weekly-stats-summary">
                <div className="weekly-stat">
                    <span className="weekly-stat__icon">🔥</span>
                    <span className="weekly-stat__label">Rata-rata Kalori</span>
                    <span className="weekly-stat__value">{summary.avgCalories} kkal</span>
                </div>
                <div className="weekly-stat">
                    <span className="weekly-stat__icon">📆</span>
                    <span className="weekly-stat__label">Total Hari Aktif</span>
                    <span className="weekly-stat__value">{summary.activeDays} hari</span>
                </div>
            </div>
        </div>
    );
}
