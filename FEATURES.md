# ITS Application Features

## 📱 User Interface Overview

### Authentication Pages

#### Login Page (`/login`)
- Email and password input
- Error message display
- Link to registration page
- Clean, modern design with gradient background
- Form validation

#### Register Page (`/register`)
- User information form (email, password, first name, last name)
- Role selection (Student/Company)
- Dynamic form fields based on role:
  - **Students**: Student ID, Department, Year
  - **Companies**: Company Name, Industry
- Input validation
- Link to login page

### Dashboard (`/dashboard`)
- Personalized welcome message
- Role-specific navigation cards:
  - **Students**: 
    - Browse Internships
    - My Applications
  - **Companies**:
    - View Internships
    - Post Internship
    - Applications
  - **Admin**:
    - All Internships
    - All Applications
- Clean card-based layout
- Navigation bar with logout

### Internship Listing (`/internships`)
- Grid layout of internship cards
- Search functionality
- Each card displays:
  - Internship title
  - Company name
  - Description preview
  - Duration and location
  - "View Details" button
- Filter by status (open internships by default)
- Company users can see "Post New Internship" button

### Internship Details (`/internships/:id`)
- Complete internship information:
  - Title and company
  - Full description
  - Requirements list
  - Duration, location, start/end dates
  - Number of positions
  - Stipend (if applicable)
- Application form (for students):
  - Cover letter text area
  - Submit button
  - Success/error messages
- Back to internships list button

## 🔐 Role-Based Features

### Student Role
| Feature | Access |
|---------|--------|
| Browse Internships | ✅ |
| View Internship Details | ✅ |
| Apply to Internships | ✅ |
| View Own Applications | ✅ |
| Edit Applications | ✅ (pending only) |
| Create Internships | ❌ |
| View All Applications | ❌ |

### Company Role
| Feature | Access |
|---------|--------|
| Browse Internships | ✅ |
| View Internship Details | ✅ |
| Apply to Internships | ❌ |
| Create Internships | ✅ |
| Edit Own Internships | ✅ |
| Delete Own Internships | ✅ |
| View Applications | ✅ |
| Update Application Status | ✅ |

### Admin Role
| Feature | Access |
|---------|--------|
| Browse Internships | ✅ |
| View Internship Details | ✅ |
| Create Internships | ✅ |
| Edit Any Internship | ✅ |
| Delete Any Internship | ✅ |
| View All Applications | ✅ |
| Update Application Status | ✅ |
| Evaluate Internships | ✅ |

## 📊 Data Models

### User
- Email (unique, validated)
- Password (hashed with bcrypt)
- Role (student/company/admin)
- First Name
- Last Name
- Created At

### Student Profile
- User reference
- Student ID (unique)
- Department
- Year (academic year)
- GPA (optional)
- Phone (optional)
- Address (optional)
- Skills (array)
- Resume link (optional)

### Company Profile
- User reference
- Company Name
- Industry
- Address (optional)
- Phone (optional)
- Website (optional)
- Description (optional)

### Internship
- Company reference
- Title
- Description
- Requirements (array)
- Duration
- Start Date
- End Date
- Location
- Stipend (optional)
- Number of Positions
- Status (open/closed/filled)

### Application
- Internship reference
- Student reference
- Status (pending/accepted/rejected/completed)
- Cover Letter
- Applied At timestamp
- Evaluation (optional):
  - Rating (0-5)
  - Feedback text
  - Evaluated By (admin reference)
  - Evaluated At timestamp

## 🎨 Design Features

### Color Scheme
- Primary: #667eea (Purple-blue)
- Secondary: #764ba2 (Deep purple)
- Background: #f5f7fa (Light gray)
- Success: #d4edda (Light green)
- Error: #fee (Light red)
- Text: #333 (Dark gray)

### UI Components
- **Cards**: Elevated with shadow, hover effects
- **Buttons**: Rounded, gradient on hover
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with branding
- **Responsive**: Grid layouts adapt to screen size

## 🔄 Application Flow

### Student Journey
1. Register with student credentials
2. Login to access dashboard
3. Browse available internships
4. Click on internship for details
5. Submit application with cover letter
6. Receive confirmation message
7. Track application status in dashboard

### Company Journey
1. Register with company credentials
2. Login to access dashboard
3. Post new internship opportunity
4. View submitted applications
5. Review student profiles
6. Update application status
7. Manage internship listings

### Admin Journey
1. Login with admin credentials
2. Access admin dashboard
3. Monitor all internships
4. Review all applications
5. Evaluate completed internships
6. Provide ratings and feedback
7. Oversee system usage

## 🔒 Security Measures

### Authentication
- JWT tokens with 7-day expiration
- Secure token storage in localStorage
- Automatic token attachment to API requests
- Token validation on protected routes

### Authorization
- Middleware checks user role before allowing access
- Route-level permission control
- Action-level permission validation
- Owner verification for updates/deletes

### Input Security
- express-validator for all form inputs
- Email format validation
- Password minimum length (6 characters)
- Required field validation
- Type checking for all inputs

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 5 attempts per 15 minutes
- IP-based tracking
- Automatic blocking on limit exceeded

### Data Protection
- Password hashing with bcrypt (10 rounds)
- No sensitive data in client-side storage
- Environment variables for secrets
- CORS configuration for API access
- MongoDB connection security

## 📈 Future Enhancements

Potential features for future versions:
- File upload for resumes and documents
- Email notifications for application updates
- Advanced search with filters
- Application analytics dashboard
- Company verification system
- Student recommendation system
- Chat/messaging between students and companies
- Calendar integration for internship dates
- Mobile application
- Multi-language support (Turkish/English)
