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

  const [Create, setCreate] = useState({
    Name,
    Img,
    Height,
    Weight,
    Types,
    Hp,
    Atk,
    Def,
    Spd
  })
  const {foundPokemon, status} = useSelector(state => state.pokemons)

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
    !Name.length ? setError({...error, name:'Ingrese un Nombre'}) || setAllow(false) :
    Height < 1 ? setError({...error, height:'Ingrese una altura', name:''}) || setAllow(false) :
    Height > 1000 ? setHeight(1000) : 
    Weight < 1 ? setError({...error, weight:'Ingrese un peso', height:''}) || setAllow(false) :
    Weight > 5000 ? setWeight(5000) : 
    !Types.slot1 ? setError({...error, type:'Ingrese al menos un tipo', weight:''}) || setAllow(false) :
    setError({name: '', height: '', weight: '', type: '', stats: ''}) || setAllow(true)
    
  }, [Name, Height, Weight, Types])
  


  const handleSubmit = async (e) => {
    e.preventDefault()

    setCreate({
      Name,
      Img,
      Height,
      Weight,
      Types,
      Hp,
      Atk,
      Def,
      Spd
    })

    const type = []
    type.push(Types.slot1, Types.slot2 ? Types.slot2 : 'None')
    
    const newPoke = {
      "name": Name,
      "vida": Hp,
      "fuerza": Atk,
      "defensa": Def,
      "velocidad": Spd,
      "altura": Height,
      "peso": Weight,
      "tipos": type,
      "img": Img
    }
  }

  //--------------------
  return(
    <div className='Creation'>
      <label htmlFor="Name">Name:</label>
      <input type="text" name='Name' value={Name} onChange={e => handleGlobalChange(e)} />

      <label htmlFor="Img">Img:</label>
      <input type="text" name='Img' onChange={e => handleGlobalChange(e)}/>
			<img src={Img} alt=""/>

      <label htmlFor="Height">Altura:</label>
      <input type="number" name='Height' min={0} max={1000} value={Height} onChange={e => handleGlobalChange(e)}/>

      <label htmlFor="Weight">Peso:</label>
      <input type="number" name='Weight' min={0} max={5000} value={Weight} onChange={e => handleGlobalChange(e)}/>

      <label htmlFor="Type1">Tipo 1:</label>
      <select name="Type1" id="Type1" onChange={e => handleGlobalChange(e)}>
        <option value="None">None</option>
        <option value="Normal">Normal</option>
        <option value="Figthing">Figthing</option>
        <option value="Flying">Flying</option>
        <option value="Poison">Poison</option>
        <option value="Ground">Ground</option>
        <option value="Rock">Rock</option>
        <option value="Bug">Bug</option>
        <option value="Ghost">Ghost</option>
        <option value="Steel">Steel</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Grass">Grass</option>
        <option value="Electric">Electric</option>
        <option value="Psychic">Psychic</option>
        <option value="Ice">Ice</option>
        <option value="Dragon">Dragon</option>
        <option value="Dark">Dark</option>
        <option value="Fairy">Fairy</option>
        <option value="Shadow">Shadow</option>
        <option value="Unknown">Unknown</option>
      </select>
      

			{Types.slot1 !== '' ? <>
      <label htmlFor="Type2">Tipo 2:</label>
      <select name="Type2" id="Type2" onChange={e => handleGlobalChange(e)}>
        <option value="None">None</option>
        <option value="Normal">Normal</option>
        <option value="Figthing">Figthing</option>
        <option value="Flying">Flying</option>
        <option value="Poison">Poison</option>
        <option value="Ground">Ground</option>
        <option value="Rock">Rock</option>
        <option value="Bug">Bug</option>
        <option value="Ghost">Ghost</option>
        <option value="Steel">Steel</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Grass">Grass</option>
        <option value="Electric">Electric</option>
        <option value="Psychic">Psychic</option>
        <option value="Ice">Ice</option>
        <option value="Dragon">Dragon</option>
        <option value="Dark">Dark</option>
        <option value="Fairy">Fairy</option>
        <option value="Shadow">Shadow</option>
        <option value="Unknown">Unknown</option>
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
      
    </div>
  )
}