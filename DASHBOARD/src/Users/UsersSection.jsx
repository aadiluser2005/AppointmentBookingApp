import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import UsersCard from "./UsersCard.jsx";
import axios from "axios";
import { useDashBoardContext } from '../Context/DashBoardContext.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';



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


function UsersSection() {


    const { setDeactivateOpen,setAcitvateOpen,setUserName,setUserMail,showLoading}=useDashBoardContext();

    const navigate=useNavigate();

   

   
  const [users,setUsers]=useState([]);
  const [searchedUser,setSearchedUser]=useState([]);
  const [query,setQuery]=useState("");


  useEffect(()=>{
       
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/adminService/users/allUser`,{withCredentials:true}).then((res)=>{
       // console.log(res.data.allUsers);
        setUsers(res.data.allUsers)
      }).catch(e=>{
         navigate("/login");
       // console.log(e);
      })


  },[]);





  const handleBlock=(email,fullName)=>{
    setDeactivateOpen(true);
    setUserMail(email);
    setUserName(fullName);
    //console.log("Blocked user with email => ",email);
  }

  const handleActivate=(email,fullName)=>{
     setAcitvateOpen(true);
    setUserMail(email);
    setUserName(fullName);
   // console.log("Activate user with email => ",email);
  }

  const handleChange=(e)=>{

    var value=e.target.value;
    setQuery(value);
    value=value.toLowerCase();



    const searchedUser=users.filter((el)=>el.fullName.toLowerCase().includes(value));

    //console.log(searchedUser);
  
    setSearchedUser(searchedUser);
  }


  return(
 
  showLoading?(<LoadingSpinner></LoadingSpinner>):

   (
    <div className='userSection'>
       
       <div className='upperDiv'>
        <div><h3>All Users</h3></div>
       <div className='searchBar'>
        
      <Toolbar>
          
         
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              value={query}
            />
          </Search>
        </Toolbar>
  
       </div>
       </div>

       <div className="lower">
        <UsersCard
           userName={"User"}
           phoneNumber={"Contact"}
           email={"Email"}
           date={"Join Date"}
           status={"Status"}
           isHeader={true}
        
        ></UsersCard>

        {query===""?
         users.length>0?(
        
        users.map((item)=>(

            <UsersCard
           userName={item.fullName}
           date={item.joinDate}
           email={item.email}
           status={item.activeStatus}
           isHeader={false}
           block= {()=>  handleBlock(item.email,item.fullName)}
           activate={()=>handleActivate(item.email,item.fullName)}
            
        ></UsersCard>
        ))
      ):((<><div style={{ textAlign: "center", marginTop: "2rem" }}>No Users to show ...........</div></>))
        
        :
        
        searchedUser.length>0?(
        
        searchedUser.map((item)=>(

            <UsersCard
           userName={item.fullName}
           date={item.joinDate}
           email={item.email}
           status={item.activeStatus}
           isHeader={false}
           block= {()=>  handleBlock(item.email,item.fullName)}
           activate={()=>handleActivate(item.email,item.fullName)}
            
        ></UsersCard>
        ))
      ):((<><div style={{ textAlign: "center", marginTop: "2rem" }}>No Users to show ...........</div></>))
        }

        { }
       </div>
       
      
      </div>
  )



)
}

export default UsersSection;