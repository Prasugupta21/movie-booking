import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserAllBookings, getUserDetails } from '../../api/api';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
const UserProfile = () => {
  const [bookings,setBooking]=useState();
const [user,setUser]=useState();
useEffect(()=>{
  getUserAllBookings().then((res)=>setBooking(res.bookings)).catch(err=>console.log(err));

  getUserDetails().then(res=>setUser(res.user)).catch(err=>console.log(err));
  
},[bookings,user]);
console.log("bookings",bookings);
const handleDelete=(id)=>{
  deleteBooking(id).then(res=>console.log(res)).catch(err=>console.log(err));
 


}
  return (
    
   <Box display={'flex'} width={'100%'}>
   <Fragment> 

    {user && (
    <Box  padding={3} width={'30%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
    <AccountCircleIcon sx={{fontSize:'10rem',textAlign:'center',ml:3}} />
    <Typography padding={1} width={'auto'}  textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>Name:{user.name}</Typography>
    <Typography padding={1} width={'auto'}  textAlign={'center'} border={'1px solid #ccc'} marginTop={1} borderRadius={6}>Email:{user.email}</Typography>
    </Box>
    )}

    {bookings && (
    <Box width={'70%'} display={'flex'} flexDirection={'column'}>
<Typography variant='h3' fontFamily={'verdana'} textAlign={'center'} padding={2}>Bookings</Typography>
<Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'} >
  <List>
    {bookings.map((booking,index)=> (
      <ListItem sx={{bgcolor:'#00d386',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Movie:{booking.movie.title}
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Seat:{booking.seatNumber}
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Date:{new Date(booking.date).toDateString()}
        </ListItemText>
        <IconButton  onClick={()=>handleDelete(booking._id)} color='error'>
          <DeleteSharpIcon  color='red'/>
        </IconButton>
      </ListItem>
    ))}
  </List>
</Box>
    </Box>
    )}
    </Fragment>
   </Box>
  )
}

export default UserProfile;