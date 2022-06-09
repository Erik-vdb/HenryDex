import {Link} from 'react-router-dom'
import React from 'react'
import '../ComponentsStyles/Landing.css'

export default function LandingPage() {
  return (
    <div className='LandingPage'>

      <h1>Bienvenido!</h1>
      <h2>HenryDex</h2>
      <h3>Presione la pokebola para ingresar</h3>
      <Link to='/home'>
        <img className='Enter' src="https://thumbs.gfycat.com/AmbitiousInfantileIndochinesetiger.webp" alt="" />
      </Link>
    </div>
  )
}

