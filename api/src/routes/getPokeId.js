const { Pokemon, Type } = require('../db')
const axios = require('axios');

export default async function (req, res){
  const { id } = req.params
  if(id.length > 4){
    try {
      const pokemon = await Pokemon.findOne({where: {ID: id}, include:{model: Type}})
      res.status(202).send(pokemon)
    } catch (error) {
      res.status(404).send(error.message)
    }
  } else {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(({ data }) => {
      const pokemon = {
        ID: data.id,
        nombre: data.name,
        altura: data.height,
        peso: data.weight,
        img: data.sprites.other['official-artwork'].front_default,
        // StatPage
        vida: data.stats[0].base_stat,
        fuerza: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        velocidad: data.stats[5].base_stat,
        createdInDB: false,
        types: data.types.map(el => {
          return {name: el.type.name}
        })
      }
      res.send(pokemon)
    })
    .catch(({ message }) => {
      res.status(404).send(message)
    })
  }
}