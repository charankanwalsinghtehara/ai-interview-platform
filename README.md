# AI Career Intelligence Platform

An intelligent career development platform that helps users analyze their resumes, identify skills, practice personalized interviews, track career performance, discover job opportunities, and manage subscriptions.

The project is built primarily around **Data Science, Machine Learning, and Career Analytics**, with Django REST Framework providing the backend APIs and React providing the user interface.

---

# 🚀 Features

## 👤 Authentication

* User registration
* User login
* JWT authentication
* Protected frontend routes
* Protected backend APIs
* Secure logout functionality

---

## 📄 Resume Management

Users can:

* Upload PDF resumes
* Store multiple resumes
* Automatically extract text from PDF files
* Set an active resume
* View uploaded resumes
* Delete resumes

Only PDF resumes are accepted.

---

## 🧠 Resume Intelligence

The platform analyzes resumes to identify:

* Technical skills
* Projects
* Strengths
* Weaknesses
* Developing areas
* Resume score
* Career readiness
* Category-wise performance

---

## 🎤 Personalized AI Interviews

The interview system creates personalized questions based on:

* Selected job role
* User skills
* Resume analysis

Features include:

* Personalized interview questions
* Skill-based questions
* Difficulty levels
* Answer submission
* Prevention of duplicate answers
* Interview completion tracking

---

## 📊 Career Analytics

The dashboard provides career intelligence information including:

* Resume score
* Career readiness
* Total skills
* Total projects
* Strengths
* Weaknesses
* Developing areas
* Category scores

---

## 📈 Reports

Users can access career-related reports based on their:

* Resume performance
* Skills
* Interview performance
* Career development

---

## 💼 Job Matches

The platform provides a section for:

* Job opportunities
* Career recommendations
* Job matching

This module can be extended with more advanced machine learning-based job recommendation algorithms.

---

## 💳 Subscription System

The application includes a subscription system with:

* Free plan
* Pro plan
* Premium plan
* Subscription status tracking
* Monthly usage tracking
* Resume analysis limits
* Interview limits
* Subscription expiry tracking

### Demo Payment System

The current project includes a demo subscription payment system for testing.

Demo payments generate:

* Transaction ID
* Active subscription
* Subscription start date
* Subscription expiry date

---

## ❤️ Contributions

Users can contribute to support the platform.

The contribution system supports:

* Custom contribution amounts
* Payment order creation
* Payment verification
* Contribution status tracking

The system is designed for integration with Razorpay.

---

# 🛠️ Technology Stack

## Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* SQLite
* Pandas
* NumPy
* Scikit-learn
* SciPy
* Joblib
* PyPDF

---

## Frontend

* React
* React Router DOM
* Axios
* Lucide React
* CSS

---

# 📁 Project Structure

```text
ai_interview_platform/
│
├── backend/
│
│   ├── apps/
│   │
│   ├── accounts/
│   ├── resumes/
│   ├── intelligence/
│   ├── analytics/
│   ├── interviews/
│   ├── evaluation/
│   ├── reports/
│   ├── jobs/
│   ├── payments/
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Backend Installation

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project directory:

```bash
cd ai_interview_platform
```

---

## 2. Create a Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate the environment:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

Move to the backend directory:

```bash
cd backend
```

Install requirements:

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file.

Example:

```env
SECRET_KEY=your-secret-key

DEBUG=True

ALLOWED_HOSTS=localhost,127.0.0.1
```

For production, set:

```env
DEBUG=False
```

Never upload your real secret keys to GitHub.

---

## 5. Run Database Migrations

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

---

## 6. Create a Superuser

```bash
python manage.py createsuperuser
```

---

## 7. Run the Django Server

```bash
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

---

# 🎨 Frontend Installation

Move to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

---

# 🔐 Authentication

The application uses JWT authentication.

After successful login, the frontend stores:

```text
access_token
refresh_token
user
```

The access token is automatically attached to protected API requests using Axios.

Example:

```http
Authorization: Bearer ACCESS_TOKEN
```

---

# 🌐 API Modules

## Authentication

```text
/api/auth/
```

Includes:

* Registration
* Login
* Token refresh

---

## Resumes

```text
/api/resumes/
```

Features:

* Resume upload
* Resume listing
* Resume details
* Active resume
* Resume deletion

---

## Intelligence

```text
/api/intelligence/
```

Handles resume intelligence and analysis.

---

## Analytics

```text
/api/analytics/
```

Provides dashboard and career analytics.

---

## Interviews

```text
/api/interviews/
```

Features:

* Start interview
* Generate personalized questions
* Submit answers
* Complete interview

---

## Evaluation

```text
/api/evaluation/
```

Handles interview and performance evaluation.

---

## Reports

```text
/api/reports/
```

Provides career and performance reports.

---

## Jobs

```text
/api/jobs/
```

Provides job-related features and recommendations.

---

## Payments

```text
/api/payments/
```

Includes:

### Contributions

```text
/api/payments/create-order/

/api/payments/verify/
```

### Subscriptions

```text
/api/payments/subscription/create/

/api/payments/subscription/confirm/

/api/payments/subscription/status/
```

---

# 🔒 Protected Routes

The frontend uses protected routing to prevent unauthorized users from accessing application pages.

Protected pages include:

* Dashboard
* Resume
* AI Interview
* Reports
* Job Matches
* Profile
* Career Analytics
* Pricing
* Payment
* Contribution

Users without a valid authentication token are redirected to the login page.

---

# 📊 Subscription Plans

## FREE

The default plan for new users.

Includes limited access to platform features.

---

## PRO

A paid subscription plan with increased usage limits.

Demo price:

```text
₹499
```

---

## PREMIUM

The highest subscription plan with expanded access.

Demo price:

```text
₹999
```

---

# 🧪 Demo Payment Flow

The current subscription payment system supports demo payments.

### Step 1

Create a subscription:

```text
POST /api/payments/subscription/create/
```

### Step 2

Confirm demo payment:

```text
POST /api/payments/subscription/confirm/
```

### Step 3

Check subscription status:

```text
GET /api/payments/subscription/status/
```

After successful confirmation, the subscription becomes:

```text
ACTIVE
```

The subscription remains active for:

```text
30 days
```

---

# 🚀 Production Deployment

Before deployment:

```bash
python manage.py collectstatic --noinput
```

Check the Django project:

```bash
python manage.py check --deploy
```

Important production settings:

```env
DEBUG=False
```

Set the correct:

```env
SECRET_KEY
ALLOWED_HOSTS
```

Configure CORS with your deployed frontend URL.

Example:

```python
CORS_ALLOWED_ORIGINS = [

    "https://your-frontend-domain.com",

]
```

---

# 🔮 Future Improvements

Possible future improvements include:

* Advanced machine learning job recommendations
* Real AI answer evaluation
* Natural language processing for resume analysis
* Voice-based interviews
* Speech-to-text support
* Text-to-speech interviewer
* Advanced interview scoring
* PDF report generation
* Email notifications
* Password reset
* Real Razorpay subscription integration
* PostgreSQL database
* Docker deployment
* CI/CD pipeline
* Cloud storage for resumes

---

# 🎯 Project Focus

The main focus of this project is:

```text
Data Science
Machine Learning
Career Analytics
Resume Intelligence
Personalized Interview Systems
```

The Django and React components provide the infrastructure required to deliver these intelligent features through a complete web application.

---

# 👨‍💻 Author

**Charan Kanwal Singh**

B.Tech Computer Science Engineering

AI Career Intelligence Platform

---

# 📜 License

This project is created for educational and portfolio purposes.
