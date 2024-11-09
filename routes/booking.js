const express=require('express');
const { newBooking, getBookingById, deleteBoookingById } = require('../controllers/booking');
const router=express.Router();

router.post('/',newBooking);
router.get('/:id',getBookingById);
router.delete('/:id',deleteBoookingById);



// router.post('/login',LoginAdmin);

module.exports=router;

