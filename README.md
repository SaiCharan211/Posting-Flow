# Event Requirement Management System

This project is a full-stack application designed to manage event requirements. It consists of a **Next.js** frontend for collecting user requirements and a **Node.js** backend for processing these requests.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [How to Run](#how-to-run)
- [Workflow](#workflow)
- [Deployment](#deployment)

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (Node Package Manager)

## Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Assignment
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

### 3. Frontend Setup
Navigate to the frontend folder and install dependencies:
```bash
cd ../frontend
npm install
```

## Environment Variables

To ensure the frontend and backend communicate correctly, you need to set up environment variables.

### Backend (`backend/.env`)
Create a file named `.env` in the `backend` directory and add the following:

```env
PORT=4000
# Add other backend variables here (e.g., Database URL)
# MONGODB_URI=mongodb://localhost:27017/yourdb
```

### Frontend (`frontend/.env.local`)
Create a file named `.env.local` in the `frontend` directory and add the following:

```env
# URL of the backend API
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## How to Run

You need to run both the backend and frontend servers simultaneously.

### 1. Start the Backend
Open a terminal, navigate to the `backend` directory, and run:
```bash
npm start
# OR if you have nodemon installed for development:
# npm run dev
```
The server will start on port 4000 (or the port defined in your .env).

### 2. Start the Frontend
Open a new terminal, navigate to the `frontend` directory, and run:
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

## Workflow

1.  **Step 1 (Event Details)**: The user fills in general event information such as Event Name, Type, Start/End Dates, and Location.
2.  **Step 2 (Hire Type)**: The user selects the type of service required: Event Planner, Performer, or Crew.
3.  **Step 3 (Specifics)**: Based on the selection in Step 2, dynamic fields appear:
    *   *Planner*: Budget input.
    *   *Performer*: Performer Type and Genre.
    *   *Crew*: Crew Type and Number of People.
4.  **Submission**:
    *   The frontend validates that all mandatory fields are filled.
    *   A POST request is sent to `${NEXT_PUBLIC_API_URL}/api/requirements`.
    *   On success, an alert is shown, and the form resets to Step 1.

## Deployment

### Frontend
The frontend is built with Next.js and can be easily deployed on **Vercel**:
1.  Push your code to a git repository.
2.  Import the project into Vercel.
3.  **Important**: Add the `NEXT_PUBLIC_API_URL` in the Vercel Project Settings > Environment Variables, pointing to your deployed backend URL (e.g., `https://my-api.onrender.com`).

### Backend
The backend can be deployed on platforms like **Render**, **Railway**, or **Heroku**.
1.  Ensure your start script in `package.json` is correct (e.g., `node index.js`).
2.  Set the `PORT` environment variable in the hosting provider's dashboard if required.
