import React from 'react'
import Chart from './Chart.jsx'
import Hero from './Hero.jsx'
import "./dashboard.css"
import { useDashBoardContext } from '../Context/DashBoardContext.jsx'
import axios from "axios"
import { useEffect } from 'react'
import SnackBar from '../SnackBar/SnackBar.jsx'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Loading/LoadingSpinner.jsx'

function Dashboard() {
  const {setDashBoardInfo}=useDashBoardContext();

    const { snackBarOpen, snackBarMessage,snackBarType,setSnackBarOpen,showLoading,setShowLoading}=useDashBoardContext();


    const navigate=useNavigate();
     
    const handleClose=()=>{
        setSnackBarOpen(false);
    }
  

  useEffect(()=>{
    setShowLoading(true)
         axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/appointments/dashboardInfo`,{withCredentials:true}).then((res)=>{
          //console.log("dashboard print ==========",res.data);
    setDashBoardInfo(res.data.info);
      
    setShowLoading(false);

   }).catch(e=>{
      
   // console.log(e);
    setShowLoading(false);
    navigate("/login");
    
   });
  },[])

   
  return( <>


  {showLoading?  (<LoadingSpinner></LoadingSpinner>):(
 <>
   <Hero></Hero>
  <Chart></Chart>
 </>
 
   
  )
}

<SnackBar open={snackBarOpen} message={snackBarMessage}  onClose={handleClose} snackbarType={snackBarType} ></SnackBar>
</>

  )
}

export default Dashboard