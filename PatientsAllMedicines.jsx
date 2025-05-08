import { useState } from "react";
import {
  getRequestById,
  getRequests,
  updateRequest,
} from "../../api/requestApi";
import { useEffect } from "react";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
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
// import { toast } from "react-toastify";

const PatientsAllMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [bookId, setBookId] = useState("");

  const [medicineBook, setMedicineBook] = useState({
    patient: user.id,
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

  const [medic, setMedic] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMedicineBook({ ...medicineBook, [name]: value });
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
    "merchantUsers.name",
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
          key === "merchantUsers.name"
            ? item.merchantUsers.name.toLowerCase().includes(search)
            : key === "medicine.name"
            ? item.medicine.name.toLowerCase().includes(search)
            : item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
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

  const handleClickOpen = async (id) => {
    setBookId(id);
    const res = await getRequestById(id);
    const supplier = await getUserById(res.data.supplierUsers);
    setMedic(res.data);
    res.data.supplierUsers = supplier.data;
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
  const [voiceSearch, setVoiceSearch] = useState("");
  
  const [isListening, setIsListening] = useState(false); // To check if voice recognition is active

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true; // Keep listening until stopped
  recognition.interimResults = true; // Show partial results while listening

  // Start voice recognition
  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  // Stop voice recognition
  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  // Capture speech input
  recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    setSearch(transcript); // Update search with voice input
  };

  recognition.onerror = (event) => {
    console.error("Error occurred in speech recognition: ", event.error);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognition.stop();
    };
  }, []);
const voiceIcon = isListening ? <MicOffIcon /> : <MicIcon />;
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
                    id="quantity"
                    label="Quantiry"
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    value={medicineBook.quantity}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Price"
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={medicineBook.price ? medicineBook.price : price}
                    fullWidth
                  />
                </Grid>
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
           <Button
        onClick={isListening ? stopListening : startListening}
        variant="contained"
        style={{ marginLeft: "10px" }}
      >
        {voiceIcon}
        {isListening ? "Stop Listening" : "Start Voice Search"}
      </Button>
        </Box>
        <Card style={{ padding: "1rem", marginTop: "1rem" }}>
          <Typography variant="h4" align="center">
            All Medicines
          </Typography>
        </Card>

          <CardContent>
            <Grid container spacing={4}>
              {medicines && medicines.length === 0 && (
                <Typography variant="h5" align="center">
                  No Medicines Found
                </Typography>
              )}
              {handleSearch(medicines) &&
                handleSearch(medicines).length > 0 &&
                handleSearch(medicines).map((medicine) => (
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
                              src={`${baseURL}/medicine/${medicine.medicine.image}`}
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
                          {medicine.medicine.name}
                        </Typography>
                        <Typography variant="body1">
                          Merchant: {medicine.merchantUsers.name}
                        </Typography>
                        <Typography variant="body1">
                          Basic Price: {medicine.medicine.price}
                        </Typography>
                        <Typography variant="body1">
                          Quantity: {medicine.totalQuantity}
                        </Typography>
                        <Typography variant="body1">
                          Price: {medicine.price}
                        </Typography>
                        <Typography variant="body1">
                          Expiry Date:{" "}
                          {moment(
                            new Date(medicine.medicine.expiryDate)
                          ).format("DD/MM/YYYY")}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleClickOpen(medicine._id)}
                        >
                          Book
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

export default PatientsAllMedicines;
