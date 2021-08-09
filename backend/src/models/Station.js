const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const StationSchema = new mongoose.Schema({
    nameStation: String,
    status: Boolean,
    pet_avatar: String,
    userName: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Station', StationSchema);