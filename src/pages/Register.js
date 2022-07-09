import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uploadBytesResumable,ref,getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [photoUrl,setPhotoUrl] = useState('')
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
  

  const onRegister = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@") || !password) {
      toast.error("Invalid details");
      return;
    }

    //POST form values
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/v1/auth/register`,
      {
        name,email,password,rePassword,photoUrl
      }
    );

    //Await for data for any desirable next steps

    if (data.success === true) {
      navigate("/login");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
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
          Blog Register{" "}
        </h2>
        <Box
          component="form"
          // onSubmit={onRegister}
          sx={{ width: "100%", mb: 5 }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{my: 2,}}>
            {progressShow && !isNaN(progress) && <h5 style={{textAlign:"right"}}>{progress}% uploaded</h5>}
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="UserPhoto"
              variant="standard"
              type="file"
              onChange={fileChange}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Name"
              variant="standard"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Re enter passowrd"
              variant="standard"
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </Box>

          <Button
            onClick={onRegister}
            value="Send"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={progress < 99 ? true : false}
          >
            Register
          </Button>
        </Box>

        <Box sx={{}}>
          <h4 style={{ textAlign: "center" }}>
            {" "}
            Already have an account ?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h4>
        </Box>
      </Box>
    </Box>
  );
}
