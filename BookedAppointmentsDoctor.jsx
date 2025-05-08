import { Card, CardContent, Container, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, Typography,MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

import { getAppointmentByDoctorId, updateAppointment } from "../../api/appointmentApi";
import { user } from "../../common/common";
import moment from "moment";

const BookedAppointmentsDoctor = () => {
  const [status, setStatus] = useState("");
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await getAppointmentByDoctorId(user.id);
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
const updateAppointmentStatus = async (id, status) => {
    try {
      const res = await updateAppointment(id, status);
      getAppointments();
    } catch (error) {
      console.error(error);
    }
}

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
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
                <TableCell> Patient</TableCell>
                <TableCell> Status</TableCell>
                <TableCell>Action</TableCell>
              </TableHead>
              {appointments.length > 0 ? (
                appointments.map((item, index) => (
                  <TableBody key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{moment(item.date).format("DD-MMM-YYYY")}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>
            <p>{item.patient[0]?.name}</p>
            <p>{item.patient[0]?.email}</p>
            <p>{item.patient[0]?.phone}</p>
            
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Change Status</InputLabel>
                        <Select onChange={(e) => updateAppointmentStatus(item._id,e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Change Status" >
                          {/* Wrap MenuItem inside Menu , ,  */}
                         
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                            <MenuItem value={"cancelled"}>Cancelled</MenuItem>
              
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableBody>
                ))
              ) : (
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
  );
};

export default BookedAppointmentsDoctor;
