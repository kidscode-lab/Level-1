/**
 * KidsCode Lab - Python Fundamentals Course Structure
 * Centralized configuration for all course data
 */

const COURSE_STRUCTURE = {
    title: "Python Fundamentals Course",
    subtitle: "Learn Programming the Fun Way!",
    totalLessons: 8,
    
    lessons: [
        {
            id: 1,
            title: "How Computers Function",
            url: "Lesson01/lesson1.html",
            description: "Learn how computers work and start with Python basics",
            topics: ["Computer Function", "Math Operators", "Data Types", "Variables", "Print Function", "Input Function"],
            estimatedTime: "45 minutes",
            difficulty: "Beginner",
            status: "available"
        },
        {
            id: 2,
            title: "Decision Making & Loops",
            url: "Lesson02/lesson2.html",
            description: "Make decisions with if-elif-else and repeat with loops",
            topics: ["Random Numbers", "If-Elif-Else", "Logical Operators", "Boolean", "Range Function", "For Loop"],
            estimatedTime: "50 minutes",
            difficulty: "Beginner",
            status: "available"
        },
        {
            id: 3,
            title: "While Loops & Comparisons",
            url: "Lesson03/lesson3.html",
            description: "Master while loops and compare them with for loops",
            topics: ["While Loop", "Loop Comparison", "Practice Quizzes", "Problem Solving"],
            estimatedTime: "40 minutes",
            difficulty: "Intermediate",
            status: "available"
        },
        {
            id: 4,
            title: "Lists",
            url: "Lesson04/lesson4.html",
            description: "Work with lists to store multiple values",
            topics: ["List Creation", "List Methods", "List Indexing", "List Exercises"],
            estimatedTime: "55 minutes",
            difficulty: "Intermediate",
            status: "available"
        },
        {
            id: 5,
            title: "File Operations",
            url: "Lesson05/lesson5.html",
            description: "Read, write, and manage files in Python",
            topics: ["File Reading", "File Writing", "File Appending", "Hangman Game Design"],
            estimatedTime: "50 minutes",
            difficulty: "Intermediate",
            status: "available"
        },
        {
            id: 6,
            title: "Hangman Game Implementation",
            url: "Lesson06/lesson6.html",
            description: "Build a complete Hangman word guessing game",
            topics: ["Game Logic", "User Interface", "Error Handling", "Game Testing"],
            estimatedTime: "60 minutes",
            difficulty: "Advanced",
            status: "available"
        },
        {
            id: 7,
            title: "Virtual Pet Game Design",
            url: "Lesson07/lesson7.html",
            description: "Design your own virtual pet game",
            topics: ["Game Planning", "Pet Attributes", "Action System", "Save System"],
            estimatedTime: "50 minutes",
            difficulty: "Advanced",
            status: "available"
        },
        {
            id: 8,
            title: "Virtual Pet Implementation",
            url: "Lesson08/lesson8.html",
            description: "Complete your virtual pet game project",
            topics: ["Full Implementation", "Advanced Features", "Game Polish", "Project Showcase"],
            estimatedTime: "70 minutes",
            difficulty: "Advanced",
            status: "available"
        }
    ],

    // Navigation structure for lessons
    getNavigationData: function(currentLessonId) {
        return {
            title: this.title,
            currentLesson: currentLessonId,
            lessons: this.lessons.map(lesson => ({
                ...lesson,
                isActive: lesson.id === currentLessonId,
                isCompleted: lesson.id < currentLessonId,
                isLocked: false // For future use with progress tracking
            }))
        };
    },

    // Get lesson by ID
    getLessonById: function(id) {
        return this.lessons.find(lesson => lesson.id === id);
    },

    // Get next lesson
    getNextLesson: function(currentId) {
        const currentIndex = this.lessons.findIndex(lesson => lesson.id === currentId);
        return currentIndex >= 0 && currentIndex < this.lessons.length - 1 
            ? this.lessons[currentIndex + 1] 
            : null;
    },

    // Get previous lesson
    getPreviousLesson: function(currentId) {
        const currentIndex = this.lessons.findIndex(lesson => lesson.id === currentId);
        return currentIndex > 0 
            ? this.lessons[currentIndex - 1] 
            : null;
    }
};

// Common terminal templates used across lessons
const COMMON_TERMINAL_TEMPLATES = {
    'clear': '',
    'help': `# Welcome to Python Interactive Mode
# Type your Python code above and click "Run Code"
# Available templates: Click the buttons above to load examples

print("Hello, Python!")`,
    
    'basic-math': `# Basic Math Operations
3 + 5
10 - 4
6 * 7
20 / 4`,

    'variables-demo': `# Variables Example
name = "Student"
age = 13
print(f"Hi, I'm {name} and I'm {age} years old!")`,

    'string-operations': `# String Operations
"Hello" + " World"
"Python" * 3
"Programming".upper()
"CODING".lower()`
};

// Quiz configuration helper
class QuizConfig {
    constructor(questions) {
        this.questions = questions;
    }

    static createMultipleChoice(question, options, correctAnswer, explanation) {
        return {
            type: 'multiple-choice',
            question: question,
            options: options,
            correctAnswer: correctAnswer,
            explanation: explanation
        };
    }

    static createTrueFalse(question, correctAnswer, explanation) {
        return {
            type: 'true-false',
            question: question,
            options: ['True', 'False'],
            correctAnswer: correctAnswer ? 0 : 1,
            explanation: explanation
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COURSE_STRUCTURE, COMMON_TERMINAL_TEMPLATES, QuizConfig };
}