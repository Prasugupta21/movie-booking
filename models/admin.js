const {Schema,model}=require('mongoose');

const adminSchema=new Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
   addedMovies:[
    {
        type:Schema.Types.ObjectId,
        ref:'movie'
        
    }
   ]
})

const Admin=model('admin',adminSchema);
module.exports=Admin;