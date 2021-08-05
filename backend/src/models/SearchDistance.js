const mongoose = require('mongoose');

const SearchDistance = new mongoose.Schema({
    distance: Number
});

module.exports = mongoose.model('Distance', SearchDistance);