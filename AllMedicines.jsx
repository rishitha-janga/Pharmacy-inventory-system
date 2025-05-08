import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { getMedicationById } from "../../api/medicationsApi";
import { getRequests, updateRequest } from "../../api/requestApi";
import { toast } from "react-toastify";
import moment from "moment";
import { getUserById } from "../../api/userApi";
import { baseURL } from "../../api/config";

const AllMedicines = () => {
  const [data, setData] = useState([]);
  const [bookId, setBookId] = useState("");

  const [medicineBook, setMedicineBook] = useState({
    paymentStatus: "",

    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMedicineBook({ ...medicineBook, [name]: value });
  };

  const [search, setSearch] = useState("");

  const getAllMedications = async () => {
    try {
      const res = await getRequests();
      for (let i of res.data) {
        const merchant = await getUserById(i.merchantUsers);
        i.merchantUsers = merchant.data;
        const supplier = await getUserById(i.supplierUsers);
        i.supplierUsers = supplier.data;
        const medicine = await getMedicationById(i.medicine);
        i.medicine = medicine.data;
      }

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMedications();
  }, []);

  const keys = [
    "supplierUsers.name",
    "medicine.name",
    "quantity",
    "price",
    "status",
  ];
  const handleSearch = (data) => {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) => {
        return keys.some((key) =>
          key === "supplierUsers.name"
            ? item.supplierUsers.name.toLowerCase().includes(search)
            : key === "medicine.name"
            ? item.medicine.name.toLowerCase().includes(search)
            : item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  };
  const [open, setOpen] = useState(false);

  // const handleClickOpen = async (id) => {
  //   setBookId(id);
  //   const res = await getRequestById(id);
  //   const supplier = await getUserById(res.data.supplierUsers);
  //   res.data.supplierUsers = supplier.data;
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getMedicationById(bookId);
      await updateRequest(bookId, {
        data,
        paymentStatus: "Paid",
        paymentDate: new Date(),
      });
      toast.success("Payment Successful");
      handleClose();
      getAllMedications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h4" align="center">
              Payment
            </Typography>
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
              </DialogContentText> */}
            <form onSubmit={handleBook}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="Medicine"
                    label="Card Name"
                    type="text"
                    name="cardName"
                    onChange={handleChange}
                    value={medicineBook.cardName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="supplier"
                    label="Card Number"
                    type="number"
                    name="cardNumber"
                    onChange={handleChange}
                    value={medicineBook.cardNumber}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="quantity"
                    label="Card Expiry Date"
                    type="date"
                    fullWidth
                    name="expiryDate"
                    value={medicineBook.expiryDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="cvv"
                    label="cvv"
                    type="number"
                    name="cvv"
                    value={medicineBook.cvv}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button variant="contained" type="submit" sx={{ width: 300 }}>
                    Payment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>

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
        <Card style={{ padding: "1rem", marginTop: "1rem" }}>
          <Typography variant="h4" align="center">
            All Medicines
          </Typography>
        </Card>
        <CardContent>
          <Grid container spacing={4}>
            {data && data.length > 0 ? (
              handleSearch(data) &&
              handleSearch(data).map((item, index) => {
                return (
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
                              src={`${baseURL}/medicine/${item.medicine.image}`}
                              alt={item.medicine.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px",
                              }}
                            />
                          </Box>
                        </CardActions>
                        <Typography variant="h5">
                          {item.medicine.name}
                        </Typography>
                        <Typography variant="body1">
                          Supplier Name: {item.supplierUsers.name}
                        </Typography>
                        <Typography variant="body1">
                          Total Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body1">
                          Remaining Quantity:{" "}
                          {item.quantity + item.totalQuantity}
                        </Typography>

                        <Typography variant="body1">
                          Price: {item.price}
                        </Typography>
                        <Typography variant="body1">
                          Expiry Date:{" "}
                          {moment(new Date(item.medicine.expiryDate)).format(
                            "DD/MM/YYYY"
                          )}
                        </Typography>
                        <Typography variant="body1">
                          Status: {item.status}
                        </Typography>
                        {item.replace ? (
                          item.replaceStatus === "Replaced" ? (
                            <Typography sx={{ color: "green" }} variant="body1">
                              Replacement : Replaced
                            </Typography>
                          ) : (
                            <Typography sx={{ color: "red" }} variant="body1">
                              Replacement : Expired
                            </Typography>
                          )
                        ) : (
                          ""
                        )}
                        <Box
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          {item.status === "Accepted" ? (
                            item.paymentStatus === "Pending" ? (
                              // <Button
                              //   variant="contained"
                              //   color="secondary"
                              //   onClick={() => handleClickOpen(item._id)}
                              // >
                              //   Payment
                              // </Button>
                              <Typography sx={{ color: "skyblue" }}>
                                UNPAID
                              </Typography>
                            ) : (
                              <Typography sx={{ color: "green" }}>
                                PAID
                              </Typography>
                            )
                          ) : item.status === "Rejected" ? (
                            <Typography sx={{ color: "red" }}>
                              REJECTED
                            </Typography>
                          ) : null}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Typography align="center" variant="h5">
                No Medicines To Display
              </Typography>
            )}
          </Grid>
        </CardContent>
      </Container>
    </>
  );
};

export default AllMedicines;
