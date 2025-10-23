# 💊 Pharma — Modern Pharmaceutical Management Platform

**Pharma** is a full-featured **pharmaceutical web application** built with **React + TypeScript**, featuring a powerful **admin dashboard**, integrated **payment systems**, and real-time **product and prescription management**.  
It’s designed to simplify pharmacy operations — from managing products and prescriptions to tracking orders, payments, and shipping details — all in one seamless interface.

---

## 🚀 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React.js + TypeScript** | Core frontend framework for building scalable, type-safe UI |
| **Redux Toolkit** | Global state management for predictable app behavior |
| **TailwindCSS** | Utility-first CSS for fast, responsive styling |
| **Appwrite** | Backend-as-a-Service for authentication, database, and storage |
| **Recharts** | Data visualization for analytics and insights |
| **Paystack & Flutterwave (Test Mode)** | Secure and reliable payment integration |

---

## 🧩 Key Features

### 👩‍💼 Admin Panel
- Create, edit, and delete **pharmaceutical products**.
- Manage **prescriptions** associated with each product.
- Track **orders, shipping**, and **payments** from customers.
- Real-time **notifications** for key activities such as:
  - New orders placed  
  - Payments received  
  - Shipping status updates  

### 💰 Payment & Transactions
- **Integrated test payments** via **Paystack** and **Flutterwave**.
- **Payment history** and **transaction tracking** pages.
- View and manage all received payments.

### 🛒 E-Commerce & User Interaction
- Add products to **cart** (stored in **localStorage** for persistence).
- Place and track **orders**.
- Monitor **shipping details** for each order.

### 📊 Dashboard & Analytics
- Visualize key business metrics with **Recharts**:
  - 🥇 Most selling products
  - 💵 Profit breakdown by pharmaceutical categories
- Interactive **Pie Charts** and **Bar Charts** for better data insights.

---

## 🧠 Architecture Overview

The application follows a **modular architecture**:
- **Frontend (React + TypeScript):** Handles UI and client-side logic.
- **Appwrite Backend:** Provides secure APIs for data, authentication, and file storage.
- **Redux Toolkit:** Manages global app state such as cart, orders, and notifications.
- **LocalStorage:** Persists user cart and preferences between sessions.
- **Recharts:** Provides real-time analytics visualization for the admin dashboard.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ibeenoch/pharma.git
cd pharma
