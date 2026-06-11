# 🏋️ GymOS — Gym Management SaaS Platform

A complete **full-stack gym management system** built for fitness studios to manage members, attendance, payments, analytics, subscriptions, and automated communication.

GymOS helps gym owners manage their daily operations with a modern dashboard, secure backend architecture, and SaaS-based subscription system.

Live demo: [https://gymos-kappa.vercel.app/](https://gymos-kappa.vercel.app/)

---

## 🚀 Features

### 👥 Member Management

- Add, edit, delete gym members
- Manage member details
- Track membership status
- Search and filter members
- Export member data as CSV

---

### 📅 Attendance Management

Complete attendance tracking system:

- Mark member attendance
- View attendance history
- Track total visits
- Separate attendance data architecture
- Organized attendance records

---

### 📊 Analytics Dashboard

Powerful business insights:

- Total members tracking
- Active members count
- Expired members tracking
- Expiring soon members
- Revenue analytics
- Member growth analytics
- Monthly business statistics

---

### 💰 Revenue & Payment Analytics

Built a revenue tracking system:

- Track member payments
- Monthly revenue calculation
- Revenue history storage
- New member growth tracking

Implemented monthly snapshot architecture using `pastData`:

- Revenue data
- New members count
- Last 12 months analytics history

---

### 📧 Automated Email System

Integrated email automation using Resend:

Features:

- Membership expiry reminders
- 7 days before expiry email
- 3 days before expiry email
- 1 day before expiry email
- Expired membership notification

Includes:

- Subscription validation
- Expiry day calculation
- Automated email templates

---

## Screenshots

### Dashboard
![GymOS Dashboard](https://res.cloudinary.com/deuq1r96a/image/upload/v1781168792/devora-images/mtbx2akcrms40dgi5adk.png)

### Members
![GymOS Members](https://res.cloudinary.com/deuq1r96a/image/upload/v1781168914/devora-images/dkdxkl5rq5mkopjbn9r0.png)

### Analytics
![GymOS Analytics](https://res.cloudinary.com/deuq1r96a/image/upload/v1781168977/devora-images/tn5ptrxvtmcexlv6vojt.png)

### Attendance
![GymOS Attendance](https://res.cloudinary.com/deuq1r96a/image/upload/v1781169018/devora-images/e0lqzcce3bsgrdlkg06b.png)

---

## 🔐 SaaS Subscription System

GymOS includes a complete subscription workflow:

- 7 days free trial
- Subscription expiry handling
- Middleware based access control
- Renewal page redirection
- Owner subscription validation

---

# 🛡️ Super Admin Panel

Built a secure admin dashboard to manage the platform.

Features:

- Admin-only access
- Email based authorization
- Backend API protection
- Gym owner management
- Subscription management
- Edit/Delete gym records

Admin tools:

- Search gyms
- Filter by subscription status
- Pagination support

Security is implemented on both:

- Frontend
- Backend APIs

---

# ⚡ Performance & Architecture

Improved application performance with:

- Combined dashboard APIs
- Reduced unnecessary API calls
- React Context based global data sharing
- Optimized data fetching

Backend architecture:

- Scalable database design
- Secure API routes
- Data isolation between gym owners
- Organized business logic

---

# 🏗️ Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS

## Backend

- Next.js API Routes
- MongoDB
- Mongoose

## Authentication

- Clerk Authentication

## Services

- Resend Email API
- Cron Jobs

---

# 🔒 Security

Implemented security features:

- Owner based data isolation
- Protected admin routes
- Backend authorization checks
- Secure API operations
- Subscription validation

---

# 📈 Current Status

GymOS is a production-ready MVP/SaaS prototype with:

✅ Member Management  
✅ Attendance System  
✅ Payment Tracking  
✅ Revenue Analytics  
✅ Subscription System  
✅ Automated Emails  
✅ Admin Dashboard  
✅ Secure Backend Architecture  

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/55lavkush555/GymOS.git

cd gymos
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Setup Environment Variables

Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_clerk_public_key
CLERK_SECRET_KEY=sk_test_clerk_secret_key
MONGODB_URI=mongodb://localhost:27017/gymos
CRON_SECRET=your_cron_secret
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
```

---

# 🎯 Development Highlights

- Designed backend architecture independently
- Created database schemas and relationships
- Built complete business workflows
- Implemented SaaS subscription logic
- Developed real-world gym management features
- Focused on scalable product architecture

---

# 👨‍💻 Developer

Built with passion for full-stack development and SaaS products.

Tech + Problem Solving + Product Thinking 🚀