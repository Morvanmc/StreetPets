const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const StationSchema = new mongoose.Schema({
    name: String,
    status: Boolean,
    pet_avatar: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Station', StationSchema);