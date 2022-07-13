import { Box, Button, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import cookie from "cookiejs";

export default function UserProfile() {
  const { userId } = useParams();

  const [data, setData] = useState(null);
  const [person, setPerson] = useState(null);
  const [myProfileData, setMyProfileData] = useState(null);

  const navigate = useNavigate();

  const getUserData = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/user/${id}`);
    setPerson(data.user);
    // console.log(data)
    return;
  };

  const user = cookie.get("user");
  

  useEffect(()=>{
    if(myProfileData?.id === userId){
      navigate('/profile')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[myProfileData,])

  useEffect(() => {
    setMyProfileData(JSON.parse(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getBlogByAuthorId = async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/blogs/author/${id}`
    );
    setData(data);
    return;
  };

  useEffect(() => {
    getUserData(userId);

    getBlogByAuthorId(userId);
  }, [userId]);

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
                style={{ width: 150, height: "auto"}}
                src={person?.photoUrl}
                alt={person?.name}
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
              <h4> {person?.name}</h4>
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
              <h4> {person?._id}</h4>
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
              <h4> {person?.email}</h4>
            </Box>
          </Box>
        )}
      </Box>
      <Container maxWidth="xl" sx={{ py: 5, width: "100%" }}>
      {person?.name && <h2 style={{margin:"20px 0"}}>Blogs of {person?.name}</h2>}
        {data?.blogs && (
          <Grid sx={{ px: { xs: 2, md: 0 } }} container spacing={3}>
            {data?.blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={blog._id}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box
          sx={{
            mt: 5,
            justifyContent: "center",

            width: "100%",
          }}
        >
          <Button variant="contained" onClick={() => navigate("/")}>
            Back to home
          </Button>
        </Box>
      </Container>
    </>
  );
}
