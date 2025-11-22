📌 Task Manager — MERN Stack Application

A full-stack task management application built using React, Redux Toolkit, Node.js, Express, and MongoDB. Users can register, login, create tasks, edit tasks, update profile, switch theme, and filter tasks by status & search.

🚀 Features Feature Description 🔐 Authentication Login, Register, Logout using JWT + Cookies 👤 User Profile Update name & password 📝 Task CRUD Create, Read, Update, Delete tasks 🎯 Filters Filter by Pending / Completed / High Priority 🔍 Search Search tasks by title or description 🌙 Dark Mode Theme toggle with persistence 🍪 JWT + Cookies Secure HTTP-only auth 🔄 Real-time UI Redux state updates instantly.

🛠 Tech Stack Frontend

React
Redux Toolkit
React Router
Tailwind CSS
Axios

🛠 Tech Stack Backend

Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
CORS + Cookies

📂 Project Structure
my-project/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    └── store/

⚙️ Environment Variables
Backend .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_secret_key_here

Frontend .env
VITE_BACKEND_URL=http://localhost:5000


# .gitignore
*.env

▶️ Run Locally
🟢 Start Backend
cd backend
npm install
npm start

🔵 Start Frontend
cd frontend
npm install
npm run dev


🌐Open app in browser:
http://localhost:5173

🔐 API Endpoints
Method	Endpoint	Protected	Description
POST	/api/users/register	❌	Register user
POST	/api/users/login	❌	Login user
POST	/api/users/logout	✔	Logout user
GET	/api/users/profile	✔	Get user info
PUT	/api/users/profile	✔	Update user profile
GET	/api/tasks	✔	Get all tasks
POST	/api/tasks	✔	Create task
PUT	/api/tasks/:id	✔	Update task
DELETE	/api/tasks/:id	✔	Delete task

🧪 Postman Collection

All APIs using the Postman collection included in this repository.
File name: TaskManager.postman_collection.json
