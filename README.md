# 🛍️ Next Mart

A modern e-commerce boilerplate built with **Next.js**, **TypeScript**, **Firebase Authentication**, and **shadcn/ui**. This project provides a clean foundation for building scalable e-commerce applications with authentication, protected routes, reusable UI components, and static product data.

---

## 🚀 Features

### Authentication

- Firebase Authentication
- Email & Password Login
- Email & Password Registration
- Google Sign-In
- Protected Routes
- Authentication Context
- Logout

### Product Management

- Product Listing
- Product Details
- Featured Products Section
- Static Product Data
- Responsive Product Cards

### Dashboard

- Protected Dashboard
- Add Product (Boilerplate)
- Manage Products (Boilerplate)

### UI

- Responsive Design
- Light & Dark Mode Ready
- Built with shadcn/ui
- Lucide Icons
- Tailwind CSS

---

## 🛠 Tech Stack

### Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript

### Styling

- Tailwind CSS
- shadcn/ui
- Lucide React

### Authentication

- Firebase Authentication

### State Management

- React Context API

---

## 📁 Project Structure

```text
src
│
├── app
│   ├── (auth)
│   │   ├── login
│   │   └── signup
│   │
│   ├── (dashboard)
│   │   └── dashboard
│   │       ├── add-product
│   │       └── manage-products
│   │
│   ├── about
│   ├── products
│   │   └── [id]
│   └── api
│
├── components
│   ├── auth
│   ├── home
│   ├── shared
│   └── ui
│
├── data
│   └── products.ts
│
├── firebase
│
├── hooks
│
├── providers
│
├── types
│
└── lib
```

---

## 🔐 Authentication

Implemented using Firebase Authentication.

### Supported Methods

- Email & Password Login
- Email & Password Registration
- Google Authentication

Authentication state is managed globally using **React Context**.

---

## 🔒 Protected Routes

The following pages require authentication:

- Product Details
- Dashboard
- Add Product
- Manage Products

Protected routes are implemented using a reusable `ProtectedRoute` component.

---

## 📦 Pages

### Public Pages

- Home
- About
- Products
- Login
- Sign Up

### Protected Pages

- Product Details
- Dashboard
- Add Product
- Manage Products

---

## 🛒 Current Features

- Home Hero Section
- Featured Products
- Product Grid
- Product Details
- Authentication
- Responsive Layout
- About Page

---

## 🚧 Planned Features

- Shopping Cart
- Wishlist
- Checkout
- Order History
- User Profile
- Product Search
- Product Categories
- Product Filtering
- Product Sorting
- Reviews & Ratings
- Admin Dashboard
- Product CRUD
- Cloud Storage
- Payment Gateway
- Backend API Integration

---

## ⚙️ Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## 📥 Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📚 Learning Objectives

This project demonstrates:

- Next.js App Router
- TypeScript
- Firebase Authentication
- Protected Routes
- React Context API
- Component-Based Architecture
- Static Data Management
- Responsive UI Design
- Reusable Components
- Modern Folder Structure

---

## 🌿 Branches

This repository maintains multiple project variants.

### `main`

Contains the shared boilerplate and common project structure.

### `ecommerce`

Contains the complete e-commerce implementation.

### `event-management`

Contains the event management implementation built on the same foundation.

---

## 📄 License

This project is intended for educational and learning purposes.
