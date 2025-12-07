# Nebs-IT Notice Board Panel
[Verified Submission for Code Test]

A modern, responsive full-stack application for creating, managing, and viewing organizational notices. This dashboard features a complete CRUD workflow, status management (Publised, Draft, Unpublished), and advanced filtering capabilities.

## 🚀 Live Demo
- **Frontend (Client):** [https://nebs-it-client.onrender.com](https://nebs-it-client.onrender.com)
- **Backend (Server):** [https://nebs-it-server.onrender.com](https://nebs-it-server.onrender.com)
- **API Base URL:** `https://nebs-it-server.onrender.com/api/notices`

## ✨ Features
- **Smart Filtering:** Filter notices by Date, Status, Department, and Search terms.
- **Robust Form Validation:** Create notices with type-safety and visual validation.
- **Dynamic Pagination:** Client-side pagination logic capable of handling large datasets.
- **Status Management:** Toggle notices between Published, Unpublished, and Draft.
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
    # MONGO_URI=your_mongodb_connection_string
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
© 2025 Nebs IT. All rights reserved.
