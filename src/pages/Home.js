import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import SelectForm from "../components/SelectForm";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [data, setData] = useState(null);

  const getBlogs = async () => {
    const { data } = await axios.get(`https://blogmm12.herokuapp.com/api/v1/blogs`);
    setData(data);
    return;
  };

  const getBlogsByCategory = async (category) => {
    const { data } = await axios.get(
      `https://blogmm12.herokuapp.com/api/v1/blogs/category/${category}`
    );
    setData(data);
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
        )}
      </Container>
    </>
  );
}
