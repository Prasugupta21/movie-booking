import React from 'react'
import AuthForm from './AuthForm'
import { sendAdminLoginRequest } from '../../api/api';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onResReceived=(data)=>{
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem('adminId',data.admin.id);
    localStorage.setItem('token',data.token);
  navigate('/');

  }
  const getData=(data)=>{
    console.log('data' ,data);
    sendAdminLoginRequest(data.input).then(onResReceived).catch(err=>console.log(err));
  }
  return (
    <div>

      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin;