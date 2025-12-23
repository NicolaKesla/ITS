# Internship Tracking System (ITS)

A comprehensive web application for managing student internships at Gebze Technical University.

## Overview

ITS is a full-stack application designed to track and manage student internships. It supports multiple user roles (Admin, Commission Chair, Commission Member) and handles the complete internship lifecycle from application to grading and reporting.

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM (Object-Relational Mapping)
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **pdf-parse** - PDF parsing for internship documents

### Frontend
- **React.js** - UI framework
- **CSS3** - Modern styling with responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Verify installations:

```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show 8.x.x or higher
psql --version    # Should show 14.x or higher
```

## Quick Start Guide

### 1. Clone the Repository

```bash
git clone https://github.com/NicolaKesla/ITS.git
cd ITS-main
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend-new
npm install
```

## Database Setup

### Step 1: Start PostgreSQL

**macOS (Homebrew):**
```bash
brew services start postgresql@14
```

**Linux:**
```bash
sudo service postgresql start
```

**Windows:**
PostgreSQL should start automatically. Check in Services.

### Step 2: Create Database User (if needed)

```bash
# Connect to PostgreSQL
psql postgres

# Create a new user
CREATE USER your_username WITH PASSWORD 'your_password';

# Grant privileges
ALTER USER your_username CREATEDB;

# Exit
\q
```

### Step 3: Create Database

```bash
# Option 1: Using createdb command
createdb -U your_username internship_db

# Option 2: Using psql
psql -U your_username postgres
CREATE DATABASE internship_db;
\q
```

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following content to `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/internship_db?schema=public"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_use_random_string
JWT_EXPIRE=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

**⚠️ Important:** Replace `your_username` and `your_password` with your actual PostgreSQL credentials.

**Security Note:** In production, use a strong random string for JWT_SECRET (at least 32 characters).

### Step 5: Run Database Migrations

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev

# This will:
# 1. Create all database tables
# 2. Set up relationships and constraints
# 3. Generate Prisma Client
```

### Step 6: Seed the Database

```bash
# Add test data to the database
npm run prisma:seed
```

This will populate your database with:
- ✅ 3 User Roles (Admin, Chair, Member)
- ✅ Multiple Departments
- ✅ Test Users (with hashed passwords)
- ✅ Students
- ✅ Academic Terms
- ✅ Companies
- ✅ Sample Internship records

## Features

### User Roles & Capabilities

**Administrator:**
- Manage departments and academic terms
- Assign commission chairs to departments
- View system-wide statistics
- Manage user accounts
- Monitor commission status

**Commission Chair:**
- View assigned students
- Add commission members
- Manage student internship applications
- Upload and parse internship PDFs
- Perform early evaluations
- Grade completed internships
- Generate reports

**Commission Member:**
- View assigned students
- Access internship documentation
- Participate in evaluations
- Grade internships
- Contribute to reports

## Running the Application

### Start Backend Server

Open a terminal and run:

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

You should see: `✓ Server running on port 5000` and `✓ Database connected`

### Start Frontend Development Server

Open a **new terminal** (keep backend running) and run:

```bash
cd frontend-new
npm start
```

Frontend will run on: `http://localhost:3000`

The application will automatically open in your browser.

## Default Login Credentials

After seeding the database, you can use these credentials to test different roles:

**Admin:**
- Email: `admin@gtu.edu.tr`
- Password: `admin123`

**Commission Chair:**
- Email: `chair@gtu.edu.tr`
- Password: `chair123`

**Commission Member:**
- Email: `member@gtu.edu.tr`
- Password: `member123`

⚠️ **Note:** All users are required to change their password on first login.

## API Endpoints

The backend provides RESTful API endpoints:

- **Authentication:** `/api/auth/*` - Login, logout, password management
- **Users:** `/api/users/*` - User CRUD operations
- **Students:** `/api/students/*` - Student management
- **Departments:** `/api/departments/*` - Department operations
- **Internships:** `/api/internships/*` - Internship tracking
- **Grading:** `/api/grading/*` - Evaluation and grading

All protected routes require JWT authentication via `Authorization: Bearer <token>` header.

## Troubleshooting

### Common Issues

**Database Connection Error:**
```bash
# Check if PostgreSQL is running
psql postgres

# If it fails to connect, start PostgreSQL:
# macOS: brew services start postgresql@14
# Linux: sudo service postgresql start
```

**Port Already in Use:**
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

**Prisma Client Not Generated:**
```bash
cd backend
npx prisma generate
```

**Migration Issues:**
```bash
# Reset and recreate database
cd backend
npx prisma migrate reset
# This will drop the database, recreate it, and run seeds
```

**Frontend Won't Start:**
```bash
# Clear npm cache and reinstall
cd frontend-new
rm -rf node_modules package-lock.json
npm install
npm start
```

## Database Management

### Prisma Studio - Visual Database Editor

Prisma Studio provides a GUI to view and edit your database:

```bash
cd backend
npx prisma studio
```

This will open: `http://localhost:5555`

**Features:**
- View all tables and data
- Edit records directly
- Add new records
- Delete records
- Filter and search data

### Command Line Database Access

```bash
# Connect to database
psql -U your_username -d internship_db

# Common commands:
\dt              # List all tables
\d "TableName"   # Describe table structure
SELECT * FROM "User";  # Query data
\q               # Quit
```

### Reset Database (Delete all data)
```bash
cd backend

# Using Prisma (Recommended - includes re-seeding)
npx prisma migrate reset

# This will:
# - Drop all tables
# - Recreate schema from migrations
# - Run seed script automatically
```

### Making Schema Changes

When you modify `prisma/schema.prisma`:

```bash
# Create and apply migration with a descriptive name
npx prisma migrate dev --name your_migration_description

# Examples:
npx prisma migrate dev --name add_student_phone_field
npx prisma migrate dev --name update_user_roles
```

## 📁 Project Structure

```
ITS-main/
├── backend/                      # Backend Node.js/Express application
│   ├── prisma/
│   │   ├── migrations/           # Database migration history
│   │   │   ├── 20251108170937_init/
│   │   │   ├── 20251120183240_add_requires_password_change/
│   │   │   ├── 20251120184648_add_name_to_user/
│   │   │   ├── 20251214124323_add_grade_comment/
│   │   │   └── 20251216194356_add_is_reported_to_internship/
│   │   ├── schema.prisma         # Database schema definition
│   │   └── seed.js               # Database seeding script
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js         # Prisma client configuration
│   │   │
│   │   ├── controllers/          # Business logic layer
│   │   │   ├── authController.js
│   │   │   ├── departmentController.js
│   │   │   ├── gradingController.js
│   │   │   ├── internshipController.js
│   │   │   ├── studentController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.js           # JWT authentication middleware
│   │   │
│   │   ├── routes/               # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── departmentRoutes.js
│   │   │   ├── gradingRoutes.js
│   │   │   ├── internshipRoutes.js
│   │   │   ├── studentRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   └── server.js             # Express server setup
│   │
│   ├── .env                      # Environment variables (create this)
│   ├── index.js                  # Application entry point
│   └── package.json              # Backend dependencies
│
├── frontend-new/                 # React frontend application
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.js         # Shared header component
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin/            # Admin role pages
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── CommissionChairAssignment.js
│   │   │   │   └── CommissionStatus.js
│   │   │   │
│   │   │   ├── Auth/             # Authentication pages
│   │   │   │   ├── Login.js
│   │   │   │   ├── ChangePassword.js
│   │   │   │   └── ForgotPassword.js
│   │   │   │
│   │   │   ├── Chair/            # Commission Chair pages
│   │   │   │   ├── ChairDashboard.js
│   │   │   │   ├── StudentList.js
│   │   │   │   ├── AddCommissionMember.js
│   │   │   │   ├── EarlyEvaluation.js
│   │   │   │   ├── GradeInternship.js
│   │   │   │   └── UploadInternshipPDF.js
│   │   │   │
│   │   │   └── Member/           # Commission Member pages
│   │   │       ├── MemberDashboard.js
│   │   │       ├── StudentList.js
│   │   │       ├── EarlyEvaluation.js
│   │   │       ├── GradeInternship.js
│   │   │       └── UploadInternshipPDF.js
│   │   │
│   │   ├── services/
│   │   │   └── authService.js    # API service layer
│   │   │
│   │   ├── App.js                # Main React component
│   │   └── index.js              # React entry point
│   │
│   └── package.json              # Frontend dependencies
│
├── test/                         # Test files and utilities
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```



## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
