import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

export const getPokemonTypes = createAsyncThunk('types/getTypes', async() => {
  return axios.get("/types")
})

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async (page = 1) => {
  return axios.get(`/pokemons?page=${page}`)
    .then(res => res.data)
    .catch(err => console.log(err))
})

export const getSinglePokemon = createAsyncThunk('pokemons/getPokemonId', async (id) => {
  return axios.get(`/pokemons/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err))
})


export const getPokemonByName = createAsyncThunk('pokemons/searchPokemon', async (name) => {
  return axios.get(`/pokemon?name=${name}`)
    .then(res => res.data)
    .catch(err => console.log(err))
})

export const createPokemon = createAsyncThunk('pokemons/createPokemons', async (body) => {
  return axios.post('/pokemons', body)
  .catch(err => console.log(err))
})

export const deletePokemon = createAsyncThunk('pokemons/deletePokemon', async (ID) => {
  return await axios.delete('/pokemons', "ID" = ID)
  .catch(err => console.log(err))
})

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    options: {
      source: 'Any',
      types: 'None',
      order: 'id',
      orderDir: 'Asc'
    },
    foundPokemon: {},
    allPokemons: [],
    pokemons: [],
    status: null
  },

  reducers: {
    changeOptions(state, { payload }) {
      state.options[payload[0]] = payload[1]
    },

    applyOptions(state) {
      //Source
      switch (state.options.source) {
        case 'Api': {
          state.pokemons = state.allPokemons.filter(el => !el.createdInDB)
          break
        }
        case 'DB': {
          state.pokemons = state.allPokemons.filter(el => el.createdInDB)
          break
        }
        case 'Any': {
          state.pokemons = state.allPokemons
          break
        }
        default: {
          break
        }
      }
      //Type
      if (state.options.types === 'None') {
      } else {
        state.pokemons = state.pokemons.slice().filter(el => {
          if (el.types.find(el => el.name === state.options.types)) return true
          return false
        })
      }

      //Sort
      switch (state.options.order) {
        case 'id': {
          state.pokemons = state.pokemons.slice().sort((a, b) => {
            return typeof b.ID === 'string' ? -1 :
            a.ID > b.ID ? 1 : -1
          })
          break
        }
        case 'name': {
          state.pokemons = state.pokemons.slice().sort((a, b) => {
            return a.nombre > b.nombre ? 1 : -1
          })
          break
        }
        case 'fuerza': {
          state.pokemons = state.pokemons.slice().sort((a, b) => {
            return a.fuerza > b.fuerza ? 1 : -1
          })
          break
        }
        default: {
          break
        }
      }
    },

    foundPokemonReset(state) {
      state.foundPokemon = {}
    },
  },
  extraReducers: {
    [getSinglePokemon.pending]: (state) => {
      state.status = 'loading'
    },
    [getSinglePokemon.fulfilled]: (state, { payload }) => {
      state.foundPokemon = payload
      state.status = 'success'
    },
    [getSinglePokemon.rejected]: (state) => {
      state.status = 'failed'
    },

    [getPokemonByName.pending]: (state) => {
      state.status = 'loading'
    },
    [getPokemonByName.fulfilled]: (state, { payload }) => {
      state.foundPokemon = payload
      state.status = 'success'
    },
    [getPokemonByName.rejected]: (state) => {
      state.status = 'failed'
    },

    [getPokemons.pending]: (state) => {
      state.status = 'loading'
    },
    [getPokemons.fulfilled]: (state, { payload }) => {
      state.allPokemons = payload || []
      state.pokemons = payload || []
      state.status = 'success'
    },
    [getPokemons.rejected]: (state) => {
      state.status = 'failed'
    },

    [createPokemon.pending]: (state) => {
      state.status = 'loading'
    },
    [createPokemon.fulfilled]: (state, { payload }) => {
      state.creationMessage = payload
      state.status = 'created'
    },
    [createPokemon.rejected]: (state) => {
      state.status = 'failed'
    },

    [deletePokemon.pending]: (state) => {
      state.status = 'deleting'
    },
    [deletePokemon.fulfilled]: (state) => {
      state.status = 'deleted'
    },
    [deletePokemon.rejected]: (state) => {
      state.status = 'failed'
    },

    [getPokemonTypes.pending]: (state) => {
      state.status = 'loading'
    },
    [getPokemonTypes.fulfilled]: (state, { payload }) => {
      state.status = 'success'
    },
    [getPokemonTypes.rejected]: (state) => {
      state.status = 'failed'
    },
  }

})

export const { changeOptions, foundPokemonReset, applyOptions } = pokemonsSlice.actions

export default pokemonsSlice.reducer
