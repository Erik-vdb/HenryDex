const axios = require("axios")
const { Pokemon, Type } = require('../db')

const fetchDatabase = async (page) => {
  const offset = (page - 1) * 13
  const pokemons = await Pokemon.findAll({ include: { model: Type } })
  const arrSlice = await pokemons.slice(offset, (offset + 13))
  return arrSlice
}

const fetchApi = async (page) => {
  let apiOffset = (page - 1) * 12

  return axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${apiOffset}&limit=12`)
    .then(async ({ data }) => {
      return Promise.all(data.results.map(el => axios.get(el.url)))
        .then(res => {
          return res.map(({ data }) => {
            return {
              //Pokemon info
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
          })
        })
    })

}

const groupAllPokemons = async (page) => {
  const api = await fetchApi(page)
  const DB = await fetchDatabase(page)
  return api.concat(DB)
}

module.exports = {fetchApi, fetchDatabase, groupAllPokemons}