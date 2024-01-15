const { citySchema, cityreviewSchema } = require('./schemas.js');

const ExpressError = require('./utils/ExpressError');

const City = require('./models/city');
const Cityreview = require('./models/cityreview');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


/* cities */
module.exports.validateCity = (req, res, next) => {
    const { error } = citySchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const city = await City.findById(id);
    if (!city.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/cities/${id}`);
    }
    next();
}

module.exports.isCityreviewAuthor = async (req, res, next) => {
    const { id, cityreviewId } = req.params;
    const cityreview = await Cityreview.findById(cityreviewId);
    if (!cityreview.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/cities/${id}`);
    }
    next();
}

module.exports.validateCityreview = (req, res, next) => {
    const { error } = cityreviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}