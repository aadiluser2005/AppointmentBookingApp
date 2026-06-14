import React, { useEffect, useState } from 'react'
import { useBooking } from '../Contexts/BookingContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AppointmentTogglers() {

 
  const [pastSelected,setPastSelected]=useState(false);
   
   const {setError,setOpen,setSnackbarType,setAppointments,setPast,upcomingLength,pastLength}=useBooking();

    const navigate=useNavigate();
  
    // console.log(past);

  const handleUpcoming=async()=>{
       setPastSelected(false);
       setPast(false);
         axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/appointment/upcomingAppointments`,{withCredentials:true}).then((res)=>{
       setAppointments(res.data);
      // console.log(res.data);
    }).catch(e=>{
         setSnackbarType("error");
         setError(e.response.data.message);
         setOpen(true);
         navigate("/login");
    });

  }

  const handlePast=async()=>{
   
      setPast(true);
    setPastSelected(true); 
   

       axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/appointment/pastAppointments`,{withCredentials:true}).then((res)=>{
       setAppointments(res.data);
     
      // console.log(res.data);
    }).catch(e=>{
         setSnackbarType("error");
         setError(e.response.data.message);
         setOpen(true);
         navigate("/login");
    });
     
   
    
  }

  
   
 

  return (
    <div className='togglebtn mt-5'>
    
        <button className={`${pastSelected?"":"checked"}`}  onClick={handleUpcoming} ><i className="fa-regular fa-circle-check me-2"></i>Upcoming {pastSelected?"":`(${upcomingLength})`}</button>
        <button className={`${pastSelected?"checked":""}`} onClick={handlePast}><i className="fa-regular fa-clock me-2"></i>Past { pastSelected?`(${pastLength})`:""}</button>
    </div>
  )
}

export default AppointmentTogglers