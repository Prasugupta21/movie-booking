import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getBookingById, getUserAllBookings, getUserDetails } from '../../api/api';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {  useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
const BookingDetail = () => {
  const [booking,setBooking]=useState({});

const id =useParams().id;


useEffect(()=>{
  getBookingById(id).then(res=>setBooking(res)).catch(err=>console.log(err));
},[]);
console.log('booking detail',booking);
  return (
    
//    <Box display={'flex'} width={'100%'}>
//    <Fragment> 

  

  
//     <Box width={'70%'} display={'flex'} flexDirection={'column'}>
// <Box margin={'auto'} display={'flex'} flexDirection={'column'} width={'80%'} >
//   <List>
//     {booking.map((booking,index)=> (
//       <ListItem sx={{bgcolor:'#00d386',color:'white',textAlign:'center',margin:1}}>
//         <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
// Movie:{booking.movie.title}
//         </ListItemText>
//         <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
// Seat:{booking.seatNumber}
//         </ListItemText>
//         <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
// Date:{new Date(booking.date).toDateString()}
//         </ListItemText>
       
//       </ListItem>
//     ))}
//   </List>
// </Box>
//     </Box>

//     </Fragment>
//    </Box>

//    <Box display={'flex'} width={'100%'}>
//  <Typography variant='h3' fontFamily={'verdana'} textAlign={'center'} padding={2}>Booking Detail</Typography>

// </Box>



<Container sx={{}}>
 
  <Box sx={{ bgcolor: '#20e74d', height: '20vh' ,marginTop:5,display:'flex',flexDirection:'column',}} >  
<Box textAlign={'center'} margin={1} fontWeight={'bold'} fontSize={22}> You Have Succesfully Booked The Ticket for the Movie :{booking  && (booking?.booking?.movie?.title) }</Box>
</Box>
<Box marginTop={4} display={'flex'} flexDirection={'column'} >

<Typography width={'100%' } textAlign={'center'} variant='h3' color={'black'} >  Booking Details</Typography>
<List>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Booking Id
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {booking?.booking?._id}
        </ListItemText>
      
       
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Movie Id
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {booking?.booking?.movie?._id}
        </ListItemText>
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Seat Number
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {booking?.booking?.seatNumber}
        </ListItemText>
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Booked Date
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {new Date(booking?.booking?.date).toDateString()}
        </ListItemText>
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
        Date Of Booking
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {new Date(Date.now()).toDateString()}
        </ListItemText>
      </ListItem>
  
    
  </List>

</Box>
  
 
</Container>

  )
}

export default BookingDetail;