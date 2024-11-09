const Booking = require('../models/booking');
const User=require('../models/user');
const bcrypt=require('bcrypt');


const getAllUsers=async (req,res)=>{

try {
    const user=await User.find({});
    if(!user){
        return res.status(500).send({message:
        'User does not Exits'})
    }
    return res.status(200).send({user});
    
} catch (error) {
    console.log(error);
    return res.status(500).send({error:'Error in gettting ALL users'})
}
}

const addUser=async (req,res)=>{
try {
    const {name,email,password}=req.body;
    if(!name || !email ||!password ){
        return res.status(422).send({message:'Please fill all the field'})
 
    }
    const user=await User.findOne({email});
//existing user
if(user){
    return res.send({message:'Email Already Exits',success:false});
}
const hashedPassword=await bcrypt.hash(password,10);     
const newUser= new User({name,email,password:hashedPassword});
    await newUser.save();
    return res.status(201).send({message:'User Registered Successfully',id:newUser._id})

} catch (error) {
    console.log(error);
    return res.status(500).send({error:'Error in Adding  user'})

    
}
}

//update User
const  updateUser=async(req,res)=>{
    try {
        const id=req.params.id;
        const {name,email,password}=req.body;
        if(!name || !email ||!password ){
            return res.status(422).send({message:'Please fill all the field'})
     
        }
        const hashedPassword=await bcrypt.hash(password,10);     

        const user=await User.findByIdAndUpdate(id,{name,email,password:hashedPassword});
       await user.save();
        return res.status(200).send({message:'User Updated Successfully'})




    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Updating  user'})

    }
}

//deleteUser

const deleteUser=async (req,res)=>{
try {
    const id=req.params.id;
   await User.findByIdAndRemove(id);
   return res.status(200).send({message:'User deleted Successfully'})

    
} catch (error) {
    console.log(error);
    return res.status(500).send({error:'Error in Deleting  user'})
}
}


//Login ROute
const LoginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or password'
            })
        }
//checking user
const user=await User.findOne({email});
if(!user){
    return res.status(400).send({
     
        message:'Invalid Email or Password'
    })
}

const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(400).send({
        error:'Invalid Email  or Password',
        
    })
}
return res.status(200).send({message:'User Login Successful',id:user._id})

    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Logging  user'})

    }
}

//getBooking User

const getBookingUser=async(req,res)=>{
    try {
        const bookings=await Booking.find({user:req.params.id}).populate('movie').populate('user');

        if(!bookings)        return res.status(500).send({message:'Unable to get Booking '})
        return res.status(200).send({message:'Getting All Booking User',bookings})


    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in getting Booking  user'})

    }
}

const getUserById=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(!user)return res.status(500).send({message:'user not Found!'});
        return res.status(200).send({message:'Getting user by Id',user});
 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in getting User By Id '})

    }
}
module.exports={
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    LoginUser,
    getUserById,
    getBookingUser
}