# Shuriken E-Learning [AI Powered LMS Portal]

Shuriken E-Learning is an AI-powered interactive platform designed to enhance education through adaptive learning, real-time assessments, and career-building tools. It integrates AI-driven features such as mock interviews, resume analysis, automated proctoring, video summarization, and a job portal to provide a seamless learning experience. The platform offers separate dashboards for **Instructors, and Recruiters** to streamline the experience for each role.

## Features

### 🎓 Learning & Assessments (User Dashboard)

- **AI-Powered LMS** – Provides courses, quizzes, certifications, and real-time performance tracking.
- **Real-Time AI Feedback** – Uses NLP to evaluate student responses and provide instant feedback.
- **Mock Interviews** – Includes AI-driven face detection, speech recognition, and emotion analysis to enhance interview skills.
- **Secure Online Exams** – AI-driven proctoring prevents cheating and ensures exam integrity.
- **Video Summarization** – Uses AI to generate concise summaries of long educational videos, helping students grasp key concepts quickly.
- **Language Translation** – Enables users to translate course content and UI into multiple languages, enhancing accessibility for non-native speakers.

### 📚 Instructor Dashboard

- **Course Management** – Allows instructors to create, manage, and update courses with multimedia content.
- **Student Performance Tracking** – Provides insights into student progress and analytics.
- **Automated Grading** – AI-based grading for quizzes and assignments to reduce manual effort.
- **Live Sessions & Discussions** – Enables interactive learning via live classes and forums.
- **Earnings & Monetization** – Instructors can earn money by selling their courses.

### 💼 Career & Job Assistance (Recruiter Dashboard)

- **Resume Analyzer** – AI-powered resume analysis that scores and provides optimization suggestions.
- **Job & Internship Portal** – Connects students with relevant job opportunities based on skills and qualifications.
- **Applicant Tracking** – Recruiters can filter and manage candidates effectively.
- **Job Posting & Management** – Recruiters can post, manage, and track job applications.

### 🔍 AI & Data Processing

- **Face Detection & Emotion Analysis** – Enhances mock interview training by assessing engagement and confidence.
- **Speech Recognition** – Converts spoken responses into text for AI-driven assessments.
- **Automated Proctoring** – Uses OpenCV-based monitoring to detect anomalies during online exams.
- **Video Summarization** – AI-powered summarization of lectures and learning materials for faster content absorption.

## Roles & Responsibilities

### 👨‍🎓 Users (Learners)

- Enroll in courses and complete quizzes.
- Receive AI-driven feedback and certifications.
- Participate in mock interviews and assessments.
- Apply for jobs and internships via the job portal.

### 👩‍🏫 Instructors

- Create, manage, and monetize courses.
- Track student progress and provide feedback.
- Utilize AI-powered grading for assessments.

### 🏢 Recruiters

- Post and manage job listings.
- Analyze and shortlist candidates using AI-powered resume screening.
- Track applicant progress and manage recruitment pipelines.

## Tech Stack

### 🌐 Frontend

- **React (MERN Stack)** – For dynamic and interactive UI.
- **Tailwind CSS & Framer Motion** – For responsive and smooth UI/UX.
- **D3.js & Recharts** – For data visualizations.
- **Clerk** – Used for authentication (Note: Clerk is currently not supported in production).

### 🖥️ Backend

- **Node.js (Express.js)** – Handles API requests and business logic.
- **Flask (Python)** – Processes AI and NLP-based assessments.

### 🤖 AI/ML

- **TensorFlow.js & Keras** – For AI-driven assessments and analysis.
- **NLP Models** – For response evaluation, resume analysis, and video summarization.
- **OpenCV** – For AI-powered proctoring and monitoring.

## Installation & Setup

### Prerequisites

- Node.js & npm
- Python & pip
- MongoDB

### Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/revanthbethala/Shuriken-AI-Powered-LMS.git
   cd Shuriken-AI-Powered-LMS
   ```
2. **Install dependencies**
   ```sh
   # Frontend
   cd frontend
   npm install
   ```
   ```sh
   # Backend (Node.js)
   cd backend
   npm install
   ```
   ```sh
   # Backend (Flask)
   cd ai
   pip install -r requirements.txt
   ```
3. **Run the application**
   ```sh
   # Start frontend
   cd frontend
   npm start
   ```
   ```sh
   # Start Node.js backend
   cd backend
   npm run dev
   ```
   ```sh
   # Start Flask backend
   cd ai
   python app.py
   ```

## Deployment Status

Currently, the project is **not deployed** due to storage issues. Additionally, Clerk authentication is **not supported in production**, which affects deployment. Future updates will include a deployment solution once these constraints are resolved.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

