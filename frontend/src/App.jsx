import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import SignUp from "./pages/Signup";
import Login from "./pages/login";
import Account from './pages/Account';

import Home from './pages/customer/Home'
import Menu from './pages/customer/Menu'
import About from './pages/customer/About'
import DeliveryInfor from './pages/customer/DeliveryInfor'
import Contact from './pages/customer/Contact'
import OrderItems from "./pages/customer/OrderItems";
import Favorites from './pages/customer/Favorites';
import ItemDetails from "./pages/customer/ItemDetails";

import Navbar from "./components/customer/Navbar/Navbar";
import Footer from "./components/customer/Footer/Footer";

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

import AdminNavbar from './components/admin/navbar/AdminNavbar'


import { MyContextProvider } from './Context/MyContext'
import { MyContext } from './Context/MyContext';

const AppContent = () => {
  const { loggedInUser } = useContext(MyContext);

  if (loggedInUser?.role === 'admin') {
    return (
      <>
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/profile" element={<Account />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AddToCard" element={<OrderItems />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ItemDetails/:id" element={<ItemDetails />} />
          <Route path="/DeliveryInfor" element={<DeliveryInfor />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </>
    );
  }
};

const App = () => {
  return (
    <MyContextProvider>
      <AppContent />
    </MyContextProvider>
  );
};

export default App;