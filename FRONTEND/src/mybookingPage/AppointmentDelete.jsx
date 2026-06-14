import React from 'react'
import { Modal, Box, Button, TextField } from '@mui/material';
import { useAppointment } from './AppointmentContext/AppointmentContext.jsx'
import { useBooking } from '../Contexts/BookingContext.jsx';
import axios from 'axios';

function AppointmentDelete() {
    const {deleteOpen,setDeleteOpen,setAppointmentId,appointmentId}=useAppointment();
     const{setError,setOpen,setSnackbarType,setShowLoading}=useBooking();

    const handleDelete=()=>{
      setShowLoading(true);
         setAppointmentId(appointmentId);
         handleClose();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/appointment/delete`,{
          appointmentId:appointmentId,
         },{withCredentials:true}).then((res)=>{
         setSnackbarType("success");
         setError(res.data.message);
         setOpen(true);
            window.scrollTo(0,0);
           setTimeout(()=>{
              window.location.reload();
           
           },1500);
           setShowLoading(false);
        //console.log(res.data.message);
      }).catch(e=>{
        setShowLoading(false);
           setSnackbarType("warning");
           setError(e.response.data.message);
           setOpen(true);
        
      });
    }

    const handleClose=()=>{
        setDeleteOpen(false);
    }
  return (
    <Modal open={deleteOpen} onClose={handleClose}>
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

        <h5>Are you sure ?  You want to delete</h5>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} >
              <Button variant="contained" onClick={handleDelete}>Yes</Button>
          <Button onClick={handleClose} sx={{ mr: 2 }}>No</Button>
        
        </Box>
      </Box>
     
    </Modal>
  )
}

export default AppointmentDelete