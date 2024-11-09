const express=require('express');
const { addMovie, getMovies, getSingleMovie, updateMovie } = require('../controllers/movie');
const router=express.Router();

router.post('/',addMovie);
router.get('/',getMovies);
router.get('/:id',getSingleMovie);

router.put('/:id',updateMovie);


module.exports=router;

