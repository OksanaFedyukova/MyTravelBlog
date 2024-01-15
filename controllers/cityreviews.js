const City = require('../models/city');
const Cityreview = require('../models/cityreview');

module.exports.createCityreview = async (req, res) => {
    const city = await City.findById(req.params.id);
    const cityreview = new Cityreview(req.body.cityreview);
    cityreview.author = req.user._id;
    city.cityreviews.push(cityreview);
    await cityreview.save();
    await city.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/cities/${city._id}`);
}

module.exports.deleteCityreview= async (req, res) => {
    const { id, cityreviewId } = req.params;
    await City.findByIdAndUpdate(id, { $pull: { cityreviews: cityreviewId } });
    await Cityreview.findByIdAndDelete(cityreviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/cities/${id}`);
}
