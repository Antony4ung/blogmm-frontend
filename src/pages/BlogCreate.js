import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import formData from "form-data";
import cookie from "cookiejs";
import SelectForm from "../components/SelectForm";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState("");
  const [category, setCategory] = useState("sport");
  const [content, setContent] = useState("");

  const [user, setUser] = useState({});

  const theme = useTheme();

  useEffect(() => {
    const userFound = cookie.get("user");
    setUser(JSON.parse(userFound));
  }, [user]);

  
  const onBlogCreate = async (e) => {
    e.preventDefault();

    const reqData = new formData();
    reqData.append("title", title);
    reqData.append("description", description);
    reqData.append("content", content);
    reqData.append("category", category);
    reqData.append("author", user.id);
    reqData.append("image", photoFile);

    //POST form values
    axios
      .post(
        `https://blogmm12.herokuapp.com/api/v1/blogs/create`,
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
          Blog Create{" "}
        </h2>
        <Box
          component="form"
          onSubmit={onBlogCreate}
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

          <Button onClick={onBlogCreate} variant="contained" sx={{ mt: 2 }}>
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
