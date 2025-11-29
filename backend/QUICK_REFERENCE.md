# Staj Backend - Quick Reference Guide

## 🚀 Server Status
- ✅ Running on: http://localhost:3001
- ✅ Database: PostgreSQL (stajtakip)
- ✅ Migration: 20251117200612_init

## 📦 Available Commands

```bash
# Start development server
npm run dev

# Generate Prisma Client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Run database seeder
npm run prisma:seed

# Reset database (drops all data)
npx prisma migrate reset --force

# Open Prisma Studio (GUI for database)
npx prisma studio
```

## 🔑 Test Credentials

All passwords: `password123`

### General Admins
- admin1@example.com
- admin2@example.com

### Computer Engineering
- Chair: ceng_chair@example.com
- Members: ceng_member1@example.com, ceng_member2@example.com

### Electrical Engineering  
- Chair: eeng_chair@example.com
- Members: eeng_member1@example.com, eeng_member2@example.com

### Mechanical Engineering
- Chair: meng_chair@example.com
- Members: meng_member1@example.com, meng_member2@example.com

## 📚 Database Models

### Core Models
1. **Role** - User roles (Admin, Chair, Member)
2. **User** - System users with roles
3. **Department** - Academic departments
4. **Student** - Students doing internships
5. **Company** - Companies offering internships
6. **Term** - Academic terms (Summer/Winter)
7. **Internship** - Internship records

### Enums
- **InternshipStatus**: IN_PROGRESS, AWAITING_EVALUATION, COMPLETED
- **InternshipOrderType**: STAJ1, STAJ2

## 🔌 Current API Endpoints

### GET /
Home page - checks if server is running

### POST /api/kullanici (Create User)
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "roleId": 1  // Optional
}
```

### GET /api/kullanicilar (List Users)
Returns all users with their roles and departments

### POST /api/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Returns JWT token and user info

## 📊 Database Statistics (from seed)
- 3 Roles
- 14 Users
- 3 Departments
- 12 Students
- 7 Companies
- 2 Terms
- 15+ Internship records

## 🔧 Next Development Tasks
1. Add endpoints for:
   - Students (CRUD)
   - Internships (CRUD)
   - Companies (CRUD)
   - Terms (CRUD)
2. Implement authentication middleware
3. Add role-based authorization
4. File upload for internship documents
5. Reporting and analytics endpoints

## ⚠️ Important Notes
- User model uses `username` (not `name`)
- All users must have a `roleId`
- Login uses `email` and `password`
- JWT tokens expire in 1 hour
- Database connection string in `.env`

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 3001 is in use
lsof -ti:3001 | xargs kill -9
npm run dev
```

### Prisma Client out of sync
```bash
npx prisma generate
```

### Database schema drift
```bash
npx prisma migrate reset --force
npx prisma migrate dev
```

### Need fresh data
```bash
npm run prisma:seed
```
