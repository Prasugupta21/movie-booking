const express=require('express');
const { addAdmin, LoginAdmin, getAdmins, getAdminById } = require('../controllers/admin');
const router=express.Router();

router.post('/register',addAdmin);



router.post('/login',LoginAdmin);
router.get('/',getAdmins);

router.get('/:id',getAdminById);
module.exports=router;

