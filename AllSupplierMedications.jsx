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
import {
  getMedicationById,
  getMedications,
  updateMedication,
} from "../../api/medicationsApi";
import { user } from "../../common/common";
import { addRequest } from "../../api/requestApi";
import { toast } from "react-toastify";
import { addUser, getUserById } from "../../api/userApi";
import { baseURL } from "../../api/config";
import moment from "moment";

const AllSupplierMedications = () => {
  const [data, setData] = useState([]);
  const [bookId, setBookId] = useState("");
  const [medicine, setMedicine] = useState("");
  const [price, setPrice] = useState("");

  const [medicineBook, setMedicineBook] = useState({
    medicine: "",
    quantity: "",
    price: "",
    totalQuantity: "",
    merchantUsers: "",
    status: "Pending",
    supplierUsers: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMedicineBook({ ...medicineBook, [name]: value });
  };

  const [search, setSearch] = useState("");

  const getAllMedications = async () => {
    try {
      const res = await getMedications();
      for (let i of res.data) {
        const supplier = await getUserById(i.users);
        i.users = supplier.data;
      }
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMedications();
  }, []);

  const keys = ["name", "price", "users.name", "category"];
  const handleSearch = (data) => {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) => {
        return keys.some((key) =>
          key === "users.name"
            ? item.users.name.toLowerCase().includes(search)
            : item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  };

  useEffect(() => {
    const { quantity } = medicineBook;
    const result = medicine.price ? medicine.price : 0;
    const finalPrice = result * quantity;
    // setMedicineBook({ ...medicineBook, medicine, quantity, price: finalPrice });
    setPrice(finalPrice);
  }, [medicine, medicineBook.quantity]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = async (id) => {
    setBookId(id);
    const res = await getMedicationById(id);
    const supplier = await getUserById(res.data.users);
    res.data.users = supplier.data;
    setMedicine(res.data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      medicineBook.price = price;
      medicineBook.totalQuantity = medicineBook.quantity;
      medicineBook.merchantUsers = user.result;
      await addRequest(medicineBook);

      const { data } = await getMedicationById(bookId);
      const merchantId = user.result;
      console.log(data, merchantId, "kkkk");

      // const item = [];
      // data.merchant = item.push(merchantId);
      // await updateMedication(bookId, { data, merchantId });
      toast.success("Send A Request for the Medicines");
      handleClose();
      getAllMedications();
      setMedicineBook({
        medicine: "",
        quantity: "",
        price: "",
        totalQuantity: "",
        merchantUsers: "",
        status: "Pending",
        supplierUsers: "",
      });
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
              Book Medicine
            </Typography>
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            <form onSubmit={handleBook}>
              <input
                type="text"
                name="medicine"
                value={(medicineBook.medicine = bookId)}
                hidden={true}
              />
              <input
                type="text"
                name="medicine"
                value={(medicineBook.merchant = user.result)}
                hidden={true}
              />
              <input
                type="text"
                name="medicine"
                value={
                  (medicineBook.supplierUsers = medicine.users
                    ? medicine.users?._id
                    : "")
                }
                hidden={true}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="Medicine"
                    label="Medicine"
                    type="text"
                    fullWidth
                    value={medicine.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="supplier"
                    label="Supplier Name"
                    type="text"
                    fullWidth
                    value={medicine.users ? medicine.users.name : ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </Grid>
              </Grid>
              <TextField
                autoFocus
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                fullWidth
                name="quantity"
                value={medicineBook.quantity}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                name="price"
                value={medicineBook.price ? medicineBook.price : price}
                onChange={handleChange}
              />
              <Button variant="contained" type="submit">
                Book
              </Button>
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
          {/* <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </Box>
        <Card style={{ padding: "1rem", marginTop: "1rem" }}>
          <Typography variant="h4" align="center">
            All Suppliers Medicines
          </Typography>
        </Card>

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
                          Category : {item.category}
                        </Typography>
                        <Typography variant="body1">
                          Supplier Name: {item.users.name}
                        </Typography>
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
                            color="secondary"
                            onClick={() => handleClickOpen(item._id)}
                          >
                            Book
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
      </Container>
    </>
  );
};

export default AllSupplierMedications;
