import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import '../ComponentsStyles/Pokemons.css'
import { getPokemonTypes } from '../redux/pokemons'
import PokeCard from './PokeCard'

export default function Pokemons(props) {
  let arr = props.props
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getPokemonTypes())
  })

  return (
    <div className='container'>
      {arr.map(el => {
        return <>
        <PokeCard key={el.ID} nombre={el.nombre} img={el.img} ID={el.ID} types={el.types}/>
        </>
      })}
    </div>
  )
}