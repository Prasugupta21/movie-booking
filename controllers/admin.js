const Admin = require("../models/admin");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const addAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if( !email ||!password ){
            return res.status(422).send({message:'Please fill all the field'})
     
        }
        const admin=await  Admin.findOne({email});
    //existing admin
    if(admin){
        return res.status(400).send({message:'Email Already Exits',success:false});
    }
    const hashedPassword=await bcrypt.hash(password,10);     
    const newAdmin= new Admin({email,password:hashedPassword});
        await newAdmin.save();
        return res.status(201).send({message:'Admin Registered Successfully'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Adding  Admin'})
    
    }
}
const LoginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).send({
              
                message:'Please fill all the field'
            })
        }
//checking admin
const admin=await Admin.findOne({email});
if(!admin){
    return res.status(400).send({
     
        message:'Invalid Email or Password'
    })
}

const isMatch=await bcrypt.compare(password,admin.password);
if(!isMatch){
    return res.status(400).send({
        error:'Invalid Email  or Password',
        
    })
}

 //token generation

 const token=await jwt.sign({_id:admin._id},process.env.SECRET,{
    expiresIn:'7d'
});
return res.status(200).send({message:'Admin Login Successful',
admin:{
    id:admin._id,
},
token

})

    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Logging  Admin'})

    }
}


const getAdmins=async(req,res)=>{
    try {
        const admin=await Admin.find({});
        return res.status(200).send({message:'Getting ALL Admin',admin})
 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Getting  All Admin'})

    }
}
 
const getAdminById=async(req,res)=>{
    try {
        const admin=await Admin.findById(req.params.id).populate('addedMovies');
        if(!admin)return res.status(500).send({message:'admin not Found!'});
        return res.status(200).send({message:'Getting Admin by Id',admin});
 
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in getting Admin By Id '})

    }
}
module.exports={
    addAdmin,
    LoginAdmin,
    getAdmins,
    getAdminById
}