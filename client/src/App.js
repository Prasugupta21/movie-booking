import './App.css';
import { Routes ,Route} from 'react-router-dom';
import Header from './components/Header';
import Movies from './components/Movies/Movies';
import Home from './components/Home';
import Admin from './components/Auth/Admin';
import Auth from './components/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminActions, userActions } from './store';
import Booking from './components/Bookings/Booking';
import UserProfile from './components/Profile/UserProfile';
import AddMovie from './components/Movies/AddMovie';
import AdminProfile from './components/Profile/AdminProfile';
import BookingDetail from './components/Bookings/BookingDetail';
import AddedMovie from './components/Movies/AddedMovie';
function App() {
  const dispatch=useDispatch();
  const isAdminLoggedIn=useSelector((state)=> state.admin.isLogggedIn);
  const isUserLoggedIn=useSelector((state)=> state.user.isLogggedIn);
  console.log("isAdminLoggedIn",isAdminLoggedIn)
  console.log("IsUserLoggiedin",isUserLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem('userId')){
  dispatch(userActions.login());
    }else if(localStorage.getItem('adminId')){
      dispatch(adminActions.login());

    }
  },[])
  return (
    <div >
     {/* Headers */}

<Header />
     {/* Hompage */}
     <section>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/movies' element={<Movies/>}/>


{ !isUserLoggedIn && !isAdminLoggedIn && ( <><Route path='/admin' element={<Admin/>}/>
  <Route path='/auth' element={<Auth/>}/> 
  
  </>)}


{isUserLoggedIn && !isAdminLoggedIn &&  ( 
<>
<Route path='/users' element={<UserProfile/>}/>
<Route path='/booking/:id' element={<Booking/>}/>
<Route path='/booked/:id' element={<BookingDetail/>}/>
</>)
}


 {isAdminLoggedIn && !isUserLoggedIn &&( <> 
 <Route path='/add' element={<AddMovie/>}/>
 <Route path='/add/:id' element={<AddedMovie/>}/>
  <Route path='/user-admin' element={<AdminProfile/>}/></>)}
</Routes>
     </section>
     
    </div>
  );
}

export default App;
