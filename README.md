# TUB Horários - Bus Schedule Management System

🚌 A modern, responsive web application for viewing bus schedules from Transportes Urbanos de Braga (TUB), Portugal.

## 🌟 Features

### Core Features
- 📱 **Modern Homepage** - Clean, intuitive interface for bus schedule browsing
- 🔍 **Advanced Search** - Search by line number, destination, or bus stop
- ⭐ **Favorites System** - Save favorite lines and stops for quick access
- 🌓 **Dark/Light Mode** - Toggle between themes
- 📍 **GPS Support** - Find nearest bus stops
- 🗺️ **Route Maps** - Visual representation of bus routes
- ⏱️ **Real-time Tracking** - See next departures and estimated waiting time
- 📲 **PWA Support** - Install as an app and use offline
- 🌐 **Multi-language** - Portuguese and English support

### Advanced Features
- 📋 **Trip Planner** - Plan routes between two stops
- 📜 **Search History** - View past searches
- 📄 **PDF Export** - Export schedules as PDF
- 🔔 **Delay Notifications** - Get alerted about bus delays
- 🎨 **Modern UI** - Minimalist design with smooth animations
- ⚡ **Smart Caching** - Optimized performance with intelligent caching

## 🏗️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- React Router v6
- Zustand for state management
- Axios for API calls

### Backend
- Node.js + Express.js
- PostgreSQL/SQLite
- Winston for logging

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/Leo03367/tub-horarios.git
cd tub-horarios
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your database credentials.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

### 4. Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 📦 Project Structure

```
tub-horarios/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔌 API Endpoints

- `GET /api/v1/lines` - List all bus lines
- `GET /api/v1/stops` - List all stops
- `GET /api/v1/favorites` - Get favorites
- `POST /api/v1/trip-planner` - Plan route

## 📄 License

MIT License

---

**Made with ❤️ by Leo03367**
