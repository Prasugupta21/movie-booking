import {configureStore, createSlice} from  "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{isLogggedIn:false},
    reducers:{
        login(state){
            state.isLogggedIn=true;
        },
        logout(state){
            localStorage.removeItem('userId');
            state.isLogggedIn=false;
        },
    }
})
const adminSlice=createSlice({
    name:'auth',
    initialState:{isLogggedIn:false},
    reducers:{
        login(state){
            state.isLogggedIn=true;
        },
        logout(state){
            localStorage.removeItem('adminId');
            localStorage.removeItem('token');
            state.isLogggedIn=false;
        },
    }
})



export const userActions=userSlice.actions;
export const adminActions=adminSlice.actions;
export const store=configureStore({
    reducer:{
        user:userSlice.reducer,
        admin:adminSlice.reducer
    }
})