import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Menu,
  MenuItem,
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
import { getUserById } from "../../api/userApi";

const RequestForMedicine = () => {
  const [data, setData] = useState([]);

  const [medicineId, setMedicineId] = useState("");

  const [search, setSearch] = useState("");

  const getAllMedications = async () => {
    try {
      const res = await getRequests();
      let item = [];
      for (let i of res.data) {
        if (i.supplierUsers === user.result) {
          item.push(i);
        }
      }
      for (let j of item) {
        const merchant = await getUserById(j.merchantUsers);
        j.merchantUsers = merchant.data;
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

  const keys = ["merchantUsers.name", "medicine.name", "quantity", "price"];
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setMedicineId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBook = async (e, status) => {
    e.preventDefault();
    try {
      console.log(medicineId, "kk");
      const res = await getRequestById(medicineId);
      await updateRequest(medicineId, { ...res.data, status: status });
      toast.success("Request Updated Successfully");
      setAnchorEl(null);
      getAllMedications();
    } catch (error) {
      console.log(error);
    }
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
            All Bookings
          </Typography>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell> Merchant Name</TableCell>
                  <TableCell> Quantity</TableCell>
                  <TableCell> Price</TableCell>
                  <TableCell> Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableHead>
                {handleSearch(data) &&
                  handleSearch(data).map((item, index) => {
                    return (
                      <TableBody key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.medicine.name}</TableCell>
                        <TableCell>{item.merchantUsers.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          {item.status === "Pending" ? (
                            <Typography sx={{ color: "#00e7ff" }}>
                              {item.status}
                            </Typography>
                          ) : item.status === "Accepted" ? (
                            <Typography sx={{ color: "green" }}>
                              {item.status}
                            </Typography>
                          ) : (
                            <Typography sx={{ color: "red" }}>
                              {item.status}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.status === "Pending" ? (
                            <>
                              <Button
                                id="demo-positioned-button"
                                aria-controls={
                                  open ? "demo-positioned-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => handleClick(e, item._id)}
                              >
                                STATUS
                              </Button>
                              <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                <MenuItem
                                  onClick={(e) => handleBook(e, "Pending")}
                                >
                                  Pending
                                </MenuItem>
                                <MenuItem
                                  onClick={(e) => handleBook(e, "Accepted")}
                                >
                                  Accepted
                                </MenuItem>
                                <MenuItem
                                  onClick={(e) => handleBook(e, "Rejected")}
                                >
                                  Rejected
                                </MenuItem>
                              </Menu>
                            </>
                          ) : (
                            <Typography sx={{ color: "#00e7ff" }}>
                              {item.status}
                            </Typography>
                          )}
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

export default RequestForMedicine;
