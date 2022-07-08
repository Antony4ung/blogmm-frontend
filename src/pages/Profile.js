import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "cookiejs";
import axios from "axios";
import BlogCard from "../components/BlogCard";
export default function Profile() {
  const [person, setPerson] = useState(null);
  const [data, setData] = useState(null);
  const [openModal,setOpenModal] = useState(false)

 

  const navigate = useNavigate();

  const user = cookie.get("user");

  const getBlogByAuthorId = async () => {
    const { data } = await axios.get(
      `https://blogmm12.herokuapp.com/api/v1/blogs/author/${person?.id}`
    );
    setData(data);
  };

  useEffect(() => {
    setPerson(JSON.parse(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getBlogByAuthorId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

  const handleLogout = () => {
    cookie.remove("user");
    cookie.remove("token");
    navigate("/login");
  };
  

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
      
        {person && (
          <Box sx={{ minWidth: "350px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mb: 4,
              }}
            >
              <img
                style={{ width: 150, height: "auto", borderRadius: "50%" }}
                crossOrigin="true"
                src={person.photoUrl}
                alt={person.name}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                my: 1,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <p>person Name</p>
              <h4> {person.name}</h4>
            </Box>
            <Box
              sx={{
                display: "flex",
                my: 1,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <p>person ID</p>
              <h4> {person.id}</h4>
            </Box>
            <Box
              sx={{
                display: "flex",
                my: 1,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <p>person Email</p>
              <h4> {person.email}</h4>
            </Box>

            <Button sx={{ mt: 3 }} onClick={handleLogout}>
              LogOut
            </Button>
          </Box>
        )}
      </Box>
      <Container
        maxWidth="xl"
        sx={{ py: 3, width: "100%" }}
      >
      <h2 style={{margin:"20px 0"}}>Blogs of {person?.name}</h2>
        {data?.blogs && (
          <Grid sx={{ px: { xs: 2, md: 0 } }} container spacing={3}>
            {data?.blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={blog._id}>
                <BlogCard isEditable blog={blog} setOpenModal={setOpenModal} openModal={openModal}  />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
