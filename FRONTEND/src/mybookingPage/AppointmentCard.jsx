import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import { useAppointment } from './AppointmentContext/AppointmentContext.jsx'
import { useBooking } from '../Contexts/BookingContext.jsx';
import axios from 'axios';

function AppointmentCard({patientName,appointmentDate,dateBooked,phoneNumber,slotNumber,appointmentId,isActive}) {
    
const{setCurrPatientName,setCurrPhoneNumber,setCurrAppointmentDate,setCurrSlotNumber, setEditOpen,setAppointmentId, setDeleteOpen}=useAppointment();
 const {setSlots,past}=useBooking();
   
 // console.log("Value of isActive =>",  isActive);


 //converting dateBooked to IST date for better accuracy
 const date = new Date(dateBooked);

const istDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
}).format(date);

// console.log(istDate);

const handleEdit=async()=>{
  setAppointmentId(appointmentId);
  setCurrPatientName(patientName);
  setCurrPhoneNumber(phoneNumber);
  setCurrAppointmentDate(appointmentDate);
  setCurrSlotNumber(slotNumber);
  setEditOpen(true);
  const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/slots/getSlots`,{
        date:appointmentDate.slice(0,10),
      });

    setSlots(res.data);

  //console.log("edit triggered");
  
}

const handleDelete=async()=>{
  // console.log("delete triggered");
  setAppointmentId(appointmentId);
  setDeleteOpen(true);
 
}

// useEffect(()=>{},[past]);

 
const times=["10:00AM","12:00PM","02:00PM","04:00PM"];

  return (
   <div className='appointmentCard mt-5'>
   
     
         <div className='headDiv'>
           <h4> <span>Patient Name : </span>{patientName} {isActive?<><sup><span className='confirmIcon'><i class="fa-solid fa-circle-check"></i></span> </sup></>:<> </>}  {isActive? <div className='confirmCapsule'> {past?"Completed":"Confirmed"}  </div>:<><div className='cancelCapsule'> Cancelled </div></>}  </h4>
          {past?(<></>):
           (<div className='icons'>
            <button  onClick={handleEdit}> <span> Edit </span> <i class="fa-solid fa-user-pen"></i></button>
            <button onClick={handleDelete}> <span> Delete</span> <i class="fa-solid fa-trash"></i></button>
           </div>)}
          
           </div>
         
         <div className='row mt-3 mb-0  '>
          <div className='col-md-6 col-12'><p>Appointment Date : <b>{ (appointmentDate).slice(0,10)}</b></p></div>
            <div className='col-md-6 col-12 '><p>Booked On : <b>{istDate}</b> </p> </div>
         </div>
          <hr />

          <div className='row'>
          <div className='col-md-6 col-12'> <p>Phone Number :  <b>{phoneNumber}</b></p></div>
              <div className='col-md-6 col-12 '><p>Time : <b>{times[slotNumber-1]}</b> </p> </div>
         </div>
       
          
          
        
        
         




    </div>
  )
}

export default AppointmentCard


