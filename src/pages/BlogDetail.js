/* eslint-disable no-unused-vars */
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogDetail() {
  const [detailData, setDetailData] = useState({});
  const [loading,setLoading] = useState(true)

  let { blogId } = useParams();

  const navigate = useNavigate();

  const getBlodDetails = async () => {
    setLoading(true)
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/blogs/blogId/${blogId}`
    );
    setDetailData(data.blog);
    setLoading(false)
  };

  useEffect(() => {
    getBlodDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        minHeight: "88vh",
        my: { xs: 5, sm: 5 },
      }}
    >
      {detailData.author && (
        <Box
          sx={{
            my: 2,

            width: "60%",
            minWidth: "350px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: "250px", height: "auto", margin: "30px 0" }}
              src={detailData?.photoUrl}
              alt=""
            />
          </Box>

          <Box
            sx={{
              my: 2,

              width: "100%",
            }}
          >
            <h4 style={{ fontSize: 15, fontStyle: "italic" }}>Blog Title</h4>
            <p style={{ fontSize: "larger" }}> {detailData?.title}</p>
          </Box>
          <Box
            sx={{
              my: 2,

              width: "100%",
            }}
          >
            <h4 style={{ fontSize: 15, fontStyle: "italic" }}>
              Blog Description
            </h4>
            <p style={{ fontSize: "larger" }}> {detailData?.description}</p>
          </Box>
          <Box
            sx={{
              my: 2,

              width: "100%",
            }}
          >
            <h4 style={{ fontSize: 15, fontStyle: "italic" }}>Blog Content</h4>
            <p style={{ fontSize: "larger" }}> {detailData?.content}</p>
          </Box>
          <Box
            sx={{
              my: 2,

              width: "100%",
            }}
          >
            <h4 style={{ fontSize: 15, fontStyle: "italic" }}>Blog Category</h4>
            <p style={{ fontSize: "larger" }}> {detailData?.category}</p>
          </Box>
          <Box
            sx={{
              my: 2,

              width: "100%",
            }}
          >
            <h4 style={{ fontSize: 15, fontStyle: "italic" }}>Author</h4>
            <p
              onClick={() => navigate(`/user/${detailData.author._id}`)}
              style={{ fontSize: "larger",cursor:"pointer" }}
            >
              {" "}
              {detailData?.author?.name}
            </p>
          </Box>
          <Box
            sx={{
              my: 2,

              width: "100%",
            }}
          >
            <h4 style={{ fontSize: 15, fontStyle: "italic" }}>UpdatedAt</h4>
            <p style={{ fontSize: "larger" }}>
              {" "}
              {moment(detailData?.createdAt).format("llll")}
            </p>
          </Box>
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
        </Box>
      )}
      {
          loading && <Box sx={{width:"100%",height:"88vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CircularProgress/>
          </Box>
        }
    </Box>
  );
}
