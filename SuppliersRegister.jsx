import { toast } from "react-toastify";
import { addSupplier } from "../../api/suppliersApi";
import { useState } from "react";
import Validate from "../../validation/supplierValidate";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../api/userApi";
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
  TextField
} from "@mui/material";
const SuppliersRegister = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    roles: "Suppliers",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    roles: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.roles = "Suppliers";
    console.log("data", data);
    const newErrors = Validate(data);
    console.log(newErrors, "newErrors");

    setError(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        await addUser(data);
        navigate("/login");
        toast.success("Register Successfull");
      } catch (err) {
        toast.error(err);
      }
    }
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
                      Supplier Register
                    </Typography>
                    <Typography variant="body2" align="center" gutterBottom>
                      Register to your account dashboard
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                name="name"
                value={data.name}
                onChange={handleChange}
                helperText={
                  error.name ? (
                    <span style={{ color: "red" }}>{error.name}</span>
                  ) : (
                    ""
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                name="password"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                margin="normal"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                helperText={
                  error.phone ? (
                    <span style={{ color: "red" }}>{error.phone}</span>
                  ) : (
                    ""
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                name="address"
                value={data.address}
                onChange={handleChange}
                helperText={
                  error.address ? (
                    <span style={{ color: "red" }}>{error.address}</span>
                  ) : (
                    ""
                  )
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" align="center">
                  {`Don't have an account?`}
                  <Link to="/supplier/login" className="link">
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

export default SuppliersRegister;
