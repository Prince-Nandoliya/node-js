# Employee Attendance Management System

A RESTful API built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** for Employee Authentication and Attendance Management.

---

## 🚀 Features

- Employee Registration
- Employee Login with JWT Authentication
- Role-Based Authorization (Admin & Employee)
- Mark Attendance
- Get Today's Attendance
- Logout
- Logout from All Devices
- Update Employee Profile
- Delete Employee
- MongoDB Relationship using Mongoose Populate

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv

---

## 📁 Project Structure

```text
practical_exam/
│
├── config/
│   └── db.js
│
├── controller/
│   ├── Employee.controller.js
│   └── attendance.controller.js
│
├── middleware/
│   ├── auth.js
│   ├── CheckRole.js
│   └── HttpError.js
│
├── model/
│   ├── Employee.model.js
│   └── attendance.model.js
│
├── routes/
│   ├── Employee.router.js
│   ├── attendance.router.js
│   └── admin.router.js
│
├── .env
├── package.json
└── server.js
```

---

# Installation

Clone Repository

```bash
git clone <your-repository-url>
```

Install Dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Server

```bash
npm run dev
```

---

# API Endpoints

## Employee

### Register


<img width="700" alt="addEm" src="https://github.com/user-attachments/assets/75284379-d315-4d5b-b79e-dcfc74701bc4" />



### Login

<img width="700"  alt="loginEm" src="https://github.com/user-attachments/assets/a0e738e0-c862-4338-97f5-60a41893a8c0" />


### Auth Login

<img width="700" alt="authloginEm" src="https://github.com/user-attachments/assets/54a95453-735a-4985-bc6e-c1224bc3700c" />


### Logout

<img width="700"  alt="Logout" src="https://github.com/user-attachments/assets/eb100379-d82e-4d3b-8fe4-4f7083a92b63" />


### Logout All

<img width="700" alt="AllLogout" src="https://github.com/user-attachments/assets/25d7df0d-7d07-4d9c-a5bc-90006e72641a" />


### Update Employee

<img width="700"  alt="updateEm" src="https://github.com/user-attachments/assets/d2d49450-18ad-4a71-bed5-71df8dff002b" />


### Delete Employee

<img width="700"  alt="deleteEm" src="https://github.com/user-attachments/assets/ea796aaa-d21a-4208-b41c-c22ea5bebeb4" />


---

# Author

**Prince Nandoliya**

GitHub

https://github.com/Prince-Nandoliya


---

# License

This project is for educational purposes.
