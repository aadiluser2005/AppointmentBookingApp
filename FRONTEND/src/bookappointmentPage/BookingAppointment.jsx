import React from 'react'
import Heading from './Heading.jsx'
import DateSection from './DateSection.jsx'
import TimeSlots from './TimeSlots.jsx'
import PatientInfo from './PatientInfo.jsx'
import Confirmation from './Confirmation.jsx'
import "./bookingAppointment.css";
import { useEffect } from 'react'
import axios from 'axios'
import { useBooking } from '../Contexts/BookingContext.jsx'
import SnackBar from '../SnackBar/SnackBar.jsx'
import LoadingSpinner from '../Loading/LoadingSpinner.jsx'


function BookingAppointment() {
     const {setDates,open,error,setOpen,snackbarType,showLoading,setShowLoading}=useBooking();
 
   useEffect(()=>{
    window.scrollTo(0,0);

      setShowLoading(true);

     
   
      async function fetchDates() {
        const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/slots/getDates`);
        setDates(res.data);
       
       // console.log(res.data);
      }
      fetchDates();
    
      setShowLoading(false);
     
   },[]);
  
  return (
      
    showLoading?(
      <>
    <LoadingSpinner></LoadingSpinner> 
     <SnackBar open={open} message={error} onClose={() => setOpen(false)}  snackbarType={snackbarType}/>   </>      
    ):(
    
    <div className='container-fluid booking'>
    
    <Heading></Heading>
    <DateSection></DateSection>
    <TimeSlots></TimeSlots>
    <PatientInfo></PatientInfo>
    <Confirmation></Confirmation>

    <SnackBar open={open} message={error} onClose={() => setOpen(false)}  snackbarType={snackbarType}/>
  
   </div>)

  
  )
}

export default BookingAppointment