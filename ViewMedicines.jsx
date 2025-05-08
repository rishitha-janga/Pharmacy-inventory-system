import { useEffect, useState } from "react";
import { getMedicationById, updateMedication } from "../../api/medicationsApi";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { user } from "../../common/common";
import Validate from "../../validation/MedicineValidate";
import { toast } from "react-toastify";

const ViewMedicines = () => {
  const [medicines, setMedicines] = useState({
    name: "",
    price: "",
    // quantity: "",
    image: "",
    category: "",
    expiryDate: "",
    supplier: user.id,
    description: "",
  });
  const [display, setDisplay] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [file, setFile] = useState();
  const [viewFile, setViewFile] = useState();

  const handleFileChange = (e) => {
    setViewFile(URL.createObjectURL(e.target.files[0]));
    setFile((e.target.name = e.target.files[0]));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMedicines({ ...medicines, [name]: value });
  };

  const getMedicine = async () => {
    try {
      const res = await getMedicationById(id);
      setMedicines(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedicine();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Validate(medicines);
    setError(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        if(file){
          const formData = new FormData();
          formData.append("name", medicines.name);
          formData.append("price", medicines.price);
          // formData.append("quantity", medicines.quantity);
          formData.append("image", file);
          formData.append("category", medicines.category);
          formData.append("expiryDate", medicines.expiryDate);
          formData.append("supplier", medicines.supplier);
          formData.append("description", medicines.description);
  
          await updateMedication(id, formData);
        }else{
          await updateMedication(id, medicines);
        }

        navigate("/supplier/medication");
        toast.success("Medicine Updated Successfully");
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <>
      {!display && (
        <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card style={{ padding: "2rem", backgroundColor: "#ade6c1" }}>
                <Typography variant="h5" align="left">
                  Medicine Name :{" "}
                  <span style={{ color: "blueviolet" }}>{medicines.name}</span>
                </Typography>
                <Typography variant="h5" align="left">
                  Medicine Price :{" "}
                  <span style={{ color: "blueviolet" }}>{medicines.price}</span>
                </Typography>
                {/* <Typography variant="h5" align="left">
                  Medicine Quantity :{" "}
                  <span style={{ color: "blueviolet" }}>
                    {medicines.quantity}
                  </span>
                </Typography> */}

                <Typography variant="h5" align="left">
                  Medicine Expiry Date :{" "}
                  <span style={{ color: "blueviolet" }}>
                    {moment(medicines.expiryDate).format("DD-MM-YYYY")}
                  </span>
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card style={{ padding: "1rem", backgroundColor: "#ade6c1" }}>
                <CardMedia
                  component="img"
                  height="190"
                  image={`http://${window.location.hostname}:4000/medicine/${medicines.image}`}
                  alt={medicines.name}
                  style={{ objectFit: "fill" }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Card style={{ padding: "1rem", backgroundColor: "#ade6c1" }}>
                <Typography variant="h5" align="left">
                  Medicine Description :{" "}
                </Typography>
                <Typography variant="h5" align="left">
                  <span style={{ color: "blueviolet" }}>
                    {medicines.description}
                  </span>
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/supplier/medication")}
                style={{ marginTop: "1rem", marginBottom: "3rem" }}
              >
                Back
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="info"
                onClick={() => setDisplay(true)}
                style={{ width: 200, marginTop: "1rem", marginBottom: "3rem" }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
      {display && (
        <Container
          maxWidth="lg"
          style={{
            paddingTop: "1rem",
            paddingBottom: "2rem",
            backgroundColor: "#ade6c1",
          }}
        >
          <Box sx={{ marginBottom: "1rem" }}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Update Medicines
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card style={{ padding: "2rem" }}>
                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            name="name"
                            value={medicines.name}
                            onChange={handleChange}
                            helperText={
                              error.name ? (
                                <span style={{ color: "red" }}>
                                  {error.name}
                                </span>
                              ) : (
                                ""
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Price"
                            variant="outlined"
                            margin="normal"
                            name="price"
                            value={medicines.price}
                            onChange={handleChange}
                            helperText={
                              error.price ? (
                                <span style={{ color: "red" }}>
                                  {error.price}
                                </span>
                              ) : (
                                ""
                              )
                            }
                          />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Quantity"
                            variant="outlined"
                            margin="normal"
                            name="quantity"
                            value={medicines.quantity}
                            onChange={handleChange}
                            helperText={
                              error.quantity ? (
                                <span style={{ color: "red" }}>{error.quantity}</span>
                              ) : (
                                ""
                              )
                            }
                          />
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Category"
                            variant="outlined"
                            margin="normal"
                            name="category"
                            value={medicines.category}
                            onChange={handleChange}
                            helperText={
                              error.category ? (
                                <span style={{ color: "red" }}>
                                  {error.category}
                                </span>
                              ) : (
                                ""
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Expiry Date"
                            variant="outlined"
                            type="date"
                            margin="normal"
                            name="expiryDate"
                            min={moment(new Date()).utc().format("dd-mm-yy")}
                            value={moment(medicines.expiryDate).utc().format("yyyy-MM-DD")}
                            onChange={handleChange}
                            helperText={
                              error.expiryDate ? (
                                <span style={{ color: "red" }}>
                                  {error.expiryDate}
                                </span>
                              ) : (
                                ""
                              )
                            }
                            inputProps={{
                              min: new Date().toISOString().slice(0, 10),
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            name="description"
                            value={medicines.description}
                            onChange={handleChange}
                            helperText={
                              error.description ? (
                                <span style={{ color: "red" }}>
                                  {error.description}
                                </span>
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
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Update
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={1}></Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Card
                      style={{ padding: "1rem", backgroundColor: "#ade6c1" }}
                    >
                      {viewFile ? (
                        <CardMedia
                          component="img"
                          height="190"
                          image={viewFile}
                          alt="story"
                          style={{ objectFit: "fill" }}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          height="190"
                          image={`http://${window.location.hostname}:4000/medicine/${medicines.image}`}
                          alt={medicines.name}
                          style={{ objectFit: "fill" }}
                        />
                      )}
                    </Card>
                  </Box>
                  <Box sx={{ marginTop: "1rem" }}>
                    <TextField
                      fullWidth
                      label="Image"
                      variant="outlined"
                      margin="normal"
                      type="file"
                      name="image"
                      // value={medicines.image}
                      onChange={handleFileChange}
                      helperText={
                        error.image ? (
                          <span style={{ color: "red" }}>{error.image}</span>
                        ) : (
                          ""
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                  <Box sx={{ marginTop: "1rem" }}>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => setDisplay(false)}
                      style={{
                        width: 200,
                        marginTop: "1rem",
                        marginBottom: "3rem",
                      }}
                    >
                      Back
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ViewMedicines;
