import {
  Box,
  Button,
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
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import moment from "moment";
import {
  getRequestById,
  getRequests,
  updateRequest,
} from "../../api/requestApi";
import { getMedicationById } from "../../api/medicationsApi";
import { getUserById } from "../../api/userApi";

const AllExpiredMedicines = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getAllMedications = async () => {
    try {
      const res = await getRequests();
      let item = [];
      for (let i of res.data) {
        if (i.replaceStatus === "Pending") {
          const supplier = await getUserById(i.supplierUsers);
          i.supplierUsers = supplier.data;
          const medicine = await getMedicationById(i.medicine);
          i.medicine = medicine.data;
          const date1 = new Date(i.medicine.expiryDate).getTime();
          const date2 = new Date().getTime();
          const days = date1 - date2;

          if (
            moment(i.medicine.expiryDate).utc().format("YYYY/MM/DD") <
              moment(new Date()).utc().format("YYYY/MM/DD") ||
            moment(i.medicine.expiryDate).utc().format("YYYY/MM/DD") ===
              moment(new Date()).utc().format("YYYY/MM/DD") ||
            Math.floor(days / (1000 * 60 * 60 * 24)) + 1 < 90
          ) {
            item.push(i);
          }
          //   else {
          //     setIsData("No Expired Medicines");
          //   }
        }
      }
      setData(item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMedications();
  }, []);

  useEffect(() => {
    if (data && data.length === 0) {
      // toast.error("No Expired Medicines");
    } else {
      toast.success("Expired Medicines");
    }
  }, [data]);

  const keys = ["supplierUsers.name", "medicine.name", "quantity", "price"];
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

  const handleClickOpen = async (id) => {
    const res = await getRequestById(id);

    await updateRequest(id, {
      ...res.data,
      replace: true,
      replaceDate: new Date(),
    });
    toast.success("Requested to Change Medicine");
    getAllMedications();
  };

  return (
    <>
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
            Expired Medicines
          </Typography>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell> Supplier Name</TableCell>
                  <TableCell> Quantity</TableCell>
                  <TableCell> Price</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Days Left</TableCell>
                  <TableCell>Replacement Status</TableCell>
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
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          {moment(item.medicine.expiryDate).format(
                            "MM-DD-YYYY"
                          )}
                        </TableCell>
                        <TableCell style={{ color: "red", fontSize: "24px" }}>
                          {Math.floor(
                            (new Date(item.medicine.expiryDate).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) + 1}
                        </TableCell>
                        <TableCell>{item.replaceStatus}</TableCell>
                        <TableCell>
                          {item.replace ? (
                            item.replaceStatus === "Replaced" ? (
                              <Typography variant="h6" color="success">
                                Replaced
                              </Typography>
                            ) : (
                              <Typography variant="h6" color="primary">
                                Requested to Change
                              </Typography>
                            )
                          ) : (
                            moment(item.medicine.expiryDate).format(
                              "MM-DD-YYYY"
                            ) >
                              moment(new Date()).utc().format("YYYY/MM/DD") && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleClickOpen(item._id)}
                              >
                                Replace
                              </Button>
                            )
                          )}
                        </TableCell>
                      </TableBody>
                    );
                  })}
                {data.length === 0 && (
                  <TableBody>
                    <TableCell colSpan={7}>
                      <Typography align="center" variant="h5">
                        No Expired Medicines
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

export default AllExpiredMedicines;
