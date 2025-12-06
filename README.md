# Notice Dashboard

A full-stack MERN application for managing notices. This project includes a standardized Notice creation form and a listing dashboard with status management.

## Tech Stack

- **Frontend**: Next.js (App Router), Vanilla CSS (Custom Design System)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Database**: MongoDB

## Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas Connection String)

## Installation & Setup

1. **Clone the repository** (if applicable)

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `server` root:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:3000`.

## API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

- **GET /notices**
  - Fetch all notices.
  - Query Params: `page` (number).

- **POST /notices**
  - Create a new notice.
  - Body: `{ title, description, type, status? }`

- **PATCH /notices/:id**
  - Update notice status.
  - Body: `{ status: 'published' | 'draft' }`

## Deployment

### Frontend (Vercel)
- Push `client` directory to GitHub.
- Import into Vercel.
- No special config needed for Next.js.

### Backend (Render/Railway)
- Push `server` directory to GitHub.
- Create a Web Service.
- Set Build Command: `npm install`
- Set Start Command: `node index.js`
- Add `MONGO_URI` in Environment Variables.
