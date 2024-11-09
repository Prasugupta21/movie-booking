const mongoose = require("mongoose");
const Movie = require("../models/movie");
const jwt=require('jsonwebtoken');
const Admin = require("../models/admin");

const addMovie=async(req,res)=>{
try {
    const extractedToken=req.headers.authorization.split(" ")[1];//Bearer Token
    if(!extractedToken){
        return res.status(404).send({error:'Toekn not Found in Admin Crendentials'})

    }
    // console.log(extractedToken);

    //verification
    const decode=jwt.verify(req.headers.authorization.split(" ")[1],process.env.SECRET);
    req.admin=decode; 
    const adminId=req.admin._id;
    //creating new Movie
    
    const {title,description,posterURL,featured,actors,releaseDate}=req.body;
    if(!title || !description  ||!posterURL)return res.status(422).send({error:'Invalid Inputs'});
    const movie=new Movie({title,description,releaseDate:new Date(`${releaseDate}`),featured,admin:adminId,actors,posterURL});
    const session=await mongoose.startSession();

    const adminUser=await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({session});
    await session.commitTransaction();
    return res.status(201).send({message:'Successfully Create movie',movie})


} catch (error) {
    console.log(error);
    return res.status(500).send({error:'Error in Adding Movie'})

}
}


//getting Movies

const getMovies=async(req,res)=>{
try {
    const movies=await Movie.find({});
  if(!movies)  return res.status(500).send({message:'No Movie Found !'})
return res.status(200).send({movies})

} catch (error) {
    console.log(error);
    return res.status(500).send({error:'Error in Getting All Movie'})

}
}

const getSingleMovie=async(req,res)=>{
    try {
        const movie=await Movie.findById(req.params.id);
      if(!movie)  return res.status(500).send({message:'No Movie Found !'})
    return res.status(200).send({movie})
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Getting Single Movie'})
    
    }

}

const  updateMovie=async(req,res)=>{
    try {
        const id=req.params.id;
        const {posterURL}=req.body;
        if(!posterURL)return res.status(422).send({error:'Invalid Inputs'});
    
        
        const movie=await Movie.findByIdAndUpdate(id,{posterURL});
       await movie.save();
        return res.status(200).send({message:'Movie Updated Successfully'})




    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Updating  Movie'})

    }
}
    module.exports={
    addMovie,
    getMovies,
    getSingleMovie,
    updateMovie
}