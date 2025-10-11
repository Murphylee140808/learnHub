/**
 * ========================================
 * COURSE DATA MANAGEMENT
 * ========================================
 * This file contains all course and lesson data
 * for the e-learning platform
 */

// Course Database
const coursesData = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites from scratch.",
        icon: "🌐",
        duration: "8 weeks",
        level: "Beginner",
        lessons: [
            {
                id: 1,
                title: "Introduction to HTML",
                duration: "45 min",
                content: "Learn the basic structure of HTML documents and common HTML tags."
            },
            {
                id: 2,
                title: "CSS Fundamentals",
                duration: "60 min",
                content: "Understand how to style web pages using CSS selectors and properties."
            },
            {
                id: 3,
                title: "JavaScript Basics",
                duration: "90 min",
                content: "Get started with JavaScript programming language and DOM manipulation."
            },
            {
                id: 4,
                title: "Responsive Design",
                duration: "75 min",
                content: "Create responsive layouts that work on all devices using modern CSS techniques."
            },
            {
                id: 5,
                title: "Building Your First Website",
                duration: "120 min",
                content: "Put everything together and build a complete website from scratch."
            }
        ]
    },
    {
        id: 2,
        title: "Python Programming Masterclass",
        description: "Master Python programming from beginner to advanced concepts including data structures and algorithms.",
        icon: "🐍",
        duration: "12 weeks",
        level: "Intermediate",
        lessons: [
            {
                id: 1,
                title: "Python Basics and Syntax",
                duration: "60 min",
                content: "Learn Python syntax, variables, data types, and basic operations."
            },
            {
                id: 2,
                title: "Control Flow and Functions",
                duration: "75 min",
                content: "Master if statements, loops, and how to write reusable functions."
            },
            {
                id: 3,
                title: "Data Structures",
                duration: "90 min",
                content: "Understand lists, tuples, dictionaries, and sets in Python."
            },
            {
                id: 4,
                title: "Object-Oriented Programming",
                duration: "120 min",
                content: "Learn classes, objects, inheritance, and polymorphism."
            },
            {
                id: 5,
                title: "File Handling and Modules",
                duration: "60 min",
                content: "Work with files and learn to import and use Python modules."
            },
            {
                id: 6,
                title: "Final Project",
                duration: "180 min",
                content: "Build a complete Python application using everything you've learned."
            }
        ]
    },
    {
        id: 3,
        title: "Data Science Fundamentals",
        description: "Explore data analysis, visualization, and machine learning basics using Python and popular libraries.",
        icon: "📊",
        duration: "10 weeks",
        level: "Intermediate",
        lessons: [
            {
                id: 1,
                title: "Introduction to Data Science",
                duration: "45 min",
                content: "Understand what data science is and its applications in various industries."
            },
            {
                id: 2,
                title: "NumPy for Data Analysis",
                duration: "90 min",
                content: "Learn to work with arrays and perform numerical computations."
            },
            {
                id: 3,
                title: "Pandas for Data Manipulation",
                duration: "120 min",
                content: "Master data manipulation and analysis using Pandas DataFrames."
            },
            {
                id: 4,
                title: "Data Visualization with Matplotlib",
                duration: "75 min",
                content: "Create beautiful and informative visualizations of your data."
            },
            {
                id: 5,
                title: "Introduction to Machine Learning",
                duration: "90 min",
                content: "Learn the basics of machine learning and build your first model."
            }
        ]
    },
    {
        id: 4,
        title: "UI/UX Design Principles",
        description: "Learn how to create beautiful, user-friendly interfaces and enhance user experience in digital products.",
        icon: "🎨",
        duration: "6 weeks",
        level: "Beginner",
        lessons: [
            {
                id: 1,
                title: "Introduction to UI/UX",
                duration: "40 min",
                content: "Understand the difference between UI and UX and why both matter."
            },
            {
                id: 2,
                title: "Design Thinking Process",
                duration: "60 min",
                content: "Learn the design thinking methodology for solving user problems."
            },
            {
                id: 3,
                title: "Color Theory and Typography",
                duration: "75 min",
                content: "Master the principles of color and typography in design."
            },
            {
                id: 4,
                title: "Wireframing and Prototyping",
                duration: "90 min",
                content: "Create wireframes and interactive prototypes for your designs."
            },
            {
                id: 5,
                title: "User Research and Testing",
                duration: "60 min",
                content: "Learn how to conduct user research and usability testing."
            },
            {
                id: 6,
                title: "Design Portfolio Project",
                duration: "120 min",
                content: "Build a complete UI/UX project for your portfolio."
            }
        ]
    }
];

/**
 * Get all courses
 * @returns {Array} Array of all courses
 */
function getAllCourses() {
    return coursesData;
}

/**
 * Get a specific course by ID
 * @param {number} courseId - The ID of the course
 * @returns {Object|null} Course object or null if not found
 */
function getCourseById(courseId) {
    return coursesData.find(course => course.id === parseInt(courseId)) || null;
}

/**
 * Get total number of lessons in a course
 * @param {number} courseId - The ID of the course
 * @returns {number} Number of lessons
 */
function getCourseLessonCount(courseId) {
    const course = getCourseById(courseId);
    return course ? course.lessons.length : 0;
}