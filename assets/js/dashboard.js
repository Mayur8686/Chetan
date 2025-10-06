// dashboard.js
class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        this.loadData();
        this.createCharts();
        this.updateStats();
        this.generateInsights();
    }

    loadData() {
        this.activities = JSON.parse(localStorage.getItem('screenTimeActivities') || '{}');
        this.quizProgress = JSON.parse(localStorage.getItem('quizProgress') || '{}');
    }

    createCharts() {
        this.createTimeTrendChart();
        this.createActivityPieChart();
        this.createProductivityChart();
        this.createWeeklyPatternChart();
    }

    createTimeTrendChart() {
        const ctx = document.getElementById('timeTrendChart').getContext('2d');
        const data = this.getTimeTrendData();
        
        this.charts.timeTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Daily Screen Time (hours)',
                    data: data.values,
                    borderColor: '#0056d2',
                    backgroundColor: 'rgba(0, 86, 210, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Screen Time Over Time'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours'
                        }
                    }
                }
            }
        });
    }

    createActivityPieChart() {
        const ctx = document.getElementById('activityPieChart').getContext('2d');
        const data = this.getActivityDistribution();
        
        this.charts.activityPie = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        '#0056d2', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createProductivityChart() {
        const ctx = document.getElementById('productivityChart').getContext('2d');
        const data = this.getProductivityData();
        
        this.charts.productivity = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Productive', 'Leisure'],
                datasets: [{
                    label: 'Time (hours)',
                    data: [data.productive, data.leisure],
                    backgroundColor: ['#28a745', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createWeeklyPatternChart() {
        const ctx = document.getElementById('weeklyPatternChart').getContext('2d');
        const data = this.getWeeklyPatternData();
        
        this.charts.weeklyPattern = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Average Daily Usage (hours)',
                    data: data,
                    backgroundColor: '#0056d2'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    getTimeTrendData() {
        const days = 7; // Default to 7 days
        const labels = [];
        const values = [];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toDateString();
            const dayLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            labels.push(dayLabel);
            
            const activities = this.activities[dateString] || [];
            const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
            values.push(parseFloat((totalMinutes / 60).toFixed(1)));
        }
        
        return { labels, values };
    }

    getActivityDistribution() {
        const categories = {
            work: 0,
            social: 0,
            entertainment: 0,
            communication: 0,
            gaming: 0,
            other: 0
        };
        
        Object.values(this.activities).forEach(dayActivities => {
            dayActivities.forEach(activity => {
                categories[activity.type] += activity.duration;
            });
        });
        
        const labels = ['Work/Study', 'Social Media', 'Entertainment', 'Communication', 'Gaming', 'Other'];
        const values = Object.values(categories).map(minutes => parseFloat((minutes / 60).toFixed(1)));
        
        return { labels, values };
    }

    getProductivityData() {
        let productive = 0;
        let leisure = 0;
        
        Object.values(this.activities).forEach(dayActivities => {
            dayActivities.forEach(activity => {
                if (activity.type === 'work') {
                    productive += activity.duration;
                } else {
                    leisure += activity.duration;
                }
            });
        });
        
        return {
            productive: parseFloat((productive / 60).toFixed(1)),
            leisure: parseFloat((leisure / 60).toFixed(1))
        };
    }

    getWeeklyPatternData() {
        const weekDays = [0, 0, 0, 0, 0, 0, 0]; // Sunday to Saturday
        const dayCounts = [0, 0, 0, 0, 0, 0, 0];
        
        Object.entries(this.activities).forEach(([dateString, activities]) => {
            const date = new Date(dateString);
            const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
            
            const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
            weekDays[dayOfWeek] += totalMinutes;
            dayCounts[dayOfWeek]++;
        });
        
        // Calculate averages
        return weekDays.map((total, index) => {
            const count = dayCounts[index] || 1;
            return parseFloat((total / count / 60).toFixed(1));
        });
    }

    updateStats() {
        const stats = this.calculateStats();
        
        document.getElementById('avgDailyTime').textContent = stats.avgDailyTime;
        document.getElementById('goalAchievement').textContent = stats.goalAchievement;
        document.getElementById('productivityScore').textContent = stats.productivityScore;
        document.getElementById('daysTracked').textContent = stats.daysTracked;
    }

    calculateStats() {
        const activities = this.activities;
        const days = Object.keys(activities).length;
        
        if (days === 0) {
            return {
                avgDailyTime: '0h',
                goalAchievement: '0%',
                productivityScore: '0%',
                daysTracked: '0'
            };
        }
        
        let totalMinutes = 0;
        let productiveMinutes = 0;
        
        Object.values(activities).forEach(dayActivities => {
            dayActivities.forEach(activity => {
                totalMinutes += activity.duration;
                if (activity.type === 'work') {
                    productiveMinutes += activity.duration;
                }
            });
        });
        
        const avgDailyHours = (totalMinutes / days / 60).toFixed(1);
        const productivityScore = Math.round((productiveMinutes / totalMinutes) * 100) || 0;
        
        // Simple goal achievement calculation (assuming 3h daily goal)
        const goalMinutes = 3 * 60 * days;
        const goalAchievement = Math.round((totalMinutes / goalMinutes) * 100);
        
        return {
            avgDailyTime: `${avgDailyHours}h`,
            goalAchievement: `${Math.min(goalAchievement, 100)}%`,
            productivityScore: `${productivityScore}%`,
            daysTracked: days.toString()
        };
    }

    generateInsights() {
        const insights = this.calculateInsights();
        const container = document.getElementById('insightsContainer');
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-item ${insight.type}">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-content">
                    <h5>${insight.title}</h5>
                    <p>${insight.message}</p>
                </div>
            </div>
        `).join('');
    }

    calculateInsights() {
        const insights = [];
        const stats = this.calculateStats();
        const productivity = this.getProductivityData();
        
        // Productivity insight
        const productiveRatio = productivity.productive / (productivity.productive + productivity.leisure);
        if (productiveRatio < 0.3) {
            insights.push({
                type: 'warning',
                icon: '⚠️',
                title: 'Low Productivity Ratio',
                message: 'Only ' + Math.round(productiveRatio * 100) + '% of your screen time is productive. Consider setting specific work periods.'
            });
        } else if (productiveRatio > 0.6) {
            insights.push({
                type: 'success',
                icon: '🎉',
                title: 'Great Productivity Balance',
                message: Math.round(productiveRatio * 100) + '% of your screen time is productive. Excellent balance!'
            });
        }
        
        // Daily usage insight
        const avgHours = parseFloat(stats.avgDailyTime);
        if (avgHours > 5) {
            insights.push({
                type: 'warning',
                icon: '📱',
                title: 'High Daily Usage',
                message: `You're averaging ${avgHours} hours daily. Consider implementing screen-free periods.`
            });
        } else if (avgHours < 2) {
            insights.push({
                type: 'info',
                icon: 'ℹ️',
                title: 'Moderate Usage',
                message: `Your average of ${avgHours} hours daily shows good digital balance.`
            });
        }
        
        // Consistency insight
        const daysTracked = parseInt(stats.daysTracked);
        if (daysTracked < 3) {
            insights.push({
                type: 'info',
                icon: '📅',
                title: 'Track More Days',
                message: 'Track a few more days to get better insights into your usage patterns.'
            });
        }
        
        return insights;
    }
}

function updateDashboard() {
    const period = document.getElementById('timePeriod').value;
    // In a real app, this would filter data based on the selected period
    location.reload(); // Simple reload for demo
}

function exportData() {
    const activities = JSON.parse(localStorage.getItem('screenTimeActivities') || '{}');
    const dataStr = JSON.stringify(activities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'screen-time-data.json';
    link.click();
}

// Initialize dashboard
let dashboard;

document.addEventListener('DOMContentLoaded', function() {
    dashboard = new AnalyticsDashboard();
});