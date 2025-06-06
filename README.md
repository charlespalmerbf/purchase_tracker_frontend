# 🛍️ Purchase Tracker Frontend

A simple and clean React frontend (built with Vite) for tracking personal purchases. Users can register, log in, add items they’ve bought, and view how much those items are costing them per day. This frontend connects to a Django REST API backend.

## ✨ Features

- 🔐 User authentication (register, login, logout)
- 📝 Create, view, update, and delete purchased items
- 🧮 Cost-per-day calculation based on purchase date
- 📸 Optional image upload per item
- 📄 Paginated item display (3 items per page)
- 🎯 Edit mode with form repopulation and cancel option
- 💅 Tailwind CSS for modern styling

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Yarn or npm
- A running instance of the Django backend API

### 1. Clone the Repository

```bash
git clone https://github.com/charlespalmerbf/purchase-tracker-frontend.git
cd purchase-tracker-frontend
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of the project:

```env
REACT_APP_API_PATH=http://localhost:8000/api
REACT_APP_SHOW_VERSION=true
```

### 4. Run the App

```bash
yarn dev
# or
npm run dev
```

The app will start at [http://localhost:5173](http://localhost:5173) by default.

---

## 📁 Project Structure

```
.
├── public/
├── src/
│   ├── api/            # API request functions
│   ├── context/        # Authentication context
│   ├── pages/          # Page components (Login, Register, Dashboard)
│   ├── App.jsx         # Main routing logic
│   └── main.jsx        # App entry point
├── .env                # Environment variables
└── vite.config.js      # Vite config with path aliases
```

---

## 🔧 Customization

- To update API endpoints or toggle features, edit your `.env` file and restart the dev server.
- Modify `tailwind.config.js` and styles in `src/` to change the UI design.

---

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Django REST Framework (backend)](https://www.django-rest-framework.org/)

---
