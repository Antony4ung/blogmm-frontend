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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SelectForm from "../components/SelectForm";
import { storage } from "../firebase";
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";

export default function BlogEdit() {

    const {state} = useLocation()

  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [photoFile, setPhotoFile] = useState("");
  const [category, setCategory] = useState(state.category);
  const [content, setContent] = useState(state.content);
  const blogId = state._id;
  const authorId = state.author._id

    const [photoUrl,setPhotoUrl] = useState('')
  const [progress,setProgress] = useState(0)
  const [progressShow,setProgressShow] = useState(false)


  const fileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  }


  useEffect(()=>{
    imageUrlGetting(photoFile)

  },[photoFile])


  const imageUrlGetting = (selectedFile) => {
    setProgressShow(false);

    const fileName = new Date().getTime() + selectedFile?.name;

    const storageRef = ref(
      storage, `/images/${fileName}`
    );

    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgressShow(true);

        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // handleInputState(name, url);
          setPhotoUrl(url)
          setProgressShow()
        });
      }
    );


  }
  


  const theme = useTheme();

  
  const blogEdit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_URL}/api/v1/blogs/edit/${blogId}`,
        {title,description,content,category,author:authorId,photoUrl,blogId}
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
          <Box sx={{my: 2,}}>
            {progressShow && !isNaN(progress) && <h5 style={{textAlign:"right"}}>{progress}% uploaded</h5>}
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="UserPhoto"
              variant="standard"
              type="file"
              name="image"
              onChange={fileChange}
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
