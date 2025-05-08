import { useState } from "react";
import {
  getRequestById,
  getRequests,
  updateRequest,
} from "../../api/requestApi";
import { useEffect } from "react";
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
import moment from "moment";
import { getMedicationById } from "../../api/medicationsApi";
import { addPatientsMedicine } from "../../api/patientMedicine";
import { toast } from "react-toastify";
import { user } from "../../common/common";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../api/userApi";
import { baseURL } from "../../api/config";
import { getUsers } from "../../api/doctorApi";
// import { toast } from "react-toastify";
import {bookAppointment} from "../../api/appointmentApi";
const PatientAllDoctors = () => {
  const [medicines, setMedicines] = useState([]);
  const [bookId, setBookId] = useState("");

  const [medicineBook, setMedicineBook] = useState({
   medicine: "",
    quantity: "",
    price: "",
    users: "", 
     patient: user.id,
   
    paymentStatus: "",
    paymentDate: "",

    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [medic, setMedic] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookData({ ...bookData, [name]: value });
  };

  const [search, setSearch] = useState("");

  const fetchMedicines = async () => {
    try {
      const res = await getRequests();
      console.log(res.data, "res");
      let item = [];
      for (let i of res.data) {
        if (i.status === "Accepted") {
          const medicine = await getMedicationById(i.medicine);
          i.medicine = medicine.data;
          const supplier = await getUserById(i.supplierUsers);
          i.supplierUsers = supplier.data;
          const merchant = await getUserById(i.merchantUsers);
          i.merchantUsers = merchant.data;
          item.push(i);
        }
      }
      setMedicines(item);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(medicines, "medicines");
  useEffect(() => {
    fetchMedicines();
  }, []);

  const keys = [
    "name",
    "email",
    "address",
    "designation",
    "speciality",
    "experience",
    "fee",
    "education",
    "phone"
  ];
  
  const handleSearch = (data, search) => {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) => {
        return keys.some((key) => {
          const value = item[key];
          // If the value exists and is a string or number, convert it to lowercase for case-insensitive comparison
          if (value) {
            return value.toString().toLowerCase().includes(search.toLowerCase());
          }
          return false;
        });
      });
    }
  };
  
  
  useEffect(() => {
    const { quantity } = medicineBook;
    const result = medic.price / medic.quantity;
    const finalPrice = result * quantity;
    // setMedicineBook({ ...medicineBook, medicine, quantity, price: finalPrice });
    setPrice(finalPrice);
  }, [medic, medicineBook.quantity]);

  const [open, setOpen] = useState(false);
const patient= JSON.parse(localStorage.getItem("token"));
  const handleClickOpen = async (id,fee) => {
    setBookId(id);
    setBookData({ ...bookData, doctor: id, patient:patient.id,fee:fee });
    // const res = await getRequestById(id);
    // const supplier = await getUserById(res.data.supplierUsers);
    // setMedic(res.data);
    // res.data.supplierUsers = supplier.data;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const res = await getRequestById(bookId);

      medicineBook.medicine = bookId;

      medicineBook.users = res.data.merchantUsers;
      medicineBook.price = price;
      medicineBook.paymentStatus = "Paid";
      medicineBook.paymentDate = moment().format("YYYY-MM-DD");

      await addPatientsMedicine(medicineBook);

      await updateRequest(bookId, {
        totalQuantity: res.data.quantity - medicineBook.quantity,
      });

      fetchMedicines();
      setOpen(false);
      setMedicineBook({
        medicine: "",
        quantity: "",
        price: "",
        users: "",
        paymentStatus: "",
        paymentDate: "",
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });

      toast.success("Medicine Booked Successfully");
      navigate("/customers/booked");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(medicineBook, "medicineBook");
  const [doctors, setDoctors] = useState([]);
  const getAllDoctors = async () => {
    try {
      const res = await getUsers();
      console.log(res.data, "res");
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  const [bookData,setBookData] = useState({
    date:"",
    time:"",
    doctor:"",
    patient:"",
    fee:"",
    paymentStatus: "",
    paymentDate: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const bookDocAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await bookAppointment(bookData);
      handleClose()
    } catch (error) {
      
    }
  }
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
            <form onSubmit={bookDocAppointment}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="Date"
                    label="date"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={bookData.date}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="time"
                    label="time"
                    type="time"
                    name="time"
                    onChange={handleChange}
                    value={bookData.time }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="Medicine"
                    label="Name on Card "
                    type="text"
                    name="cardName"
                    onChange={handleChange}
                    value={bookData.cardName}
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
                    value={bookData.cardNumber}
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
                    value={bookData.cvv}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button variant="contained" type="submit" sx={{ width: 300 }}>
                    Pay {bookData.fee} ₹
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
            All Doctors
          </Typography>
        </Card>

        <CardContent>
          <Grid container spacing={4}>
            {medicines && medicines.length === 0 && (
              <Typography variant="h5" align="center">
                No Medicines Found
              </Typography>
            )}
            {handleSearch(doctors,search) &&
              handleSearch(doctors,search).length > 0 &&
              handleSearch(doctors,search).map((medicine) => (
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
                            src={`${baseURL}/doctors/${medicine.image}`}
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
                      <Typography variant="body1">
                        Education: {medicine.education}
                      </Typography>
                      <Typography variant="body1">
                        Specialization: {medicine.speciality}
                      </Typography>
                      <Typography variant="body1">
                        {/* Quantity: {medicine.totalQuantity} */}
                      </Typography>
                      <Typography variant="body1">
                        Appointment Fee: {medicine.fee} ₹
                      </Typography>
                      <Typography variant="body1">
                        Designation: {medicine.designation}
                      </Typography>
                      <Typography variant="body1">
                        Contact: {medicine.email},{medicine.phone} ,{medicine.address}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickOpen(medicine._id,medicine.fee)}
                      >
                        Book Appointment
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </CardContent>
      </Container>
    </>
  );
};

export default PatientAllDoctors;
