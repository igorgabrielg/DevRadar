const { Router } = require('express'); // importa somente o Router do express

const DevController = require('./controllers/DevControllers')
const SearchController = require('./controllers/SearchController')

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, Ordenação, Paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/devs', DevController.store)
routes.post('/devs', DevController.store)

routes.get('/search', SearchController.index);


module.exports = routes; // Exporta os objetos de rotas 