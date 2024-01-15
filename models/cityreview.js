const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityreviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Cityreview", cityreviewSchema);

