//-------------Imports-----------------
import '../ComponentsStyles/MainPage.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemons } from '../redux/pokemons'
import Pokemons from './Pokemons'
import Sidebar from './Sidebar'

//-------------------------------------
//-------------Component---------------
export default function MainPage() {
  const dispatch = useDispatch()
  const { pokemons } = useSelector(state => state.pokemons)
  const { status } = useSelector(state => state.pokemons)

  let [source, setSource] = useState('Any')
  let [page, setPage] = useState(1)
  //-------------------------------------
  //-------------Controlers--------------
  useEffect(() => {
    dispatch(getPokemons(page))
  }, [dispatch, page])

  let handlePageChange = (e, newPage) => {
    if (status !== 'loading') {
      e.preventDefault()
      setPage(newPage)
    }
  }
  const handleSourceChange = (e, newSource) => {
    if (status !== 'loading') {
      e.preventDefault()
      setSource(newSource)
      console.log(source);
    }
  }


  //-------------Auxs--------------------
  const pageButtons = <div className='pages'>

    <button className='otherPages' onClick={e => handleSourceChange(e, 'Api')}>Api</button>
    <button className='otherPages' onClick={e => handleSourceChange(e, 'Any')}>Any</button>
    <button className='otherPages' onClick={e => handleSourceChange(e, 'DB')}>Created</button>


    <nav>
      {page > 3 ?
        <button className='cornerPages' onClick={e => handlePageChange(e, 1)}> 1 </button> :
        <></>
      }

      {page > 2 ?
        <button className='otherPages' onClick={e => handlePageChange(e, page - 2)}>{page - 2}</button> :
        <></>
      }

      {page > 1 ?
        <button className='otherPages' onClick={e => handlePageChange(e, page - 1)}>{page - 1}</button> :
        <></>
      }

      <button className='currentPage'>{page}</button>

      {page < 74 ? <button className='otherPages' onClick={e => handlePageChange(e, page + 1)}>{page + 1}</button> : <></>}


      {page < 73 ? <button className='otherPages' onClick={e => handlePageChange(e, page + 2)}>{page + 2}</button> : <></>}

      {page < 72 ? <button className='cornerPages' onClick={e => handlePageChange(e, 75)}> 75 </button> : <></>}


    </nav>

  </div>

  const toRender = <>
    <Sidebar />
    <Pokemons arr={pokemons} />
  </>

  //-------------------------------------
  return (
    <>
      {pageButtons}

      <div className='startPage'>
        {status === 'loading' && <img className='loading' src='https://thumbs.gfycat.com/AmbitiousInfantileIndochinesetiger.webp' alt=''/>}
        {status === 'success' && toRender}
      </div>

      {pageButtons}

    </>
  )
}
