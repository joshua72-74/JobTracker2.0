# JobTracker2.0

JobTracker2.0 is a full-stack MERN (MongoDB, Express, React, Node.js) application that helps users efficiently track their job applications and manage their job search process.

---

## Features

- User authentication with JWT and role-based access control (admin/user).
- CRUD operations for job applications (create, read, update, delete).
- Filter and search jobs by status, company, and date.
- Export job application data to CSV.
- Responsive and user-friendly React frontend.
- Secure and scalable backend with Node.js, Express, and MongoDB.

---

## Tech Stack

- **Frontend:** React, Axios, Material-UI  
- **Backend:** Node.js, Express, Mongoose  
- **Database:** MongoDB  
- **Authentication:** JWT, bcryptjs

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)  
- MongoDB (local or Atlas cloud)  
- npm or yarn

### Installation

1. Clone the repository:
git clone <your-repo-url>
cd jobtracker-2.0

2. Install backend dependencies:
cd backend
npm install

3. Install frontend dependencies:
cd ../frontend
npm install


4. Create `.env` file in `backend` folder with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


5. Start the backend server:
cd ../backend
npm start


6. Start the frontend:
cd ../frontend
npm start


---

## Project Structure

/backend - Node.js and Express backend code
/controllers
/models
/routes
server.js
.env

/frontend - React frontend code
/src
package.json


---

## API Endpoints

- `POST /api/auth/signup` - User registration  
- `POST /api/auth/login` - User login  
- `GET /api/jobs` - Get user jobs (protected)  
- `POST /api/jobs` - Add new job (protected)  
- `PUT /api/jobs/:id` - Update job (protected)  
- `DELETE /api/jobs/:id` - Delete job (protected)  

---

