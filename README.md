# 🔐 MERN JWT Authentication App

A full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js) that supports secure login, signup, OTP verification, and token-based authentication using JWT.

---

## 📁 Folder Structure

```
MERN_JWT_AUTH-main/
├── backend/
│   ├── controllers/           # Authentication logic
│   ├── db/                    # MongoDB connection
│   ├── mail/                  # OTP email sender and templates
│   ├── middleware/            # Token verification
│   ├── models/                # Mongoose user model
│   ├── routes/                # Auth/user routes
│   ├── utils/                 # Token generation helpers
│   └── index.js               # Main Express server
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images/icons
│   │   ├── components/        # Reusable components
│   │   ├── lib/               # Utility functions
│   │   ├── pages/             # App pages (Login, Signup, Dashboard, OTP)
│   │   ├── store/             # Zustand user store
│   │   └── main.jsx           # React entry
│   └── index.html             # App shell
└── README.md
```

---

## 🚀 Features

- JWT-based signup & login
- OTP verification via email
- Secure cookies for token storage
- Zustand for frontend state management
- Vite for fast React bundling
- MongoDB with Mongoose
- Email sending with Nodemailer

---

## ⚙️ Tech Stack

| Technology | Description              |
|------------|--------------------------|
| MongoDB    | Database (NoSQL)         |
| Express    | Web framework (Node.js)  |
| React      | Frontend library         |
| Node.js    | Backend runtime          |
| Vite       | Frontend bundler         |
| Zustand    | Lightweight state manager|
| JWT        | Authentication tokens    |
| Nodemailer | Sending OTP via email    |

---

## 📦 Installation

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Run the server:

```bash
npm start
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🛡️ Security Notes

- Use HTTPS in production
- Store secrets using environment variables
- Sanitize user inputs

---

## 🧑‍💻 Author

Made with ❤️ using MERN Stack by Shubham Pathak
