const {Schema,model}=require('mongoose');

const bookingSchema=new Schema({
   
    movie:{
        type:Schema.Types.ObjectId,
        ref:'movie',
        required:true,
     
    },
    date:{
        type:Date,
        required:true
    },
    seatNumber:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
    
    }
  
})

const Booking=model('booking',bookingSchema);
module.exports=Booking;