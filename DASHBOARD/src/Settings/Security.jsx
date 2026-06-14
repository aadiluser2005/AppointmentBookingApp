
import React, { useEffect } from "react";
import { useDashBoardContext } from '../Context/DashBoardContext.jsx';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Security() {
    
    const navigate=useNavigate();

    const [formData, setFormData] = useState({oldPass:"",newPass:"",confirmPass:"" });

     const {setSnackBarType, setSnackBarMessage,setSnackBarOpen}=useDashBoardContext();

     const handleUpdate=(e)=>{
      e.preventDefault();

      if(formData.oldPass===""||formData.newPass===""||formData.confirmPass===""){
        setSnackBarOpen(true);
        setSnackBarMessage("Please fill all required fields");
        setSnackBarType("warning");
        return
      }

      if(formData.newPass!==formData.confirmPass){
        setSnackBarOpen(true);
        setSnackBarMessage("New Password and Confirm Password should be same");
        setSnackBarType("warning");
        return 
      }

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/admin/passChanges`,{
        oldPass:formData.oldPass,
        newPass:formData.newPass
      },{withCredentials:true}).then((res)=>{
         setSnackBarMessage(res.data.message);
         setSnackBarOpen(true);
         setSnackBarType("success");

    
         setTimeout(()=>{
          window.location.reload();
         },1500);


      }).catch((e)=>{
         // console.log(e);
         setSnackBarMessage(e.response.data.message);
         setSnackBarOpen(true);
         setSnackBarType("error");
         if(e.response.status===401||e.response.status===403){
             navigate("/login");
         }
        
       

      });
      //console.log(formData);
  }



    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  

  return (
    <div className="profileSection">
      <div className="upperDiv">
        <h3>Security</h3>
        <p className="text-muted">
          Manage your password and authentication settings
        </p>
      </div>
      <div className="lowerDiv">
        <form className="adminInfo">
          <div>
            <label htmlFor="currentPass" class="form-label">
              Current Password *
            </label>
            <input
              name="oldPass"
              type="text"
              class="form-control"
              id="currentPass"
              placeholder=""
              value={formData.oldPass}
              onChange={handleChange}
                required
            />
          </div>

          <div>
            <label htmlFor="newPass" class="form-label">
              New Password *
            </label>
            <input
            name='newPass'
              type="password"
              class="form-control"
              id="newPass"
              placeholder=""
              value={formData.newPass}
                onChange={handleChange}
                required
            />
          </div>

          <div>
            <label htmlFor="confirmPass" class="form-label">
             Confirm Password *
            </label>
            <input
              name='confirmPass'
              type="text"
              class="form-control"
              id="confirmPass"
              placeholder=""
              value={formData.confirmPass}
                onChange={handleChange}
              required
            />
          </div>

          <button  className="saveBtn" onClick={handleUpdate}>Update Password</button>
        </form>
      </div>
    </div>
  )
}

export default Security