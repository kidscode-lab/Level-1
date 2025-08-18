/**
 * KidsCode Lab - Lesson 1: Python Fundamentals
 * Lesson-specific JavaScript functionality
 */

// Lesson 1 specific templates
const LESSON1_TEMPLATES = {
    'math-ops': `3 + 5
4 * 3
10 - 2
15 / 3`,
    'string-ops': `"3" + "5"
"4" * "3"
"Hello" + " World"
"Python" * 2`,
    'variables': `name = "Alice"
age = 13
print(f"My name is {name}")
print(f"I am {age} years old")
grade = "7th"
print(f"I'm in {grade} grade")`,
    'input-demo': `name = input("What's your name? ")
print(f"Hello {name}!")
age = int(input("How old are you? "))
print(f"You are {age} years old!")
print(f"Next year you'll be {age + 1}!")`,
    'triangle': `print("Triangle Area Calculator")
base = float(input("Enter the base in cm: "))
height = float(input("Enter the height in cm: "))
area = (base * height) / 2
print(f"The area is {area} cm²")`,
    'clear': ''
};

// Lesson 1 Quiz Configuration
const LESSON1_QUIZ_CONFIG = {
    quiz1: {
        question: "What's the problem with the code above?",
        options: [
            "The print function syntax is wrong",
            "The input() returns a string, but we need a number for multiplication",
            "The variable names are too short",
            "Nothing is wrong with the code"
        ],
        correctAnswer: 1, // Index 1 (second option)
        explanation: {
            correct: `
                <strong>✅ Correct!</strong> The input() function returns a string. 
                To multiply numbers, we need to convert the string to a number using int() or float().
                <br><br>
                <strong>Fix:</strong> Change <code>side = input(...)</code> to <code>side = float(input(...))</code>
            `,
            incorrect: `
                <strong>❌ Not quite right.</strong> The main issue is that input() returns a string, 
                but we're trying to do math (multiplication) with it. We need to convert it to a number first!
            `
        }
    }
};

class Lesson1Manager {
    constructor() {
        this.terminals = new Map();
        this.quizManager = null;
        this.codeCopyManager = null;
        this.lessonNavigation = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLesson());
        } else {
            this.setupLesson();
        }
    }

    setupLesson() {
        this.initializeComponents();
        this.setupTerminals();
        this.setupQuizzes();
        this.setupCodeCopy();
        this.setupLessonNavigation();
        this.initializeSyntaxHighlighting();
        this.setupPresentationMode();
        
        console.log('🎉 Lesson 1: Python Fundamentals loaded successfully!');
    }

    initializeComponents() {
        // Initialize lesson navigation component
        if (typeof window.LessonNavigationComponent !== 'undefined') {
            this.lessonNavigation = new window.LessonNavigationComponent(1, {
                showProgress: true,
                autoMarkComplete: true,
                completionThreshold: 0.85
            });
        }

        // Initialize code copy manager
        this.codeCopyManager = new CodeCopyManager();

        // Initialize quiz manager
        this.quizManager = new QuizManager();
    }

    setupTerminals() {
        // Math/String Operations Terminal
        const mathStringTerminal = new TerminalSimulator('mathStringTerminal', {
            ...LESSON1_TEMPLATES,
            defaultCode: LESSON1_TEMPLATES['math-ops']
        });
        this.terminals.set('mathString', mathStringTerminal);

        // Lab Terminal
        const labTerminal = new TerminalSimulator('labTerminal', {
            ...LESSON1_TEMPLATES,
            defaultCode: LESSON1_TEMPLATES['variables']
        });
        this.terminals.set('lab', labTerminal);

        // Setup terminal event listeners
        this.setupTerminalEventListeners();
    }

    setupTerminalEventListeners() {
        // Template button handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('template-btn')) {
                const templateName = e.target.dataset.template;
                const terminal = this.getTerminalFromButton(e.target);
                
                if (terminal && templateName) {
                    terminal.loadTemplate(templateName);
                }
            }
        });

        // Run button handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('run-btn')) {
                const terminal = this.getTerminalFromButton(e.target);
                if (terminal) {
                    terminal.runCode();
                }
            }
        });
    }

    getTerminalFromButton(button) {
        const terminalContainer = button.closest('.terminal-simulator');
        if (!terminalContainer) return null;

        const terminalId = terminalContainer.id;
        switch (terminalId) {
            case 'mathStringTerminal':
                return this.terminals.get('mathString');
            case 'labTerminal':
                return this.terminals.get('lab');
            default:
                return null;
        }
    }

    setupQuizzes() {
        // Register Quiz 1
        this.quizManager.registerQuiz('quiz1', LESSON1_QUIZ_CONFIG.quiz1);

        // Setup quiz submit handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-submit')) {
                const quizContainer = e.target.closest('.quiz-container');
                if (quizContainer) {
                    const quizId = quizContainer.id;
                    this.quizManager.checkAnswer(quizId);
                }
            }
        });
    }

    setupCodeCopy() {
        // Code copy functionality is handled by the CodeCopyManager
        // This will automatically find all .copy-btn elements and set up copying
    }

    setupLessonNavigation() {
        // Generate lesson navigation (prev/next buttons)
        if (window.navigationManager) {
            window.navigationManager.generateLessonNavigation('lessonNavigation');
        }
    }

    initializeSyntaxHighlighting() {
        // Initialize Prism.js syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
            
            // Re-highlight when content changes
            const observer = new MutationObserver(() => {
                Prism.highlightAll();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    setupPresentationMode() {
        // Setup presentation mode integration
        document.addEventListener('keydown', (event) => {
            if (event.key === 'F5' && !event.shiftKey) {
                event.preventDefault();
                this.enterPresentation(0);
            }
        });
    }

    enterPresentation(slideIndex = 0) {
        if (window.presentationEngine) {
            window.presentationEngine.enterPresentation(slideIndex);
        } else {
            console.warn('Presentation engine not available');
        }
    }

    // Public methods for external access
    getTerminal(name) {
        return this.terminals.get(name);
    }

    runQuiz(quizId) {
        return this.quizManager.checkAnswer(quizId);
    }

    markLessonComplete() {
        if (window.navigationManager) {
            window.navigationManager.markLessonCompleted(1);
        }
    }
}

// Terminal Simulator Class
class TerminalSimulator {
    constructor(containerId, templates = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.templates = { ...LESSON1_TEMPLATES, ...templates };
        this.variables = new Map();
        
        if (!this.container) {
            console.error(`Terminal container ${containerId} not found`);
            return;
        }
        
        this.setupElements();
    }

    setupElements() {
        this.input = this.container.querySelector('.terminal-input');
        this.output = this.container.querySelector('.output-text');
        this.runBtn = this.container.querySelector('.run-btn');
        this.templateBtns = this.container.querySelectorAll('.template-btn');
        
        // Set default code if available
        if (this.templates.defaultCode && this.input) {
            this.input.value = this.templates.defaultCode;
        }
    }

    loadTemplate(templateName) {
        if (this.templates[templateName] !== undefined && this.input) {
            this.input.value = this.templates[templateName];
        }
    }

    runCode() {
        if (!this.input || !this.output) return;
        
        const code = this.input.value;
        const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
        let result = '';
        
        // Reset variables for fresh execution
        this.variables.clear();
        
        try {
            lines.forEach(line => {
                line = line.trim();
                result += this.executeLine(line) + '\n';
            });
        } catch (error) {
            result += `Error: ${error.message}\n`;
        }
        
        this.output.textContent = result || 'No output generated';
    }

    executeLine(line) {
        // Handle variable assignments
        if (line.includes('=') && !line.includes('==') && !line.includes('!=')) {
            return this.handleAssignment(line);
        }
        
        // Handle print statements
        if (line.includes('print(')) {
            return this.handlePrint(line);
        }
        
        // Handle mathematical expressions
        if (/^[\d\s\+\-\*\/\(\)\.]+$/.test(line)) {
            try {
                return `${eval(line)}`;
            } catch {
                return `>>> ${line}`;
            }
        }
        
        // Handle string operations
        if (line.includes('"') || line.includes("'")) {
            return this.handleStringOperation(line);
        }
        
        return `>>> ${line}`;
    }

    handleAssignment(line) {
        const [varName, value] = line.split('=').map(s => s.trim());
        
        // Evaluate the value
        let evaluatedValue = value;
        if (value.includes('input(')) {
            // Simulate input function
            const prompt = value.match(/input\("(.*)"\)/)?.[1] || 'Enter value:';
            evaluatedValue = `"${prompt.replace(' ', '_')}_input"`;
        } else if (value.includes('"') || value.includes("'")) {
            evaluatedValue = value.replace(/['"]/g, '');
        } else if (/^\d+$/.test(value)) {
            evaluatedValue = parseInt(value);
        } else if (/^\d*\.\d+$/.test(value)) {
            evaluatedValue = parseFloat(value);
        }
        
        this.variables.set(varName, evaluatedValue);
        return `✓ ${varName} = ${evaluatedValue}`;
    }

    handlePrint(line) {
        const match = line.match(/print\((.*)\)/);
        if (!match) return `Error: Invalid print syntax`;
        
        let content = match[1];
        
        // Handle f-strings
        if (content.startsWith('f"') || content.startsWith("f'")) {
            content = content.substring(2, content.length - 1);
            content = content.replace(/\{([^}]+)\}/g, (match, varName) => {
                const cleanVarName = varName.trim();
                if (this.variables.has(cleanVarName)) {
                    return this.variables.get(cleanVarName);
                }
                return `[${cleanVarName}]`;
            });
        } else {
            // Remove quotes
            content = content.replace(/^["']|["']$/g, '');
        }
        
        return content;
    }

    handleStringOperation(line) {
        // Handle string concatenation
        if (line.includes('+') && line.includes('"')) {
            const strings = line.match(/"([^"]*)"/g);
            if (strings) {
                return strings.join('').replace(/"/g, '');
            }
        }
        
        // Handle string multiplication
        if (line.includes('*') && line.includes('"')) {
            const match = line.match(/"([^"]*)" \* (\d+)/);
            if (match) {
                return match[1].repeat(parseInt(match[2]));
            }
        }
        
        return line;
    }
}

// Quiz Manager Class
class QuizManager {
    constructor() {
        this.quizzes = new Map();
    }

    registerQuiz(quizId, config) {
        this.quizzes.set(quizId, config);
    }

    checkAnswer(quizId) {
        const quiz = this.quizzes.get(quizId);
        if (!quiz) {
            console.error(`Quiz ${quizId} not found`);
            return false;
        }

        const container = document.getElementById(quizId);
        if (!container) {
            console.error(`Quiz container ${quizId} not found`);
            return false;
        }

        const selected = container.querySelector('input[name="' + quizId + '"]:checked');
        if (!selected) {
            alert('Please select an answer!');
            return false;
        }

        const selectedIndex = Array.from(container.querySelectorAll('input[name="' + quizId + '"]'))
            .indexOf(selected);
        
        const feedback = container.querySelector('.quiz-feedback');
        if (!feedback) return false;

        feedback.style.display = 'block';
        
        const isCorrect = selectedIndex === quiz.correctAnswer;
        
        if (isCorrect) {
            feedback.className = 'quiz-feedback correct';
            feedback.innerHTML = quiz.explanation.correct;
        } else {
            feedback.className = 'quiz-feedback incorrect';
            feedback.innerHTML = quiz.explanation.incorrect;
        }

        // Scroll to feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        return isCorrect;
    }
}

// Code Copy Manager Class
class CodeCopyManager {
    constructor() {
        this.setupCopyButtons();
    }

    setupCopyButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                this.copyCode(e.target);
            }
        });
    }

    async copyCode(button) {
        const codeBlock = button.closest('.code-block');
        if (!codeBlock) return;

        const code = codeBlock.querySelector('code');
        if (!code) return;

        const text = code.textContent;

        try {
            await navigator.clipboard.writeText(text);
            this.showCopySuccess(button);
        } catch (error) {
            console.error('Failed to copy code:', error);
            this.fallbackCopy(text, button);
        }
    }

    showCopySuccess(button) {
        const originalText = button.textContent;
        const originalBackground = button.style.background;

        button.textContent = 'Copied!';
        button.style.background = 'var(--brand-success)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalBackground;
        }, 2000);
    }

    fallbackCopy(text, button) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showCopySuccess(button);
        } catch (error) {
            console.error('Fallback copy failed:', error);
            button.textContent = 'Copy failed';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }

        document.body.removeChild(textArea);
    }
}

// Global functions for backward compatibility
function loadTemplate(templateName) {
    // This function will be called by template buttons
    // The event listener in Lesson1Manager will handle it
}

function runCode() {
    // This function will be called by run buttons
    // The event listener in Lesson1Manager will handle it
}

function runLabCode() {
    // Alias for runCode for lab terminal
    runCode();
}

function checkQuiz1() {
    if (window.lesson1Manager) {
        return window.lesson1Manager.runQuiz('quiz1');
    }
}

function copyCode(button) {
    // This function will be called by copy buttons
    // The event listener in CodeCopyManager will handle it
}

function enterPresentation(slideIndex = 0) {
    if (window.lesson1Manager) {
        window.lesson1Manager.enterPresentation(slideIndex);
    }
}

// Global navigation functions
function toggleNavigation() {
    if (window.navigationManager) {
        window.navigationManager.toggleNavigation();
    }
}

// Initialize Lesson 1 when the script loads
document.addEventListener('DOMContentLoaded', () => {
    window.lesson1Manager = new Lesson1Manager();
});

// Export classes for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Lesson1Manager,
        TerminalSimulator,
        QuizManager,
        CodeCopyManager,
        LESSON1_TEMPLATES,
        LESSON1_QUIZ_CONFIG
    };
}