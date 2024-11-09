const {Schema,model}=require('mongoose');

const movieSchema=new Schema({
   
    title:{
        type:String,
        required:true,
     
    },
    description:{
        type:String,
        required:true,
       
    },
   releaseDate:
    {
        type:Date,
        required:true,

    },
    actors:[{type:String,required:true}],
    posterURL:{
        type:String,
        required:true,
       
    },
    featured:{
      type:Boolean
       
    },
    bookings:[{type:Schema.Types.ObjectId,ref:'booking'}],
    admin:{
        type:Schema.Types.ObjectId,
        ref:'admin',
       
       

    }
   
})

const Movie=model('movie',movieSchema);
module.exports=Movie;