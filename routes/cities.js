const express = require('express');
const router = express.Router();
const cities = require('../controllers/cities');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCity } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const City = require('../models/city');

router.route('/')
    .get(catchAsync(cities.index))
    .post(isLoggedIn, upload.array('image'), validateCity, catchAsync(cities.createCity))


router.get('/new', isLoggedIn, cities.renderNewForm)

router.route('/:id')
    .get(catchAsync(cities.showCity))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCity, catchAsync(cities.updateCity))
    .delete(isLoggedIn, isAuthor, catchAsync(cities.deleteCity));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(cities.renderEditForm))


  

module.exports = router;