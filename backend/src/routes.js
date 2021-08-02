const { Router } = require('express');

const StationController = require('./controllers/StationController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/stations', StationController.index);
routes.post('/stations', StationController.store);

routes.get('/search', SearchController.index);

module.exports = routes;