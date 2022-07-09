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
import cookie from "cookiejs";
import SelectForm from "../components/SelectForm";
import { storage } from "../firebase";
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [category, setCategory] = useState("sport");
  const [content, setContent] = useState("");

  const [user, setUser] = useState({});

  const theme = useTheme();

  useEffect(() => {
    const userFound = cookie.get("user");
    setUser(JSON.parse(userFound));
  }, [user]);


  const [photoUrl,setPhotoUrl] = useState(null)
  const [progress,setProgress] = useState(0)
  const [progressShow,setProgressShow] = useState(false)


  const fileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }


  useEffect(()=>{
    imageUrlGetting(selectedFile)

  },[selectedFile])


  const imageUrlGetting = (selectedFile) => {
    setProgressShow(true);

    const fileName = new Date().getTime() + selectedFile?.name;

    const storageRef = ref(
      storage, `/images/${fileName}`
    );

    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
          setProgressShow(false)
        });
      }
    );


  }


  
  const onBlogCreate = async (e) => {
    e.preventDefault();

    
    axios
      .post(
        `${process.env.REACT_APP_URL}/api/v1/blogs/create`,
        {
          title,description,content,category,author:user.id,photoUrl
        }
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
          <Box sx={{my: 2,}}>
            {progressShow && !isNaN(progress) &&  <h5 style={{textAlign:"right"}}>{progress}% uploaded</h5>}
            <TextField
              sx={{ width: "100%",  minWidth: "300px" }}
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

          <Button disabled={progress < 99 ? true : false} onClick={onBlogCreate} variant="contained" sx={{ mt: 2 }}>
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
