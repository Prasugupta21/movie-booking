require('dotenv').config();
const express=require('express');
const connectDB=require('./config/db');


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



app.get('/',(req,res)=>{
    return res.send('welcome to home page');
});
app.listen(PORT,()=>{
    console.log(`server started on  mode on port ${PORT}`)
})