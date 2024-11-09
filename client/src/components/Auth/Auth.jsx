import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api/api';
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
const onResReceived=(data)=>{
  console.log(data);
  dispatch(userActions.login());
  localStorage.setItem("userId",data.id);
  navigate('/');
}
  const getData=(data)=>{
     console.log("calling form auth " ,data);
     sendUserAuthRequest(data.input,data.signup).then(onResReceived).catch(err=> console.log(err));
  }
  return (
    <AuthForm onSubmit={getData} isAdmin={false}/>
  )
}

export default Auth