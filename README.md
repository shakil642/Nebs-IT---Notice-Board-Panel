# Nebs-IT Notice Board Panel

A modern, responsive Notice Board application built for Nebs IT to manage employee communications effectively.

## 🚀 Live Demo
- **Frontend (Client):** [https://nebs-it-client.onrender.com](https://nebs-it-client.onrender.com)
- **Backend (Server):** [https://nebs-it-server.onrender.com](https://nebs-it-server.onrender.com)

## ✨ Features
- **Dashboard Overview:** Visualize active and draft notices with real-time stats.
- **Create Notices:** Rich text support with various notice types (Warning, Appreciation, etc.).
- **Notice Board:** Dedicated view for employees to check latest updates.
- **Mobile Responsive:** Fully optimized for all devices with a custom burger menu and touch-friendly controls.
- **Cloud Database:** Data is securely stored in MongoDB Atlas.
- **File Upload:** Support for image attachments.

## 🛠️ Technology Stack
- **Frontend:** Next.js, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)

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
