import {
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getPatientsMedicine } from "../../api/patientMedicine";
import { getRequestById } from "../../api/requestApi";
import { getMedicationById } from "../../api/medicationsApi";

const PurchasedMedicines = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const getAllPatient = async () => {
    try {
      const res = await getPatientsMedicine();
      let item = [];
      for (let i of res.data) {
        if (i.patient === id) {
          const res = await getRequestById(i.medicine);
          console.log(res.data);
          const medicine = await getMedicationById(res.data.medicine);
          i.medicine = medicine.data.name;
          item.push(i);
        }
      }
      setData(item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatient();
  }, []);

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        <Card style={{ padding: "2rem" }}>
          <Typography variant="h4" align="center">
            All Patients
          </Typography>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell> Price</TableCell>
                  <TableCell> Quantity</TableCell>
                </TableHead>
                {data.length > 0 ? (
                  data &&
                  data.map((item, index) => {
                    return (
                      <TableBody key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.medicine}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        {/* <TableCell>{item.status}</TableCell> */}
                      </TableBody>
                    );
                  })
                ) : (
                  <TableBody>
                    <TableCell colSpan={7}>
                      <Typography align="center" variant="h5">
                        No Medicines Purchased
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

export default PurchasedMedicines;
