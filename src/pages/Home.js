import { Box, CircularProgress, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import SelectForm from "../components/SelectForm";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [data, setData] = useState(null);
  const [loading,setLoading] = useState(true)

  const getBlogs = async () => {
    setLoading(true)
    const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/blogs`);
    setData(data);
    setLoading(false)
    return;
  };

  const getBlogsByCategory = async (category) => {
    setLoading(true)
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/blogs/category/${category}`
    );
    setData(data);
    setLoading(false)
    return;
  };
  

  useEffect(() => {
    if (category === "all") {
      getBlogs();
    } else {
      getBlogsByCategory(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "end", mt: 3 }}
      >
        <Box sx={{ width: "200px" }}>
          <SelectForm all category={category} setCategory={setCategory} />
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {data?.blog && (
          <Grid sx={{ px: { xs: 2, md: 0 } }} container spacing={3}>
            {data?.blog.map((blog) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={blog._id}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        ) }
        {
          loading && <Box sx={{width:"100%",height:"88vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CircularProgress/>
          </Box>
        }
      </Container>
    </>
  );
}
