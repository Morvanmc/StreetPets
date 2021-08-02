const Station = require('../models/Station');

module.exports = {
    
    //Buscar estações num raio de 10km
    async index(req, res) {
        const { latitude, longitude } = req.query;

        let stations = await Station.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.json({ stations });
    }
}