import { Box, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import SelectForm from "../components/SelectForm";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [data, setData] = useState(null);
  const [loading,setLoading] = useState(true)

  const [pageNumber,setPageNumber] = useState('1')
  const [totalPages,setTotalPages] = useState('1')

  const getBlogs = async () => {
    // setPageNumber("1")
    setLoading(true)
    const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/blogs?page=${pageNumber}`);
    setData(data.blog);
    setLoading(false)
    setTotalPages(data.totalPages.toString())
    return;
  };

  const getBlogsByCategory = async (category) => {
    // setPageNumber('1')
    setLoading(true)
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/blogs/category/${category}?page=${pageNumber}`
    );
    setData(data.blog);
    setLoading(false)
    setTotalPages(data.totalPages.toString())
    return;
  };
  

  useEffect(() => {
    if (category === "all") {
      getBlogs();
    } else {
      getBlogsByCategory(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category,pageNumber]);

  return (
    <>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between", mt: 3 ,alignItems:"center"}}
      >
        <Box>
          {Number(totalPages) > 1 && <Pagination
            count={Number(totalPages)}
            onChange={(event, value) => setPageNumber(value)}
          />}
        </Box>
        <Box sx={{ width: {xs:"120px",md:"200px"} }}>
          <SelectForm all category={category} setCategory={setCategory} />
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {data && (
          <Grid sx={{ px: { xs: 2, md: 0 } }} container spacing={3}>
            {data?.map((blog) => (
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
