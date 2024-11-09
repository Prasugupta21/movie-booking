require('dotenv').config();
const express=require('express');
const connectDB=require('./config/db');
const path=require('path');

const PORT=process.env.PORT ||3000  ;
const app=express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/users',require('./routes/user'));
app.use('/admin',require('./routes/admin'));
app.use('/movie',require('./routes/movie'));
app.use('/booking',require('./routes/booking'));



connectDB();


app.use(express.static(path.join(__dirname,'./client/build')));

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

app.listen(PORT,()=>{
    console.log(`server started on  mode on port ${PORT}`)
})