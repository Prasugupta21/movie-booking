import React ,{useEffect, useState}from 'react'
import {AppBar,Autocomplete,IconButton,Tab,Tabs,TextField,Toolbar} from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import {Box} from '@mui/system';
import { getAllMovies } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';
const Header = () => {
const dispatch=useDispatch();
const navigate=useNavigate();
const [value, setValue] = useState(0);
const [movies, setMovies] = useState("");
const isAdminLoggedIn=useSelector((state)=> state.admin.isLogggedIn);
const isUserLoggedIn=useSelector((state)=> state.user.isLogggedIn);
useEffect(()=>{
    getAllMovies().then(data=>setMovies(data.movies)).catch(err=>console.log(err));
},[]);
const logout=(isAdmin)=>{
dispatch(isAdmin?adminActions.logout():userActions.logout());
}

const handleChange=(e,val)=>{
const movie=movies.find((m)=>m.title===val);
if(isUserLoggedIn){
  navigate(`/booking/${movie._id}`)
}
}
  return (
<AppBar  position='sticky' sx={{bgcolor:'#2b2d42'}}>
<Toolbar >
 <Box width={'20%'}>
  <IconButton LinkComponent={Link} to='/' sx={{bgcolor:'#ccc',":hover":{bgcolor:'#ccc'}}}>
  <MovieIcon />
  </IconButton>

 </Box>
 <Box width={'50%'} margin={'auto'}>
 { isUserLoggedIn && !isAdminLoggedIn && (
 <Autocomplete
  disablePortal
  options={movies && movies?.map((movie)=>movie.title)}
  sx={{ width: 300 }} onChange={handleChange}
  renderInput={(params) =>
   <TextField sx={{input:{color:'white'}}} variant='standard' {...params} placeholder="Search Across Movies" />}
/>)}

 </Box>
 <Box display={'flex'}>
<Tabs  textColor='inherit' indicatorColor='secondary' value={value} >
<Tab LinkComponent={Link} to='/movies' label='Movies' onClick={(e,val)=>setValue(val)}/>{!isAdminLoggedIn && !isUserLoggedIn  && (<>

  <Tab LinkComponent={Link} to='/auth'  label='Auth' onClick={(e,val)=>setValue(val+1)}/>
<Tab  LinkComponent={Link} to='/admin'  label='Admin' onClick={(e,val)=>setValue(val+2)}/>
</>)}
{isUserLoggedIn && (
  <>
    <Tab LinkComponent={Link} to='/users'  label='Profile' onClick={()=>setValue(1)}/>
<Tab  LinkComponent={Link} to='/'  label='Logout' onClick={()=>logout(false)} />

  </>
)}
{isAdminLoggedIn && (
  <>
    <Tab LinkComponent={Link} to='/add'  label='Add Movie' onClick={()=>setValue(1)}/>
<Tab  LinkComponent={Link} to='/user-admin'  label='Profile' onClick={()=>setValue(2)}/>
<Tab  LinkComponent={Link} to='/'  label='Logout' onClick={()=>logout(true)} />

  </>
)}
</Tabs>
 </Box>
</Toolbar>
</AppBar>
  )
}

export default Header