const mongoose = require('mongoose');
const Cityreview = require('./cityreview')
const Schema = mongoose.Schema;



const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const CitySchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    population : Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cityreviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cityreview'
        }
    ]
}, opts);


CitySchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/cities/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});



CitySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Cityreview.deleteMany({
            _id: {
                $in: doc.cityreviews
            }
        })
    }
})

module.exports = mongoose.model('City', CitySchema);