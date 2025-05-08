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
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import config from "../../api/config";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validate from "../../validation/loginValidate";
import axios from "axios";
import { toast } from "react-toastify";
const AllRole = ["Admin", "Merchant", "Supplier", "Customer"];

const PatientLogin = () => {
  const [role, setRole] = useState("Admin");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRoleChange = (item) => {
    console.log(item);
    // setRole(event.target.value);
    setRole(item);
    navigate("/login");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Validate(data);
    setError(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        const { email, password } = data;
        // if (role === "Admin") {
        //   if (data.email === "admin@gmail.com" && data.password === "admin") {
        //     localStorage.setItem(
        //       "token",
        //       JSON.stringify({
        //         email: "admin@gmail.com",
        //         password: "admin",
        //         roles: "Admin",
        //       })
        //     );
        //     toast.success("Login Successfull");
        //     navigate("/dashboard");
        //     window.location.reload("/dashboard");
        //   } else {
        //     toast.error("Login Failed");
        //   }
        // }
        // if (role === "Merchant") {
        //   const res = await axios.post(
        //     "http://localhost:4000/users/login",
        //     data
        //   );
        //   console.log(res.data);
        //   localStorage.setItem("token", JSON.stringify(res.data));
        //   toast.success("Login Successfull");
        //   navigate("/merchants/dashboard");
        //   window.location.reload("/merchants/dashboard");
        // }
        // if (role === "Supplier") {
        //   const res = await axios.post("http://localhost:4000/users/login", {
        //     email,
        //     password,
        //   });
        //   localStorage.setItem("token", JSON.stringify(res.data));
        //   toast.success("Login Successfull");
        //   navigate("/supplier/dashboard");
        //   window.location.reload("/supplier/dashboard");
        // }
        // if (role === "Customer") {
          const res = await config.post("/patients/login", {
            email,
            password,
          });
          localStorage.setItem(
            "token",
            JSON.stringify({
              id: res.data.result,
              roles: "customer",
            })
          );
          toast.success("Login Successfull");
          navigate("/customers/dashboard");
          window.location.reload("/customers/dashboard");
        // }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url(/login-1.jpg)",
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
                    <Typography variant="h4" align="start" gutterBottom>
                      Customer Login
                    </Typography>
                    {/* <Typography variant="body2" align="center" gutterBottom>
                        Login to your account dashboard
                      </Typography> */}
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <FormControl
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
                        </FormControl>
                      </Box>
                    </Grid> */}
                </Grid>
              </Box>
              <Box sx={{ mt: 3 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    helperText={
                      error.email ? (
                        <span style={{ color: "red" }}>{error.email}</span>
                      ) : (
                        ""
                      )
                    }
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    helperText={
                      error.password ? (
                        <span style={{ color: "red" }}>{error.password}</span>
                      ) : (
                        ""
                      )
                    }
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" align="center">
                  {`Don't have an account?`}
                  <Link to="/customer/register" className="link">
                    Register
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

export default PatientLogin;
