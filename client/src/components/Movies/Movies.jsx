import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api/api';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    getAllMovies().then((data)=> setMovies(data.movies)).catch(err=> console.log(err));
  },[])
  return (
 <Box margin={'auto'} marginTop={4} width={'80vw'} textAlign={'center'}>
  <Typography margin={'auto'} varient="h4" textAlign={'center'} width={'40%'} padding={2} bgcolor={'#900C3F'} color={'white'} >
    All Movies
  </Typography>
<Box  width={'90vw'} margin={'auto'} marginLeft={6} marginTop={5} display={'flex'} justifyContent={'flex-start'} flexWrap={'wrap'} textAlign={'center'} >
  {movies && movies.map((movie,index)=> <MovieItem key={index} id={movie._id} posterURL={movie.posterURL} releaseDate={movie.releaseDate} title={movie.title} />)}

</Box>
 </Box>
  )
}

export default Movies