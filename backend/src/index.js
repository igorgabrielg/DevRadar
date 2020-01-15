const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // importa todas as rotas

const app = express();

mongoose.connect('mongodb+srv://root:root@cluster0-fkvr7.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

app.use(express.json()); // Permite o express entender objetos json
app.use(routes); 

app.listen(3000);
