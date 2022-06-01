import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemons } from '../redux/pokemons'
import Pokemons from './Pokemons'


export default function MainPage() {
  const dispatch = useDispatch()
  const { pokemons } = useSelector(state => state.pokemons)
  let [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getPokemons(page))
  }, [dispatch, page])
  

  return(
    <div className='startPage'>
      <Pokemons arr={pokemons}/>
      <div className='pages'>
      <button onClick={() => {if(page > 1){setPage(page - 1)}}}>-</button>
      <>{page}</>
      <button onClick={() => setPage(page + 1)}>+</button>
      </div>

    </div>
  )
}
