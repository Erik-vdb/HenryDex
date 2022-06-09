import { useEffect, useState } from 'react'
import '../ComponentsStyles/Create.css'
import { createPokemon, getSinglePokemon } from '../redux/pokemons'
import { useDispatch, useSelector } from 'react-redux'

export default function Creation() {
  const dispatch = useDispatch()

  //-------States-------
  const [Name, setName] = useState('') // Nombre
  const [Img, setImg] = useState('') // Img
  const [Height, setHeight] = useState(0) // Altura
  const [Weight, setWeight] = useState(0) // Peso
  const [Types, setTypes] = useState({
		slot1: '',
		slot2: ''
	}) //Tipo 1
  const [Hp, setHp] = useState(0) // Vida
  const [Atk, setAtk] = useState(0) // Fuerza
  const [Def, setDef] = useState(0) // Defensa
  const [Spd, setSpd] = useState(0) // Velocidad


  const [allowed, setAllow] = useState(false)

  const [error, setError] = useState({
    name: '',
    height: '',
    weight: '',
    type: '',
  })

  const { status } = useSelector(state => state.pokemons)

  //-------Controllers-------
  const handleGlobalChange = (e) => {
    e.preventDefault()
    const {value} = e.target
    switch (e.target.name){
      case 'Name': {
        setName(value)
        break
      }
      case 'Img': {
        setImg(value)
        break
      }
      case 'Height':{
        setHeight(value)
        break
      }
      case 'Weight':{
        setWeight(value)
        break
      }
      case 'Type1': {
				if(value === 'None'){
					setTypes({slot1:'', slot2:''})
					break
				}
        setTypes({...Types, slot1:value})
        break
      }
      case 'Type2': {
				if(value === 'None'){
					setTypes({...Types, slot2: ''})
					break
				}
				setTypes({...Types, slot2:value})
        break
      }
      case 'Hp': {
        setHp(value)
        break
      }
      case 'Atk': {
        setAtk(value)
        break
      }
      case 'Def': {
        setDef(value)
        break
      }
      case 'Spd': {
        setSpd(value)
        break
      }
      default:{
        return
      }
    }
    
  }

//-------Validator---------
  useEffect(() => {
    !Name ? setError({...error, name:'Ingrese un Nombre'}) || setAllow(false) :
    Height < 1 ? setError({...error, height:'Ingrese una altura', name:''}) || setAllow(false) :
    Weight < 1 ? setError({...error, weight:'Ingrese un peso', height:''}) || setAllow(false) :
    !Types.slot1 ? setError({...error, type:'Ingrese al menos un tipo', weight:''}) || setAllow(false) :
    setError({name: '', height: '', weight: '', type: '', stats: ''}) || setAllow(true)
    
  }, [Name, Height, Weight, Types])
  


  const handleSubmit = async (e) => {
    e.preventDefault()


    const newPoke = {
      "nombre": Name.toLowerCase(),
      "vida": Hp,
      "fuerza": Atk,
      "defensa": Def,
      "velocidad": Spd,
      "altura": Height,
      "peso": Weight,
      "tipos": [Types.slot1, Types.slot2 && Types.slot2],
      "img": Img
    }

    dispatch(createPokemon(newPoke))

  }

  //--------------------
  return(
    <div className='Creation'>
      <label htmlFor="Name">Name:</label>
      <input type="text" name='Name' placeholder={error.name} value={Name} onChange={e => handleGlobalChange(e)} />

      <label htmlFor="Img">Img:</label>
      <input type="text" name='Img' placeholder='Se recomienda AR 1:1' onChange={e => handleGlobalChange(e)}/>
			{Img ? <img className='imgPreview' src={Img} alt=""/>: <></>}

      <label htmlFor="Height">Altura:</label>
      <input type="number" name='Height' placeholder={error.height} min={0} max={1000} value={Height} onChange={e => handleGlobalChange(e)}/>

      <label htmlFor="Weight">Peso:</label>
      <input type="number" name='Weight' placeholder={error.weight} min={0} max={5000} value={Weight} onChange={e => handleGlobalChange(e)}/>

      <label htmlFor="Type1">Tipo 1:</label>
      <select name="Type1" id="Type1" onChange={e => handleGlobalChange(e)}>
      <option value="">None</option>
        <option value="normal">Normal</option>
        <option value="figthing">Figthing</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="shadow">Shadow</option>
        <option value="unknown">Unknown</option>
      </select>
      

			{Types.slot1 !== '' ? <>
      <label htmlFor="Type2">Tipo 2:</label>
      <select name="Type2" id="Type2" onChange={e => handleGlobalChange(e)}>
        <option value="">None</option>
        <option value="normal">Normal</option>
        <option value="figthing">Figthing</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="shadow">Shadow</option>
        <option value="unknown">Unknown</option>
      </select>
			</> : <></>
			}

      <ul>
        <li>
          <label htmlFor="Hp">Vida:</label>
          <input type="text" name="Hp" id="Hp" value={Hp} onChange={e => handleGlobalChange(e)}/>
        </li>

        <li>
          <label htmlFor="Atk">Ataque:</label>
          <input type="text" name="Atk" id="Atk" value={Atk} onChange={e => handleGlobalChange(e)}/>
        </li>

        <li>
          <label htmlFor="Def">Defensa:</label>
          <input type="text" name="Def" id="Def" value={Def} onChange={e => handleGlobalChange(e)}/>
        </li>

        <li>
          <label htmlFor="Spd">Velocidad:</label>
          <input type="text" name="Spd" id="Spd" value={Spd} onChange={e => handleGlobalChange(e)}/>
        </li>
      </ul>
      
      <button disabled={!allowed} onClick={e => handleSubmit(e)}>Create</button>
      <span>{error.name}</span>
      <span>{error.height}</span>
      <span>{error.weight}</span>
      <span>{error.type}</span>
      
      {status === 'failed' ? <span>Este pokemon ya existe</span> : <></>}
      {status === 'created' ? <> <span>Pokemon creado exitosamente.</span> <a href="/home">Volver al home</a></> : <></>}
    </div>
  )
}