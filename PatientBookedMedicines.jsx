import { useState, useEffect } from "react";
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
  Button,
} from "@mui/material";
import config from "../../api/config";
import moment from "moment";
import { getMedicationById } from "../../api/medicationsApi";
import { getPatientsMedicine } from "../../api/patientMedicine";
import { user } from "../../common/common";
import { getRequestById } from "../../api/requestApi";
import { getUserById } from "../../api/userApi";

const PatientBookedMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [actionStatus, setActionStatus] = useState({}); // ✅ Local state for accepted/rejected

  const fetchMedicines = async () => {
    try {
      const res = await getPatientsMedicine();
      let item = [];
      for (let i of res.data) {
        if (i.patient === user.id) {
          const request = await getRequestById(i.medicine);
          const medicine = await getMedicationById(request.data.medicine);
          i.medicine = medicine.data;
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

  const sendRefillRequest = async (medicineId) => {
    try {
      await config.put(`/patientMedicine/deliver/${medicineId}`);
      setActionStatus((prev) => ({ ...prev, [medicineId]: "accepted" }));
      fetchMedicines();
    } catch (error) {
      console.error("Refill request failed", error);
    }
  };

  const handleReject = (medicineId) => {
    setActionStatus((prev) => ({ ...prev, [medicineId]: "rejected" }));
  };

  const handleSearch = (data) => {
    if (!search.trim()) return data;
    const s = search.toLowerCase();
    return data.filter(
      (item) =>
        item.users.name.toLowerCase().includes(s) ||
        item.medicine.name.toLowerCase().includes(s) ||
        item.quantity.toString().includes(s) ||
        item.price.toString().includes(s)
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
        />
      </Box>

      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h4" align="center">
          My Medicines
        </Typography>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Medicine Name</TableCell>
                <TableCell>Merchant Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Refill</TableCell>
              </TableHead>
              {medicines.length > 0 ? (
                handleSearch(medicines).map((item, index) => {
                  const refillStatus = item.medicine?.refill?.requested;
                  const localAction = actionStatus[item.medicine._id];

                  return (
                    <TableBody key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.medicine.name}</TableCell>
                      <TableCell>{item.users.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        {moment(item.medicine.expiryDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell>
                        {refillStatus || localAction === "accepted" ? (
                          <Button variant="outlined" disabled>
                            Accepted
                          </Button>
                        ) : localAction === "rejected" ? (
                          <Button variant="outlined" color="error" disabled>
                            Rejected
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() =>
                                sendRefillRequest(item.medicine._id)
                              }
                              sx={{ mr: 1 }}
                            >
                              Yes
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleReject(item.medicine._id)}
                            >
                              No
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableBody>
                  );
                })
              ) : (
                <TableBody>
                  <TableCell colSpan={7}>
                    <Typography align="center" variant="h5">
                      No Medicines Found
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

export default PatientBookedMedicines;
