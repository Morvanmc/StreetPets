const Station = require('../models/Station');
const SearchDistance = require('../models/SearchDistance');

module.exports = {
    async index(req, res) {
        const { radius } = req.query;

         await SearchDistance.find({
            distance: radius
        })
    },

    //Buscar estações num raio de 10km
    async index(req, res) {
        const { latitude, longitude, radius } = req.query;

        let stations = await Station.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius,
                },
            },
        });

        return res.json({ stations });
    }
}