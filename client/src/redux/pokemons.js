import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getSinglePokemon = createAsyncThunk('pokemons/searchPokemon', async(name) => {
  return fetch(`http://localhost:3001/pokemons?name=${name}`)
  .then(res => res.json())
})

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async(page = 1) => {
  return fetch(`http://localhost:3001/pokemons?page=${page}`)
  .then(res => {
    return res.json()
  })
})

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    foundPokemon: {},
    pokemons: [],
    status: null
  },
  reducers:{
    foundPokemonReset(state) {
      state.foundPokemon = {}
    }
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


    [getPokemons.pending]: (state) => {
      state.status = 'loading'
    },
    [getPokemons.fulfilled]: (state, { payload }) => {
      state.pokemons = payload
      state.status = 'success'
    },
    [getPokemons.rejected]: (state) => {
      state.status = 'failed'
    }
  }
})


export const { foundPokemonReset } = pokemonsSlice.actions

export default pokemonsSlice.reducer