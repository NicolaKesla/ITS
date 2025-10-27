# ITS - Internship Tracking System

A comprehensive web application for managing internships at Gebze Technical University. This system enables students to find and apply for internships, companies to post opportunities, and administrators to oversee the entire process.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 🎯 Features

### For Students
- **Browse Internships**: Search and filter available internship opportunities
- **Apply Online**: Submit applications with cover letters
- **Track Applications**: Monitor application status in real-time
- **Profile Management**: Maintain student profile with academic information

### For Companies
- **Post Opportunities**: Create and manage internship listings
- **Review Applications**: Access student applications and profiles
- **Status Management**: Update application status (accepted/rejected)
- **Dashboard Analytics**: View internship statistics

### For Administrators
- **Complete Oversight**: Access all internships and applications
- **Evaluation System**: Rate and provide feedback on completed internships
- **User Management**: Oversee students and companies
- **System Monitoring**: Track platform usage and metrics

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js v14+
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, express-rate-limit, express-validator
- **Environment**: dotenv for configuration

### Frontend
- **Framework**: React 19
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: Custom CSS with modern design

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js**: Version 14 or higher ([Download](https://nodejs.org/))
- **MongoDB**: Version 4 or higher ([Download](https://www.mongodb.com/try/download/community))
- **npm**: Comes with Node.js

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NicolaKesla/ITS.git
   cd ITS
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your settings:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/its_database
   JWT_SECRET=your_secure_secret_key_here
   NODE_ENV=development
   ```

## 🎮 Running the Application

### Development Mode

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start the backend** (in one terminal)
   ```bash
   npm run dev
   ```

3. **Start the frontend** (in another terminal)
   ```bash
   cd frontend
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

2. **Start the server**
   ```bash
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student",
  "studentId": "20230001",
  "department": "Computer Engineering",
  "year": 3
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Internship Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/internships` | Get all internships | Yes |
| GET | `/api/internships/:id` | Get specific internship | Yes |
| POST | `/api/internships` | Create internship | Yes (Company/Admin) |
| PUT | `/api/internships/:id` | Update internship | Yes (Company/Admin) |
| DELETE | `/api/internships/:id` | Delete internship | Yes (Company/Admin) |

### Application Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/applications` | Get all applications | Yes |
| GET | `/api/applications/:id` | Get specific application | Yes |
| POST | `/api/applications` | Create application | Yes (Student) |
| PUT | `/api/applications/:id/status` | Update status | Yes (Company/Admin) |
| PUT | `/api/applications/:id/evaluate` | Evaluate application | Yes (Admin) |
| DELETE | `/api/applications/:id` | Delete application | Yes |

## 👥 User Roles

### Student
- Browse and search internships
- Apply to internships
- View application status
- Update profile

### Company
- Post internship opportunities
- View and manage applications
- Update application status
- Edit/delete own postings

### Administrator
- Full system access
- Evaluate internships
- Manage all users
- System oversight

## 📁 Project Structure

```
ITS/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Student.js            # Student profile model
│   │   ├── Company.js            # Company profile model
│   │   ├── Internship.js         # Internship model
│   │   └── Application.js        # Application model
│   └── routes/
│       ├── auth.js               # Authentication routes
│       ├── internships.js        # Internship routes
│       └── applications.js       # Application routes
├── frontend/
│   ├── public/                   # Static files
│   └── src/
│       ├── components/           # React components
│       ├── contexts/
│       │   └── AuthContext.js    # Authentication context
│       ├── pages/
│       │   ├── Login.js          # Login page
│       │   ├── Register.js       # Registration page
│       │   ├── Dashboard.js      # Main dashboard
│       │   ├── Internships.js    # Internship listing
│       │   └── InternshipDetails.js
│       ├── services/
│       │   └── api.js            # API service
│       ├── App.js                # Main app component
│       └── index.js              # Entry point
├── server.js                     # Express server
├── package.json                  # Backend dependencies
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
├── QUICKSTART.md                 # Quick start guide
└── SECURITY.md                   # Security documentation
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with 10 rounds
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: express-validator for request validation
- **Role-Based Access**: Fine-grained permission control
- **CORS Protection**: Configured cross-origin policies

See [SECURITY.md](SECURITY.md) for detailed security information.

## 🧪 Testing

The application can be tested manually:

1. **Register test accounts** for each role (student, company)
2. **Create internships** as a company user
3. **Apply to internships** as a student user
4. **Review applications** as a company user

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Gebze Technical University for the project inspiration
- The open-source community for the excellent tools and libraries

---

**Made with ❤️ for Gebze Technical University**
