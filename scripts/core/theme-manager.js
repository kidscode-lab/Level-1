/**
 * KidsCode Lab - Theme Management System
 * Handles theme switching and persistence
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.dropdownOpen = false;
        this.storageKey = 'kidscode-lab-theme';
        
        this.themes = {
            dark: {
                name: 'Dark',
                icon: '🌙',
                description: 'Easy on the eyes'
            },
            light: {
                name: 'Light',
                icon: '☀️',
                description: 'Clean and bright'
            },
            colorful: {
                name: 'Colorful',
                icon: '🌈',
                description: 'Vibrant and fun'
            },
            'high-contrast': {
                name: 'High Contrast',
                icon: '⚫',
                description: 'Better accessibility'
            }
        };

        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setupEventListeners();
        this.updateUI();
    }

    loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem(this.storageKey);
            if (savedTheme && this.themes[savedTheme]) {
                this.currentTheme = savedTheme;
            }
        } catch (error) {
            console.warn('Could not load saved theme:', error);
            this.currentTheme = 'dark'; // fallback
        }
        
        this.applyTheme(this.currentTheme);
    }

    setupEventListeners() {
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const themeContainer = e.target.closest('.theme-switcher-container');
            if (!themeContainer && this.dropdownOpen) {
                this.closeDropdown();
            }
        });

        // Setup theme option clicks
        document.addEventListener('DOMContentLoaded', () => {
            this.setupThemeOptions();
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.dropdownOpen) {
                this.handleKeyboardNavigation(e);
            }
        });
    }

    setupThemeOptions() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                if (theme && this.themes[theme]) {
                    this.setTheme(theme);
                    this.closeDropdown();
                }
            });
        });
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        
        const dropdown = document.getElementById('themeDropdown');
        if (dropdown) {
            if (this.dropdownOpen) {
                dropdown.classList.add('active');
                // Focus first option for accessibility
                const firstOption = dropdown.querySelector('.theme-option');
                if (firstOption) {
                    firstOption.focus();
                }
            } else {
                dropdown.classList.remove('active');
            }
        }
    }

    closeDropdown() {
        this.dropdownOpen = false;
        const dropdown = document.getElementById('themeDropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }

    setTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`Theme "${themeName}" not found`);
            return;
        }

        this.currentTheme = themeName;
        this.applyTheme(themeName);
        this.saveTheme(themeName);
        this.updateUI();
        
        // Dispatch theme change event
        this.dispatchThemeChangeEvent(themeName);
    }

    applyTheme(themeName) {
        document.body.setAttribute('data-theme', themeName);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(themeName);
    }

    updateMetaThemeColor(themeName) {
        let themeColor = '#1a1a1a'; // dark default
        
        switch (themeName) {
            case 'light':
                themeColor = '#ffffff';
                break;
            case 'colorful':
                themeColor = '#667eea';
                break;
            case 'high-contrast':
                themeColor = '#000000';
                break;
        }

        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = themeColor;
    }

    saveTheme(themeName) {
        try {
            localStorage.setItem(this.storageKey, themeName);
        } catch (error) {
            console.warn('Could not save theme preference:', error);
        }
    }

    updateUI() {
        // Update active state in dropdown
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            if (option.dataset.theme === this.currentTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // Update button icon if needed
        const themeSwitcherBtn = document.querySelector('.theme-switcher-btn');
        if (themeSwitcherBtn) {
            const currentThemeData = this.themes[this.currentTheme];
            if (currentThemeData && currentThemeData.icon) {
                // Could update button icon here if desired
                themeSwitcherBtn.setAttribute('title', `Current theme: ${currentThemeData.name}`);
            }
        }
    }

    handleKeyboardNavigation(e) {
        const dropdown = document.getElementById('themeDropdown');
        if (!dropdown || !this.dropdownOpen) return;

        const options = dropdown.querySelectorAll('.theme-option');
        const currentFocus = document.activeElement;
        const currentIndex = Array.from(options).indexOf(currentFocus);

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this.closeDropdown();
                document.querySelector('.theme-switcher-btn')?.focus();
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % options.length;
                options[nextIndex]?.focus();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + options.length) % options.length;
                options[prevIndex]?.focus();
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (currentFocus && currentFocus.classList.contains('theme-option')) {
                    currentFocus.click();
                }
                break;
        }
    }

    dispatchThemeChangeEvent(themeName) {
        const event = new CustomEvent('themeChanged', {
            detail: {
                theme: themeName,
                themeData: this.themes[themeName]
            }
        });
        document.dispatchEvent(event);
    }

    // Public API methods
    getCurrentTheme() {
        return this.currentTheme;
    }

    getAvailableThemes() {
        return { ...this.themes };
    }

    // Method to detect system preference
    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark'; // default fallback
    }

    // Method to auto-switch based on system preference
    enableAutoTheme() {
        const systemTheme = this.detectSystemTheme();
        this.setTheme(systemTheme);

        // Listen for system theme changes
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeQuery.addEventListener('change', (e) => {
                const newTheme = e.matches ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }
    }

    // Method for accessibility - high contrast detection
    enableAccessibilityFeatures() {
        if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
            this.setTheme('high-contrast');
        }

        // Listen for contrast preference changes
        if (window.matchMedia) {
            const contrastQuery = window.matchMedia('(prefers-contrast: high)');
            contrastQuery.addEventListener('change', (e) => {
                if (e.matches) {
                    this.setTheme('high-contrast');
                } else {
                    this.setTheme('dark'); // or previous theme
                }
            });
        }
    }
}

// Global theme management utilities
const ThemeUtils = {
    // Get CSS variable value for current theme
    getCSSVariable: function(variableName) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();
    },

    // Set CSS variable dynamically
    setCSSVariable: function(variableName, value) {
        document.documentElement.style.setProperty(variableName, value);
    },

    // Check if dark theme is active
    isDarkTheme: function() {
        return document.body.getAttribute('data-theme') === 'dark' || 
               document.body.getAttribute('data-theme') === 'high-contrast';
    },

    // Get theme-appropriate color
    getThemeColor: function(lightColor, darkColor) {
        return this.isDarkTheme() ? darkColor : lightColor;
    },

    // Add theme-specific class to element
    addThemeClass: function(element, baseClass) {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        element.classList.add(`${baseClass}--${currentTheme}`);
    }
};

// Initialize theme system when DOM is ready
if (typeof window !== 'undefined') {
    // Make ThemeManager available globally
    window.ThemeManager = ThemeManager;
    window.ThemeUtils = ThemeUtils;
    
    // Auto-initialize if not already done
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.themeManager) {
            window.themeManager = new ThemeManager();
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, ThemeUtils };
}