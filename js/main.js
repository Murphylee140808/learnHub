/**
 * ========================================
 * MAIN APPLICATION LOGIC
 * ========================================
 * Handles UI rendering, progress tracking,
 * and user interactions
 */

/**
 * ========================================
 * HOME PAGE FUNCTIONS
 * ========================================
 */

/**
 * Initialize home page
 */
function initHomePage() {
    // Protect page - ensure user is logged in
    protectPage();

    // Display welcome message
    displayWelcomeMessage();

    // Load and display courses
    displayCourses();

    // Update statistics
    updateStatistics();
}

/**
 * Display welcome message with user's name
 */
function displayWelcomeMessage() {
    const user = getCurrentUser();
    const welcomeElement = document.getElementById('welcomeUser');
    
    if (user && welcomeElement) {
        welcomeElement.textContent = `Welcome, ${user.name}!`;
    }
}

/**
 * Display all courses on home page
 */
function displayCourses() {
    const coursesContainer = document.getElementById('coursesList');
    if (!coursesContainer) return;

    const courses = getAllCourses();
    const userProgress = getUserProgress();

    coursesContainer.innerHTML = '';

    courses.forEach(course => {
        const courseProgress = getCourseProgress(course.id);
        const progressPercentage = courseProgress.percentage;
        const isCompleted = progressPercentage === 100;

        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.onclick = () => navigateToCourse(course.id);

        courseCard.innerHTML = `
            <div class="course-icon">${course.icon}</div>
            <h4>${course.title}</h4>
            <p>${course.description}</p>
            <div class="course-info">
                <span>⏱️ ${course.duration}</span>
                <span class="course-level">${course.level}</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <span class="progress-text">${progressPercentage}%</span>
            </div>
            ${isCompleted ? '<div class="completion-badge">✓ Completed</div>' : ''}
        `;

        coursesContainer.appendChild(courseCard);
    });
}

/**
 * Navigate to course detail page
 * @param {number} courseId - ID of the course
 */
function navigateToCourse(courseId) {
    window.location.href = `course.html?id=${courseId}`;
}

/**
 * Update statistics on home page
 */
function updateStatistics() {
    const courses = getAllCourses();
    const totalCourses = courses.length;
    let completedCourses = 0;
    let inProgressCourses = 0;

    courses.forEach(course => {
        const progress = getCourseProgress(course.id);
        if (progress.percentage === 100) {
            completedCourses++;
        } else if (progress.percentage > 0) {
            inProgressCourses++;
        }
    });

    // Update DOM elements
    const totalElement = document.getElementById('totalCourses');
    const completedElement = document.getElementById('completedCourses');
    const inProgressElement = document.getElementById('inProgressCourses');

    if (totalElement) totalElement.textContent = totalCourses;
    if (completedElement) completedElement.textContent = completedCourses;
    if (inProgressElement) inProgressElement.textContent = inProgressCourses;
}

/**
 * ========================================
 * COURSE DETAIL PAGE FUNCTIONS
 * ========================================
 */

/**
 * Initialize course detail page
 */
function initCoursePage() {
    // Protect page - ensure user is logged in
    protectPage();

    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
        alert('Course not found!');
        window.location.href = 'index.html';
        return;
    }

    // Load course data
    const course = getCourseById(parseInt(courseId));
    
    if (!course) {
        alert('Course not found!');
        window.location.href = 'index.html';
        return;
    }

    // Display course information
    displayCourseHeader(course);
    displayCourseLessons(course);
    updateCourseProgress(course.id);

    // Setup mark complete button
    setupMarkCompleteButton(course.id);
}

/**
 * Display course header information
 * @param {Object} course - Course object
 */
function displayCourseHeader(course) {
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseDescription').textContent = course.description;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseLevel').textContent = course.level;
}

/**
 * Display course lessons
 * @param {Object} course - Course object
 */
function displayCourseLessons(course) {
    const lessonsContainer = document.getElementById('lessonsList');
    if (!lessonsContainer) return;

    const progress = getCourseProgress(course.id);
    const completedLessons = progress.completedLessons || [];

    lessonsContainer.innerHTML = '';

    course.lessons.forEach((lesson, index) => {
        const isCompleted = completedLessons.includes(lesson.id);

        const lessonItem = document.createElement('div');
        lessonItem.className = `lesson-item ${isCompleted ? 'completed' : ''}`;
        lessonItem.dataset.lessonId = lesson.id;

        lessonItem.innerHTML = `
            <div class="lesson-content">
                <div>
                    <span class="lesson-number">${index + 1}</span>
                    <span class="lesson-title">${lesson.title}</span>
                </div>
                <div class="lesson-duration">⏱️ ${lesson.duration}</div>
            </div>
            <div class="lesson-actions">
                <button 
                    class="checkbox-btn ${isCompleted ? 'checked' : ''}" 
                    onclick="toggleLessonComplete(${course.id}, ${lesson.id})"
                    title="${isCompleted ? 'Mark as incomplete' : 'Mark as complete'}"
                >
                    ${isCompleted ? '✓' : ''}
                </button>
            </div>
        `;

        lessonsContainer.appendChild(lessonItem);
    });
}

/**
 * Update course progress display
 * @param {number} courseId - Course ID
 */
function updateCourseProgress(courseId) {
    const progress = getCourseProgress(courseId);
    const course = getCourseById(courseId);

    if (!course) return;

    const progressBar = document.querySelector('#courseProgressBar .progress-fill');
    const progressText = document.getElementById('progressPercentage');
    const progressDetails = document.getElementById('progressDetails');

    if (progressBar) {
        progressBar.style.width = `${progress.percentage}%`;
    }

    if (progressText) {
        progressText.textContent = `${progress.percentage}%`;
    }

    if (progressDetails) {
        progressDetails.textContent = 
            `${progress.completed} of ${progress.total} lessons completed`;
    }

    // Update mark complete button
    const markCompleteBtn = document.getElementById('markCourseComplete');
    if (markCompleteBtn) {
        if (progress.percentage === 100) {
            markCompleteBtn.textContent = '✓ Course Completed';
            markCompleteBtn.classList.add('btn-success');
            markCompleteBtn.disabled = true;
        } else {
            markCompleteBtn.textContent = '✓ Mark Entire Course as Complete';
            markCompleteBtn.classList.remove('btn-success');
            markCompleteBtn.disabled = false;
        }
    }
}

/**
 * Setup mark course complete button
 * @param {number} courseId - Course ID
 */
function setupMarkCompleteButton(courseId) {
    const markCompleteBtn = document.getElementById('markCourseComplete');
    
    if (markCompleteBtn) {
        markCompleteBtn.onclick = () => {
            if (confirm('Are you sure you want to mark all lessons as complete?')) {
                markCourseComplete(courseId);
            }
        };
    }
}

/**
 * Toggle lesson completion status
 * @param {number} courseId - Course ID
 * @param {number} lessonId - Lesson ID
 */
function toggleLessonComplete(courseId, lessonId) {
    const userProgress = getUserProgress();
    
    if (!userProgress.courses[courseId]) {
        userProgress.courses[courseId] = {
            completedLessons: []
        };
    }

    const completedLessons = userProgress.courses[courseId].completedLessons || [];
    const lessonIndex = completedLessons.indexOf(lessonId);

    if (lessonIndex > -1) {
        // Remove lesson from completed
        completedLessons.splice(lessonIndex, 1);
    } else {
        // Add lesson to completed
        completedLessons.push(lessonId);
    }

    userProgress.courses[courseId].completedLessons = completedLessons;
    saveUserProgress(userProgress);

    // Refresh display
    const course = getCourseById(courseId);
    displayCourseLessons(course);
    updateCourseProgress(courseId);
}

/**
 * Mark entire course as complete
 * @param {number} courseId - Course ID
 */
function markCourseComplete(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;

    const userProgress = getUserProgress();
    
    // Mark all lessons as complete
    const allLessonIds = course.lessons.map(lesson => lesson.id);
    
    if (!userProgress.courses[courseId]) {
        userProgress.courses[courseId] = {};
    }
    
    userProgress.courses[courseId].completedLessons = allLessonIds;
    saveUserProgress(userProgress);

    // Refresh display
    displayCourseLessons(course);
    updateCourseProgress(courseId);

    // Show success message
    alert('Congratulations! You have completed this course! 🎉');
}

/**
 * ========================================
 * PROGRESS TRACKING FUNCTIONS
 * ========================================
 */

/**
 * Get progress for a specific course
 * @param {number} courseId - Course ID
 * @returns {Object} Progress object with completed, total, and percentage
 */
function getCourseProgress(courseId) {
    const course = getCourseById(courseId);
    if (!course) {
        return { completed: 0, total: 0, percentage: 0, completedLessons: [] };
    }

    const userProgress = getUserProgress();
    const courseProgress = userProgress?.courses?.[courseId] || {};
    const completedLessons = courseProgress.completedLessons || [];

    const total = course.lessons.length;
    const completed = completedLessons.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
        completed,
        total,
        percentage,
        completedLessons
    };
}

/**
 * ========================================
 * PAGE INITIALIZATION
 * ========================================
 */

// Initialize appropriate page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and initialize accordingly
    const path = window.location.pathname;
    const page = path.split('/').pop();

    // Redirect if logged in and on auth pages
    if (page === 'login.html' || page === 'signup.html') {
        redirectIfLoggedIn();
    }

    // Initialize home page
    if (page === 'index.html' || page === '') {
        initHomePage();
    }

    // Course page is initialized separately in course.html
});