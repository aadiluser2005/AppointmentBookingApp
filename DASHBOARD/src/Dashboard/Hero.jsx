
import InfoCards from './InfoCards.jsx'
import { useDashBoardContext } from '../Context/DashBoardContext.jsx'
import { useEffect } from 'react';

import {  useNavigate} from "react-router-dom";




function Hero() {

    const {dashBoardInfo}=useDashBoardContext();
      const navigate=useNavigate();
   // console.log(dashBoardInfo);
   
    const redirectToAppointment=()=>{
       
      navigate("/appointments");
    }

    const redirectToUsers=()=>{
      navigate("/users");
    }

  return (
   <div className='hero'>
    <div className='greetingDiv'> 
      <h3 className='fs-2'>Dashboard</h3>
      <p className='text-muted'>Overview of your appointment booking system.......Here's what's happening today</p>
    </div>
    <div className='infoDivs'>
     <InfoCards 
     content={"Total Appointments"}
     iconClass={"fa-regular fa-calendar "} 
     divColor={"linear-gradient(to top left, #E9F6FD 35%, #60bfffcd "}
     iconColor={"#16a2ffff"}
     Number={dashBoardInfo.totalAppointment}
     redirect={redirectToAppointment}
      ></InfoCards>

       {/* <InfoCards 
     content={"Cancelled"} 
     iconClass={"fa-solid fa-xmark "}  
     divColor={"linear-gradient(to top left, #f8f8f8ff 35%, #f8b9b9ff "}
     iconColor={"#eb3939ff"}
     Number={23}
      ></InfoCards>


       <InfoCards 
     content={"Upcoming"}
     iconClass={"fa-regular fa-clock "} 
   divColor={"linear-gradient(to top left, #f8f8f8ff 35%, #fce0b1ff "}
     iconColor={"#f76f2bff"}
     Number={48}
      ></InfoCards> */}



       <InfoCards 
     content={"Registered Users"}
     iconClass={"fa-solid fa-users "} 
      divColor={"linear-gradient(to top left, #f8f8f8ff 25%, #aff9c7ff"}
     iconColor={"#1cee5eff"}
     Number={dashBoardInfo.registeredUsers}
     redirect={redirectToUsers}
      ></InfoCards>
      
     
    </div>
   </div>
  )
}

export default Hero