import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Applayout from "./components/Applayout";
import Login from "./pages/authLogin/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/authLogin/Register";
import { user } from "./common/common";
import Home from "./pages/home/Home";
import MerchantLogin from "./pages/authLogin/MerchantLogin";
import SupplierLogin from "./pages/authLogin/SupplierLogin";
import PatientLogin from "./pages/authLogin/PatientLogin";
import MerchantsRegister from "./pages/merchants/MerchantsRegister";
import SuppliersRegister from "./pages/suppliers/SuppliersRegister";
import PatientsRegister from "./pages/patients/PatientsRegister";
import DoctorLogin from "./pages/authLogin/DoctorLogin";

function App() {
  // console.log("user", user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route exact path="/*" name="Layout Page" element={<Applayout />} />
          ) : (
            <Route exact path="/*" name="Login Page" element={<Login />} />
          )}
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/merchant/login"
            name="Login Page"
            element={<MerchantLogin />}
          />
          <Route
            exact
            path="/supplier/login"
            name="Login Page"
            element={<SupplierLogin />}
          />
          <Route
            exact
            path="/customer/login"
            name="Login Page"
            element={<PatientLogin />}
          />
           <Route
            exact
            path="/doctor/login"
            name="Login Page"
            element={<DoctorLogin />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          />
          <Route
            exact
            path="/merchant/register"
            name="Register Page"
            element={<MerchantsRegister />}
          />
          <Route
            exact
            path="/supplier/register"
            name="Register Page"
            element={<SuppliersRegister />}
          />
          <Route
            exact
            path="/customer/register"
            name="Register Page"
            element={<PatientsRegister />}
          />
          <Route exact path="/" name="Home Page" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
