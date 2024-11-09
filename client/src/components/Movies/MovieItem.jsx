import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonItem from './ButtonItem'
import { useSelector } from 'react-redux'

const MovieItem = ({title,posterURL,id,releaseDate}) => {
  const isAdminLoggedIn=useSelector((state)=> state.admin.isLogggedIn);
  const isUserLoggedIn=useSelector((state)=> state.user.isLogggedIn);

  return (
    <Card sx={{ width: 320,height:320,borderRadius:5,":hover":{
        boxShadow:'10px 10px 20px #ccc'
    } ,margin:3}} >
   <img src={posterURL} alt={title} height={'50%'} width={'100%'}/> 
   
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
     {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       {new Date(releaseDate).toDateString()}
      </Typography>
    </CardContent>
    <CardActions>
{ isUserLoggedIn && !isAdminLoggedIn &&  (< ButtonItem  id={id}/>)}
    </CardActions>
  </Card>
  )
}

export default MovieItem