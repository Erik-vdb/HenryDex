import React from 'react'
import { Link } from 'react-router-dom'
import '../ComponentsStyles/PokeCard.css'


export default function PokeCard({ID, nombre, img, tipos, types}) {
  
  const tiposContainer = types.map(el => el.name[0].toUpperCase() + el.name.slice(1)).join(' | ')

  return (

    <div key={ID} className={'pokeCard'}>
      <p className="pokeCardId">{ID.length > 4 ? 'DB' : ID}</p>
      <Link to={`/pokemons/${ID}`}>
        <h4 className='Pokemon Name'>{nombre.slice(0, 1).toUpperCase() + nombre.slice(1)}</h4>
      </Link>
        <img className='pokeImg' src={img ? img : 'https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/LUOOHUM2OVEEXG7ZTRSNI6XWLY.png'} alt="" />
        <p>{tiposContainer}</p>

    </div>

  )
}
