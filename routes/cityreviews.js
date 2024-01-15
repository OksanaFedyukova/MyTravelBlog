const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateCityreview, isLoggedIn, isCityreviewAuthor } = require('../middleware');
const City = require('../models/city');
const Cityreview = require('../models/cityreview');
const cityreviews = require('../controllers/cityreviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateCityreview, catchAsync(cityreviews.createCityreview))

router.delete('/:cityreviewId', isLoggedIn, isCityreviewAuthor, catchAsync(cityreviews.deleteCityreview))

module.exports = router;