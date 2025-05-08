import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const medicines = [
  {
    id: 1,
    name: "Tablet",
    image: "/tablets.jpg",
  },
  {
    id: 2,
    name: "Capsule",
    image: "/capsules.jpg",
  },
  {
    id: 3,
    name: "Syrup",
    image: "/syrup.jpg",
  },
  {
    id: 4,
    name: "Ointment",
    image: "/ointment-tube.jpg",
  },
  {
    id: 5,
    name: "Vitamins",
    image: "/vitamins.jpg",
  },
  {
    id: 6,
    name: "Calcium",
    image: "/calcium.jpg",
  },
];
const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "rgb(174 241 216)", minHeight: "100vh" }}>
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
      {/* Body */}
      {/* image  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "40vh",
          width: "100%",
        }}
      >
        <img
          src="/medicine-bg.jpg"
          alt="pharmacy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <h1>WELCOME TO MedStorePro</h1>
      </Box>
      {/* About  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "5%",
            alignItems: "center",
          }}
        ></Box>
        {/* <Card
          sx={{
            width: "50%",
            padding: "1rem",
            backgroundColor: "rgb(174 241 216)",
          }}
        > */}
        {/* <h2>About</h2> */}
        <p>
          This is a MedStorePro. It is a web-based
          application that is developed to help medical stores to manage their
          inventory and sales. It is a user-friendly system that helps the user
          to easily manage their store.
        </p>
        {/* </Card> */}
      </Box>

      {/* Cards for medicines */}
      {/* <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            }}
        >
            <h1>FEATURES</h1>
        </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          backgroundColor: "rgb(174 241 216)",
        }}
      >
        <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
          <Grid container spacing={4}>
            {medicines.map((medicine) => (
              <Grid item xs={12} sm={6} md={4} key={medicine.id}>
                <Card style={{ marginBottom: "1rem" }}>
                  <CardContent
                    sx={{
                      backgroundColor: "rgb(243 244 246)",
                    }}
                  >
                    <CardActions>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "1rem",
                          width: "100%",
                          height: "200px",
                        }}
                      >
                        <img
                          src={medicine.image}
                          alt="pharmacy"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                    </CardActions>
                    <Typography variant="h5" color={"rgb(14 148 117)"}>
                      {medicine.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(14 148 117)",
          color: "white",
          height: "5vh",
          width: "100%",
          marginTop: "2rem",
        }}
      >
        <p>© 2021 MedStorePro. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Home;
