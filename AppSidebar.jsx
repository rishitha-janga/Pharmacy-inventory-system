import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
// import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
// import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
// import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
// import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
// import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
// import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
// import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
// import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AppContent from "./AppContent";
import AppNavbar from "./AppNavbar";
import { Box } from "@mui/material";
import { user } from "../common/common";
console.log(user);
const AppSidebar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          // backgroundColor: "ButtonFace",
        }}
      >
        <Sidebar
          style={{
            // backgroundColor: "red",
            // opacity: 0.9,
            backgroundImage: "url(/medicine-bg.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
          // className="app"
        >
          <Menu>
            <MenuItem
              component={<Link to="/" className="link" />}
              className="menu1"
              // icon={<MenuRoundedIcon />}
            >
              <h4>MedStorePro</h4>
            </MenuItem>
            {/* ADMIN */}
            {user.roles === "Admin" && (
              <MenuItem
                component={<Link to="/dashboard" className="link" />}
                icon={<GridViewRoundedIcon />}
              >
                Dashboard
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={<Link to="/admin/merchants" className="link" />}
                icon={<AccountCircleRoundedIcon />}
              >
                Merchants
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={<Link to="/admin/suppliers" className="link" />}
                icon={<AccountCircleRoundedIcon />}
              >
                Suppliers
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={
                  <Link to="/admin/AddSubscriptionAdmin" className="link" />
                }
                icon={<AccountCircleRoundedIcon />}
              >
                AddSubscriptionAdmin
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={
                  <Link to="/admin/ViewSubscriptions" className="link" />
                }
                icon={<AccountCircleRoundedIcon />}
              >
                ViewSubscriptions
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={<Link to="/admin/medicines" className="link" />}
                icon={<ShieldRoundedIcon />}
              >
                Medicines
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={<Link to="/admin/patients" className="link" />}
                icon={<AccountCircleRoundedIcon />}
              >
                Patients
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={<Link to="/admin/doctors" className="link" />}
                icon={<AccountCircleRoundedIcon />}
              >
                Doctors
              </MenuItem>
            )}
            {user.roles === "Admin" && (
              <MenuItem
                component={<Link to="/admin/expired" className="link" />}
                icon={<AccountCircleRoundedIcon />}
              >
                Expired Medicine
              </MenuItem>
            )}
            {user.roles === "Suppliers" && (
              <MenuItem
                component={<Link to="/supplier/dashboard" className="link" />}
                icon={<GridViewRoundedIcon />}
              >
                Dashboard
              </MenuItem>
            )}
            {user.roles === "Suppliers" && (
              <MenuItem
                component={<Link to="/supplier/merchants" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Merchants
              </MenuItem>
            )}
            {user.roles === "Suppliers" && (
              <MenuItem
                component={<Link to="/supplier/medication" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Medicines
              </MenuItem>
            )}

            {user.roles === "Suppliers" && (
              <MenuItem
                component={<Link to="/supplier/requests" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Requests
              </MenuItem>
            )}
            {user.roles === "Suppliers" && (
              <MenuItem
                component={<Link to="/supplier/replaced" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                ReplacedMedicine
              </MenuItem>
            )}
            {user.roles === "Merchants" && (
              <MenuItem
                component={<Link to="/merchants/dashboard" className="link" />}
                icon={<GridViewRoundedIcon />}
              >
                Dashboard
              </MenuItem>
            )}
            {user.roles === "Merchants" && (
              <MenuItem
                component={<Link to="/merchants/suppliers" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Suppliers
              </MenuItem>
            )}
            {user.roles === "Merchants" && (
              <MenuItem
                component={<Link to="/merchants/medication" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Medicines
              </MenuItem>
            )}
            {user.roles === "Merchants" && (
              <MenuItem
                component={<Link to="/merchants/MerchantSubscribers" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Merchant view Subscribers{" "}
              </MenuItem>
            )}

            {user.roles === "Merchants" && (
              <MenuItem
                component={<Link to="/merchants/bookings" className="link" />}
                icon={<BookmarkIcon />}
              >
                Bookings
              </MenuItem>
            )}
            {user.roles === "Merchants" && (
              <MenuItem
                component={<Link to="/merchants/expired" className="link" />}
                icon={<BookmarkIcon />}
              >
                Expired Medicine
              </MenuItem>
            )}

            {user.roles === "customer" && (
              <MenuItem
                component={<Link to="/customers/dashboard" className="link" />}
                icon={<GridViewRoundedIcon />}
              >
                Dashboard
              </MenuItem>
            )}
            {user.roles === "customer" && (
              <MenuItem
                component={
                  <Link to="/customers/allMedicines" className="link" />
                }
                icon={<ReceiptRoundedIcon />}
              >
                Medicines
              </MenuItem>
            )}
            {user.roles === "customer" && (
              <MenuItem
                component={<Link to="/customers/booked" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Booked Medicines
              </MenuItem>
            )}
            {user.roles === "customer" && (
              <MenuItem
                component={
                  <Link
                    to="/customers/PatientViewSubscriptions"
                    className="link"
                  />
                }
                icon={<ReceiptRoundedIcon />}
              >
                Subscriptions
              </MenuItem>
            )}
            {user.roles === "customer" && (
              <MenuItem
                component={
                  <Link
                    to="/customers/CustomerSubscriptions"
                    className="link"
                  />
                }
                icon={<ReceiptRoundedIcon />}
              >
                view Subscriptions
              </MenuItem>
            )}
            {user.roles === "customer" && (
              <MenuItem
                component={<Link to="/customers/doctors" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Doctors
              </MenuItem>
            )}
            {user.roles === "customer" && (
              <MenuItem
                component={
                  <Link to="/customers/appointments" className="link" />
                }
                icon={<ReceiptRoundedIcon />}
              >
                Appointments
              </MenuItem>
            )}
            {user.roles === "doctor" && (
              <MenuItem
                component={<Link to="/doctor/appointments" className="link" />}
                icon={<ReceiptRoundedIcon />}
              >
                Appointments
              </MenuItem>
            )}
            {/* <SubMenu label="Charts" icon={<BarChartRoundedIcon />}>
              <MenuItem icon={<TimelineRoundedIcon />}>
                {" "}
                Timeline Chart{" "}
              </MenuItem>
              <MenuItem icon={<BubbleChartRoundedIcon />}>
                Bubble Chart
              </MenuItem>
            </SubMenu>
            <SubMenu label="Wallets" icon={<WalletRoundedIcon />}>
              <MenuItem icon={<AccountBalanceRoundedIcon />}>
                Current Wallet
              </MenuItem>
              <MenuItem icon={<SavingsRoundedIcon />}>Savings Wallet</MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to="transactions" className="link" />}
              icon={<MonetizationOnRoundedIcon />}
            >
              Transactions
            </MenuItem>
            <SubMenu
              label="Settings"
              icon={<SettingsApplicationsRoundedIcon />}
            >
              <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
              <MenuItem icon={<ShieldRoundedIcon />}> Privacy </MenuItem>
              <MenuItem icon={<NotificationsRoundedIcon />}>
                Notifications
              </MenuItem>
            </SubMenu> */}
            {/* <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem> */}
          </Menu>
        </Sidebar>
        <section
          style={{
            overflow: "scroll",
            width: "100%",
            backgroundImage: "url(/background.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            style={{ position: "fixed", width: "100%", top: 0, zIndex: 9999 }}
          >
            <AppNavbar />
          </Box>
          <Box sx={{ ml: "2rem", pt: "5rem" }}>
            <AppContent />
          </Box>
        </section>
      </div>
    </>
  );
};

export default AppSidebar;
