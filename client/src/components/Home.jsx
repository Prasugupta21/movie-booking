import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api/api'

const Home = () => {
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch(err=> console.log(err));
    },[]);
    console.log(movies);
  return (
  <Box width={'70vw'} height={'100vh'} margin={'auto'} marginTop={2} >
    <Box margin={'auto'} width={'80%'} height={'40vh'} padding={2}>
        < img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Ju2ZVHz2JOlVIc_BjMCnEuZRorjb7Xk2ow&usqp=CAU' alt='Hari Darshan' height={'100%'} width={'100%'} />

    </Box>
<Box padding={5} margin={'auto '} >
    <Typography variant='h4' textAlign={'center'}>Latest Releases</Typography>
</Box>
<Box display={'flex'} width={'100%'} justifyContent={'center'} flextWrap={'wrap'}>
   {movies && movies.slice(0,4).map((movie,index)=>(<MovieItem id={movie._id} key={index} title={movie.title} posterURL={movie.posterURL}  releaseDate={movie.releaseDate}/>))}
</Box>
<Box display={'flex'} padding={5} margin={'auto'} textAlign={'center'}>
    <Button  varient='contained' sx={{margin:'auto',width:'25rem',bgcolor:'rgb(0 0 0 / 87%)',color:'white',textAlign:'center',":hover":{
    bgcolor:'#121217'}}} LinkComponent={Link} to="/movies">
       View All Movies 
    </Button>

</Box>
  </Box>
  )
}

export default Home

