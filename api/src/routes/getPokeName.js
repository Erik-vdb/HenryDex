const { Pokemon, Type } = require('../db')

export default async function (req, res) {
  const {name} = req.query
  try {
    const DB = await Pokemon.findOne({where: {nombre: name}, include:{model: Type}})
    if(DB){
      res.status(202).send(DB)
    } else {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(({data}) => {
        return {
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
            return { name:el.type.name}
          })
        }
      })
      res.status(202).send(poke)
    }
    
  } catch ({message}) {
    res.status(404).send(message)
  }
}