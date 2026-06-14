import React from 'react'
import { Modal, Box, Button } from '@mui/material';
import { useDashBoardContext } from '../Context/DashBoardContext.jsx';
import axios from "axios";

function DeactivateConfirm() {
    
  const{ userMail,userName,deactivateOpen,setDeactivateOpen, setSnackBarType,setSnackBarMessage,setSnackBarOpen,setShowLoading }=useDashBoardContext();
   

  const handleClose=()=>{
    setDeactivateOpen(false);
  }

  const handlDeactivate=()=>{
    setShowLoading(true);
           setDeactivateOpen(false);
       axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/users/deactivateUser`,{email:userMail},{withCredentials:true}).then((res)=>{
              setSnackBarOpen(true);
              setSnackBarMessage(res.data.message);
              setSnackBarType("success");
               
               setTimeout(()=>{
         window.location.reload();
           setShowLoading(false);
        },2000);
         
      }).catch(e=>{
          setSnackBarOpen(true);
              setSnackBarMessage(e.response.data.message);
              setSnackBarType("error");
               setShowLoading(false);
       // console.log(e);
      })
    
    
   
  }
  
   return (
   <Modal open={deactivateOpen} onClose={handleClose}>
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

        <h5>Are you sure ?  You want to DEACTIVATE the user "{userName}" with mail "{userMail}"</h5>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} >
              <Button variant="contained" onClick={handlDeactivate} >Yes</Button>
          <Button onClick={handleClose} sx={{ mr: 2 }}>No</Button>
        
        </Box>
      </Box>
     
    </Modal>
    )
  
}

export default DeactivateConfirm