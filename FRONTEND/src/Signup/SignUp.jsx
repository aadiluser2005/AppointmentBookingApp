import React, { useEffect } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useBooking } from "../Contexts/BookingContext.jsx";
import { useNavigate } from "react-router-dom";
import SnackBar from "../SnackBar/SnackBar.jsx";
import { useGoogleLogin } from "@react-oauth/google";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";

export default function SignUp() {
  const [formState, setFormState] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    email: "",
    OTP: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [OTPBtn,setOTPBtn]=useState(false);

  const [showOTPBox, setshowOTPBox] = useState(false);
  const {
    setOpen,
    setError,
    open,
    error,
    setUserLoggedIn,
    setSnackbarType,
    snackbarType,
    userLoggedIn,
     showLoading,
     setShowLoading
  } = useBooking();
  const navigate = useNavigate();

  const handleFormState = (e) => {
    if (e.target.id === "login") {
      setFormState(1);
    } else {
      setFormState(0);
    }

    if (emailVerified) {
      setFormData((prev) => ({
        ...prev,
        fullname: "",
        username: "",
        password: "",
      }));
    } else if (!emailVerified && showOTPBox === true) {
      return;
    } else {
      setFormData({ fullname: "", password: "", email: "" });
    }
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  // const handleClose=()=>{
  //   setOpen(false);
  // }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    // Trigger native HTML5 validation manually
    if (!form.checkValidity()) {
      form.reportValidity(); // shows the default browser validation message
      return; // stop submission
    }
    //console.log("form submitted",formData);

    const URL =
      formState === 0
        ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/userService/user/register`
        : `${import.meta.env.VITE_BACKEND_URL}/api/v1/userService/user/login`;
    // console.log(URL);
    axios
      .post(
        URL,
        {
          fullname: formData.fullname,
          password: formData.password,
          email: formData.email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setOpen(true);
        setSnackbarType("success");
        //res.data will give an object but res.data.message will give string
        // console.log(res);
        setError(res.data.message);
        if (formState === 0 && res.status === 201) {
          refreshUserInfo();
        }

        if (formState !== 0 && res.status === 200) {
          localStorage.setItem("sessionId", res.data.id);
          // console.log(localStorage.getItem("sessionId"));
          setUserLoggedIn(true);
          navigate("/");
        }
      })
      .catch((e) => {
         console.log(e);
        setSnackbarType("error");
        setOpen(true);
        if (e.response) {
          // backend responded with an error status
          if (e.response.status === 404||e.response.status==400) {
            setError(e.response.data.message);
          } else if (e.response.status === 500) {
            setError("Some internal error occurred");
          } else {
            setError("Something went wrong");
          }

          //console.log("Status:", e.response.status);
          // console.log("Message:", e.response.data.message);
        } else if (e.request) {
          //  request made but no response
          setError("No response from server");
        } else {
          // something else went wrong
          setError("Request error: " + e.message);
        }
      });
  };

  const refreshUserInfo = () => {
    setFormData({
      fullname: "",
      password: "",
      email: "",
      OTP: "",
    });
    setEmailVerified(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("sessionId")) {
      setTimeout(() => {
        window.location.reload();
        localStorage.removeItem("sessionId");
      }, 1000);
    }
  }, []);

  const handleSendOTP = (e) => {
    e.preventDefault();
    setOTPBtn(true);
    console.log("OTP btn disabled");

    setTimeout(()=>{},5000);
    const form = e.currentTarget;
    // Trigger native HTML5 validation manually
    if (formData.email === "") {
      form.reportValidity(); // shows the default browser validation message
      setOpen(true);
      setSnackbarType("error");
      setError("Please provide valid details");
      return; // stop submission
    }
    console.log(`${import.meta.env.VITE_BACKEND_URL}/api/v1/userService/user/sendOTP`);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/userService/user/sendOTP`, { email: formData.email })
      .then((res) => {
        //  console.log(res.status);
        if (res.status === 200) {
          setshowOTPBox(true);
          setOpen(true);
          setSnackbarType("success");

          setError(res.data.message);
          setOTPBtn(false);
      console.log("OTP Btn enabled");
        }
        //  console.log(res);
      })
      .catch((e) => {
         setOTPBtn(false);
      console.log("OTP Btn enabled");
        setOpen(true);
        setSnackbarType("error");
        setError(e.response.data.message);
       
        // console.log(e);
      });

      
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    // Trigger native HTML5 validation manually
    if (formData.OTP === "") {
      setOpen(true);
      setSnackbarType("error");
      setError("Please provide valid details");
      form.reportValidity(); // shows the default browser validation message
      return; // stop submission
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/userService/user/verifyOTP`, {
        email: formData.email,
        otp: formData.OTP,
      })
      .then((res) => {
        //console.log(res.status);
        if (res.status === 200) {
          setEmailVerified(true);
          setshowOTPBox(false);
          setOpen(true);
          setSnackbarType("success");

          setError(res.data.message);
        }
        //  console.log("verified mail");
      })
      .catch((e) => {
        setOpen(true);
        setSnackbarType("error");
        setError(e.response.data.message);
        // console.log(e);
      });
  };

  const googleResponse = async (authResult) => {
    try {
      if (authResult.code) {
        setShowLoading(true);

        console.log(authResult.code);
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/userService/user/auth/google?code=${authResult.code}`,{withCredentials:true})
          .then((res) => {
           // console.log(res.data);

            setOpen(true);
            setSnackbarType("success");
            setError(res.data.message);
            localStorage.setItem("sessionId", res.data.id);
            // console.log(localStorage.getItem("sessionId"));
            setUserLoggedIn(true);
             setShowLoading(false);
            navigate("/");
          })
          .catch((e) => {
            setSnackbarType("error");
            setOpen(true);
            setError(e.response.data.message);
             setShowLoading(false);
          });
        console.log(authResult.code);
      }
    } catch (error) {
      console.log(`Error occurred ${authResult}`);
    }
  };


  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth",
  });



  // frontend/components/GoogleLoginButton.jsx



  // const handleGoogleLogin = () => {
  //   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  //   const redirectUri = import.meta.env.VITE_FRONTEND_URL + "/oauth/google/callback"; // must match Google Cloud redirect URI
  //   const scope = "profile email";

  //   // Redirect user to Google login
  //   window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  // };

 




  return (
    showLoading?(<LoadingSpinner></LoadingSpinner>):
    
    (
         <Box
      component="form"
      className="signUpBox"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        minHeight: 400,
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
      noValidate={false}
    >
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        <Button
          variant={formState === 0 ? "contained" : ""}
          onClick={handleFormState}
          sx={{ borderRadius: "2rem" }}
          id="signup"
        >
          Signup
        </Button>
        <Button
          variant={formState === 1 ? "contained" : ""}
          onClick={handleFormState}
          sx={{ borderRadius: "2rem" }}
          id="login"
        >
          Login
        </Button>
      </Stack>

      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        disabled={emailVerified}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "2rem", // 👈 Rounded corners
          },
        }}
      />
      {formState === 0 && (
        <>
          {showOTPBox && (
            <TextField
              label="OTP"
              type="number"
              name="OTP"
              value={formData.OTP}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2rem", // 👈 Rounded corners
                },
              }}
            />
          )}

          {!emailVerified && (
            <Button
              variant="contained"
              onClick={showOTPBox ? handleVerifyOTP : handleSendOTP}
              sx={{
                borderRadius: "2rem",
                width: "41%",
                margin: "0 auto",
              }}

              disabled={showOTPBox==false&&OTPBtn==true}
            >
              {showOTPBox ? `Verify OTP` : `Send OTP`}
            </Button>
            // <button
            //   type="submit"
            //   onClick={showOTP ? handleVerifyOTP : handleSendOTP}
            //   style={{width:"30%",  margin:"0 auto", borderRadius:"1rem", backgroundColor:"#1565C0" ,border}}
            // >
            //   {showOTP ? `Verify OTP` : `Send OTP`}
            // </button>
          )}

          {emailVerified && (
            <p className="verified">✅ Email Verified Successfully!</p>
          )}

          <TextField
            label="FullName"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            required
            disabled={!emailVerified}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "2rem", // 👈 Rounded corners
              },
            }}
          />
        </>
      )}

      <TextField
        label="Password"
        type={showPassword === true ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        disabled={emailVerified === false && formState === 0}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "2rem", // 👈 Rounded corners
          },
        }}
      />

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
          height: "fit-Content",
        }}
        // onClick={handleSubmit}
        disabled={formState === 0 && !emailVerified}
      >
        Submit
      </Button>



            <Button
        variant="contained"
        type="submit"
        sx={{
          borderRadius: "2rem",
          width: "90%",
          margin: "0 auto",
          height: "fit-Content",
        }} 

         onClick={()=>{setFormData( {fullname:"",password:"Demouser@123",
    email: "appointmentdemouser@gmail.com"})}}
        // onClick={handleSubmit}
        disabled={formState === 0 && !emailVerified}
         
       
        
      >
        Continue with Demo Credentials
      </Button>




 <hr />
      
      <Button
        variant="contained"
        type="submit"
        sx={{
          borderRadius: "2rem",
          width: "70%",
          margin: "0 auto",
          height: "fit-Content",
        }}
         onClick={()=>{
  window.open(
    `${import.meta.env.VITE_DASHBOARD_URL}`,
    "_blank",
    "noopener,noreferrer"
  );
}}
       
      >
        Log in as Admin ?
      </Button>

      <Button
        variant="contained"
        type="submit"
        sx={{
          borderRadius: "2rem",
          width: "85%",
          margin: "0 auto",
          height: "fit-Content",
          paddingInline: "0.5rem",
          
        }}
        onClick={handleGoogleLogin}
      >
        {/* <i class="fa-brands fa-google me-1"></i>{" "} */}
        <img
          src="https://imgs.search.brave.com/10HVMGzsYoY2KE-MLdpLZnKxu_KIv1XQcHZYYBLSc2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9nb29n/bGUtbG9nby1pY29u/LWlzb2xhdGVkLXdo/aXRlLWJhY2tncm91/bmQtMzc3Mjc3MjQ5/LmpwZw"
          alt="google-logo"
          style={{height:"2rem", width:"2rem", borderRadius:"2rem", marginRight:"1rem"}}
        ></img>{" "}
        
        Continue With Google
      </Button>

      <SnackBar
        open={open}
        message={error}
        onClose={() => setOpen(false)}
        snackbarType={snackbarType}
      />
    </Box>
    )
 
  );
}

