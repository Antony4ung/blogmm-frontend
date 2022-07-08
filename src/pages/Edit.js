import React, { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  TextareaAutosize,
  TextField,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import formData from "form-data";
import SelectForm from "../components/SelectForm";

export default function BlogEdit() {

    const {state} = useLocation()

  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [photoFile, setPhotoFile] = useState("");
  const [category, setCategory] = useState(state.category);
  const [content, setContent] = useState(state.content);
    const blogId = state._id;


  const theme = useTheme();

  
  const blogEdit = async (e) => {
    e.preventDefault();

    const reqData = new formData();
    reqData.append("title", title);
    reqData.append("description", description);
    reqData.append("content", content);
    reqData.append("category", category);
    reqData.append("author", state.author.id);
    reqData.append("image", photoFile);
    reqData.append('blogId',blogId)

    //POST form values
    axios
      .post(
        `https://blogmm12.herokuapp.com/api/v1/blogs/edit/${blogId}`,
        reqData
        // "Content-Type:multipart/form-data"
      )
      .then((res) => {
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "88vh",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "350px" }}>
        <Box
          sx={{
            width: "100%",
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img alt="" src={logo} width={70} height={70} />
        </Box>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Blog Edit{" "}
        </h2>
        <Box
          component="form"
          onSubmit={blogEdit}
          sx={{ width: "100%", mb: 5 }}
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
        >
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Title"
              variant="standard"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="UserPhoto"
              variant="standard"
              type="file"
              name="image"
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Desctiption"
              variant="standard"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Box sx={{ my: 2 }}>
            {/* <InputLabel id="demo-simple-textarea-label">Content</InputLabel> */}
            <TextareaAutosize
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minRows={5}
              placeholder="Content"
              style={{
                width: "100%",
                minWidth: "300px",
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
            />
          </Box>

          <Box sx={{ my: 2 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <SelectForm category={category} setCategory={setCategory} />
          </Box>

          <Button onClick={blogEdit} variant="contained" sx={{ mt: 2 }}>
            blogEdit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
