import React from 'react'
import { Modal, Box, Button, TextField } from '@mui/material';
import { useDashBoardContext } from '../Context/DashBoardContext.jsx';
import axios from "axios";

function ActivateConfirm() {
  
  const{activateOpen,setAcitvateOpen,userName,userMail, setSnackBarOpen, setSnackBarType,setSnackBarMessage,setShowLoading }=useDashBoardContext();

  
  const handleClose=()=>{
       setAcitvateOpen(false);
  }


  const handleActivate=()=>{
    setShowLoading(true);
              setAcitvateOpen(false);
           axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/users/activateUser`,{email:userMail},{withCredentials:true}).then((res)=>{
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
        //console.log(e);
      })
     
     
  }
    
  return (
    <Modal open={activateOpen} onClose={handleClose}>
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
 
         <h5>Are you sure ?  You want to ACTIVATE the user "{userName}" with mail "{userMail}"</h5>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} >
               <Button variant="contained" onClick={handleActivate} >Yes</Button>
           <Button onClick={handleClose} sx={{ mr: 2 }}>No</Button>
         
         </Box>
       </Box>
      
     </Modal>
     )
}

export default ActivateConfirm