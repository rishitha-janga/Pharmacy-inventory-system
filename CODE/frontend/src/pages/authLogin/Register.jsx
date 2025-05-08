import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  // CardHeader,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MerchantsRegister from "../merchants/MerchantsRegister";
import SuppliersRegister from "../suppliers/SuppliersRegister";
import PatientsRegister from "../patients/PatientsRegister";
const AllRole = ["Merchant", "Supplier", "Customer"];

const Register = () => {
  const [role, setRole] = useState("Merchant");
  const navigate = useNavigate();

  const handleRoleChange = (item) => {
    console.log(item);
    // setRole(event.target.value);
    setRole(item);
    navigate("/login");
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url(/login-2.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
         {/* Navbar */}
         <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="sticky"
            style={{ backgroundColor: "rgb(14 148 117)" }}
          >
            <Toolbar>
              <Box sx={{ flexGrow: 4 }}>
                <Button
                  variant="link"
                  color="primary"
                  style={{ marginRight: "1rem" }}
                  component={Link}
                  sx={{ color: "white", textDecoration: "none", fontSize: 20 }}
                  to="/"
                >
                  MedStorePro
                </Button>
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Button
                  variant="link"
                  color="secondary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => navigate("/")}
                >
                  HOME
                </Button>
                <Button
                  variant="link"
                  color="secondary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => navigate("/login")}
                >
                  ADMIN
                </Button>

                <Button
                  variant="link"
                  color="secondary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => navigate("/merchant/login")}
                >
                  MERCHANT
                </Button>

                <Button
                  variant="link"
                  color="secondary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => navigate("/supplier/login")}
                >
                  SUPPLIER
                </Button>

                <Button
                  variant="link"
                  color="secondary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => navigate("/customer/login")}
                >
                  CUSTOMER
                </Button>
                <Button
                variant="link"
                color="secondary"
                style={{ marginRight: "1rem" }}
                onClick={() => navigate("/doctor/login")}
              >
                DOCTOR
              </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Container maxWidth="sm" sx={{ pt: "5rem" }}>
          <Card>
            {/* <CardHeader title="Login" /> */}
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" align="center" gutterBottom>
                      {role} Register
                    </Typography>
                    <Typography variant="body2" align="center" gutterBottom>
                      Register to your account dashboard
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {/* <FormControl
                        size="small"
                        variant="standard"
                        style={{ width: "50%" }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Select Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={role}
                          label="Role"
                          onChange={handleRoleChange}
                          iputlabelprops={{
                            shrink: true,
                          }}
                        >
                          {AllRole.map((item) => (
                            <MenuItem value={item} key={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 3 }}>
                {role === "Merchant" ? (
                  <MerchantsRegister />
                ) : role === "Supplier" ? (
                  <SuppliersRegister />
                ) : (
                  <PatientsRegister />
                )}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" align="center">
                  {`Don't have an account?`}
                  <Link to="/login" className="link">
                    Login
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Register;
