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
        const { name, status, pet_avatar = '', latitude, longitude } = req.body;
    
        let station = await Station.findOne({ name });

        if(!station) {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            
            station = await Station.create({
                name,
                status,
                pet_avatar,
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