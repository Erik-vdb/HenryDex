import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import '../ComponentsStyles/Nav.css'
import { findPokemonByName } from "../redux/pokemons";

export default function Navbar() {
  const dispatch = useDispatch()

  let [name, setName] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(name.length > 0){
      window.location.href = `http://localhost:3000/pokemons/${name.toLowerCase()}`
      setName('')
    }
  }
  return (
    <div className="NavBar">
      <div className="navContainer">

        <div className="RootLink-Pokeball">
      <Link to={'/home'}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
            alt="Inicio"
          />
      </Link>
        </div>

      <div className="searchBar">
        <label htmlFor="Search">
        <input type="search" placeholder="Buscar..." id="Search" value={name} onSubmit={e => handleSubmit(e)} onChange={(e) => handleChange(e)}/>
        </label>
        <input type="submit" className="Submit" onClick={e => handleSubmit(e)}/>
      </div>

      <div className="Create">
        <Link to={'/create'}>
          <button>Crear</button>
        </Link>
      </div>


      </div>
    </div>
  )
}