import '../ComponentsStyles/Pokemons.css'
import PokeCard from './PokeCard'

export default function Pokemons(props) {
  let arr = props.arr

  return (
    <div className='container'>
      {arr.map(el => {
        return <PokeCard key={el.ID} nombre={el.nombre} img={el.img} tipos={el.tipos} ID={el.ID}/>
      })}
    </div>
  )
}