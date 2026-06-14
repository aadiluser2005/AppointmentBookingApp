import React from "react";
import { useBooking } from "../Contexts/BookingContext";
import axios from "axios";
import status from "http-status";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Confirmation() {
  const { isSlotSelected, fullName, phoneNumber, email,
     emergencyContact,date,slotNumber,slotTime, setError,setOpen,
     setFullName, setPhoneNumber, setEmail,setEmergencyContact, setDate,
    setSlotNumber,setDateSelected, setSlotSelected,setSlotTime,setSnackbarType,showConfirmation,setShowConfirmation,setShowLoading } =
    useBooking();

    const navigate=useNavigate();

  const handleConfirm = async() => {
    // console.log(
    //   "Name :",
    //   fullName,
    //   "Phone number : ",
    //   phoneNumber,
    //   " Email : ",
    //   email,
    //   " emergencyContact : ",
    //   emergencyContact,
    //   "Slots number",
    //    slotNumber,
    //    "date :",
    //    date,
    // );

       setShowLoading(true);

       axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/appointment/book`, {
       patientName:fullName,
       phoneNumber:phoneNumber,
       email:email,
       emergencyContact:emergencyContact,
       slotNumber:slotNumber,
       date:date,
      },
      {withCredentials:true},).then((res)=>{
       
          setOpen(true);
       setError(res.data.message)
       if(res.status===status.ALREADY_REPORTED){
        setSnackbarType("warning");
       }else{
         setSnackbarType("success");
       }


       
       window.scrollTo(0,0);
       setDateSelected(false);
       setSlotSelected(false);
       setShowConfirmation(false);
       setFullName("");
       setEmail("");
       setDate("");
       setPhoneNumber("");
       setEmergencyContact("");
       setSlotNumber("");
       setSlotTime("")
        setShowLoading(false);
      
       }).catch(e=>{
           //console.log(e);
        setSnackbarType("error");
        setOpen(true);
       setError(e.response.data.message)
      // console.log(e);
      navigate("/login");
       window.scrollTo(0,0);
         setShowLoading(false);
       })

  };


   useEffect(()=>{
  
   window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
 
  },[showConfirmation]);

  return showConfirmation ? (
    <div className="confirmDiv text-center">
      <i class="fa-regular fa-circle-check mt-md-3"></i>
      <h5 className="mt-3 fs-md-5 fs-4">Confirm Your Appointment</h5>
      <p className="fs-md-5 fs-4 text-muted">
        You're booking a dialysis session for <span style={{color:"#1F8FFF", fontWeight:"bold"}}>{date}</span>  at  <span style={{color:"#1F8FFF", fontWeight:"bold"}}>{slotTime}</span>
      </p>
      <button onClick={handleConfirm}>
        <i class="fa-regular fa-circle-check me-3"></i>Confirm Booking
      </button>
    </div>
  ) : (
    <></>
  );
}

export default Confirmation;
