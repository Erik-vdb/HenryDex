import {Link} from 'react-router-dom'
import React from 'react'

export default function LandingPage() {
  return (
    <div className='LandingPage'>
      <h1>Bienvenido!</h1>
      <h2>HenryDex</h2>
      <h3>Haga click a continuacion para ingresar</h3>
      <Link to='/home'>
        <button>
          Inicio
        </button>
      </Link>
    </div>
  )
}

