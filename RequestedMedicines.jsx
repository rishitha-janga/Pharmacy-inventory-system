import {
  Box,
  Button,
  Card,
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
import { user } from "../../common/common";
import {
  getRequestById,
  getRequests,
  updateRequest,
} from "../../api/requestApi";
import { toast } from "react-toastify";
import moment from "moment";
import { getUserById } from "../../api/userApi";

const RequestedMedicines = () => {
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
      console.log(res.data, "res.data");
      let item = [];
      for (let i of res.data) {
        if (i.merchantUsers === user.result) {
          item.push(i);
        }
      }
      console.log(item, "item");
      for (let j of item) {
        const supplier = await getUserById(j.supplierUsers);
        j.supplierUsers = supplier.data;
        const medicine = await getMedicationById(j.medicine);
        j.medicine = medicine.data;
      }
      setData(item);
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

  const handleClickOpen = async (id) => {
    setBookId(id);
    const res = await getRequestById(id);
    const supplier = await getUserById(res.data.supplierUsers);
    res.data.supplierUsers = supplier.data;
    setOpen(true);
  };

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

  console.log(data, "data");

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

      <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
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
            All Bookings
          </Typography>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell> Supplier Name</TableCell>
                  <TableCell>Total Quantity</TableCell>
                  <TableCell> Quantity</TableCell>
                  <TableCell> Price</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell> Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableHead>
                {handleSearch(data) &&
                  handleSearch(data).map((item, index) => {
                    return (
                      <TableBody key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.medicine.name}</TableCell>
                        <TableCell>{item.supplierUsers.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.totalQuantity}</TableCell>
                        <TableCell>{item.price / item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          {moment(item.medicine.expiryDate).format(
                            "DD-MM-YYYY"
                          )}
                        </TableCell>
                        <TableCell>{item.status}</TableCell>

                        <TableCell>
                          {item.status === "Accepted" ? (
                            item.paymentStatus === "Pending" ? (
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleClickOpen(item._id)}
                              >
                                Payment
                              </Button>
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
                        </TableCell>
                      </TableBody>
                    );
                  })}
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default RequestedMedicines;
