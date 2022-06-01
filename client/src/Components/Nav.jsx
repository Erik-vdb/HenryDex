import React from "react";
import { Link } from 'react-router-dom'
import '../ComponentsStyles/Nav.css'

export default function Navbar() {
  return (
    <div className="main">
        <Link to={'/home'}>
          <div className="RootLink-Pokeball">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
              alt="Inicio"
            />
          </div>
        </Link>

        <Link to={'/create'}>
          <div className="Create">
            <button>Crear</button>
          </div>
        </Link>


        <div>
          <input type="search" placeholder="Buscar..." className="searchBar"/>
          <input type="submit" className="Search"/>
        </div>

    </div>
  )
}