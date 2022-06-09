import '../ComponentsStyles/Pokemons.css'
import PokeCard from './PokeCard'

export default function Pokemons(props) {
  let arr = props.props

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