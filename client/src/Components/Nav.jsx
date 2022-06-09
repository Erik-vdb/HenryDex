import React, { useState } from "react";
import { Link } from 'react-router-dom'
import '../ComponentsStyles/Nav.css'

export default function Navbar() {

  let [name, setName] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(name.length > 0){
      window.location.href = `http://localhost:3000/pokemon/${name.toLowerCase()}`
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

      <form onSubmit={e => handleSubmit(e)} className="searchBar">
        <label htmlFor="Search">
        <input type="search" placeholder="Buscar..." id="Search" name="pokeQ" value={name} onChange={(e) => handleChange(e)}/>
        </label>
        <input type="submit" className="Submit"/>
      </form>

      <div >
        <Link to={'/create'}>
          <button className="Create" >Crear</button>
        </Link>
      </div>


      </div>
    </div>
  )
}