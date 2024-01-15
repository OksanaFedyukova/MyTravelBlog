const City = require('../models/city');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
//const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

let geocoder;

// Verifica si el token de Mapbox está presente antes de configurar el cliente
if (mapBoxToken) {
  geocoder = mbxGeocoding({ accessToken: mapBoxToken });
} else {
  console.error('Mapbox token is missing. Geocoding functionality will be disabled.');
}
module.exports.index = async (req, res) => {
    const cities = await City.find({}).populate('popupText');
    res.render('cities/index', { cities })
}

module.exports.renderNewForm = (req, res) => {
    res.render('cities/new');
}

module.exports.createCity = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.city.location,
        limit: 1
    }).send()
    const city = new City(req.body.city);
    city.geometry = geoData.body.features[0].geometry;
    city.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    city.author = req.user._id;
    await city.save();
    console.log(city);
    req.flash('success', 'Successfully made a new city!');
    res.redirect(`/cities/${city._id}`)
}

module.exports.showCity = async (req, res,) => {
    const city = await City.findById(req.params.id).populate({
        path: 'cityreviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!city) {
        req.flash('error', 'Cannot find that city!');
        return res.redirect('/cities');
    }
    res.render('cities/show', { city });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const city = await City.findById(id)
    if (!city) {
        req.flash('error', 'Cannot find that city!');
        return res.redirect('/cities');
    }
    res.render('cities/edit', { city });
}

module.exports.updateCity = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const city = await City.findByIdAndUpdate(id, { ...req.body.city });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    city.images.push(...imgs);
    await city.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await city.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated city!');
    res.redirect(`/cities/${city._id}`)
}

module.exports.deleteCity = async (req, res) => {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted city')
    res.redirect('/cities');
}