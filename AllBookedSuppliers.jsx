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
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../api/userApi";

const AllBookedSuppliers = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const getAllSuppliers = async () => {
    try {
      const res = await getUsers();
      let item = [];
      for (let i of res.data) {
        if (i.roles === "Suppliers") {
          item.push(i);
        }
      }
      setData(item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      getAllSuppliers();
      toast.success("Supplier Deleted Successfully");
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
            All Suppliers
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
                  {/* <TableCell>Chat</TableCell> */}

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
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/messages/${item._id}`)}
                          >
                            Chat
                          </Button>
                        </TableCell>
                        {/* <TableCell>{item.status}</TableCell> */}
                        {/* <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </TableCell> */}
                      </TableBody>
                    );
                  })
                ) : (
                  <TableBody>
                    <TableCell colSpan={7}>
                      <Typography align="center" variant="h5">
                        No Suppliers To Show
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

export default AllBookedSuppliers;
