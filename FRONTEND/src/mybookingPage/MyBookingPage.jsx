import React from 'react'
import Heading from './Heading.jsx';
import AppointmentTogglers from './AppointmentTogglers.jsx';
import AppointmentSection from './AppointmentSection.jsx';
import QuickActions from './QuickActions.jsx';
import "./bookingPage.css";
import { useEffect } from 'react';
import axios from 'axios'
import { useBooking } from '../Contexts/BookingContext.jsx'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from './AppointmentCard.jsx';
import { AppointmentProvider } from './AppointmentContext/AppointmentContext.jsx';
import AppointmentEdit from './AppointmentEdit.jsx';
import SnackBar from '../SnackBar/SnackBar.jsx';
import AppointmentDelete from './AppointmentDelete.jsx';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';




function MyBookingPage() {
 const { setDateSelected, setSlotSelected, setError,setOpen,open,error,snackbarType,setSnackbarType,appointments,setAppointments,setPastLength,setUpcomingLength,past,setPast,setShowConfirmation,showLoading}=useBooking();
//  const [appointments,setAppointments]=useState([]);
 const navigate=useNavigate();

   if(past){
        setPastLength(appointments.length);
    }else{
      setUpcomingLength(appointments.length);
    }
 

  useEffect(()=>{
      window.scrollTo(0,0);
      setPast(false);
      setDateSelected(false);
    setSlotSelected(false);
    setShowConfirmation(false);



    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/appointment/upcomingAppointments`,{withCredentials:true}).then((res)=>{
       setAppointments(res.data);
          
       //console.log(res.data);
    }).catch(e=>{
         setSnackbarType("error");
         //console.log(e);
         setError(e.response.data.message);
         setOpen(true);
         navigate("/login");
    });
     },[]);


     
  

    
  return ( 
     
    showLoading?(<LoadingSpinner></LoadingSpinner>):(
       
      
      <div className='container-fluid bookingMain text-center'>
        <Heading></Heading>
        <AppointmentTogglers></AppointmentTogglers>
        <AppointmentProvider>
        {  appointments.length===0 ?(<AppointmentSection></AppointmentSection> ):
        (
          appointments.map((demoUser)=>(
               <AppointmentCard
            appointmentId={demoUser._id}
           patientName={demoUser.patientName}
          appointmentDate={demoUser.appointmentDate}
          dateBooked={demoUser.dateBooked}
          phoneNumber={demoUser.phoneNumber}
          bookedBy={demoUser.bookedBy}
          slotNumber={demoUser.slotNumber}
          spot={demoUser.spot}
          isActive={demoUser.confirmStatus}
           ></AppointmentCard>
          ))
          
         
          
        )}

       
        
        
        <QuickActions></QuickActions>
          <AppointmentEdit></AppointmentEdit>
          <AppointmentDelete></AppointmentDelete>
        </AppointmentProvider>
         <SnackBar open={open} message={error} onClose={() => setOpen(false)} snackbarType={snackbarType} />
    </div>



    )

  
    
    
  )
}

export default MyBookingPage