const express=require('express');
const router=express.Router();
const { getAllUsers, addUser, updateUser, deleteUser, LoginUser, getBookingUser, getUserById } = require('../controllers/user');
// router.post('/register',registerController);
// router.get('/test',requireSignIn,isAdmin,testController);

// Home Route
router.get('/',getAllUsers);
router.post('/register',addUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/:id',getUserById);

router.post('/login',LoginUser);
router.get('/bookings/:id',getBookingUser);

module.exports=router;

