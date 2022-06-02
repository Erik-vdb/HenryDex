import React from 'react'
import { Link } from 'react-router-dom'
import '../ComponentsStyles/PokeCard.css'
import PokemonDetail from './PokemonDetail'


export default function PokeCard(props) {


  return (
    <div key={props.id} className={'pokeCard'}>

      <Link to={`/pokemons/${props.nombre}`}>
        <h4 className='Pokemon Name'>{props.nombre.slice(0, 1).toUpperCase() + props.nombre.slice(1)}</h4>
      </Link>
        <img className='pokeImg' src={props.img} alt="" />
        <p>{props.tipos.map(el => el.slice(0, 1).toUpperCase() + el.slice(1)).join(' | ')}</p>
    </div>
  )
}
