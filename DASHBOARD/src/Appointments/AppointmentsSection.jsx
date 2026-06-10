import SearchAppBar from "./SearchAppBar"
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppointmentCard from "./AppointmentCard.jsx";
// import { appointments } from "../sampleData";
import { useDashBoardContext } from "../Context/DashBoardContext.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";

function AppointmentsSection() {
    
  const times=["10:00AM","12:00PM","02:00PM","04:00PM"];

  const [appointment,setAppointment]=useState([]);

  const {setCancellingAppointmentID, setCancellingPhone,
              setCancellingPatientName,setCancelOpen,cancelOpen,showLoading,setShowLoading}=useDashBoardContext();

              const navigate=useNavigate();


  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/appointments/getAppointments`,{withCredentials:true}).then((res)=>{
    //  console.log( "Response data ===============>",res.data.DBappointment);
        setAppointment(res.data.DBappointment);        
    }).catch(e=>{
       navigate("/login");
      console.log(e);
    })
    
    
  
  },[]);

  const showUpcoming=()=>{
    setShowLoading(true);
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/appointments/getUpcomingAppointments`,{withCredentials:true}).then((res)=>{
     // console.log( "Response data ===============>",res.data.message);
        setAppointment(res.data.message);   
        setShowLoading(false);     
    }).catch(e=>{
       setShowLoading(false); 
       navigate("/login");
      console.log(e);
    })

  }


  
  
   const handleCancel=(uniqueID,patientName,phoneNumber)=>{
         setCancellingAppointmentID(uniqueID);
         setCancellingPatientName(patientName);
         setCancellingPhone(phoneNumber);
         setCancelOpen(true);

         
   }
  
  
 // console.log("My data ===========> ",appointment);


  const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "1rem",
  backgroundColor: "#E7F7FF",
  '&:hover': {
    backgroundColor:"#E7F7FF" ,
    border:"2px solid rgb(13,162,231)"
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
  

// if (!appointment) {
//   return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
// }
 return(

  showLoading?(<LoadingSpinner></LoadingSpinner>):
 

   (

    
    <div className='appointmentSection'>
       
       <div className='upperDiv'>
        <div><h3>All Appointments</h3>
          <button onClick={showUpcoming}>Show  upcoming </button></div>
      
       <div className='searchBar'>
        
      {/* <Toolbar>
          
         
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar> */}
  
       </div>
       </div>

       <div className="lower">
        <AppointmentCard
           patientName={"Patient Name"}
           email={"Email"}
           date={"Appointment Date"}
           slotTime={"Slot Time"}
           bookingDate={"Booking Date"}
           status={"Status"}
           isHeader={true}
        
        ></AppointmentCard>

       {appointment.length > 0 ? (
    appointment.map((item) => (
      <AppointmentCard
        key={item._id}
        patientName={item.patientName}
        email={item.email}
        date={item.appointmentDate}
        slotTime={times[item.slotNumber - 1]}
        bookingDate={item.dateBooked}
        status={item.confirmStatus}
        isOld={item.isOld}
        isHeader={false}
        cancel={() => handleCancel(item.uniqueID, item.patientName, item.phoneNumber)}
      />
    ))
  ) : (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>No Appointments to show ...........</div>
  )}
       </div>
       
      
      </div>
  )

)
 }
  


export default AppointmentsSection



