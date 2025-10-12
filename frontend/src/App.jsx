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

import Navbar from "./components/customer/Navbar/Navbar";
import Footer from "./components/customer/Footer/Footer";
import ItemDetails from "./components/customer/ItemDetails/ItemDetails";

import AdminDashboard from './pages/admin/AdminDashboard'

import AdminNavbar from './components/admin/navbar/AdminNavbar'


import { MyContextProvider } from './context/MyContext'
import { MyContext } from './context/MyContext';

const AppContent = () => {
  const { user } = useContext(MyContext);

  if (user?.role === 'admin') {
    return (
      <>
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
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
          <Route path="/ItemDetails" element={<ItemDetails />} />
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