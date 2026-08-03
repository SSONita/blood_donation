# 🩸 Blood Donation Management System

A **Full-Stack Web Application** for managing blood donations, requests, inventory, and donor engagement. Built with modern web technologies to streamline blood bank operations and enhance donor accessibility.


## 🚀 Key Features

### User Portal
- 🔐 **JWT Authentication**: Secure login/registration
- 🗓️ **Appointment Scheduling**: Calendar integration for donations
- 🩸 **Blood Request System**: Real-time blood type availability checks
- 📊 **Donor Dashboard**: Track donation history and eligibility status
- 📚 **Educational Hub**: Articles/videos on donation safety

### Admin Portal
- 👥 **Role Management**: RBAC (Admin, Staff, Donor)
- 📦 **Inventory Management**: CRUD operations for blood stock

### Medical Staff Tools
- 🏥 **Eligibility Screening**: Digital health questionnaires
- 🏷️ **Blood Bag Tracking**: Barcode/UUID generation
- 🔄 **Cross-matching**: Virtual blood compatibility checks

## 🛠 Tech Stack

### Frontend
| Technology    | Purpose                     |
|--------------|----------------------------|
| React        | Component-based UI          |
| Vite         | Ultra-fast bundler          |


### Backend
| Technology    | Purpose                     |
|--------------|----------------------------|
| Node.js      | Runtime environment         |
| Express      | API framework               |
| Sequelize    | PostgreSQL ORM              |
| JWT          | Authentication tokens       |

### Infrastructure
| Technology    | Purpose                     |
|--------------|----------------------------|
| Railway      | DB/API hosting             |
| GitHub       | Version control            |
| Postman      | API testing                |

# 🩸 Blood Donation System – Project Structure

This project uses a **feature-based architecture**: instead of grouping files by
type (`controllers/`, `pages/`, `services/`...), each business capability
(auth, donation, blood requests, inventory, history, education) owns its own
folder containing everything it needs — pages/controllers, models, routes,
and API services. Truly cross-cutting code (layouts, the navbar, the axios
client, auth-token helpers) lives in a `shared/` or `lib/` folder instead.

## 🖥️ Frontend (React + Vite)

```
frontend/src/
├── features/
│   ├── auth/
│   │   ├── pages/          Login.jsx, SignUp.jsx
│   │   ├── context/        AuthContext.jsx (session state, login/logout)
│   │   └── services/       authService.js (register/login API calls)
│   ├── donation/
│   │   ├── pages/          Donation.jsx (book an appointment)
│   │   └── services/       donationService.js
│   ├── request/
│   │   ├── pages/          Request.jsx (request blood)
│   │   └── services/       requestService.js
│   ├── inventory/
│   │   ├── pages/          Inventory.jsx
│   │   └── services/       inventoryService.js
│   ├── history/
│   │   ├── pages/          History.jsx
│   │   └── services/       historyService.js
│   ├── education/
│   │   ├── pages/          Education.jsx
│   │   └── services/       educationService.js
│   └── home/
│       └── pages/          Home.jsx
├── shared/                 Code used by more than one feature
│   ├── components/         Navbar.jsx, Footer.jsx, Logo.jsx
│   ├── layouts/             MainLayout.jsx, AuthLayout.jsx
│   └── pages/               NotFound.jsx
├── lib/                     Framework-level infrastructure
│   ├── apiClient.js         Shared axios instance + auth interceptor
│   └── auth.js               Token/session helpers (getToken, isAuthenticated...)
├── App.jsx                  Route definitions, wires features together
├── main.jsx
└── index.css
```

Each feature's `services/*.js` file imports the shared `lib/apiClient.js`
instance (which already attaches the JWT to every request), so feature code
never has to think about auth headers directly.

## 🛠️ Backend (Express + Node.js)

```
backend/
├── app.js                   Express app: CORS, routes, DB bootstrap
├── config/
│   └── db.config.js
├── db/
│   └── index.js              Sequelize instance, model registration, associations
├── shared/                   Code used by more than one feature
│   ├── middleware/           auth.middleware.js, validation.middleware.js
│   └── models/               User, BloodType, DonationCenter (reference data
│                              used across multiple features)
└── features/
    ├── auth/
    │   ├── auth.controller.js
    │   └── auth.routes.js
    ├── appointment/            (blood donation appointments)
    │   ├── appointment.controller.js
    │   ├── appointment.model.js
    │   └── appointment.routes.js
    ├── bloodRequest/
    │   ├── bloodRequest.controller.js
    │   ├── bloodRequest.model.js
    │   └── bloodRequest.routes.js
    ├── bloodInventory/
    │   ├── bloodInventory.controller.js
    │   ├── bloodInventory.model.js
    │   └── bloodInventory.routes.js
    ├── donationHistory/
    │   ├── donationHistory.controller.js
    │   ├── donationHistory.model.js
    │   └── donationHistory.routes.js
    └── education/
        ├── educationResource.controller.js
        └── educationResource.routes.js
```

`db/index.js` is the one place that knows about every model — it pulls in
each feature's model plus the shared reference models and wires up the
Sequelize associations between them.

### Fixes made while refactoring
- `Login.jsx` previously called `fetch('http://localhost:3000/...')` directly
  instead of going through `AuthContext`/the shared API client — it now uses
  `useAuth().login(...)`, so the session is stored consistently and the app
  no longer breaks if the API URL changes.
- The login response mislabeled `last_name` as `first_name`, and the navbar
  read a `currentUser.name` field that the API never returned — the backend
  now returns both names, and the navbar builds the display name from them.
- `isAuthenticated()` only decoded the JWT (which just has `user_id`/`email`),
  so a logged-in user's name/blood type were unavailable app-wide — it now
  returns the full profile that's saved to `localStorage` at login.
- Backend `package.json` had a bogus `"cros"` dependency (typo for `cors`,
  which was already listed correctly) — removed.
- An unreachable `console.error` after a `return` in the register handler was
  cleaned up, and registration now validates `first_name`/`last_name` too.
- Added `backend/.env.example` documenting the required environment
  variables (none existed before, only referenced in this README).
- Added a `GET /api/health` endpoint and a catch-all JSON error handler on
  the backend.
## 🗃 Database Configuration

### Railway PostgreSQL Setup
1. Get credentials from Railway dashboard
2. Configure `backend/.env`:

```env
PGHOST=caboose.proxy.rlwy.net
PGUSER=postgres
PGPASSWORD=Your_password
PGDATABASE=postgres
PGPORT=10177

JWT_SECRET=Your_jwt_secret

# Environment
NODE_ENV=development
```

## ⚙ Setup Guide

### Prerequisites
- Node.js
- Express.js
- axios
- React.js
- PostgreSQL
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # then fill in your DB credentials
npm run dev
```

### Seed Data (Cambodia sample data)
Once the server has started at least once (so Sequelize has created the
tables), you can populate the database with sample data — Cambodian blood
donation centers, users, appointments, requests, inventory, and history:

```bash
npm run seed
```

This **truncates and resets** `history`, `donation`, `request`, `inventory`,
`user`, `donation_center`, and `blood_type`, then inserts:
- 8 blood types
- 10 real Cambodian hospitals/blood banks (National Blood Transfusion
  Centre, Calmette Hospital, Siem Reap/Battambang/Kampong Cham provincial
  hospitals, etc.)
- 15 users with Cambodian names, `+855` phone numbers, and a spread of
  blood types
- ~60 inventory records across the centers
- 7 donation appointments, 5 blood requests, and 6 history entries

Every seeded user shares the password **`Password123!`** — log in with any
of the emails in `backend/seed/seed.js` (e.g. `sokha.chan@example.com`) to
try the app with data already in it.

⚠️ Only run this against a database you don't mind wiping — it truncates
the tables first.

### Backend Dependencies (Node.js/Express)
Core Dependencies (install with `npm install <package>`):
```bash
express
sequelize
pg pg-hstore  # PostgreSQL adapter
dotenv
cors
bcryptjs
jsonwebtoken
body-parser
```

Development Dependencies (install with `npm install -D <package>`):
```bash
nodemon
sequelize-cli
eslint
prettier
jest  # Testing
```

---
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
### Frontend Dependencies (React)
Core dependencies
```bash
react
react-dom
react-router-dom
axios
@mui/material @emotion/react @emotion/styled  # Material UI
@mui/icons-material  # Material UI icons
formik yup  # Form handling
redux @reduxjs/toolkit react-redux  # State management
```

Development Dependencies:
```bash
@vitejs/plugin-react
eslint
prettier
@types/react @types/react-dom  # For TypeScript
vitest  # Testing
```

## 📡 API Documentation

### Auth Endpoints
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "donor@example.com",
  "password": "SecurePass123!",
}
```

### Blood Inventory
```http
GET /api/inventory?bloodType=O+
Authorization: Bearer <JWT_TOKEN>
```