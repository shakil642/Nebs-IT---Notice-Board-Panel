# Nebs-IT Notice Board Panel
[Verified Submission for Code Test]

A modern, responsive full-stack application for creating, managing, and viewing organisational notices. This dashboard features a complete CRUD workflow, status management (Published, Draft, Unpublished), and advanced filtering capabilities.

## 🚀 Live Demo
- **Frontend (Client):** [https://nebs-it-client.onrender.com](https://nebs-it-client.onrender.com)
- **Backend (Server):** [https://nebs-it-server.onrender.com](https://nebs-it-server.onrender.com)
- **API Base URL:** `https://nebs-it-server.onrender.com/api/notices`

## ✨ Features
- **Live Dashboard Stats:** Real-time counters for Active and Draft notices.
- **Dynamic Filtering:** Filter notices by Date, Status, Department, and Search terms instantly.
- **Smart Form Validation:** Create notices with live type-safety and visual validation.
- **Client-Side Pagination:** Optimized pagination logic for seamless navigation.
- **Interactive Status Toggles:** Switch notices between Published, Unpublished, and Draft directly from the UI.
- **File Upload:** Support for image attachments (JPG/PNG).
- **Mobile Responsive:** Fully optimized for all devices.

## 🛠️ Technology Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide React icons.
- **Backend:** Node.js, Express.js REST API.
- **Database:** MongoDB Atlas (Mongoose ODM).
- **Deployment:** Render (Automatic CI/CD).

## 📥 Setup Instructions (Local)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shakil642/Nebs-IT---Notice-Board-Panel.git
    cd Nebs-IT---Notice-Board-Panel
    ```

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    # Create a .env file with:
    # MONGO_URI = mongodb_connection_string
    # PORT=5000
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd client
    npm install
    # Create a .env.local file with:
    # NEXT_PUBLIC_API_URL=http://localhost:5000/api/notices
    npm run dev
    ```

4.  **Visit App:** Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment (Render)

### Backend
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Env Vars:** `MONGO_URI`, `PORT`

### Frontend
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Env Vars:** `NEXT_PUBLIC_API_URL` (Set to backend URL + `/api/notices`)

---
© 2025 Shakil Ahmed. All rights reserved.
