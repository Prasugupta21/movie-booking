const mongoose = require("mongoose");
const Booking = require("../models/booking");
const Movie = require("../models/movie");
const User = require("../models/user");

const newBooking=async(req,res)=>{
try {
    const {movie,date,seatNumber,user}=req.body;
    
    if(!movie ){
        return res.status(422).send({error:'Movie name is required'})

    }
    
  
    // const seat=existingMovie.bookings.seatNumber;
    // const existingSeat=await Booking.find({seatNumber});
    // const newDate=existingMovie.bookings.date;
    // const existingDate=await Booking.find({date});
    // if(seat && existingSeat && newDate  && existingDate && existingSeat==seat && newDate==existingDate){
        
    // return res.status(400).send({error:` Seat ${seatNumber}  is Already Booked !`})
 
    // }
    
    const existingMovie=await Movie.findById(movie);
    const existingUser=await User.findById(user);
    if(!existingMovie){
        return res.status(404).send({message:'Movie Not Found !'})

    }
    if(!existingUser)        return res.status(404).send({message:'User Not Found ! '})

    const newlyBooking=new Booking({
        movie,
        date:new Date(`${date}`),
        seatNumber,
        user
    });
    const session= await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(newlyBooking);
    existingMovie.bookings.push(newlyBooking);
    await existingMovie.save({session});
    await existingUser.save({session})
    await newlyBooking.save({session});
    session.commitTransaction();
    return res.status(201).send({message:`Your seat is Booked for Movie ${newlyBooking.movie}`,booking:newlyBooking})

} catch (error) {
    console.log(error);
    return res.status(500).send({error:'Error in booking movie'})

}
}

const getBookingById=async(req,res)=>{
    try {
        const booking=await Booking.findById(req.params.id).populate('movie');
        return res.status(200).send({booking})

    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Getting bookingByID '})
    }
}

//delete Booking

const deleteBoookingById=async(req,res)=>{
    try {
      const booking= await Booking.findByIdAndRemove(req.params.id).populate("user movie");
      console.log(booking);
       const session=await mongoose.startSession();
       session.startTransaction();
      await booking.user.bookings.pull(booking);
      await booking.movie.bookings.pull(booking);
      await booking.movie.save({session});
      await booking.user.save({session});
      session.commitTransaction();   
     return res.status(200).send({message:'Booking Deleted Successfully'})


    } catch (error) {
        console.log(error);
        return res.status(500).send({error:'Error in Deleting bookingByID '})
    }
}
module.exports={
    newBooking,
    getBookingById,
    deleteBoookingById
}