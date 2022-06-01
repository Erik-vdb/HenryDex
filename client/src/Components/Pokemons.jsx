import React from 'react'
import '../ComponentsStyles/Pokemons.css'
import PokeCard from './PokeCard'

export default function Pokemons(props) {
  let arr = props.arr
  let keys = 0
  return (
    <div className='container'>
      {arr.map(el => {
        keys++
        return <PokeCard key={keys} nombre={el.nombre} img={el.img} tipos={el.tipos}/>

      })}
    </div>
  )
}