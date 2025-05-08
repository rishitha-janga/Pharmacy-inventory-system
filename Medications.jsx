import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteMedication, getMedications } from "../../api/medicationsApi";
import moment from "moment/moment";
import { user } from "../../common/common";
import { baseURL } from "../../api/config";

const Medications = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const getAllMedications = async () => {
    try {
      const res = await getMedications();
      let item = [];
      for (let i of res.data) {
        if (i.users === user.result) {
          item.push(i);
        }
      }
      setData(item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMedications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMedication(id);
      getAllMedications();
      toast.success("Medicines Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const keys = ["name", "price", "expiryDate"];
  const handleSearch = (data) => {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) => {
        return keys.some((key) =>
          item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  };

  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="contained-basic"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          />
        </Box>
        <Card style={{ padding: "2rem", marginTop: "2rem" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" align="center">
              All Medicines
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/supplier/addMedicines")}
            >
              ADD
            </Button>
          </Box>
          <CardContent>
            <Grid container spacing={4}>
              {data && data.length > 0 ? (
                handleSearch(data) ? (
                  handleSearch(data).map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
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
                                src={`${baseURL}/medicine/${item.image}`}
                                alt={item.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "10px",
                                }}
                              />
                            </Box>
                          </CardActions>
                          <Typography variant="h5">{item.name}</Typography>
                          <Typography variant="body1">
                            Price: {item.price}
                          </Typography>
                          <Typography variant="body1">
                            Expiry Date:{" "}
                            {moment(new Date(item.expiryDate)).format(
                              "DD/MM/YYYY"
                            )}
                          </Typography>
                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() =>
                                navigate(`/supplier/viewMedication/${item._id}`)
                              }
                              sx={{ marginRight: "1rem" }}
                            >
                              View
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    No Medicines Found
                  </Typography>
                )
              ) : (
                <Typography
                  variant="h6"
                  align="center"
                  style={{ gridColumn: "1 / -1" }}
                >
                  No Medicines Found
                </Typography>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {/* <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Card style={{ padding: "2rem", marginTop: "1rem" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" align="center">
              All Medicines
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/supplier/addMedicines")}
            >
              ADD
            </Button>
          </Box>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontWeight: "bold" }}>Sr. No.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}> Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>Expiry Date</TableCell>
      
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Action
                  </TableCell>
                </TableHead>
                {handleSearch(data) &&
                  handleSearch(data).map((item, index) => {
                    return (
                      <TableBody key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                       
                        <TableCell>
                          {moment(new Date(item.expiryDate)).format(
                            "DD/MM/YYYY"
                          )}
                        </TableCell>
            
                        <TableCell>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() =>
                              navigate(`/supplier/viewMedication/${item._id}`)
                            }
                            sx={{ marginRight: "1rem" }}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableBody>
                    );
                  })}
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container> */}
    </>
  );
};

export default Medications;
