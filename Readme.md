# Turf Booking App 🏏⚽🏀

A **MERN stack application** that allows users to browse, book, and manage turf slots seamlessly. The app provides real-time slot availability, secure payments, and booking history — making turf management simple for both users and admins.

---

## 🚀 Features

### 👤 User

* User authentication (JWT, Redux Persist)
* Browse available turfs and time slots
* Book slots in real-time
* View **My Bookings** with status & countdown timer
* Automatic logout when token expires
* Responsive UI for all devices

### 🛠️ Admin

* Manage turfs and slots
* Track bookings and revenue
* Automatic cleanup of expired slots

---

## 🏗️ Tech Stack

* **Frontend:** React.js, Redux Toolkit, Redux Persist, TailwindCSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JWT (with refresh & access tokens)
* **Deployment:** Render

---

## 📸 Screenshots

> (Add screenshots or gifs of your app UI — e.g., Home Page, Booking Flow, My Bookings Page)

---

## 📂 Project Structure

```
turf-booking-app/
│── backend/
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth & error handling
│   └── server.js       # Entry point
│
│── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI
│   │   ├── pages/      # Page components
│   │   ├── redux/      # Redux store & slices
│   │   └── App.js
│
└── README.md
```

---

## 🔑 Key Highlights

* **Auto Slot Expiry:** Past slots automatically removed every day
* **JWT with Expiry:** Users auto-logout when token expires
* **Responsive Sidebar & Booking Cards:** Fully mobile-friendly UI
* **Scalable Architecture:** Separate layers for routes, controllers, models

---

## 🛠️ Future Improvements

* Payment gateway integration (Stripe/Razorpay)
* Admin dashboard with analytics
* Turf rating & reviews
* Notifications & reminders

---

## 👨‍💻 Author

Developed by **[Qamruzzama Khan](https://github.com/Qamruzzama-Khan)** 🚀
