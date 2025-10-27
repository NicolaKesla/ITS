# ITS - Internship Tracking System

A web application for internship tracking system for Gebze Technical University.

## Features

- **User Authentication**: Secure login and registration for students, companies, and administrators
- **Role-Based Access**: Different dashboards and permissions for students, companies, and admins
- **Internship Management**: Companies can post, edit, and manage internship opportunities
- **Application System**: Students can browse internships and submit applications
- **Application Tracking**: Track application status (pending, accepted, rejected, completed)
- **Evaluation System**: Administrators can evaluate completed internships

## Technology Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router for navigation
- Axios for API calls
- Context API for state management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NicolaKesla/ITS.git
cd ITS
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Configure the `.env` file with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/its_database
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Running the Application

### Development Mode

1. Start MongoDB:
```bash
mongod
```

2. Start the backend server:
```bash
npm run dev
```

3. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

2. Start the backend:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Internships
- `GET /api/internships` - Get all internships
- `GET /api/internships/:id` - Get specific internship
- `POST /api/internships` - Create internship (company/admin only)
- `PUT /api/internships/:id` - Update internship (company/admin only)
- `DELETE /api/internships/:id` - Delete internship (company/admin only)

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get specific application
- `POST /api/applications` - Create application (student only)
- `PUT /api/applications/:id/status` - Update application status (company/admin only)
- `PUT /api/applications/:id/evaluate` - Evaluate application (admin only)
- `DELETE /api/applications/:id` - Delete application

## User Roles

### Student
- Browse available internships
- Apply to internships with cover letter
- View application status
- Track internship progress

### Company
- Post internship opportunities
- Manage internship listings
- View and manage applications
- Update application status

### Administrator
- Full access to all features
- Evaluate completed internships
- Manage all users and data

## Project Structure

```
ITS/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Company.js
│   │   ├── Internship.js
│   │   └── Application.js
│   └── routes/
│       ├── auth.js
│       ├── internships.js
│       └── applications.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── contexts/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── Internships.js
│       │   └── InternshipDetails.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       └── index.js
├── server.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Contact

For questions or support, please contact the development team.
