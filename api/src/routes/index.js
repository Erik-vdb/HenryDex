const { Pokemon, Type } = require('../db')
const { Router } = require('express')
const axios = require('axios');
const router = Router();

//-------------------------------------

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


//-------------------------------------

router.get('/pokemons', async (req, res) => {
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

})

router.get('/pokemons/:id', async (req, res) => {
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
})

router.get('/pokemon', async (req, res) => {
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
})

router.get('/types', async (req, res) => {
    axios.get('https://pokeapi.co/api/v2/type')
    .then(({data}) => Type.bulkCreate(data.results.map(el => { return {id: el.id, name: el.name}})))
    .catch(({message}) => {
      console.log(message)
    })
    const types = await Type.findAll()
    res.send(types)
})


router.post('/pokemons', async (req, res) => {
  const { nombre, vida, fuerza, defensa, velocidad, altura, peso, tipos, img } = req.body

  try {
    const newPoke = await Pokemon.create({ nombre, vida, fuerza, defensa, velocidad, altura, peso, img, createdInDB: true })
    const types = await Type.findAll({where: {name: tipos}})
    await newPoke.addType(types)

    const confirm = await Pokemon.findOne({ where: {nombre: nombre}, include:{model:Type}})

    res.status(200).send(confirm)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete('/pokemons', async (req, res) => {
  const {ID} = req.body
  try {
    await Pokemon.destroy({where: {ID:ID}})
    res.status(202).send()
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports = router;