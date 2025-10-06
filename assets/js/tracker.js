// tracker.js
class ScreenTimeTracker {
    constructor() {
        this.activities = JSON.parse(localStorage.getItem('screenTimeActivities') || '{}');
        this.dailyGoal = parseInt(localStorage.getItem('dailyScreenTimeGoal') || '3');
        this.init();
    }

    init() {
        this.updateDisplay();
        this.setupEventListeners();
        this.renderWeekChart();
    }

    setupEventListeners() {
        document.getElementById('addTimeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addActivity();
        });

        document.getElementById('dailyGoal').addEventListener('change', (e) => {
            this.updateDailyGoal(parseInt(e.target.value));
        });
    }

    addActivity() {
        const type = document.getElementById('activityType').value;
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const description = document.getElementById('activityDesc').value || type;
        
        const totalMinutes = hours * 60 + minutes;
        
        if (!type || totalMinutes === 0) {
            alert('Please select activity type and enter duration');
            return;
        }

        const today = new Date().toDateString();
        if (!this.activities[today]) {
            this.activities[today] = [];
        }

        this.activities[today].push({
            type,
            duration: totalMinutes,
            description,
            timestamp: new Date().toISOString()
        });

        this.saveData();
        this.updateDisplay();
        this.closeAddTimeModal();
        this.resetForm();
    }

    updateDisplay() {
        const today = new Date().toDateString();
        const todayActivities = this.activities[today] || [];
        
        this.updateTodayTotal(todayActivities);
        this.updateActivityLog(todayActivities);
        this.updateGoalProgress(todayActivities);
        this.updateCategoryStats(todayActivities);
    }

    updateTodayTotal(activities) {
        const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        document.getElementById('todayTotal').textContent = `${hours}h ${minutes}m`;
        document.getElementById('dailyTotal').textContent = `${hours}h ${minutes}m`;
    }

    updateActivityLog(activities) {
        const logContainer = document.getElementById('activityLog');
        
        if (activities.length === 0) {
            logContainer.innerHTML = '<p class="no-data">No activities logged today. Click "Add Activity" to start tracking.</p>';
            return;
        }

        logContainer.innerHTML = activities.map(activity => `
            <div class="log-entry">
                <div class="log-info">
                    <strong>${activity.description}</strong>
                    <span class="log-type ${activity.type}">${this.getTypeLabel(activity.type)}</span>
                </div>
                <div class="log-duration">
                    ${this.formatDuration(activity.duration)}
                </div>
            </div>
        `).join('');
    }

    updateGoalProgress(activities) {
        const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
        const goalMinutes = this.dailyGoal * 60;
        const progress = Math.min((totalMinutes / goalMinutes) * 100, 100);
        
        document.getElementById('goalProgress').style.width = progress + '%';
        document.getElementById('goalText').textContent = 
            `${Math.round(progress)}% of daily goal (${this.dailyGoal}h)`;
    }

    updateCategoryStats(activities) {
        const categoryTotals = {
            work: 0,
            social: 0,
            entertainment: 0,
            communication: 0,
            gaming: 0,
            other: 0
        };

        activities.forEach(activity => {
            categoryTotals[activity.type] += activity.duration;
        });

        document.getElementById('productiveTime').textContent = 
            this.formatDuration(categoryTotals.work);
        document.getElementById('socialTime').textContent = 
            this.formatDuration(categoryTotals.social);
    }

    renderWeekChart() {
        const weekContainer = document.getElementById('weekChart');
        const weekData = this.getWeekData();
        
        weekContainer.innerHTML = weekData.map(day => `
            <div class="week-day">
                <div class="day-label">${day.label}</div>
                <div class="day-bar-container">
                    <div class="day-bar" style="height: ${day.percentage}%"></div>
                </div>
                <div class="day-total">${day.total}</div>
            </div>
        `).join('');
    }

    getWeekData() {
        const days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toDateString();
            
            const activities = this.activities[dateString] || [];
            const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
            const maxPossible = 24 * 60; // 24 hours in minutes
            
            days.push({
                label: date.toLocaleDateString('en-US', { weekday: 'short' }),
                total: this.formatDuration(totalMinutes),
                percentage: Math.min((totalMinutes / maxPossible) * 100, 100)
            });
        }
        
        return days;
    }

    updateDailyGoal(hours) {
        this.dailyGoal = hours;
        localStorage.setItem('dailyScreenTimeGoal', hours.toString());
        this.updateDisplay();
    }

    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    }

    getTypeLabel(type) {
        const labels = {
            social: 'Social Media',
            work: 'Work/Study',
            entertainment: 'Entertainment',
            communication: 'Communication',
            gaming: 'Gaming',
            other: 'Other'
        };
        return labels[type] || type;
    }

    saveData() {
        localStorage.setItem('screenTimeActivities', JSON.stringify(this.activities));
    }

    resetForm() {
        document.getElementById('addTimeForm').reset();
        document.getElementById('minutes').value = '30';
    }
}

// Modal functions
function showAddTimeModal() {
    document.getElementById('addTimeModal').style.display = 'block';
}

function closeAddTimeModal() {
    document.getElementById('addTimeModal').style.display = 'none';
}

// Initialize tracker
let tracker;

document.addEventListener('DOMContentLoaded', function() {
    tracker = new ScreenTimeTracker();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('addTimeModal');
        if (event.target === modal) {
            closeAddTimeModal();
        }
    });
});