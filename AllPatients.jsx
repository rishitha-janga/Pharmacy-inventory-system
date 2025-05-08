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
import { deletePatients, getPatients } from "../../api/patientsApi";
import { useNavigate } from "react-router-dom";

const AllPatients = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const getAllPatients = async () => {
    try {
      const res = await getPatients();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePatients(id);
      getAllPatients();
      toast.success("Patients Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const keys = ["name", "email", "address", "phone"];
  const handleSearch = (data) => {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) => {
        return keys.some((key) =>
          item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
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
        <Card style={{ padding: "2rem", marginTop: "1rem" }}>
          <Typography variant="h4" align="center">
            All Patients
          </Typography>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell> Name</TableCell>
                  <TableCell> Email</TableCell>
                  <TableCell> Phone</TableCell>
                  <TableCell> Address</TableCell>
                  {/* <TableCell> Status</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableHead>
                {data.length > 0 ? (
                  handleSearch(data) &&
                  handleSearch(data).map((item, index) => {
                    return (
                      <TableBody key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        {/* <TableCell>{item.status}</TableCell> */}
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: "1rem" }}
                            onClick={() =>
                              navigate(`/admin/patients/purchased/${item._id}`)
                            }
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableBody>
                    );
                  })
                ) : (
                  <TableBody>
                    <TableCell colSpan={7}>
                      <Typography align="center" variant="h5">
                        No Patients To Show
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

export default AllPatients;
