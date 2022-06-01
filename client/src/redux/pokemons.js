import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getPokemons = createAsyncThunk('pokemons/getPokemons', async(page = 1) => {
  return fetch(`http://localhost:3001/pokemons?page=${page}`)
  .then(res => res.json())
})

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemons: [],
    status: null
  },
  reducers:{
  },
  extraReducers: {
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




export default pokemonsSlice.reducer