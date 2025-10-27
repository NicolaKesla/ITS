# Quick Start Guide

## Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/NicolaKesla/ITS.git
   cd ITS
   npm install
   cd frontend
   npm install
   cd ..
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string
   - `PORT`: Server port (default: 5000)

3. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will open at http://localhost:3000

### Production Mode

1. Build frontend:
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

2. Start server:
   ```bash
   npm start
   ```

## First Steps

1. **Register an Account**
   - Go to http://localhost:3000/register
   - Choose role: Student or Company
   - Fill in required information
   - Click "Register"

2. **Student Workflow**
   - Browse available internships
   - View internship details
   - Apply with a cover letter
   - Track application status

3. **Company Workflow**
   - Post new internship opportunities
   - View applications
   - Update application status

## Default Test Data

You can create test accounts:

**Student Account:**
- Email: student@gtu.edu.tr
- Password: student123
- Student ID: 20230001
- Department: Computer Engineering
- Year: 3

**Company Account:**
- Email: company@example.com
- Password: company123
- Company Name: Tech Corp
- Industry: Software Development

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity

**Port Already in Use:**
- Change PORT in .env file
- Kill process using the port: `lsof -ti:5000 | xargs kill`

**Frontend Build Errors:**
- Clear cache: `cd frontend && npm cache clean --force`
- Reinstall: `rm -rf node_modules package-lock.json && npm install`

## API Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "firstName": "Test",
    "lastName": "User",
    "role": "student",
    "studentId": "20230001",
    "department": "Computer Engineering",
    "year": 3
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```
