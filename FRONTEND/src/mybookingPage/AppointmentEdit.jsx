// AppointmentEdit.jsx
import React from 'react';
import { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { useAppointment } from './AppointmentContext/AppointmentContext.jsx';
import { useBooking } from '../Contexts/BookingContext.jsx';
import EditSlots from './EditSlots.jsx';
import "./bookingPage.css";
import axios from 'axios';
import status from "http-status";

function AppointmentEdit() {
  const { 
    Editopen,
    setEditOpen,
    currPatientName, 
    appointmentId,
    setCurrPatientName,
    currPhoneNumber,
    setCurrPhoneNumber,
    currSlotNumber,
    setCurrSlotNumber
  } = useAppointment();


  const handleClose = () => setEditOpen(false);
 const [selectedId, setSelectedId] = useState(null);
  const times = ["10:00AM", "12:00PM", "02:00PM", "04:00PM"];
  const {slots,setOpen,setError,setSnackbarType,setShowLoading} = useBooking();


  const handleSelect=(id,slot)=>{
  setSelectedId(id);
  setCurrSlotNumber(slot);
}
 
// console.log(slots)
  const handleSave = () => {
        handleClose();
    setShowLoading(true);
   // console.log("Appointment ID : ",appointmentId," Phone number : ",currPhoneNumber," currName : ",currPatientName," currSlotNumber : ",currSlotNumber);
    // handle save logic here (API call or context update)
     axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointmentService/appointment/update`,{
        appointmentId:appointmentId,
        newSlotNumber:currSlotNumber,
        newPatientName:currPatientName,
        newPhoneNumber:currPhoneNumber,
       },{withCredentials:true}).then((res)=>{
        if(res.status===status.ALREADY_REPORTED){
             setSnackbarType("warning");
        }else{
            setSnackbarType("success");
        }
         setError(res.data.message);
       setOpen(true);
      
        window.scrollTo(0,0);
         setTimeout(()=>{

            window.location.reload();
         },1500);

          setShowLoading(false);
     // console.log(res.data.message);
    }).catch(e=>{
          setSnackbarType("warning");
         //console.log(e);
         setError(e.response.data.message);
         setOpen(true);
          setShowLoading(false);
        // navigate("/login");
    });



  };

  return (
    <Modal open={Editopen} onClose={handleClose}>
      <Box
      className="editModal"
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
        <h2>Edit Appointment</h2>

        <TextField
          label="Patient Name"
          fullWidth
          margin="normal"
          value={currPatientName}
          onChange={(e) => setCurrPatientName(e.target.value)}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          value={currPhoneNumber}
          onChange={(e) => setCurrPhoneNumber(e.target.value)}
        />
    
        <TextField
          label="Slot Number"
          fullWidth
          margin="normal"
          value={currSlotNumber}
          disabled
          onChange={(e) => setCurrSlotNumber(e.target.value)}
        /> 
        
        <div className='editSlots'>
         {slots.map((item, index) => {
          return (
            <EditSlots
              slotNumber={item.slots}
              key={item.id}
              onSelect={() => handleSelect(item.id,index+1)}
              isSelected={selectedId === item.id}
              time={times[index]}
            ></EditSlots>
          );
        })}
          
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </Box>
      </Box>
     
    </Modal>
  );
}

export default AppointmentEdit;
