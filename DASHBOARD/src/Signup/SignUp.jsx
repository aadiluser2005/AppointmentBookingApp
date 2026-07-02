import React, { useEffect } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDashBoardContext } from "../Context/DashBoardContext.jsx";
import SnackBar from '../SnackBar/SnackBar.jsx'


export default function SignUp() {

  const [formData, setFormData] = useState({
    pass: "12345678",
    email: "admin@gmail.com", 
  });
   
  const {setSnackBarType, setSnackBarMessage,setSnackBarOpen,snackBarOpen, snackBarMessage,snackBarType}=useDashBoardContext();

   const [showPassword, setShowPassword] = useState(false);

     const handleShow = () => {
    setShowPassword(!showPassword);
  };
 
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  

    const URL =`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/admin/login`;
    // console.log(URL);
    axios.post(URL,{
         pass: formData.pass,
         email: formData.email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSnackBarOpen(true);
       setSnackBarMessage(res.data.message);
       setSnackBarType("success");
       navigate("/");
      // console.log(res);
      })
      .catch((e) => {
           setSnackBarOpen(true);
       setSnackBarMessage(e.response.data.message);
       setSnackBarType("error");
       // console.log(e);
      });
  };

 

   const handleClose=()=>{
        setSnackBarOpen(false);
    }



  return (
    <Box
      component="form"
      className="signUpBox"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        minHeight: 300,
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
      noValidate={false}
    >
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
         <h4>Admin Login</h4>
      </Stack>

      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "2rem", // 👈 Rounded corners
          },
        }}
      />
     

      

      <TextField
        label="Password"
        type={showPassword === true ? "text" : "password"}
        name="pass"
        value={formData.pass}
        onChange={handleChange}
        fullWidth
        required
       
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "2rem", // 👈 Rounded corners
          },
        }}
      />

      <p>* <u>Demo credentials are provided above.</u></p>
<p>* <u>For the best experience, please use a desktop or enable "Desktop site" in your mobile browser.</u></p>

      {showPassword === false ? (
        <span style={{ display: "flex" }}>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios/50/show-password.png"
            alt="show-password"
            onClick={handleShow}
          />
          <p className="ms-2"> Show password</p>
        </span>
      ) : (
        <span style={{ display: "flex" }}>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/50/hide.png"
            alt="hide"
            onClick={handleShow}
          />
          <p className="ms-2">Hide password</p>
        </span>
      )}

      <Button
        variant="contained"
        type="submit"
        sx={{
          borderRadius: "2rem",
          width: "35%",
          margin: "0 auto",
          marginTop:"3rem",
          height: "fit-Content",
        }}
      >
        Submit
      </Button>

     
 
       <SnackBar open={snackBarOpen} message={snackBarMessage}  onClose={handleClose} snackbarType={snackBarType} ></SnackBar>
    </Box>
    
  );
}

