const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://morvanmc:m122765m@cluster0.zoxkg.mongodb.net/StreetPets?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Executando...'));