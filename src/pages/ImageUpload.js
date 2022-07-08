import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import FormData from "form-data";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ImageUpload() {
  const [imageFile, setImageFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageData = new FormData();
    imageData.append("image", imageFile);

    //POST form values
    const { data } = await axios.post(
      `https://blogmm12.herokuapp.com/api/v1/uploadImage`,
      imageData
    );

    if (!data.success) {
      toast.error(data.message);
      setImageFile("");
    }

    toast.success(data.message);
    setImageFile("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        mb: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "30%", mb: 5 }}
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
      >
        <Box>
          <TextField
            sx={{ width: "100%", my: 2, minWidth: "300px" }}
            label="UserPhoto"
            variant="standard"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Box>
        <Button
          onClick={handleSubmit}
          value="Send"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
