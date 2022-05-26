const { Pokemon, Type } = require('../db')
const { Router } = require('express')
const axios = require('axios')
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
      velocidad: data.stats[5].base_stat
    }
    return newObj
  }

  let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${args}`)
  return objConst(res)
}

const getAllPokemons = async (page) => {

  const getApiInfo = async () => {
    let list = [] //array store init

    let api_page = page // 
    let count = (api_page - 1) * 12 // 

    while (count < api_page * 12) {
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

    //------------------------------
    // let list = await fetchUrl()

    // let requests = await list.map(async (el) =>{
    //   return axios.get(el.url)
    // })

    // return await Promise.all(requests)
    // .then( val => val.map(el => {
    //   const { data } = el
    //   const newObj = {
    //     //Pokemon info
    //     ID: data.id,
    //     nombre: data.name,
    //     altura: data.height,
    //     peso: data.weight,
    //     img: data.sprites.other['official-artwork'].front_default,

    //     // StatPage
    //     vida: data.stats[0].base_stat,
    //     fuerza: data.stats[1].base_stat,
    //     defensa: data.stats[2].base_stat,
    //     velocidad: data.stats[5].base_stat
    //   }
    //   return newObj
    // })
    // )
    // .catch(err => console.log(err))
  }

  const getDBInfo = async () => {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [] }
      }
    })
  }

  const joinInfo = async () => {
    const Api = await getApiInfo()
    const DB = await getDBInfo()
    let joint = Api.concat(DB)
    return joint
  }

  return joinInfo()
}

const getPokemons = async (args) => {
  const res = await getSinglePokemon(args)
  return res
}


const uploadTypes = async () => {
  let types = await axios.get('https://pokeapi.co/api/v2/type')
    .then(val => {
      let res = val.data.results.map(async el => {

        let mod = await axios.get(el.url)
        let data = mod.data
        return {ID: data.id, name: data.name}

      })
      return res
    })
    Promise.all(await types)
    .then(val => {
      let list = []
      let res = val.map(async el => {
        list.push(el)
        let newType = await Type.create(el)
        newType.save()          
      })
      return(list)
    })
    console.log('Types Loaded')
}

uploadTypes()


const getPokemonTypes = async () => {
  let res = await Type.findAll()
  let final = res.map(el => {
    return el.dataValues
  })
  console.log(final)
  return final
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
  const types = await getPokemonTypes()
  res.send(types)
})
module.exports = router;