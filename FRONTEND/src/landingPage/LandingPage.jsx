import React, { useEffect } from 'react'
import Hero from './Hero'
import MetricsSection from './MetricsSection.jsx'
import Testimonials from './Testimonials.jsx'
import SessionRedirect from './SessionRedirect.jsx'
import "./landingPage.css";
import { useBooking } from '../Contexts/BookingContext.jsx'
import SnackBar from '../SnackBar/SnackBar.jsx';
import axios from 'axios'


function LandingPage() {

  
  const { setDateSelected, setSlotSelected,setOpen,open,error,snackbarType,setShowConfirmation}=useBooking();

     

  useEffect(()=>{
      window.scrollTo(0,0);
      setDateSelected(false);
    setSlotSelected(false);
    setShowConfirmation(false);

    axios.get(`${import.meta.env.VITE_APPOINTMENT_URL}`).then().catch();
    axios.get(`${import.meta.env.VITE_USER_URL}`).then().catch();

    
     },[]);


   
 
  return (
    <>
    <Hero></Hero>
    <MetricsSection></MetricsSection>
    <Testimonials></Testimonials>
    <SessionRedirect></SessionRedirect>
    <SnackBar open={open} message={error} onClose={() => setOpen(false)} snackbarType={snackbarType} />
    </>
  );
}

export default LandingPage;
