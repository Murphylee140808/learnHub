# 📘 LearnHub – E-Learning Platform

**LearnHub** is a modern browser-based e-learning web app that allows users to **register, log in, and track their learning progress** across multiple interactive courses.

Built entirely with  **HTML, CSS, and Vanilla JavaScript** , it demonstrates practical implementation of authentication, dynamic UI rendering, and localStorage-based progress management — all without a backend server.

---

## 🚀 Features

✅ **User Authentication**

* Register, login, and logout functionality
* Persistent sessions using `localStorage`
* Demo account auto-created on first launch (`demo@learnhub.com`, password: `demo123`)

✅ **Course Management**

* Dynamic list of available courses with icons, durations, and difficulty levels
* View course details, lessons, and completion tracking
* Mark lessons or entire courses as complete

✅ **Progress Tracking**

* Saves each user’s progress locally
* Displays completion percentage and badges for finished courses
* Tracks overall statistics (total, completed, and in-progress courses)

✅ **User Interface**

* Fully responsive layout using modern CSS
* Clean course cards, progress bars, and user-friendly navigation
* Welcome banner displaying logged-in user’s name

---

## 🧩 Project Structure

```
📁 LearnHub/
├── index.html              # Home page (course dashboard)
├── login.html              # Login page
├── signup.html             # Registration page
├── course.html             # Individual course details
│
├── JS/
│   ├── auth.js             # User registration, login, and session handling
│   ├── data.js             # Course data and helper functions
│   ├── main.js             # Core app logic and UI rendering
│
├── CSS/
│   └── style.css           # Main stylesheet for all pages
│
└── README.md               # Project documentation
```

---

## ⚙️ Installation & Setup

1. **Clone or Download** this repository

   ```bash
   git clone https://github.com/your-username/learnhub.git
   ```
2. **Open the project folder**

   ```bash
   cd learnhub
   ```
3. **Run the project**

   Simply open `index.html` in your browser, or use a local server:

   ```bash
   npx live-server
   ```

   *(optional, for real-time reload)*

---

## 👥 Authentication Flow

| Page            | Function                                            |
| --------------- | --------------------------------------------------- |
| `signup.html` | Register new user — data saved to `localStorage` |
| `login.html`  | Log in existing user                                |
| `index.html`  | Accessible only to logged-in users                  |
| `course.html` | Displays selected course and lessons                |
| Logout Button   | Clears session and redirects to `login.html`      |

**Demo account credentials:**

```
Email: demo@learnhub.com
Password: demo123
```

---

## 🧠 How Progress Works

Each logged-in user has a unique progress record saved under:

```json
{
  "user_id": {
    "courses": {
      "1": { "completedLessons": [1,2,3] },
      "2": { "completedLessons": [] }
    },
    "lastUpdated": "2025-10-16T07:00:00Z"
  }
}
```

This structure allows:

* Individual course tracking
* Automatic progress updates after each lesson
* Local persistence even after page refresh or logout

---

## 🛠️ Technologies Used

| Technology                         | Purpose                                  |
| ---------------------------------- | ---------------------------------------- |
| **HTML5**                    | Structure and page layout                |
| **CSS3**                     | Responsive design and styling            |
| **Vanilla JavaScript (ES6)** | Core functionality and logic             |
| **LocalStorage API**         | Persistent user data and course progress |

---

## 🎓 Available Courses

1. 🌐 **Introduction to Web Development**
2. 🐍 **Python Programming Masterclass**
3. 📊 **Data Science Fundamentals**
4. 🎨 **UI/UX Design Principles**

Each course includes multiple lessons, durations, and completion tracking.

---

## 🧑‍💻 Author

**Omowumi Maruff Akindehinde (Techgod)**

Frontend Developer | Data Scientist | Notion Expert

📧 [akindehindeomowumi@gmail.com](mailto:akindehindeomowumi@gmail.com)

---

## 📜 License

This project is released under the  **MIT License** .

You’re free to modify, share, and build upon it — just give credit to the original author.

---

## 🌟 Future Improvements

* Backend integration with Firebase or Node.js
* User profile and settings page
* Course quizzes and certification badges
* Dark mode toggle
* Cloud-based progress sync
