import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
// import BarChart from "../../components/BarChart";
import { useState } from "react";
import { getRequests } from "../../api/requestApi";
import { useEffect } from "react";
import moment from "moment";
import { getMedicationById } from "../../api/medicationsApi";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../api/patientsApi";
import { getUserById, getUsers } from "../../api/userApi";

const Dashboard = () => {
  const [medicineData, setMedicineData] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [expired, setExpired] = useState([]);
  const [replaced, setReplaced] = useState([]);

  const navigate = useNavigate();
  // const [medicine, setMedicine] = useState("");

  const getAllMedications = async () => {
    try {
      const res = await getRequests();
      for (let i of res.data) {
        const supplier = await getUserById(i.supplierUsers);
        i.supplierUsers = supplier.data;
        const medicine = await getMedicationById(i.medicine);
        i.medicine = medicine.data;
      }
      setMedicineData(res.data);

      let item = [];
      for (let i of res.data) {
        if (
          moment(i.medicine.expiryDate).utc().format("YYYY/MM/DD") <
            moment(new Date()).utc().format("YYYY/MM/DD") &&
          // i.replace === false &&
          i.replaceStatus === "Pending"
        ) {
          item.push(i);
        }
      }
      setExpired(item);

      let item2 = [];
      for (let i of res.data) {
        if (i.replaceStatus === "Replaced") {
          item2.push(i);
        }
      }
      setReplaced(item2);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMerchants = async () => {
    try {
      const res = await getUsers();
      let item1 = [];
      let item2 = [];
      for (let i of res.data) {
        if (i.roles === "Merchants") {
          item1.push(i);
        } else {
          item2.push(i);
        }
      }

      setMerchants(item1);
      setSuppliers(item2);
    } catch (error) {
      console.log(error);
    }
  };

  // const getAllSuppliers = async () => {
  //   try {
  //     const res = await getUsers();
  //     let item = [];
  //     for (let i of res.data) {
  //       if (i.roles === "Suppliers") {
  //         item.push(i);
  //       }
  //     }
  //     setSuppliers(item);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllPatients = async () => {
    try {
      const res = await getPatients();
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMedications();
    getAllMerchants();
    // getAllSuppliers();
    getAllPatients();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 3,mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color={"white"}>
            Dashboard
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: "2rem" }}
        >
          <Card>
            <CardActionArea onClick={() => navigate("/admin/merchants")}>
              <CardContent style={{ padding: "2rem" }}>
                <Typography variant="h4" align="center">
                  Merchants
                </Typography>
                <Typography variant="h4" align="center">
                  {merchants?.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea onClick={() => navigate("/admin/suppliers")}>
              <CardContent style={{ padding: "2rem" }}>
                <Typography variant="h4" align="center">
                  Suppliers
                </Typography>
                <Typography variant="h4" align="center">
                  {suppliers?.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea onClick={() => navigate("/admin/patients")}>
              <CardContent style={{ padding: "2rem" }}>
                <Typography variant="h4" align="center">
                  Patients
                </Typography>
                <Typography variant="h4" align="center">
                  {patients?.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: "2rem" }}
        >
          <Card>
            {/* <CardActionArea onClick={() => navigate("/admin/merchants")}> */}
            <CardContent style={{ padding: "2rem" }}>
              <Typography variant="h4" align="center">
                Expired Products
              </Typography>
              <Typography variant="h4" align="center">
                {expired?.length}
              </Typography>
            </CardContent>
            {/* </CardActionArea> */}
          </Card>
          <Card>
            <CardActionArea onClick={() => navigate("/admin/medicines")}>
              <CardContent style={{ padding: "2rem" }}>
                <Typography variant="h4" align="center">
                  Medicines
                </Typography>
                <Typography variant="h4" align="center">
                  {medicineData?.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            {/* <CardActionArea onClick={() => navigate("/admin/merchants")}> */}
            <CardContent style={{ padding: "2rem" }}>
              <Typography variant="h4" align="center">
                Replaced Products
              </Typography>
              <Typography variant="h4" align="center">
                {replaced?.length}
              </Typography>
            </CardContent>
            {/* </CardActionArea> */}
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
