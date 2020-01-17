const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const githubUser = require('../utils/githubUser');

module.exports = {
  // index(lista), show(unico), story(criar), update(atualizar), destroy(deletar)
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  // async e awit informa que a resposta pode demorar
  async store(req, res) {
    const {github_username, techs, latitude, longitude} = req.body;
    
    let dev = await Dev.findOne({github_username});

    if(!dev) {
      /* Modelo da aula atualizado para function githubUser.
      // crase permite colocar uma variavel dentro da string
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      // name = login -> caso não exista name, utilize o login
      const {name = login, avatar_url, bio} = apiResponse.data;
      */

      // let { name, avatar_url, bio } = apiResponse.data;
      // if (!name) {
      //   name = apiResponse.data.login
      // }

      // map faz uma iteração para cada valor executando uma função
      const {name, avatar_url, bio} = await githubUser(github_username);
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      // Short sintax permite colocar um nome só como propiedade e valor ao mesmo tempo: id = id or id 
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }
  
    return res.json(dev);
  },

  async update(req, res) {
    const {github_username} = req.params;
    const {techs, latitude, longitude} = req.body;
    const dev = await Dev.findOne({github_username});

    if(dev) {
      const {name, avatar_url, bio} = await githubUser(github_username); 
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev.name = name;
      dev.avatar_url = avatar_url;
      dev.bio = bio;
      dev.techs = techsArray;
      dev.location = location;
      dev.save()
      
      return res.json(dev);
      
    } else {
      return res.status(404).json({ error: 'Dev not found' });
    }
    
  },

  async destroy(req, res) {
    const {github_username} = req.params;
    const dev = await Dev.findOneAndDelete({github_username});
    if(!dev) {
      return res.status(404).json({ error: 'Dev not found' })
    }
    return res.json(dev);
  },
};
