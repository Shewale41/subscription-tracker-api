<div align="center">

# Subscription Management System API

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />
<img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/mongodb-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" />

### A production-ready backend API for managing subscriptions, authentication, reminders, and automation workflows

</div>

---

## 📋 Table of Contents

1. Introduction
2. Tech Stack
3. Features
4. Project Architecture
5. Quick Start
6. Example Request Payload
7. API Overview
8. Environment Variables
9. Development Notes

---

## 🤖 Introduction

This project is a **Subscription Management System API** designed to simulate real-world backend workflows involving authentication, billing logic, and automated reminders.

It demonstrates how to:

* Secure APIs with authentication middleware
* Model real business data with MongoDB
* Automate workflows using background job scheduling
* Send transactional email reminders
* Build scalable backend architecture

The system is structured to resemble production-grade APIs used in SaaS platforms.

---

## ⚙️ Tech Stack

* **Node.js** — backend runtime
* **Express.js** — API framework
* **MongoDB + Mongoose** — database modeling
* **JWT** — authentication & authorization
* **Arcjet** — rate limiting & bot protection
* **Upstash Workflow/QStash** — background scheduling
* **Nodemailer** — transactional email delivery
* **Day.js** — date/time handling

---

## 🔋 Features

👉 Secure authentication using JWT

👉 Subscription CRUD management

👉 Automated reminder scheduling

👉 Background workflow orchestration

👉 Email notification system

👉 Database modeling with relationships

👉 Global error handling middleware

👉 Rate limiting & bot protection

👉 Clean modular architecture

👉 Production-style API structure

---

## 🏗 Project Architecture

```
controllers/
routes/
models/
middleware/
utils/
config/
database/
workflows/
```

The architecture separates:

* Business logic
* API routing
* database modeling
* background workflow processing
* email utilities

This ensures maintainability and scalability.

---

## 🤸 Quick Start

### Prerequisites

Make sure you have installed:

* Git
* Node.js (v18+)
* npm
* MongoDB (local or cloud)

---

### Clone Repository

```bash
git clone <your-repository-url>
cd subscription-tracker
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create:

```
.env.development.local
```

Add:

```env
# Server
PORT=5500
SERVER_URL=http://localhost:5500

# Environment
NODE_ENV=development

# Database
DB_URI=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=1d

# Arcjet
ARCJET_KEY=
ARCJET_ENV=development

# Upstash Workflow
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# Email
EMAIL_PASSWORD=
```

---

### Start Local Workflow Server

```bash
npx @upstash/qstash-cli dev
```

Keep this terminal running.

---

### Start API Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5500
```

---

## 🧪 Example Request Payload

```json
{
  "name": "Streaming Subscription",
  "price": 19.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "Entertainment",
  "startDate": "2026-01-10T00:00:00.000Z",
  "paymentMethod": "Card"
}
```

---

## 🔗 API Overview

### Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

---

### Users

```
GET /api/v1/users/:id
```

---

### Subscriptions

```
POST /api/v1/subscriptions
GET /api/v1/subscriptions/:userId
```

---

### Workflow Trigger

```
POST /api/v1/workflows/subscription/remainder
```

Schedules automated renewal reminder emails.

---

## 🔐 Environment Variables

Sensitive values should never be committed.

Required:

* Database connection string
* JWT secrets
* Email credentials
* Workflow tokens

---

## 🚀 Development Notes

* Keep QStash dev server running for workflows
* Reminder workflows execute asynchronously
* Email sending requires valid SMTP credentials
* MongoDB connection must be active

Recommended tools:

* Postman / Insomnia for testing
* MongoDB Compass for inspection

---

## 📌 Future Improvements

* Payment integration
* Subscription analytics
* Admin dashboard
* Notification channels (SMS/Webhooks)
* Frontend client

---

## 📄 License

MIT — free to use and extend.

---

### Built for learning, experimentation, and production-style backend design.
