import React from 'react'
import {  NavLink, useNavigate } from "react-router-dom";
import "./navbar.css"
import axios from "axios";
import { useDashBoardContext } from '../Context/DashBoardContext.jsx';

function Navbar() {

  const { setSnackBarType, setSnackBarMessage, setSnackBarOpen,setShowLoading}=useDashBoardContext();
   
  const navigate=useNavigate();

 
  const fetchData=()=>{
    setShowLoading(true)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/appointments/latestData`,{withCredentials:true}).then((res)=>{
          setSnackBarOpen(true);
          setSnackBarMessage(res.data.message);
          setSnackBarType("success");
          navigate("/");
          setTimeout(()=>{
              window.location.reload();
               setShowLoading(false)
          },1000);
      //console.log( res.data.message);     
    }).catch((e)=>{
     
     // console.log(e);
     
          setSnackBarMessage(e.response.data.message);
          setSnackBarType("error");
            setSnackBarOpen(true);
             setShowLoading(false);
    })
  }


  return (
    <div className='navbar'>
      <NavLink 
       to="/"
      style={{textDecoration:"none"}}>
        <div className='logo'>
        <h4>Admin Panel</h4>
        <p className='text-muted'>Appointment System</p>
      </div>
      </NavLink>
      
      <div className='navigateLink'>
        <NavLink 
        to="/"
        className={({isActive})=>` dashboardNav ${isActive?" selected ":""}`}  >
            <div > <i class="fa-solid fa-grip me-1"></i>Dashboard</div>
        </NavLink>

        <NavLink 
         to="/appointments"
        className={({isActive})=>` dashboardNav ${isActive?" selected ":""}`} >
            <div ><i class="fa-regular fa-calendar me-1"></i> Appointments</div>
        </NavLink>

        <NavLink 
         to="/users"
        className={({isActive})=>` dashboardNav ${isActive?" selected ":""}`} >
           <div><i class="fa-solid fa-users me-1"></i> Users</div>
        </NavLink>

        <NavLink 
         to="/settings"
        className={({isActive})=>` dashboardNav ${isActive?" selected ":""}`}>
            <div > <i class="fa-solid fa-gear me-1"></i>Settings</div>
        </NavLink>
      
      
        
      
      </div>

      <div className='fetchBtn'>
        <button onClick={fetchData}>Fetch Latest Data</button>
      </div>
    </div>
  )
}

export default Navbar