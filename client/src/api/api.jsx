import axios from 'axios';

export const getAllMovies=async()=>{
const res=await axios.get('/movie');
if(res.status!==200)return console.log("NO DATA");
const data=await res.data;
return data;
}

export const sendUserAuthRequest=async(data,signup)=>{
  const res=await  axios.post(`/users/${signup ? 'register' : 'login'}`,{
        name: signup ? data.name :'',
        email:data.email,
        password:data.password
    }).catch(err=> console.log(err));
    if(res.status!==200 && res.status!==201)console.log('unexpected error Occured');
    return await res.data;
}

export const sendAdminLoginRequest=async (data)=>{
   const res=await axios.post('/admin/login',{
        email:data.email,
        password:data.password
    }).catch(err=> console.log(err));
    if( res && res.status!==200){
         console.log("Unexpected Error");
    }
    return await res?.data;
}

export const getMovieDetails=async(id)=>{
 const res=await axios.get(`/movie/${id}`).catch(err=>console.log(err));
if(res.status!==200)console.log('unexpected error');
return await res?.data;
}

export const newBooking=async(data)=>{
const res=await axios.post('/booking',{
    movie:data.movie,
    seatNumber:data.seatNumber,
    date:data.date,
    user:localStorage.getItem('userId')
}).catch(err=>console.log(err));
if(res.status!==201)console.log('unexpected error');
return await res?.data;

}

export const getUserAllBookings=async()=>{
    const id=localStorage.getItem('userId');
    const res=await axios.get(`/users/bookings/${id}`);
    if(res.status!==200)console.log('unexpected error');
     const resData=await res.data;
return resData;

}
export const deleteBooking=async(id)=>{

  const res= await axios.delete(`/booking/${id}`);
    if(res.status!==200)console.log('unexpected error');
     const resData=await res.data;
return resData;

}
export const getUserDetails=async()=>{
const id=localStorage.getItem('userId');
  const res= await axios.get(`/users/${id}`);
    if(res.status!==200)console.log('unexpected error');
     const resData=await res.data;
return resData;

}
export const addMovie=async(data)=>{
  const res= await axios.post('/movie',{
    title:data.title,
    description:data.description,
    releaseDate:data.releaseDate,
    posterURL:data.posterURL,
    featured:data.featured,
    actors:data.actors,
    admin:localStorage.getItem('adminId'),

  },{headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }}).catch(err=>console.log(err));
  console.log(res);
    if(res.status!==201)console.log('unexpected error');
     const resData=await res.data;
return resData;

}

export const getAdminById=async()=>{
    const id=localStorage.getItem('adminId');
      const res= await axios.get(`/admin/${id}`);
        if(res.status!==200)console.log('unexpected error');
         const resData=await res.data;
    return resData;
    
    }
export const getBookingById=async(id)=>{
      const res= await axios.get(`/booking/${id}`);
        if(res.status!==200)console.log('unexpected error');
         const resData=await res.data;
    return resData;
    
    }
export const getMovieById=async(id)=>{
      const res= await axios.get(`/movie/${id}`);
        if(res.status!==200)console.log('unexpected error');
         const resData=await res.data;
    return resData;
    
    }