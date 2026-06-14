import React from 'react'
import { Modal, Box, Button, TextField } from '@mui/material';
import { useDashBoardContext } from '../Context/DashBoardContext.jsx';
import { useEffect } from 'react';
import axios from "axios";

function CancelConfirm() {
   
   const {cancellingAppointmentID,cancellingPatientName,cancellingPhone,cancelOpen,setCancelOpen,setShowLoading}=useDashBoardContext();

     const {setSnackBarType, setSnackBarMessage,setSnackBarOpen}=useDashBoardContext();

   const handleCancel=async()=>{
      setShowLoading(true);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/appointments/cancelAppointment`,{appointmentUniqueID:cancellingAppointmentID},{withCredentials:true})
    .then((res)=>{
      setSnackBarOpen(true);
      setSnackBarMessage(res.data.message);
      setSnackBarType("success");
        setCancelOpen(false);

        
        setTimeout(()=>{
         window.location.reload();
         setShowLoading(false);
        },2000);
     // console.log(res);
      
    })
    .catch(e=>{
       setCancelOpen(false);
         setSnackBarOpen(true);
      setSnackBarMessage(e.response.data.message);
      setSnackBarType("error");
      setShowLoading(false);
     // console.log(e);
    })
    
   }


  




  const handleClose=()=>{

    setCancelOpen(false);

  }

 
   return (
   <Modal open={cancelOpen} onClose={handleClose}>
      <Box
      className="deleteModal"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        
        }}
      >

        <h5>Are you sure ?  You want to Cancel the Appointment of "{cancellingPatientName}" having mobile no "{cancellingPhone}"</h5>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} >
              <Button variant="contained" onClick={handleCancel} >Yes</Button>
          <Button onClick={handleClose} sx={{ mr: 2 }}>No</Button>
        
        </Box>
      </Box>
     
    </Modal>
    )
}

export default CancelConfirm