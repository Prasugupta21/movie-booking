import { Box, Button, Checkbox, FormLabel,  TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const navigate=useNavigate();
    const [input,setInput]=useState({title:'',description:'',posterURL:'',releaseDate:'',featured:false});
    const [actors,setActors]=useState([]);
    const [actor,setActor]=useState('');

    const handleChange=(e)=>{
        setInput((prevState)=>({...prevState,[e.target.name]:e.target.value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(input,actors);
        addMovie({...input,actors}).then(res=>navigate(`/add/${res.movie._id}`)).catch(err=>console.log(err));
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>


            <Box width={'50%' } margin='auto' display={'flex'} flexDirection='column' boxShadow={'10px 10px 20px #ccc'} paddingk={10}>
<Typography textAlign={'center'} variant='h5' fontFamily={'verdana'} >
    Add New Movie
</Typography>
<FormLabel sx={{mt:1,mb:1}} >
    Title
</FormLabel>
<TextField name='title' variant='standard' margin='normal'  value={input.title} onChange={handleChange}/>
<FormLabel sx={{mt:1,mb:1}} >
    Description
</FormLabel >
<TextField name='description' variant='standard' margin='normal'value={input.description} onChange={handleChange} />
<FormLabel sx={{mt:1,mb:1}} >
    PosterURL
</FormLabel>
<TextField name='posterURL' variant='standard' margin='normal'  value={input.posterURL} onChange={handleChange}/>
<FormLabel sx={{mt:1,mb:1}} >
    Release Date
</FormLabel >
<TextField name='releaseDate' type='date' variant='standard' margin='normal'  value={input.releaseDate} onChange={handleChange}/>
<FormLabel sx={{mt:1,mb:1}} >
    Actors
</FormLabel>
<Box display={'flex'} >


<TextField name='actor' value={actor} onChange={(e)=>setActor(e.target.value)} variant='standard' margin='normal'  />
<Button onClick={()=>{setActors([...actors,actor]);setActor('')}} >Add</Button>
</Box>

<FormLabel sx={{mt:1,mb:1}} >
    Featured
</FormLabel >
<Checkbox  name='featured' checked={input.featured} onClick={(e)=>setInput((prevState)=>({...prevState,featured:e.target.checked}))} sx={{mr:'auto'}} />
<Button type='submit' variant='contained' sx={{width:'30%',margin:'auto',bgcolor:'#2b2d42',":hover":{
    bgcolor:'#121217'
}}}>Add New Movie</Button>
            </Box>
        </form>
        
        </div>
  )
}

export default AddMovie