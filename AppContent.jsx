import { Route, Routes } from "react-router-dom";
import Merchants from "../pages/Merchants";
import Dashboard from "../pages/admin/Dashboard";
import AllMerchants from "../pages/admin/AllMerchants";
import AllSuppliers from "../pages/admin/AllSuppliers";
import Medications from "../pages/suppliers/Medications";
import AllSupplierMedications from "../pages/merchants/AllSupplierMedications";
import AddMedicines from "../pages/suppliers/AddMedicines";
import ViewMedicines from "../pages/suppliers/ViewMedicines";
import RequestedMedicines from "../pages/merchants/RequestedMedicines";
import RequestForMedicine from "../pages/suppliers/RequestForMedicine";
import ExpiredMedicines from "../pages/merchants/ExpiredMedicines";
import ReplacedMedicine from "../pages/suppliers/ReplacedMedicine";
import AllMedicines from "../pages/admin/AllMedicines";
import AllPatients from "../pages/admin/AllPatients";
import PatientsAllMedicines from "../pages/patients/PatientsAllMedicines";
import PatientBookedMedicines from "../pages/patients/PatientBookedMedicines";
import PurchasedMedicines from "../pages/admin/PurchasedMedicines";
import AllExpiredMedicines from "../pages/admin/AllExpiredMedicines";
import Messages from "../pages/merchants/Messages";
import AllBookedSuppliers from "../pages/merchants/AllBookedSuppliers";
import AllBookedMerchants from "../pages/suppliers/AllBookedMerchants";
import SupplierDashboard from "../pages/suppliers/SupplierDashboard";
import MerchantDashboard from "../pages/merchants/MerchantDashboard";
import PatientDashboard from "../pages/patients/PatientDashboard";
import AllDoctors from "../pages/admin/AllDoctors";
import AddDoctor from "../pages/admin/AddDoctor";
import PatientAllDoctors from "../pages/patients/PatientAllDoctors";
import BookedAppointmentsPatient from "../pages/patients/BookedAppointmentsPatient";
import BookedAppointmentsDoctor from "../pages/doctor/BookedAppointmentsDoctor";
import AddSubscriptionAdmin from "../pages/admin/AddSubscriptionAdmin";
import ViewSubscriptions from "../pages/admin/ViewSubscriptions";
import PatientViewSubscriptions from "../pages/patients/PatientViewSubscriptions";
import CustomerSubscriptions from "../pages/patients/CustomerSubscriptions";
import MerchantSubscribers from "../pages/merchants/MerchantSubscribers";

const AppContent = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* Routes for Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/merchants" element={<AllMerchants />} />
        <Route path="/admin/suppliers" element={<AllSuppliers />} />
        <Route path="/admin/medicines" element={<AllMedicines />} />
        <Route path="/admin/patients" element={<AllPatients />} />
        <Route path="/admin/doctors" element={<AllDoctors />} />
        <Route path="/admin/add-doctor" element={<AddDoctor />} />
        <Route path="/admin/expired" element={<AllExpiredMedicines />} />
        <Route path="/admin/AddSubscriptionAdmin" element={<AddSubscriptionAdmin />} />
        <Route path="/admin/ViewSubscriptions" element={<ViewSubscriptions />} />


        <Route
          path="/admin/patients/purchased/:id"
          element={<PurchasedMedicines />}
        />

        <Route path="/merchants" element={<Merchants />} />

        {/* Routes for Suppliers */}
        <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
        <Route path="/supplier/merchants" element={<AllBookedMerchants />} />
        <Route path="/supplier/medication" element={<Medications />} />
        <Route path="/supplier/addMedicines" element={<AddMedicines />} />
        <Route
          path="/supplier/viewMedication/:id"
          element={<ViewMedicines />}
        />
        <Route path="/supplier/requests" element={<RequestForMedicine />} />
        <Route path="/supplier/replaced" element={<ReplacedMedicine />} />

        {/* Routes for Merchants */}
        <Route path="/merchants/dashboard" element={<MerchantDashboard />} />
        <Route path="/merchants/suppliers" element={<AllBookedSuppliers />} />
        <Route
          path="/merchants/medication"
          element={<AllSupplierMedications />}
        />
        <Route path="/merchants/bookings" element={<RequestedMedicines />} />
        <Route path="/merchants/expired" element={<ExpiredMedicines />} />
        <Route path="/merchants/MerchantSubscribers" element={<MerchantSubscribers />} />


        <Route path="/messages/:id" element={<Messages />} />

        {/* Routes for  Patients/Customer*/}
        <Route path="/customers/dashboard" element={<PatientDashboard />} />
        <Route
          path="/customers/allMedicines"
          element={<PatientsAllMedicines />}
        />
        <Route path="/customers/booked" element={<PatientBookedMedicines />} />
        <Route path="/customers/appointments" element={<BookedAppointmentsPatient />} />
        <Route path="/doctor/appointments" element={<BookedAppointmentsDoctor />} />
        <Route path="/customers/doctors" element={<PatientAllDoctors />} />
        <Route path="/customers/PatientViewSubscriptions" element={<PatientViewSubscriptions />} />
        <Route path="/customers/CustomerSubscriptions" element={<CustomerSubscriptions />} />


      </Routes>
    </>
  );
};

export default AppContent;
