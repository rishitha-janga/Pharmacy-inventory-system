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
// import { deletePatients, getPatients } from "../../api/patientsApi";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../api/doctorApi";
import { baseURL } from "../../api/config";

const AllDoctors = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const getAllPatients = async () => {
    try {
      const res = await getUsers();
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
      await deleteUser(id);
      getAllPatients();
      toast.success("Doctor Deleted Successfully");
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" align="center">
              All Doctors
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/admin/add-doctor")}
            >
              ADD
            </Button>
          </Box>
       
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell> Photo</TableCell>
                  <TableCell> Personal Details</TableCell>
                  <TableCell> Education</TableCell>
                  <TableCell> Designation</TableCell>
                  <TableCell> Fee</TableCell>
                  <TableCell> Specialization</TableCell>
                  <TableCell>Action</TableCell>
                </TableHead>
                {data.length > 0 ? (
                  handleSearch(data) &&
                  handleSearch(data).map((item, index) => {
                    return (
                      <TableBody key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                        <Box
          component="img"
          src={`${baseURL}/doctors/${item.image}`}
          alt="Image Preview"
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
                        </TableCell>
                        <TableCell>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                  <p>{item.address}</p>
                        </TableCell>
                        <TableCell>{item.education}</TableCell>
                        <TableCell>{item.designation}</TableCell>
                        <TableCell>{item.fee}</TableCell>
                        <TableCell>{item.speciality}</TableCell>
                        <TableCell>
                          {/* <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: "1rem" }}
                            onClick={() =>
                              navigate(`/admin/patients/purchased/${item._id}`)
                            }
                          >
                            View
                          </Button> */}
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
                        No Doctors To Show
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

export default AllDoctors;
