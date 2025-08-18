/**
 * KidsCode Lab - Navigation Management System
 * Handles sidebar navigation and lesson navigation
 */

class NavigationManager {
    constructor(currentLessonId = null) {
        this.currentLessonId = currentLessonId;
        this.navOpen = false;
        this.courseData = null;
        
        this.init();
    }

    init() {
        this.loadCourseData();
        this.setupEventListeners();
        this.generateNavigation();
        this.setupKeyboardShortcuts();
    }

    loadCourseData() {
        // Access global COURSE_STRUCTURE
        if (typeof COURSE_STRUCTURE !== 'undefined') {
            this.courseData = COURSE_STRUCTURE;
        } else {
            console.error('COURSE_STRUCTURE not found. Make sure course-structure.js is loaded.');
            return;
        }
    }

    setupEventListeners() {
        // Toggle navigation button
        const navToggle = document.querySelector('.nav-toggle-btn');
        if (navToggle) {
            navToggle.addEventListener('click', () => this.toggleNavigation());
        }

        // Overlay click to close
        const overlay = document.getElementById('navOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeNavigation());
        }

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Handle navigation links
        this.setupNavigationLinks();
    }

    setupNavigationLinks() {
        document.addEventListener('click', (e) => {
            const lessonLink = e.target.closest('.lesson-link');
            if (lessonLink) {
                const href = lessonLink.getAttribute('href');
                if (href && href.startsWith('#')) {
                    // Handle anchor links for single-page navigation
                    e.preventDefault();
                    this.navigateToSection(href.substring(1));
                } else {
                    // Handle external lesson links - close nav on mobile
                    if (window.innerWidth <= 768) {
                        this.closeNavigation();
                    }
                }
            }
        });
    }

    toggleNavigation() {
        this.navOpen = !this.navOpen;
        this.updateNavigationState();
    }

    openNavigation() {
        this.navOpen = true;
        this.updateNavigationState();
    }

    closeNavigation() {
        this.navOpen = false;
        this.updateNavigationState();
    }

    updateNavigationState() {
        const nav = document.getElementById('courseNavigation');
        const overlay = document.getElementById('navOverlay');
        const container = document.getElementById('mainContainer');
        
        if (this.navOpen) {
            nav?.classList.add('active');
            overlay?.classList.add('active');
            
            // Only adjust container margin on desktop
            if (window.innerWidth > 768 && container) {
                container.classList.add('nav-open');
            }
            
            // Focus first navigation item for accessibility
            const firstLink = nav?.querySelector('.lesson-link');
            if (firstLink) {
                firstLink.focus();
            }
        } else {
            nav?.classList.remove('active');
            overlay?.classList.remove('active');
            container?.classList.remove('nav-open');
        }

        // Update button state
        const navToggle = document.querySelector('.nav-toggle-btn');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', this.navOpen.toString());
            navToggle.setAttribute('title', this.navOpen ? 'Close Navigation' : 'Open Navigation');
        }
    }

    generateNavigation() {
        if (!this.courseData) return;

        const nav = document.getElementById('courseNavigation');
        if (!nav) return;

        const navigationData = this.courseData.getNavigationData(this.currentLessonId);
        
        nav.innerHTML = `
            <h2 class="nav-title">${navigationData.title}</h2>
            <div class="lesson-nav">
                ${navigationData.lessons.map(lesson => this.generateLessonLink(lesson)).join('')}
            </div>
            ${this.generateProgressIndicator(navigationData.lessons)}
        `;
    }

    generateLessonLink(lesson) {
        const classes = ['lesson-link'];
        
        if (lesson.isActive) classes.push('active');
        if (lesson.isCompleted) classes.push('completed');
        if (lesson.isLocked) classes.push('locked');

        const estimatedTime = lesson.estimatedTime ? `<small>(${lesson.estimatedTime})</small>` : '';
        const difficulty = lesson.difficulty ? `<span class="difficulty difficulty--${lesson.difficulty.toLowerCase()}">${lesson.difficulty}</span>` : '';

        return `
            <a href="${lesson.url}" class="${classes.join(' ')}" ${lesson.isLocked ? 'tabindex="-1"' : ''}>
                <div class="lesson-link-content">
                    <strong>Lesson ${lesson.id}:</strong> ${lesson.title}
                    ${estimatedTime}
                    ${difficulty}
                </div>
            </a>
        `;
    }

    generateProgressIndicator(lessons) {
        const completedCount = lessons.filter(lesson => lesson.isCompleted).length;
        const totalCount = lessons.length;
        const progressPercentage = (completedCount / totalCount) * 100;

        return `
            <div class="course-progress">
                <div class="progress-header">
                    <span class="progress-label">Course Progress</span>
                    <span class="progress-stats">${completedCount}/${totalCount}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
        `;
    }

    handleResize() {
        const container = document.getElementById('mainContainer');
        
        if (window.innerWidth <= 768) {
            // Mobile: always remove nav-open class
            container?.classList.remove('nav-open');
        } else if (this.navOpen && container) {
            // Desktop: restore nav-open class if navigation is open
            container.classList.add('nav-open');
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + M to toggle navigation
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                this.toggleNavigation();
            }

            // Escape to close navigation
            if (e.key === 'Escape' && this.navOpen) {
                e.preventDefault();
                this.closeNavigation();
            }

            // Navigation within open sidebar
            if (this.navOpen) {
                this.handleNavigationKeyboard(e);
            }
        });
    }

    handleNavigationKeyboard(e) {
        const nav = document.getElementById('courseNavigation');
        if (!nav) return;

        const links = Array.from(nav.querySelectorAll('.lesson-link:not(.locked)'));
        const currentFocus = document.activeElement;
        const currentIndex = links.indexOf(currentFocus);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % links.length;
                links[nextIndex]?.focus();
                break;

            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + links.length) % links.length;
                links[prevIndex]?.focus();
                break;

            case 'Home':
                e.preventDefault();
                links[0]?.focus();
                break;

            case 'End':
                e.preventDefault();
                links[links.length - 1]?.focus();
                break;
        }
    }

    // Navigation to specific sections (for single-page lessons)
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without triggering page reload
            if (history.pushState) {
                history.pushState(null, null, `#${sectionId}`);
            }
            
            // Close navigation on mobile
            if (window.innerWidth <= 768) {
                this.closeNavigation();
            }
        }
    }

    // Public API methods
    getCurrentLesson() {
        return this.currentLessonId;
    }

    setCurrentLesson(lessonId) {
        this.currentLessonId = lessonId;
        this.generateNavigation();
    }

    getNextLesson() {
        return this.courseData?.getNextLesson(this.currentLessonId);
    }

    getPreviousLesson() {
        return this.courseData?.getPreviousLesson(this.currentLessonId);
    }

    // Lesson completion tracking
    markLessonCompleted(lessonId) {
        try {
            const completedLessons = this.getCompletedLessons();
            if (!completedLessons.includes(lessonId)) {
                completedLessons.push(lessonId);
                localStorage.setItem('kidscode-completed-lessons', JSON.stringify(completedLessons));
                this.generateNavigation(); // Refresh navigation to show completion
                
                // Dispatch completion event
                this.dispatchLessonCompletionEvent(lessonId);
            }
        } catch (error) {
            console.warn('Could not save lesson completion:', error);
        }
    }

    getCompletedLessons() {
        try {
            const completed = localStorage.getItem('kidscode-completed-lessons');
            return completed ? JSON.parse(completed) : [];
        } catch (error) {
            console.warn('Could not load completed lessons:', error);
            return [];
        }
    }

    isLessonCompleted(lessonId) {
        return this.getCompletedLessons().includes(lessonId);
    }

    resetProgress() {
        try {
            localStorage.removeItem('kidscode-completed-lessons');
            this.generateNavigation();
        } catch (error) {
            console.warn('Could not reset progress:', error);
        }
    }

    dispatchLessonCompletionEvent(lessonId) {
        const event = new CustomEvent('lessonCompleted', {
            detail: {
                lessonId: lessonId,
                lesson: this.courseData?.getLessonById(lessonId),
                completedCount: this.getCompletedLessons().length,
                totalLessons: this.courseData?.lessons.length || 0
            }
        });
        document.dispatchEvent(event);
    }

    // Generate lesson navigation (prev/next buttons)
    generateLessonNavigation(containerId = 'lessonNavigation') {
        const container = document.getElementById(containerId);
        if (!container || !this.currentLessonId) return;

        const previousLesson = this.getPreviousLesson();
        const nextLesson = this.getNextLesson();

        container.innerHTML = `
            <div class="lesson-navigation">
                ${previousLesson ? `
                    <a href="${previousLesson.url}" class="nav-btn nav-btn--secondary">
                        ← Previous: ${previousLesson.title}
                    </a>
                ` : '<div></div>'}
                
                <div class="lesson-progress-indicator">
                    Lesson ${this.currentLessonId} of ${this.courseData?.lessons.length || 8}
                </div>
                
                ${nextLesson ? `
                    <a href="${nextLesson.url}" class="nav-btn">
                        Next: ${nextLesson.title} →
                    </a>
                ` : `
                    <button class="nav-btn nav-btn--success" onclick="window.navigationManager?.showCourseCompletion()">
                        🎉 Course Complete!
                    </button>
                `}
            </div>
        `;
    }

    showCourseCompletion() {
        // Show course completion modal or redirect
        const completionModal = document.createElement('div');
        completionModal.className = 'completion-modal';
        completionModal.innerHTML = `
            <div class="modal-content">
                <div class="completion-celebration">
                    <div class="celebration-emoji">🎉</div>
                    <h2>Congratulations!</h2>
                    <p>You've completed the Python Fundamentals course!</p>
                    <div class="completion-stats">
                        <div class="stat">
                            <span class="stat-number">${this.courseData?.lessons.length || 8}</span>
                            <span class="stat-label">Lessons Completed</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">100%</span>
                            <span class="stat-label">Course Progress</span>
                        </div>
                    </div>
                    <div class="completion-actions">
                        <button onclick="this.closest('.completion-modal').remove()" class="nav-btn">
                            Close
                        </button>
                        <button onclick="window.location.href='/'" class="nav-btn nav-btn--primary">
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(completionModal);
    }
}

// Lesson Navigation Component for individual lessons
class LessonNavigationComponent {
    constructor(lessonId, options = {}) {
        this.lessonId = lessonId;
        this.options = {
            showProgress: true,
            autoMarkComplete: true,
            completionThreshold: 0.8, // 80% scroll to mark complete
            ...options
        };
        
        this.scrollProgress = 0;
        this.init();
    }

    init() {
        this.setupScrollTracking();
        this.generateBreadcrumbs();
        
        if (this.options.autoMarkComplete) {
            this.setupAutoCompletion();
        }
    }

    setupScrollTracking() {
        if (!this.options.showProgress) return;

        let ticking = false;
        
        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            this.scrollProgress = Math.min(scrollTop / documentHeight, 1);
            
            this.updateProgressIndicator();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        });
    }

    updateProgressIndicator() {
        const indicator = document.querySelector('.lesson-progress-bar');
        if (indicator) {
            const fill = indicator.querySelector('.progress-fill');
            if (fill) {
                fill.style.width = `${this.scrollProgress * 100}%`;
            }
        }
    }

    setupAutoCompletion() {
        const checkCompletion = () => {
            if (this.scrollProgress >= this.options.completionThreshold) {
                if (window.navigationManager) {
                    window.navigationManager.markLessonCompleted(this.lessonId);
                }
                // Remove listener after marking complete
                window.removeEventListener('scroll', checkCompletion);
            }
        };

        window.addEventListener('scroll', checkCompletion);
    }

    generateBreadcrumbs() {
        const breadcrumbContainer = document.querySelector('.lesson-breadcrumbs');
        if (!breadcrumbContainer || typeof COURSE_STRUCTURE === 'undefined') return;

        const currentLesson = COURSE_STRUCTURE.getLessonById(this.lessonId);
        if (!currentLesson) return;

        breadcrumbContainer.innerHTML = `
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item">
                        <a href="/">KidsCode Lab</a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="/">Python Course</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Lesson ${currentLesson.id}: ${currentLesson.title}
                    </li>
                </ol>
            </nav>
        `;
    }
}

// Utility functions for navigation
const NavigationUtils = {
    // Get lesson ID from URL
    getLessonIdFromURL: function() {
        const path = window.location.pathname;
        const match = path.match(/lesson(\d+)/i);
        return match ? parseInt(match[1]) : null;
    },

    // Generate table of contents for current page
    generateTableOfContents: function(containerId = 'tableOfContents') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const headings = document.querySelectorAll('h2, h3, h4');
        if (headings.length === 0) return;

        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';

        headings.forEach((heading, index) => {
            const id = heading.id || `heading-${index}`;
            if (!heading.id) heading.id = id;

            const listItem = document.createElement('li');
            listItem.className = `toc-item toc-item--${heading.tagName.toLowerCase()}`;

            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.className = 'toc-link';

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        container.innerHTML = '<h3>Contents</h3>';
        container.appendChild(tocList);
    },

    // Smooth scroll to element
    scrollToElement: function(selector, offset = 100) {
        const element = document.querySelector(selector);
        if (element) {
            const elementTop = element.offsetTop - offset;
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }
    },

    // Check if element is in viewport
    isElementInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Global navigation initialization
if (typeof window !== 'undefined') {
    window.NavigationManager = NavigationManager;
    window.LessonNavigationComponent = LessonNavigationComponent;
    window.NavigationUtils = NavigationUtils;

    // Auto-initialize navigation
    document.addEventListener('DOMContentLoaded', () => {
        const lessonId = NavigationUtils.getLessonIdFromURL();
        if (!window.navigationManager) {
            window.navigationManager = new NavigationManager(lessonId);
        }
    });
}

// Global functions for backward compatibility
function toggleNavigation() {
    window.navigationManager?.toggleNavigation();
}

function closeNavigation() {
    window.navigationManager?.closeNavigation();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NavigationManager, LessonNavigationComponent, NavigationUtils };
}