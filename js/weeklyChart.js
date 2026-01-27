/**
 * NutriScan - Weekly Chart Module
 * Handles weekly nutrition chart visualization
 */

import { loadWeeklyData } from './storage.js';
import { calculateFoodTotals } from './calculator.js';

// Chart instance
let weeklyChart = null;

// DOM Elements
let chartCanvas = null;
let avgCaloriesEl = null;
let activeDaysEl = null;

/**
 * Initialize weekly chart
 */
export function initWeeklyChart() {
    chartCanvas = document.getElementById('weeklyChart');
    avgCaloriesEl = document.getElementById('avgCalories');
    activeDaysEl = document.getElementById('activeDays');

    if (chartCanvas) {
        createWeeklyChart();
    }
}

/**
 * Create the weekly bar chart
 */
function createWeeklyChart() {
    const weekData = loadWeeklyData();
    const { labels, caloriesData, proteinData } = processWeeklyData(weekData);

    const ctx = chartCanvas.getContext('2d');

    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Kalori (kkal)',
                    data: caloriesData,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    yAxisID: 'y'
                },
                {
                    label: 'Protein (g)',
                    data: proteinData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim() || '#1e293b',
                        font: {
                            family: 'Poppins',
                            size: 11
                        },
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: {
                        family: 'Poppins',
                        size: 12
                    },
                    bodyFont: {
                        family: 'Poppins',
                        size: 11
                    },
                    padding: 10,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#64748b',
                        font: {
                            family: 'Poppins',
                            size: 11
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Kalori (kkal)',
                        color: 'rgba(255, 99, 132, 1)',
                        font: {
                            family: 'Poppins',
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#64748b'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Protein (g)',
                        color: 'rgba(54, 162, 235, 1)',
                        font: {
                            family: 'Poppins',
                            size: 11
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#64748b'
                    }
                }
            }
        }
    });

    // Update summary stats
    updateWeeklySummary(weekData);
}

/**
 * Process weekly data for chart
 */
function processWeeklyData(weekData) {
    const labels = [];
    const caloriesData = [];
    const proteinData = [];

    weekData.forEach(day => {
        labels.push(day.dayName);
        const totals = calculateFoodTotals(day.foods);
        caloriesData.push(Math.round(totals.calories));
        proteinData.push(Math.round(totals.protein * 10) / 10);
    });

    return { labels, caloriesData, proteinData };
}

/**
 * Update weekly summary statistics
 */
function updateWeeklySummary(weekData) {
    let totalCalories = 0;
    let activeDays = 0;

    weekData.forEach(day => {
        const totals = calculateFoodTotals(day.foods);
        if (totals.calories > 0) {
            totalCalories += totals.calories;
            activeDays++;
        }
    });

    const avgCalories = activeDays > 0 ? Math.round(totalCalories / activeDays) : 0;

    if (avgCaloriesEl) {
        avgCaloriesEl.textContent = avgCalories + ' kkal';
    }
    if (activeDaysEl) {
        activeDaysEl.textContent = activeDays + ' hari';
    }
}

/**
 * Update the weekly chart with latest data
 */
export function updateWeeklyChart() {
    if (!weeklyChart) {
        initWeeklyChart();
        return;
    }

    const weekData = loadWeeklyData();
    const { labels, caloriesData, proteinData } = processWeeklyData(weekData);

    weeklyChart.data.labels = labels;
    weeklyChart.data.datasets[0].data = caloriesData;
    weeklyChart.data.datasets[1].data = proteinData;
    weeklyChart.update();

    updateWeeklySummary(weekData);
}

/**
 * Destroy chart instance
 */
export function destroyWeeklyChart() {
    if (weeklyChart) {
        weeklyChart.destroy();
        weeklyChart = null;
    }
}

export default {
    initWeeklyChart,
    updateWeeklyChart,
    destroyWeeklyChart
};
