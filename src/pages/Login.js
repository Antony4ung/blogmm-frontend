import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import cookie from "cookiejs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@") || !password) {
      toast.error("Invalid details");
      return;
    }
    //POST form values
    const res = await fetch(`https://blogmm12.herokuapp.com/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();

    if (data.success === true) {
      cookie.set("token", data.token, 2);
      cookie.set("user", JSON.stringify(data.user), 2);

      navigate("/");
      toast.success(data.message);
    } else {
      toast.error(data.message);
      setEmail("");
      setPassword("");
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
          Blog SignUp{" "}
        </h2>
        <Box
          component="form"
          onSubmit={onSignIn}
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

          <Button
            onClick={onSignIn}
            value="Send"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>

        <Box sx={{}}>
          <h4 style={{ textAlign: "center" }}>
            {" "}
            Don't have an account ?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              register
            </span>
          </h4>
        </Box>
      </Box>
    </Box>
  );
}
