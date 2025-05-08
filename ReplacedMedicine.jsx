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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getMedicationById, updateMedication } from "../../api/medicationsApi";
import { user } from "../../common/common";
import {
  getRequestById,
  getRequests,
  updateRequest,
} from "../../api/requestApi";
import { toast } from "react-toastify";
import moment from "moment";
import { getUserById } from "../../api/userApi";

const ReplacedMedicine = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [requestId, setRequestId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const getAllMedications = async () => {
    try {
      const res = await getRequests();
      let item = [];
      for (let i of res.data) {
        if (i.supplierUsers === user.result) {
          const merchant = await getUserById(i.merchantUsers);
          i.merchantUsers = merchant.data;
          const medicine = await getMedicationById(i.medicine);
          i.medicine = medicine.data;
          console.log(res.data, "res.data");

          if (
            moment(i.medicine.expiryDate).utc().format("YYYY/MM/DD") <
            moment(new Date()).utc().format("YYYY/MM/DD")
          ) {
            if (i.replace === true) {
              item.push(i);
            }
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

  //   useEffect(() => {
  //     console.log(data);
  //     console.log(data.length);
  //     if (data && data.length === 0) {
  //       // toast.error("No Expired Medicines");
  //     } else {
  //       toast.success("Expired Medicines");
  //     }
  //   }, [data]);

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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = async (id) => {
    setRequestId(id);
    setOpen(true);
  };

  const handleReplaced = async (e) => {
    e.preventDefault();
    const res = await getRequestById(requestId);
    const medicine = await getMedicationById(res.data.medicine);

    await updateMedication(medicine.data._id, {
      ...medicine.data,
      expiryDate: expiryDate,
    });
    await updateRequest(requestId, {
      ...res.data,
      replaceStatus: "Replaced",
      replaceDate: new Date(),
    });
    toast.success("Medicine Replaced");
    getAllMedications();
    setOpen(false);
  };

  console.log(data, "data");
  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Expired Date</DialogTitle>
          <DialogContent>
            <form onSubmit={handleReplaced}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Expired Date"
                type="date"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
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
            Expired Medicines
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
                  <TableCell>Replacement Status</TableCell>
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
                        <TableCell>{item.replaceStatus}</TableCell>
                        <TableCell>
                          {item.replaceStatus === "Replaced" ? (
                            <Typography variant="h6" color="success">
                              Replaced
                            </Typography>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleClickOpen(item._id)}
                            >
                              Replace
                            </Button>
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

export default ReplacedMedicine;
