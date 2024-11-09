import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../api/api';
import { Box, Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const AddedMovie = () => {
    const [movie,setMovie]=useState();
    const id=useParams().id;
useEffect(()=>{
    getMovieById(id).then((res)=>setMovie(res)).catch(err=>console.log(err));
},[]);
console.log("movie",movie);
  return (
    
    <Box>
    <Container sx={{}}>
    <Box sx={{ bgcolor: '#20e74d', height: '20vh' ,marginTop:5,display:'flex',flexDirection:'column',}} >  
    <Typography textAlign={'center'} margin={1} fontWeight={'bold'} fontSize={22}> The Movie {(movie?.movie?.title) }  has been Succesfully Added</Typography>
    </Box>
    <List>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Movie
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {movie?.movie?.title}
        </ListItemText>
      
       
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Movie Id
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {movie?.movie?._id}
        </ListItemText>
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Description
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {movie?.movie?.description}
        </ListItemText>
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
Actors
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {movie?.movie?.actors.map((actor)=>(actor + ","))}
        </ListItemText>
      </ListItem>
      <ListItem sx={{bgcolor:'black',color:'white',textAlign:'center',margin:1}}>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'left'}}>
        Release Date
        </ListItemText>
        <ListItemText sx={{margin:1,width:'auto',textAlign:'right'}}>
        {new Date(movie?.movie?.releaseDate).toDateString()}
        </ListItemText>
      </ListItem>
  
    
  </List>
  </Container>
  </Box>
  )
}

export default AddedMovie