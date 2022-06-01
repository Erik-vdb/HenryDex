import React from 'react'
import { Link } from 'react-router-dom'
import '../ComponentsStyles/PokeCard.css'


export default function PokeCard(props) {
  
  return (
    <div key={props.id} className={'pokeCard'}>
      
      <h4>{props.nombre}</h4>
      <img className='pokeImg' src={props.img} alt="" />
 
      <p>{props.tipos.join(' | ')}</p>
    </div>
  )
}
