# Job Application Tracker Portal 🚀

## Project Overview
The **Job Application Tracker Portal** is a full-stack web application designed to help students, job seekers, and career professionals track job applications, monitor interview stages, and manage their overall job search workflow in one centralized dashboard.

## Problem Statement
Job seekers frequently lose track of applications submitted across various portals, leading to missed deadlines, forgotten follow-ups, and unorganized interview schedules. This portal solves that problem by providing a structured, visual pipeline and real-time tracking system.

## Features
- **Secure Authentication:** User registration and login protected by JSON Web Tokens (JWT) and bcrypt password hashing.
- **Dynamic Kanban Pipeline:** Add, view, and update job applications across stages (Applied, Interview, Offer, Rejected).
- **Interactive Filtering:** Filter applications instantly by status tabs with live counter badges.
- **Modern UI/UX:** Built with Tailwind CSS, featuring glassmorphism elements, custom gradients, and a fully responsive layout.
- **Database Persistence:** Scalable NoSQL storage using MongoDB and Mongoose schemas.

## Tech Stack
- **Frontend:** React.js, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** bcryptjs, jsonwebtoken, dotenv

---

## Folder Structure
Job-Application-Tracker-Portal/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Login, Register, and Dashboard views
│   │   ├── App.jsx         # Main router setup
│   │   └── main.jsx        # React DOM entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                 # Node.js Backend
│   ├── models/             # Mongoose schemas (User.js, Job.js)
│   ├── routes/             # API route handlers (auth.js, jobs.js)
│   ├── middleware/         # JWT verification middleware (auth.js)
│   ├── server.js           # Express server entry point
│   └── package.json
│
├── README.md               # Project documentation
└── .gitignore              # Ignored files (node_modules, .env)

---

## PowerShell Installation & Setup Guide

### Prerequisites
Ensure you have **Node.js** installed on your Windows machine.

### 1. Clone & Setup Backend
Open your first PowerShell terminal, navigate to the `server` folder, install dependencies, and start the server:

```powershell
cd server
npm install
npm run dev

(Make sure you have your .env file configured with PORT=5000, MONGO_URI, and JWT_SECRET).
2. Setup Frontend

Open a second, separate PowerShell terminal, navigate to the client folder, install dependencies, and start the Vite development server:
PowerShell

cd client
npm install
npm run dev

3. Access the Application

Open your browser and navigate to:

    Frontend App: http://localhost:3000

    Backend API: http://localhost:5000

Learning Outcomes

    Designing and implementing secure RESTful APIs using Express and Node.js.

    Managing protected routes, global navigation, and state persistence in React.

    Structuring NoSQL schemas and handling user-specific document relations with MongoDB.

    Crafting modern, accessible user interfaces with Tailwind CSS utility classes.
