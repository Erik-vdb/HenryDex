const { Pokemon, Type } = require('../db')
const { Router } = require('express')
const axios = require('axios');
const router = Router();

//-------------------------------------

const getSinglePokemon = async (args) => {
  
  const objConst = (json) => {
    const data = json.data
    const newObj = {
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
      tipos: data.types.map(el => {
        return el.type.name
      })
    }
    return newObj
  }
  
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${args}`)
    return objConst(res)
}

const getAllPokemons = async (page) => {

  const getApiInfo = async () => {
    let list = [] //array store init

    let count = (page - 1) * 12 // 

    while (count < page * 12 && count < 898) {
      count++
      list.push(count)
    }


    let listMod = list.map(async el => {
      return await getSinglePokemon(el)
    })

    let final = Promise.all(listMod)
      .then(val => {
        return val
      })

    return final    
  }

  const getDBInfo = async () => {
    const poke = await Pokemon.findAll()
    console.log(poke)
    return poke
  }

  const joinInfo = async () => {
    const Api = await getApiInfo()
    const DB = await getDBInfo()
    return DB.concat(Api)
  }

  return joinInfo()
}

const getPokemons = async (args) => {
  const res = await getSinglePokemon(args)
  return res
}



//-------------------------------------


router.get('/pokemons', async (req, res) => {
  let { name, page } = req.query
  try {
    if (!name) {
      if (!page) {
        const pokemons = await getAllPokemons(1)
        res.send(pokemons)
      } else {
        const pokemons = await getAllPokemons(page)
        res.send(pokemons)
      }
    } else if (name) {
      const pokemon = await getPokemons(name)
      res.send(pokemon)
    } 

    //-----------------------
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

router.get('/pokemons/:id', async (req, res) => {
  const { id } = req.params

  const pokemons = await getPokemons(id)
  res.send(pokemons)
})

router.get('/types', async (req, res) => {
  try {
  await axios.get('https://pokeapi.co/api/v2/type')
  .then(v => v.data.results)
  .then(el => el.map(e => axios.get(e.url)))
  .then(e => Promise.all(e)
  .then(res => res.map(el => {
    const {id, name, pokemon} = el.data
    const pokemonArr = pokemon.map(el => {
      return el.pokemon.url
    })
    return {
      id,
      name,
      pokemonArr
    }
  }))
  .then(res => res.map(el => Type.findOrCreate({where: {ID: el.id, name: el.name, pokemon: el.pokemonArr}})))
  )

  const types = await Type.findAll()
  res.send(types)
  
} catch (error) {
  res.send(error)
}

  // const types = await getPokemonTypes()
  // res.send(types)
})

router.post('/pokemons', async (req, res) => {
  const {name, vida, fuerza, defensa, velocidad, altura, peso, tipos, img} = req.body
  
  try {
    await Pokemon.create({name, vida, fuerza, defensa, velocidad, altura, peso, tipos, img})
    const confirm = await Pokemon.findOne({where: {name: name}})
    res.status(200).send(confirm)
  } catch (err){
    res.status(400).send(err)
  }
})
module.exports = router;