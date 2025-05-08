import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../common/common";
import { addMedication } from "../../api/medicationsApi";
import Validate from "../../validation/MedicineValidate";
import moment from "moment";

const AddMedicines = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    // quantity: "",
    image: "",
    category: "",
    expiryDate: "",
    users: user.result,
    description: "",
  });

  const [error, setError] = useState({});
  const [file, setFile] = useState();
  const [viewImage, setViewImage] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setViewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);
    const newErrors = Validate(data);
    setError(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        // formData.append("quantity", data.quantity);
        formData.append("image", file);
        formData.append("category", data.category);
        formData.append("expiryDate", data.expiryDate);
        formData.append("users", data.users);
        formData.append("description", data.description);

        await addMedication(formData);
        navigate("/supplier/medication");
        toast.success("Medicine Added Successfully");
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Box>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Add Medicines
          </Typography>
        </Box>
        <Card>
          <Box sx={{ flexGrow: 1, px: 3, py: 2 }}>
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
                    label="Price"
                    variant="outlined"
                    margin="normal"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    helperText={
                      error.price ? (
                        <span style={{ color: "red" }}>{error.price}</span>
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
                    value={data.quantity}
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
                    value={data.category}
                    onChange={handleChange}
                    helperText={
                      error.category ? (
                        <span style={{ color: "red" }}>{error.category}</span>
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
                    value={data.expiryDate}
                    onChange={handleChange}
                    helperText={
                      error.expiryDate ? (
                        <span style={{ color: "red" }}>{error.expiryDate}</span>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Image"
                    variant="outlined"
                    margin="normal"
                    type="file"
                    name="image"
                    value={data.image}
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* it should be on cener */}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {viewImage && (
                      <img
                        src={viewImage}
                        alt="medicine"
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    name="description"
                    value={data.description}
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
                  <Button variant="contained" color="primary" type="submit">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default AddMedicines;
