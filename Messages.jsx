import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addMessage, getMessages } from "../../api/messageApi";
import { toast } from "react-toastify";
import { getUserById } from "../../api/userApi";

const token = JSON.parse(localStorage.getItem("token"));

const Messages = () => {
  const { id } = useParams();
  console.log("id", id);

  const [allMessages, setAllMessages] = useState([]);

  const [message, setMessage] = useState({
    sender: token.id,
    receiver: id,
    message: "",
  });

  const [error, setError] = useState({
    message: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMessage({ ...message, [name]: value });
  };

  const getAllMessages = async () => {
    try {
      const res = await getMessages();
      for (let i of res.data) {
        const sender = await getUserById(i.sender);
        i.sender = sender.data;
        const receiver = await getUserById(i.receiver);
        i.receiver = receiver.data;
      }

      setAllMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!message.message) {
      newErrors.message = "Message is required";
    }
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        message.sender = token.result;
        message.receiver = id;
        await addMessage(message);
        toast.success("Message Sent Successfully");
        setMessage({
          sender: token.id,
          receiver: id,
          message: "",
        });
        getAllMessages();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" align="center">
            Messages
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                {/* <TextareaAutosize
                    fullWidth
                    label="Address"
                    variant="outlined"
                    margin="normal"
                    name="address"
                    value={merchants.address}
                    onChange={handleChange}
                    helperText={
                      error.address ? (
                        <span style={{ color: "red" }}>{error.address}</span>
                      ) : (
                        ""
                      )
                    }
                  /> */}
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Enter message"
                  name="message"
                  value={message.message}
                  onChange={handleChange}
                  style={{ width: "100%", fontSize: "1.5rem" }}
                />
                {error.message ? (
                  <span style={{ color: "red" }}>{error.message}</span>
                ) : (
                  ""
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        {allMessages &&
          allMessages.length > 0 &&
          allMessages.map((item, index) => {
            return (
              <Card style={{ padding: "1rem", marginTop: "1rem" }}>
                <Typography>{item.sender.name}</Typography>
                <CardContent>
                  <Typography>{item.message}</Typography>
                </CardContent>
              </Card>
            );
          })}
      </Container>
    </>
  );
};

export default Messages;
