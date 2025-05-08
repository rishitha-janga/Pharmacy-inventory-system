import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { user } from "../common/common";
import { useEffect, useState } from "react";
import { getUserById } from "../api/userApi";

const AppNavbar = () => {
  const [data, setData] = useState([]);

  const getUserName = async () => {
    console.log(user.roles, "roles");
    if (user.roles === "Admin") {
      setData("Admin");
    } else if (user.roles === "Merchants") {
      const res = await getUserById(user.result);
      setData(res.data.name);
    } else if (user.roles === "Suppliers") {
      const res = await getUserById(user.result);
      setData(res.data.name);
    } else if (user.roles === "customer") {
      setData("Customer");
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          style={{ backgroundColor: "rgb(14 148 117)" }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 4, textAlign: "center" }}>
              {data ? (
                <h3 style={{ color: "white" }}>Welcome {data}</h3>
              ) : (
                <h3 style={{ color: "white" }}>Welcome</h3>
              )}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "1rem" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AppNavbar;
