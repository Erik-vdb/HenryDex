const { default: axios } = require('axios')
const { Router } = require('express')

const createPokemon = require ('./createPokemon')
const deletePokemon = require ('./deletePokemon')
const getPokeId = require ('./getPokeId')
const getPokemons = require ('./getPokemons')
const getPokeName = require ('./getPokeName')
const getTypes = require ('./getTypes')

const router = Router();

router.get('/pokemons', getPokemons)

router.get('/pokemons/:id', getPokeId)

router.get('/pokemon', getPokeName)

router.get('/types', getTypes)

router.post('/pokemons', createPokemon)

router.delete('/pokemons', deletePokemon)

module.exports = router;