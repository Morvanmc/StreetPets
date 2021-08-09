const Station = require('../models/Station');

// index, show, store, update, destroy

module.exports = {

    //Listar Estações

    async index(req, res) {
        const stations = await Station.find();

        return res.json(stations);
    },

    //Cadastrar Estações
    
    async store(req, res) {
        const { nameStation, status, pet_avatar, userName, latitude, longitude } = req.body;
    
        let station = await Station.findOne({ name });

        if(!station) {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            
            station = await Station.create({
                nameStation,
                status,
                pet_avatar,
                userName,
                location,
            });
        }
    
        return res.json(station);
    },

    // Atualizar Estação

    async update() {

    },

    //Deletar Estação
    
    async delete() {

    },
};