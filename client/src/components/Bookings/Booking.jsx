import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../../api/api';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {
  const navigate=useNavigate();
const id =useParams().id;
const [movie,setMovie]=useState('');
console.log(id);
const [input,setInput]=useState({seatNumber:'',date:''});
    useEffect(()=>{
      getMovieDetails(id).then(res=>setMovie(res.movie)).catch(err=>console.log(err));
    },[id]);
    console.log(movie);

    const handleChange=(e)=>{
      setInput(prevState=>({...prevState,[e.target.name]:e.target.value}))
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      newBooking({...input,movie:movie._id}).then((res)=>navigate(`/booked/${res.booking._id}`)).catch(err=>console.log(err));

    }
  return (
<div>

    {movie && <Fragment>

<Typography padding={3} fontFamily={'fantasy'} variant='h4'
 textAlign={'center'} >
    Book Tickets of Movie: {movie.title}
   
   
    </Typography>     
    <Box display={'flex'} justifyContent={'center'}  >

        <Box display={'flex'} justifyContent={'column'} flexDirection={'column'} padding={3} width='50%' marginRight={'auto'}>

            <img src={movie.posterURL} alt={movie.title} width='80%' height={'300px'} />
            <Box width={'80%'} marginTop={3} padding={2}>
                <Typography padding={2}>{movie.description}</Typography>
                <Typography fontWeight={'bold'} marginTop={1}>
                  Starrer:
                  {movie.actors.map((actor)=>  " " + actor+ ",")}
</Typography>
<Typography fontWeight={'bold'} marginTop={1} >
  Release Date: {new Date(movie.releaseDate).toDateString()}</Typography>            </Box>
        </Box>
     <Box width={'50%'} paddingTop={3} >

      <form onSubmit={handleSubmit} >
        <Box padding={5} margin={'auto'} display={'flex'} flexDirection={'column'}>
          <FormLabel >
            Seat Number</FormLabel> 
            <TextField name='seatNumber'  type='number' margin='normal' variant='standard'  value={input.seatNumber} onChange={handleChange}/>
            <FormLabel >
         Booking Date</FormLabel> 
            <TextField name='date'  type='date' margin='normal' variant='standard'  value={input.date} onChange={handleChange} />
            <Button type='submit' sx={{mt:3}}>Book Now</Button>


        </Box>
      
      </form>
      </Box>   
     </Box>
       </Fragment>}
</div>
  )
}

export default Booking