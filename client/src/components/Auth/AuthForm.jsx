import { Typography,Dialog, FormLabel, TextField, Box, Button, IconButton } from '@mui/material'
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const AuthForm = ({onSubmit,isAdmin}) => {
  const[isSignUp,setIsSignUp]=useState(false);
  const[input,setInput]=useState({name:'',email:'',password:''});
const handleChange=(e)=>{
  setInput((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
}

const handleSubmit=(e)=>{
  e.preventDefault();
onSubmit({input,signup:isAdmin?false:isSignUp});

}
  return (
   <Dialog  PaperProps={{style:{borderRadius:20}}}  open={true}>
    <Box sx={{ml:'auto',padding:1}}>
    <IconButton LinkComponent={Link} to='/' >
      <CloseIcon />
    </IconButton>
    </Box>
    <Typography variant='h4' textAlign={'center'} >
    {isSignUp ? 'Signup': 'Login'}
    </Typography>
    <form onSubmit={handleSubmit}>
        <Box display={'flex'} flexDirection="column" width={400} justifyContent={'center'} margin={'auto'} alignContent=
        {'center'} padding={6}>
    
{!isAdmin && isSignUp && <><FormLabel   sx={{mt:1,mb:1}}>Name</FormLabel>
<TextField margin='normal' variant="standard" type={'text'} name='name' value={input.name}  onChange={handleChange}/>
</>}

<FormLabel   sx={{mt:1,mb:1}} >Email</FormLabel>
<TextField margin='normal' variant="standard" type={'email'} name='email' value={input.email}  onChange={handleChange}/>
<FormLabel  sx={{mt:1,mb:1}} >Password</FormLabel>
<TextField margin='normal'  variant="standard" type={'password'} name='password' value={input.password}  onChange={handleChange} />
<Button  sx={{mt:2,borderRadius:10,bgcolor:'#2b2d42'}} variant='contained' type='submit' fullWidth>{isSignUp ? 'Signup': 'Login'}</Button>
{ !isAdmin && (<Button onClick={()=> setIsSignUp(!isSignUp)} sx={{mt:2,borderRadius:10}}   fullWidth>Switch To {isSignUp ? "Login" :"Signup"}</Button>)}
        </Box>
    </form>
   </Dialog>
  )
}

export default AuthForm;
