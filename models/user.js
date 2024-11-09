const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
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
    bookings:[{type:Schema.Types.ObjectId,
    ref:'booking'
}],
   
},{timestamps:true})

const User=model('user',userSchema);
module.exports=User;