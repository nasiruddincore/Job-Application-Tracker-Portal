# 🚀 Job Application Tracker Portal

A Full-Stack MERN web application designed to help job seekers, students, and professionals meticulously organize and track their job applications, interview stages, and outcomes.

## 🎯 Problem Statement
Job seekers often juggle dozens of applications across multiple platforms. Tracking them in spreadsheets leads to missed deadlines and disorganized interview prep. This portal provides a centralized, authenticated dashboard to track pipeline velocity, application statuses, and interview schedules.

## ✨ Features
- **Secure Authentication:** JWT-based user login and registration.
- **Application CRUD:** Add, view, edit, and delete job application records.
- **Pipeline Tracking:** Update statuses (Applied, OA, Interview, Offer, Rejected).
- **Dynamic Filtering:** Instantly filter applications by current stage.
- **Responsive UI:** Built with Tailwind CSS for mobile and desktop tracking.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ORM
- **Security:** JWT, bcryptjs

## 🏗️ Architecture & Folder Structure
- `/client` - React SPA (Pages, Components, API services)
- `/server` - Express API (Models, Controllers, Routes, Auth Middleware)

## 🚀 How to Run Locally

1. **Clone the repository:**
   `git clone https://github.com/nasiruddincore/Job-Application-Tracker-Portal.git`
2. **Setup Backend:**
   - `cd server`
   - `npm install`
   - Create `.env` file (PORT=5000, MONGO_URI=..., JWT_SECRET=...)
   - `npm start`
3. **Setup Frontend:**
   - `cd client`
   - `npm install`
   - `npm run dev`

## 📚 Learning Outcomes
Developed a robust understanding of RESTful API design, complex state management in React, MongoDB schema design, and secure token-based authentication protocols.