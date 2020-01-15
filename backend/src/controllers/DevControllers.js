const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    // index(lista), show(unico), story(criar), update(atualizar), destroy(deletar)
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    // async e awit informa que a resposta pode demorar
    async store(request, response) {
        const { git_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ git_username });

        if (!dev){
            // crase permite colocar uma variavel dentro da string
            const apiResponse = await axios.get(`https://api.github.com./users/${git_username}`);

            // name = login -> caso não exista name, utilize o login
            const { name = login, avatar_url, bio } = apiResponse.data;

            // let { name, avatar_url, bio } = apiResponse.data;
            // if (!name) {
            //   name = apiResponse.data.login
            // }

            // map faz uma iteração para cada valor executando uma função
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            // Short sintax permite colocar um nome só como propiedade e valor ao mesmo tempo: id = id or id 
            dev = await Dev.create({
                git_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

    return response.json(dev)
    },

    // Desenvolver 
    // async update() {

    // },
    // async destroy() {

    // },
    
    
}