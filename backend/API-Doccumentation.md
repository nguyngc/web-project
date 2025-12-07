# iVision Eye Clinic API (Backend)

This backend provides a REST API for the iVision Eye Clinic system, including authentication, role-based access, doctor schedules, appointments, content management, and AI chat.

## Base URL

- Local: `http://localhost:4000`
- API prefix: `/api`

## Features

- JWT authentication
- Role-based authorization (`user`, `doctor`, `admin`)
- Public doctor listing
- Services management
- FAQ management
- Banners management (including reorder)
- Articles management
- Doctor schedule management (DoctorTime)
- Appointment booking and medical updates
- AI Chat with optional login

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Bcrypt (`bcryptjs`)
- Google Gemini (AI)

---

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Create `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
```

### 3) Run dev server

```bash
npm run dev
```

### 4) Health check

- GET `/`
- Response: `Eye Clinic API is running`

---

## Middleware Summary

- CORS enabled for all origins.
- Request logger logs method/path/body.
- Unknown endpoints return:
```json
{ "error": "unknown endpoint" }
```
- Central error handler returns:
```json
{ "message": "..." }
```

---

## Authentication

### Header format

```http
Authorization: Bearer <token>
```

### requireAuth

- Token is required and must be valid.
- Loads user from database.
- Rejects inactive users (`status === false`).
- Attaches to request:
  - `req.user = { _id, id, firstName, lastName, email, role, status }`

Possible errors:
- 401 `Authorization token required`
- 401 `Request is not authorized`
- 403 `User is not active`

### requireRole(...roles)

- Requires authentication.
- Role must be one of the allowed roles.

Error:
- 403 `Forbidden: insufficient role`

### optionalAuth (AI route)

- Token is optional.
- If valid token provided, `req.user` is attached.
- If no/invalid token, request continues anonymously.

Note:
- `User.status` is a boolean in the schema.
- For consistency, optionalAuth should check:
  - `if (!user || !user.status) return next();`

---

## Roles

- user: patient
- doctor
- admin

---

## API Endpoints

### 1) Users

Base path: `/api/users`

Public endpoints:
- GET `/api/users/doctors/public`
  - List active doctors with public fields.
- POST `/api/users/signup`
  - Patient signup.
  - Role is forced to `user`.
- POST `/api/users/login`
  - Returns `{ user, token }`.

Protected endpoints:
- PUT `/api/users/:userId/password`
  - Change password.
  - user/doctor: only self, requires `currentPassword`.
  - admin: can change anyone, `currentPassword` not required.
- GET `/api/users`
  - List users.
  - Access: admin, doctor.
  - Query:
    - `q` (search firstName/lastName/email)
    - `role`
    - `status` (boolean-like)
- GET `/api/users/:userId`
  - admin/doctor: can view any user.
  - user: can only view their own profile.
- POST `/api/users`
  - Admin creates user/doctor/admin.
- PUT `/api/users/:userId`
  - user: can update only self, cannot change role/status/password.
  - admin: can change role/status.
  - Admin shortcut:
    - Body `{ "toggleStatus": true }` to flip status.
- DELETE `/api/users/:userId`
  - Admin only.

Signup body example:
```json
{
  "firstName": "Patient",
  "lastName": "A",
  "email": "patient@mail.com",
  "password": "123456",
  "dob": "1995-05-13",
  "gender": "male",
  "phone": "123",
  "address": "Helsinki"
}
```

Login response example:
```json
{
  "user": {
    "id": "...",
    "firstName": "...",
    "lastName": "...",
    "email": "...",
    "role": "user"
  },
  "token": "..."
}
```

---

### 2) Services

Base path: `/api/services`

Public endpoints:
- GET `/api/services`
  - Query:
    - `q`
    - `isActive=true`
- GET `/api/services/:serviceId`

Admin endpoints:
- POST `/api/services`
- PUT `/api/services/:serviceId`
- DELETE `/api/services/:serviceId`
- PATCH `/api/services/:serviceId/toggle`

Create service example:
```json
{
  "serviceName": "Comprehensive Eye Exam",
  "shortDescription": "Full vision check",
  "fullDescription": "Includes refraction, slit-lamp exam and eye pressure test.",
  "duration": "45 min",
  "price": "79€",
  "isActive": true
}
```

---

### 3) FAQ

Base path: `/api/faq`

Public endpoints:
- GET `/api/faq`
  - Query: `q`
- GET `/api/faq/:faqId`

Admin endpoints:
- POST `/api/faq`
- PUT `/api/faq/:faqId`
- DELETE `/api/faq/:faqId`

---

### 4) Banners

Base path: `/api/banners`

Public endpoints:
- GET `/api/banners`
  - Query:
    - `active=true`
    - `q`
  - Sorted by `order` ascending.
- GET `/api/banners/:bannerId`

Admin endpoints:
- POST `/api/banners`
  - `image` and `title` are required.
  - If `order` is not provided, it auto assigns `last.order + 1`.
- PUT `/api/banners/reorder`
  - Body: `[{ id, order }, ...]`
- PUT `/api/banners/:bannerId`
- DELETE `/api/banners/:bannerId`
- PATCH `/api/banners/:bannerId/toggle`

Banner example:
```json
{
  "badge": "New",
  "image": "/img/hero2.jpg",
  "title": "Kids Eye Care",
  "subtitle": "Gentle & friendly",
  "buttonText": "Learn more",
  "buttonLink": "/services/kids",
  "order": 2,
  "isActive": false
}
```

---

### 5) Articles

Base path: `/api/articles`

Public endpoints:
- GET `/api/articles`
  - Query:
    - `q`
    - `category`
    - `isPublished=true`
- GET `/api/articles/:articleId`

Admin endpoints:
- POST `/api/articles`
  - `title` and `content` required.
- PUT `/api/articles/:articleId`
- DELETE `/api/articles/:articleId`

---

### 6) Doctor Time

Base path: `/api/doctor-time`

Public endpoints:
- GET `/api/doctor-time`
  - Query:
    - `userId`
    - `week`
    - `date`
    - `status`
- GET `/api/doctor-time/:doctorTimeId`
- GET `/api/doctor-time/user/:userId/date/:date`
- GET `/api/doctor-time/user/:userId/week/:week`

Doctor/Admin endpoints:
- POST `/api/doctor-time`
  - Doctor: `userId` forced to self.
  - Admin: can set any doctor.
  - Unique schedule per doctor per date (`userId + date`).
- PUT `/api/doctor-time/:doctorTimeId`
  - Merges `availableTime`.
- DELETE `/api/doctor-time/:doctorTimeId`
- PATCH `/api/doctor-time/:doctorTimeId/toggle/:slotName`
  - Valid slots in code: `slot1`, `slot2`, `slot3`, `slot4`.

---

### 7) Appointments

Base path: `/api/appointments`

All appointment endpoints require authentication.

Endpoints:
- GET `/api/appointments`
  - Role-aware filtering:
    - admin: can view all, can filter by `userId`, `doctorId`.
    - doctor: only their appointments; can filter by patient `userId`.
    - user: only their appointments; can filter by `doctorId`.
  - Optional query:
    - `q` (search diagnosis/userNotes/doctorNotes)
    - `status`
    - `date`
- GET `/api/appointments/:appointmentId`
  - Ownership enforced for doctor and user.
- POST `/api/appointments`
  - user: `userId` forced to self.
  - doctor: `doctorId` forced to self.
  - admin: can set both.
  - Required: `userId`, `doctorId`, `date`, `time`.
  - Status default `pending` (only admin can override on create).
- PUT `/api/appointments/:appointmentId`
  - user:
    - allowed: `date`, `time`, `userNotes`, `status`.
    - status can only be changed to `cancelled`.
  - doctor:
    - allowed medical fields + `status`.
  - admin:
    - broad update.
  - Never allowed to change:
    - `userId`, `doctorId`, `createdBy`.
- DELETE `/api/appointments/:appointmentId`
  - Admin only.

Patient create appointment example:
```json
{
  "doctorId": "doctorUserId",
  "serviceId": "serviceId",
  "date": "2025-01-20",
  "time": "10:00",
  "userNotes": "My vision feels blurry."
}
```

Doctor medical update example:
```json
{
  "status": "completed",
  "diagnosis": "Myopia",
  "rightEye": "-1.50",
  "leftEye": "-1.25",
  "prescriptionNotes": "Use glasses for driving",
  "doctorNotes": "Follow-up in 6 months",
  "nextAppointment": "2025-07-20"
}
```

---

### 8) AI Chat

Endpoint:
- POST `/api/chat-ai`
  - Auth optional.

Body:
```json
{ "prompt": "I want to book an eye check." }
```

Rules:
- prompt required
- max length 500

Response:
```json
{
  "output": "...",
  "id": "..."
}
```

The server stores chat messages in `ChatMessage`,
with `user` set to the logged-in id or `null`.

---

## Security Notes

- Do not commit real secrets to GitHub.
- Use `.env.example` for submission.

---

## Suggested Submission Structure

```
backend/
  app.js
  package.json
  .env.example
  README.md
  routes/
  controllers/
  models/
  middleware/
```

This README serves as the official API documentation.
