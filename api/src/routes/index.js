const { Router } = require('express')

import createPokemon from './createPokemon';
import deletePokemon from './deletePokemon';
import { fetchApi, fetchDatabase } from './fetch';
import getPokeId from './getPokeId';
import getPokemons from './getPokemons';
import getPokeName from './getPokeName';
import getTypes from './getTypes';


//-------------------------------------
export const groupAllPokemons = async (page) => {
  const api = await fetchApi(page)
  const DB = await fetchDatabase(page)
  return api.concat(DB)
}
//-------------------------------------

const router = Router();

router.get('/pokemons', getPokemons)

router.get('/pokemons/:id', getPokeId)

router.get('/pokemon', getPokeName)

router.get('/types', getTypes)


router.post('/pokemons', createPokemon)

router.delete('/pokemons', deletePokemon)

module.exports = router;