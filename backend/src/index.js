const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); // importa todas as rotas

const app = express();

mongoose.connect('mongodb://root:root@cluster0-shard-00-00-fkvr7.mongodb.net:27017,cluster0-shard-00-01-fkvr7.mongodb.net:27017,cluster0-shard-00-02-fkvr7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json()); // Permite o express entender objetos json
app.use(routes);

app.listen(3333);
