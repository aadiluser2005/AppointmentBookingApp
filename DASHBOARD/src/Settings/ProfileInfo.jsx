import React from "react";
import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SnackBar from "../SnackBar/SnackBar.jsx";
import { useDashBoardContext } from "../Context/DashBoardContext.jsx";

function ProfileInfo() {


  const navigate=useNavigate();

    const [formData, setFormData] = useState({fullName:"",email:"",phone:"" });

     const {setSnackBarType, setSnackBarMessage,setSnackBarOpen,snackBarOpen, snackBarMessage,snackBarType}=useDashBoardContext();

     const handleSave=(e)=>{
      e.preventDefault();

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/admin/profileChanges`,{
        fullName:formData.fullName,
        email:formData.email,
        phone:formData.phone
      },{withCredentials:true}).then((res)=>{
         setSnackBarMessage(res.data.message);
         setSnackBarOpen(true);
         setSnackBarType("success");

         if(res.status===201){
          setSnackBarMessage(res.data.message);
         setSnackBarOpen(true);
         setSnackBarType("info");
         }

         setTimeout(()=>{
          window.location.reload();
         },1500);


      }).catch((e)=>{
          
         setSnackBarMessage(e.response.data.message);
         setSnackBarOpen(true);
         setSnackBarType("error");
          navigate("/login");

      });
     // console.log(formData);
  }

  useEffect(()=>{

  axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/admin/settingInfo`,{withCredentials:true})
  .then((res)=>{
   // console.log(res);
    setFormData({fullName:res.data.message.fullName,
                  email:res.data.message.email,
                  phone:res.data.message.phoneNumber });
  })
  .catch(e=>{
  //console.log(e)
    if(e.response.status===401||e.response.status===500||e.response.status===403){
             navigate("/login");
         }
   
  });
       
  },[]);


    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleClose=()=>{
    setSnackBarOpen(false);
  }
 
    
 
 
// console.log(settingInfo);


  return (
    <>
    <div className="profileSection">
      <div className="upperDiv">
        <h3>Profile Information</h3>
        <p className="text-muted">
          Update your personal information and contact details
        </p>
      </div>
      <div className="lowerDiv">
        <form className="adminInfo">
          <div>
            <label htmlFor="fullName" class="form-label">
              Full Name
            </label>
            <input
             name="fullName"
              type="text"
              class="form-control"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" class="form-label">
              Email address
            </label>
            <input
            name="email"
              type="email"
              class="form-control"
              id="email"
              value={formData.email}
               onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" class="form-label">
              Phone Number
            </label>
            <input
            name="phone"
              type="number"
              class="form-control"
              id="phoneNumber"
              value={formData.phone}
               onChange={handleChange}
            />
          </div>

          <button  className="saveBtn" onClick={handleSave}>Save Changes</button>
        </form>
      </div>
    </div>
    <SnackBar open={snackBarOpen} message={snackBarMessage}  onClose={handleClose} snackbarType={snackBarType} ></SnackBar>
    </>
  );
}

export default ProfileInfo;
