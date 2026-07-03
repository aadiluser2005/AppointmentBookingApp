import React from 'react'

function AppointmentCard({ patientName,email,date,slotTime, bookingDate, status,isOld,isHeader,cancel}) {
  var istDate="";
   //converting dateBooked to IST date for better accuracy
   if(isHeader==false){
      const tempDate = new Date(bookingDate);

 istDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
}).format(tempDate);
// console.log(istDate);
   }





// console.log(isOld);
  return (
    <div className={`appointmentCard  ${isHeader?"text-muted":""}`}>
          <div style={{maxWidth:"100rem", minWidth:"13rem" ,textAlign:"left"}} className={`${isHeader?"":"fs-5"}`}>{patientName}</div>
          <div style={{maxWidth:"100rem", minWidth:"13rem" ,textAlign:"left"}}>{email}</div>
          <div style={{width:"80%" ,textAlign:"center"}}>{isHeader?date:date.slice(0,10)}</div>
          <div style={{width:"60%" ,textAlign:"center"}}>{slotTime}</div>
          <div  style={{width:"88%" ,textAlign:"center"}}>{isHeader?bookingDate:istDate}</div>
          <div style={{width:"80%" ,textAlign:"center"}}>{isHeader?status:status?<div className='confirmCapsule'>confirmed</div>:<div className='cancelCapsule'>cancelled</div>}</div>
          <div style={{width:"70%",  pointerEvents:`${(!isOld&&status)?"":"none"}` ,textAlign:"center"}} onClick={isHeader?"":cancel} >{isHeader?"Action":<i className="fa-solid fa-xmark ms-1"  title="Cancel Appointment" style={{color:"red"}}></i>}</div>
           
        </div>
  )
}

export default AppointmentCard