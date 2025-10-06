// Mobile Awareness Project - Main JavaScript File
class MobileAwarenessApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupServiceWorker();
        this.loadUserPreferences();
        this.initializeComponents();
        this.setupEventListeners();
        this.updateDynamicContent();
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('Service Worker registered'))
                .catch(error => console.log('Service Worker registration failed:', error));
        }
    }

    loadUserPreferences() {
        // Load dark mode preference
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
        }

        // Load font size preference
        const fontSize = localStorage.getItem('fontSize') || 'medium';
        document.body.style.fontSize = this.getFontSizeValue(fontSize);
    }

    getFontSizeValue(size) {
        const sizes = { small: '14px', medium: '16px', large: '18px' };
        return sizes[size] || '16px';
    }

    initializeComponents() {
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.initializePageSpecificFeatures();
    }

    setupMobileMenu() {
        const nav = document.querySelector('nav');
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            menuToggle.setAttribute('aria-expanded', 
                nav.classList.contains('mobile-open'));
        });
        
        document.querySelector('header').appendChild(menuToggle);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .stat-item, .interactive-card').forEach(el => {
            observer.observe(el);
        });
    }

    initializePageSpecificFeatures() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch(currentPage) {
            case 'index.html':
                this.initializeHomePage();
                break;
            case 'uses.html':
                this.initializeUsesPage();
                break;
            case 'misuses.html':
                this.initializeMisusesPage();
                break;
            case 'contact.html':
                this.initializeContactPage();
                break;
        }
    }

    initializeHomePage() {
        this.updateStatistics();
        this.setupFeatureCardInteractions();
    }

    initializeUsesPage() {
        // Uses page specific initialization
        console.log('Initializing Uses page features');
    }

    initializeMisusesPage() {
        // Misuses page specific initialization
        console.log('Initializing Misuses page features');
    }

    initializeContactPage() {
        this.setupContactForm();
    }

    setupFeatureCardInteractions() {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function() {
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmit(contactForm);
            });
        }
    }

    handleContactFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!this.validateEmail(data.email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        form.reset();
        
        // Save contact attempt
        this.saveContactAttempt(data);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#0056d2'};
            color: white;
            padding: 1rem;
            border-radius: 5px;
            box-shadow: var(--shadow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    saveContactAttempt(data) {
        const contacts = JSON.parse(localStorage.getItem('contactAttempts') || '[]');
        contacts.push({
            ...data,
            timestamp: new Date().toISOString(),
            ip: 'local' // In real app, this would be actual IP
        });
        localStorage.setItem('contactAttempts', JSON.stringify(contacts));
    }

    setupEventListeners() {
        // Global click handler
        document.addEventListener('click', this.handleGlobalClicks.bind(this));
        
        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    }

    handleGlobalClicks(event) {
        // Handle external links
        if (event.target.href && event.target.href.startsWith('http')) {
            event.preventDefault();
            this.trackOutboundLink(event.target.href);
            window.open(event.target.href, '_blank');
        }
    }

    handleResize() {
        // Adjust layout for different screen sizes
        if (window.innerWidth > 768) {
            document.querySelector('nav').classList.remove('mobile-open');
        }
    }

    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + D to toggle dark mode
        if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
            event.preventDefault();
            toggleTheme();
        }
    }

    trackOutboundLink(url) {
        console.log('Outbound link clicked:', url);
        // In a real app, you would send this to analytics
    }

    updateDynamicContent() {
        this.updateStatistics();
        this.updateLastModified();
        this.loadUserProgress();
    }

    updateStatistics() {
        const stats = {
            avgScreenTime: '3.5h',
            addictionRate: '42%',
            productiveUse: '35%'
        };

        Object.entries(stats).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = value;
            }
        });
    }

    updateLastModified() {
        const element = document.getElementById('updateDate');
        if (element) {
            element.textContent = new Date().toLocaleDateString();
        }
    }

    loadUserProgress() {
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        this.updateProgressIndicators(progress);
    }

    updateProgressIndicators(progress) {
        const progressElements = document.querySelectorAll('.progress-indicator');
        progressElements.forEach(element => {
            const progressKey = element.dataset.progressKey;
            if (progress[progressKey]) {
                element.style.width = progress[progressKey] + '%';
            }
        });
    }
}

// Global utility functions
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update theme color meta tag
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
        themeColor.setAttribute('content', isDarkMode ? '#1a1a1a' : '#0056d2');
    }
}

function shareProgress() {
    if (navigator.share) {
        navigator.share({
            title: 'My Mobile Usage Progress',
            text: 'Check out my progress in maintaining healthy mobile habits!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

function printPage() {
    window.print();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MobileAwarenessApp();
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MobileAwarenessApp };
}