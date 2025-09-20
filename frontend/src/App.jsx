import { Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import DeliveryFormPage from './pages/DeliveryFormPage'
import Contact from './pages/Contact'
import OrderItems from "./pages/OrderItems";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Account from './pages/Account';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemDetails from "./components/ItemDetails/ItemDetails";

import { MyContextProvider } from './Context/MyContext'

const App = () => {
  return (

    <>
      <MyContextProvider>
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
          <Route path="/deliveryform" element={<DeliveryFormPage />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </MyContextProvider>
      <Footer />
    </>

  );
};
export default App;