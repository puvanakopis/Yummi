# Yummi - Food Ordering Website 🍕🍔🍦

Yummi is a full-stack food ordering web application with separate interfaces for **customers** and **administrators**, built with **React.js** frontend and **Node.js/Express** backend. The app allows users to browse and order food items while providing admins with tools to manage users, products, and orders efficiently.

---

## 🚀 Features

### Customer Features

* **User Authentication**: Sign up, login, and account management
* **Product Browsing**: View menu items by categories with search and filtering
* **Product Details**: Detailed item information with images and descriptions
* **Shopping Cart**: Add items, update quantities, and remove items
* **Favorites System**: Save favorite items for quick access
* **Order Management**: Place orders with delivery information
* **Responsive Design**: Mobile-friendly interface

### Admin Features

* **Dashboard**: Overview of users, products, orders, and revenue
* **User Management**: View, activate/deactivate, and manage users
* **Product Management**: Add, edit, and delete menu items
* **Order Management**: View and update order statuses
* **Admin Panel**: Dedicated interface for administrative tasks

---

## 🛠️ Tech Stack

### Frontend

* **React.js** - Frontend framework
* **React Router** - Client-side routing
* **Context API** - State management
* **React Icons** - Icon library

### Backend

* **Node.js** - Runtime environment
* **Express.js** - Web framework
* **MongoDB** - Database
* **Mongoose** - ODM for MongoDB
* **JWT** - Authentication
* **bcrypt** - Password hashing
* **CORS** - Cross-origin resource sharing

---

## 📂 Project Structure

### Frontend

```
frontend/
├── components/
│   ├── admin/              
│   │   └── navbar/
│   └── customer/           
│       ├── Navbar/
│       └── Footer/
├── pages/
│   ├── admin/              
│   │   ├── AdminDashboard
│   │   ├── AdminUsers
│   │   ├── AdminProducts
│   │   └── AdminOrders
│   └── customer/           
│       ├── Home
│       ├── Menu
│       ├── About
│       ├── Contact
│       ├── OrderItems
│       ├── Favorites
│       └── ItemDetails
├── Context/                
│   └── MyContext.jsx
└── App.js                  
```

### Backend

```
backend/
├── routes/
│   ├── authRouter.js       
│   ├── itemRouter.js       
│   ├── userRoutes.js       
│   ├── orderRouter.js      
│   ├── cartItemRouter.js   
│   └── favouriteRoutes.js  
├── models/
│   ├── userModel.js        
│   ├── itemModel.js        
│   ├── orderModel.js       
│   ├── cartModel.js        
│   └── favouriteModel.js   
├── config/
│   └── mongodb.js          
└── server.js               
```

---

## 🔑 Environment Variables

Create a `.env` file in the **backend** directory:

```env
MONGODB_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
NODE_ENV="development"
PORT=4000
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/puvanakopis/Yummi.git
cd Yummi
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create `.env` file and add your environment variables

```bash
npm start
```

* Backend runs at: `http://localhost:4000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

* Frontend runs at: `http://localhost:5173`

**Access the Application:**

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:4000](http://localhost:4000)

---

## 🆘 Support

For support and questions, please open an issue in the [GitHub repository](https://github.com/puvanakopis/Yummi).

---

**Yummi - Delicious food, delivered with love! 🍕🍔🍦**
