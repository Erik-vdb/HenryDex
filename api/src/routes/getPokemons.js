const { Pokemon, Type } = require('../db')

module.exports =  async function (req, res) {
  const {page, source} = req.query
  try {
    const pokemons = source === 'Api' ? 
    await fetchApi(page) : 
    source === 'DB' ? 
    await fetchDatabase(page) : 
    await groupAllPokemons(page)
    res.status(202).send(pokemons)
  } catch ({message}) {
    res.status(404).send(message)
  }

}