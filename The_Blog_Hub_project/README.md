# The Blog Hub Project

A RESTful Blog API built with **Node.js, Express.js, MongoDB, JWT Authentication, Cloudinary, Multer, Joi Validation, and Role-Based Authorization**.

## Features

- User Registration & Login
- JWT Authentication
- Role-Based Access (Admin/User)
- Create, Update, Delete Blogs
- Cloudinary Image Upload
- Input Validation using Joi
- Password Hashing with Bcrypt
- MongoDB with Mongoose
- Protected Routes
- Error Handling Middleware

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt
- Cloudinary
- Multer
- Multer Storage Cloudinary
- Joi
- Dotenv

---

## Project Structure

```text
The_Blog_Hub_Project/
│
├── config/
│   ├── cloudinary.js
│   └── db.js
│
├── controller/
│   ├── Blog.controller.js
│   └── user.controller.js
│
├── middleware/
│   ├── auth.js
│   ├── checkRole.js
│   ├── HttpError.js
│   ├── uploads.js
│   └── validate.js
│
├── model/
│   ├── Blog.model.js
│   └── user.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── Blog.routes.js
│   └── admin.routes.js
│
├── validation/
│   ├── Blog.validation.js
│   └── user.validation.js
│
├── .env
├── package.json
└── server.js
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/The_Blog_Hub_Project.git
```

### 2. Move to the Project Folder

```bash
cd The_Blog_Hub_Project
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a `.env` File

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Run the Server

```bash
npm start
```

or

```bash
npm run dev
```

---

## API Endpoints

### User Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /user/add | Register User |
| POST | /user/login | Login User |
| GET | /user/all | Get All Users |
| GET | /user/authlogin | Get Logged-in User |
| GET | /user/logout | Logout |
| GET | /user/logoutall | Logout From All Devices |
| DELETE | /user/delete | Delete Own Account |
| PATCH | /user/update | Update Own Profile |

---

### Blog Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /blog/add | Create Blog |
| GET | /blog/all | Get All Blogs |
| PATCH | /blog/update/:id | Update Blog |
| DELETE | /blog/delete/:id | Delete Blog |

---

### Admin Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| PATCH | /admin/update/:id | Update Any User |
| DELETE | /admin/delete/:id | Delete Any User |

---

## Authentication

Protected routes require a valid JWT token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Image Upload

Images are uploaded using **Cloudinary** and **Multer Storage Cloudinary**.

Supported Formats:

- JPG
- JPEG
- PNG
- WEBP

---

## Validation

The project uses **Joi Validation** for:

- User Registration
- User Update
- Blog Creation
- Blog Update

---

## Security Features

- Password Hashing using Bcrypt
- JWT Authentication
- Role-Based Authorization
- Input Validation
- Protected Routes
- Cloudinary Secure Image Upload

---

## Future Improvements

- Blog Search
- Pagination
- Blog Categories
- Comments System
- Likes & Reactions
- Email Verification
- Forgot Password
- Refresh Token Authentication
- Swagger API Documentation

---
📸 API Output Screenshots
---

User Registration
---

<img width="700" alt="Screenshot 2026-07-30 133939" src="https://github.com/user-attachments/assets/369a781c-df2c-48a1-879b-0ed2dd0e8ca6" />

User Login
---
<img width="700" alt="Screenshot 2026-07-30 134529" src="https://github.com/user-attachments/assets/c04bdb73-434e-418b-8008-5ff33064deba" />

Auth Login
---
<img width="700"  alt="Screenshot 2026-07-30 134859" src="https://github.com/user-attachments/assets/85ac88f4-c4ef-49d3-9dda-3a9667565706" />

Update User
---
<img width="700" alt="Screenshot 2026-07-30 135723" src="https://github.com/user-attachments/assets/b46ffd98-2ed7-4ea2-baba-62b03bad6839" />

Logout User
---
<img width="700"  alt="Screenshot 2026-07-30 135926" src="https://github.com/user-attachments/assets/0162ecd0-c1ad-4f02-8ab7-6ad39a9fa912" />

Logout From All Devices
---
<img width="700" alt="Screenshot 2026-07-30 140105" src="https://github.com/user-attachments/assets/6d651382-9ab7-49f6-8b9c-2f11d24e4e02" />

Get All Users
---
<img width="700" alt="Screenshot 2026-07-30 140542" src="https://github.com/user-attachments/assets/9e56f24c-65d2-4c7d-91d9-c90cd9016e1f" />

Delete User
---
<img width="700" alt="Screenshot 2026-07-30 140813" src="https://github.com/user-attachments/assets/58e403f6-62f2-4062-8318-4acf9d0d4535" />

## 👨‍💼 Admin Router

Admin Update User
---
<img width="700" alt="Screenshot 2026-07-30 141841" src="https://github.com/user-attachments/assets/adfd66ca-b496-4e0b-8df2-a1337c47eae0" />

Admin Delete User
---
<img width="700"  alt="Screenshot 2026-07-30 142110" src="https://github.com/user-attachments/assets/dac71142-5055-45f6-947d-70f020c14f71" />

## 📝 Blog Router

Add Blog
---
<img width="700" alt="Screenshot 2026-07-30 142704" src="https://github.com/user-attachments/assets/caefc402-885d-473d-bb93-c5154faeea06" />

Get All Blogs
---
<img width="700" alt="Screenshot 2026-07-30 143021" src="https://github.com/user-attachments/assets/3f63d24b-bec1-4a15-8c7a-cd7f1060b634" />

Update Blog
---
<img width="700" alt="Screenshot 2026-07-30 143319" src="https://github.com/user-attachments/assets/bb61e80e-47d0-4b46-abb3-45b88581c84f" />

Delete Blog
---
<img width="700" alt="Screenshot 2026-07-30 143554" src="https://github.com/user-attachments/assets/5ba14603-cec7-4212-9936-07cf8246f248" />

## Author
---
**Prince Nandoliya**

Full Stack Developer

GitHub: https://github.com/Prince-Nandoliya

---


