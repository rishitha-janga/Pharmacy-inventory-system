import { useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
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
import { getPatientsMedicine } from "../../api/patientMedicine";
import { user } from "../../common/common";
import { getRequestById } from "../../api/requestApi";
import { getUserById } from "../../api/userApi";
import { getAppointmentByUserId } from "../../api/appointmentApi";
// import { toast } from "react-toastify";

const BookedAppointmentsPatient = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMedicines = async () => {
    try {
      const res = await getPatientsMedicine();
      let item = [];
      for (let i of res.data) {
        if (i.patient === user.id) {
          console.log(i.medicine, "medicine");
          const request = await getRequestById(i.medicine);
          const medicine = await getMedicationById(request.data.medicine);
          i.medicine = medicine.data;
          console.log(i, "users");
          const merchant = await getUserById(i.users);
          i.users = merchant.data;
          item.push(i);
        }
      }
      setMedicines(item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const keys = ["users.name", "medicine.name", "quantity", "price"];
  const handleSearch = (data) => {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) => {
        return keys.some((key) =>
          key === "users.name"
            ? item.users.name.toLowerCase().includes(search)
            : key === "medicine.name"
            ? item.medicine.name.toLowerCase().includes(search)
            : item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  };
  const [appointments, setAppointments] = useState([]);
const getAppointments=async()=>{
  try {
   const res=  await getAppointmentByUserId(user.id);
   setAppointments(res.data);
  } catch (error) {
    
  }
};
useEffect(()=>{
getAppointments();
},[])
  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        </Box> */}
        <Card style={{ padding: "1rem", marginTop: "1rem" }}>
          <Typography variant="h4" align="center">
            My Appointments
          </Typography>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell> Time</TableCell>
                  <TableCell> Doctor</TableCell>
                  <TableCell> Status</TableCell>
                  <TableCell>Fee</TableCell>
                  {/* <TableCell> Status</TableCell> */}
                  {/* <TableCell>Action</TableCell> */}
                </TableHead>
                {appointments ? 
                 appointments.map((item, index) => {
                    return (
                      <TableBody key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{moment(item.date).format("DD-MMM-YYYY")}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>{item.doctors[0]?.name}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                        {item.doctors[0]?.fee}₹
                        </TableCell>
                        {/* <TableCell>{item.status}</TableCell> */}

                        {/* <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleClickOpen(item._id)}
                          >
                            Book
                          </Button>
                        </TableCell> */}
                      </TableBody>
                    );
                  })
                 : (
                  <TableBody>
                    <TableCell colSpan={7}>
                      <Typography align="center" variant="h5">
                        No Appointments Found
                      </Typography>
                    </TableCell>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default BookedAppointmentsPatient;
