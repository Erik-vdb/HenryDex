import '../ComponentsStyles/PokemonDetail.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { foundPokemonReset, getPokemonByName} from '../redux/pokemons'


export default function PokemonByName() {
  const { name } = useParams()
  const dispatch = useDispatch()

  const { foundPokemon, status } = useSelector(state => state.pokemons)

  useEffect(() => {
    dispatch(getPokemonByName(name))
    return () => {
      dispatch(foundPokemonReset())
      console.log('demount')
    }
  }, [name, dispatch])

  const Tipos =foundPokemon.types ? foundPokemon.types.map(el => el.name[0].toUpperCase() + el.name.slice(1)).join(', ') : <></>

  const PokeDetail =
    <>
      <div className='PokeInfo'>
        <h1>{foundPokemon.nombre ? foundPokemon.nombre.slice(0, 1).toUpperCase() + foundPokemon.nombre.slice(1) : <></>}{typeof foundPokemon.ID === 'number' ? `#${foundPokemon.ID}` : <></>}
        </h1>
        <img className='PokeImg'
          src={foundPokemon.img || 'https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/LUOOHUM2OVEEXG7ZTRSNI6XWLY.png'} alt=''/>
        <br />
        <h4>Altura: {foundPokemon.altura} <br /> Peso: {foundPokemon.peso}</h4>
        <h4>Tipos: {Tipos}</h4>
      </div>

      <div className='StatSheet'>
        
          <li>Vida: {foundPokemon.vida}</li>
          <li>Ataque: {foundPokemon.fuerza}</li>
          <li>Defensa: {foundPokemon.defensa}</li>
          <li>Velocidad: {foundPokemon.velocidad}</li>
      </div>
    </>

  const Fail = <h1>Pokemon no encontrado</h1>


  return (
    <div className='PokemonDetail'>
      {status === 'loading' ? <img className='loading' src="https://thumbs.gfycat.com/AmbitiousInfantileIndochinesetiger.webp" alt="" /> :
        status === 'success' ? foundPokemon.status === 404 ? Fail :
          PokeDetail
          : <h1>Pokemon no encontrado</h1>
      }

    </div>
  )
}