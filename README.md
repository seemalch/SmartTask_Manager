# Smart Task Manager
A web-based task management application with user authentication and reminders.

## How to Run the Project

1. **Clone the Repository**:
2. **Install Dependencies**: 
--> Navigate to frontend: 
cd frontend
npm run dev
--> Navigate to backend: 
cd backend
npm run dev 
3. **Set Up Environment**:
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
4. **Run the Application**:

## Assumptions Made
Users require email verification for account activation.
Tasks can have reminders set to specific times.
The app runs on a local development environment with a PostgreSQL database.
Basic CRUD operations are implemented for tasks.

## Improvements if Have More Time
Frontend: Add unit tests with Jest and improve UI responsiveness with mobile layouts.
Backend: Implement rate limiting and input validation for APIs.
Database: Add indexes for faster queries on due_date and user_id.
Features: Include task categories, recurring tasks, and email notifications for reminders.
Deployment: Set up CI/CD pipelines with GitHub Actions and optimize for production.
