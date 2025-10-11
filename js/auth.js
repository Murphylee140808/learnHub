/**
 * ========================================
 * AUTHENTICATION MANAGEMENT
 * ========================================
 * Handles user registration, login, logout,
 * and session management using localStorage
 */

// Storage Keys
const STORAGE_KEYS = {
    USERS: 'learnhub_users',
    CURRENT_USER: 'learnhub_current_user',
    USER_PROGRESS: 'learnhub_user_progress'
};

/**
 * Initialize demo users (for testing purposes)
 * Creates a demo account if no users exist
 */
function initializeDemoUsers() {
    const users = getAllUsers();
    if (users.length === 0) {
        // Create a demo user for easy testing
        const demoUser = {
            id: generateUserId(),
            name: "Demo User",
            email: "demo@learnhub.com",
            password: "demo123", // In production, this should be hashed
            createdAt: new Date().toISOString()
        };
        
        const usersArray = [demoUser];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersArray));
    }
}

/**
 * Generate unique user ID
 * @returns {string} Unique user ID
 */
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Get all registered users
 * @returns {Array} Array of user objects
 */
function getAllUsers() {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
}

/**
 * Register a new user
 * @param {string} name - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Object} Result object with success status and message
 */
function registerUser(name, email, password) {
    // Validation
    if (!name || !email || !password) {
        return {
            success: false,
            message: "All fields are required!"
        };
    }

    if (password.length < 6) {
        return {
            success: false,
            message: "Password must be at least 6 characters long!"
        };
    }

    // Check if email already exists
    const users = getAllUsers();
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
        return {
            success: false,
            message: "Email already registered! Please login instead."
        };
    }

    // Create new user
    const newUser = {
        id: generateUserId(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In production, hash this password
        createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Initialize empty progress for new user
    initializeUserProgress(newUser.id);

    return {
        success: true,
        message: "Account created successfully! Redirecting to login...",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    };
}

/**
 * Login user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Object} Result object with success status and message
 */
function loginUser(email, password) {
    // Validation
    if (!email || !password) {
        return {
            success: false,
            message: "Please enter both email and password!"
        };
    }

    // Find user
    const users = getAllUsers();
    const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase().trim() && 
        u.password === password
    );

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password!"
        };
    }

    // Set current user session
    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));

    return {
        success: true,
        message: "Login successful!",
        user: sessionUser
    };
}

/**
 * Logout current user
 */
function logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = 'login.html';
}

/**
 * Get current logged-in user
 * @returns {Object|null} Current user object or null
 */
function getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
}

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in
 */
function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

/**
 * Protect page - redirect to login if not authenticated
 * Call this function on pages that require authentication
 */
function protectPage() {
    if (!isUserLoggedIn()) {
        window.location.href = 'login.html';
    }
}

/**
 * Redirect to home if already logged in
 * Call this on login/signup pages
 */
function redirectIfLoggedIn() {
    if (isUserLoggedIn()) {
        window.location.href = 'index.html';
    }
}

/**
 * Initialize user progress storage
 * @param {string} userId - User's ID
 */
function initializeUserProgress(userId) {
    const allProgress = getAllProgress();
    if (!allProgress[userId]) {
        allProgress[userId] = {
            courses: {},
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(allProgress));
    }
}

/**
 * Get all user progress data
 * @returns {Object} Object containing all users' progress
 */
function getAllProgress() {
    const progress = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return progress ? JSON.parse(progress) : {};
}

/**
 * Get current user's progress
 * @returns {Object} User's progress object
 */
function getUserProgress() {
    const user = getCurrentUser();
    if (!user) return null;

    const allProgress = getAllProgress();
    
    // Initialize if doesn't exist
    if (!allProgress[user.id]) {
        initializeUserProgress(user.id);
        return getAllProgress()[user.id];
    }

    return allProgress[user.id];
}

/**
 * Save user progress
 * @param {Object} progressData - Progress data to save
 */
function saveUserProgress(progressData) {
    const user = getCurrentUser();
    if (!user) return;

    const allProgress = getAllProgress();
    allProgress[user.id] = {
        ...progressData,
        lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(allProgress));
}

// Initialize demo users when script loads
initializeDemoUsers();

// Setup logout button functionality (if exists on page)
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});