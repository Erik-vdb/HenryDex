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
  //-------------Auxs--------------------
  const pageButtons = <div className='pages'>

    <nav>
      {page > 2 ? <button className='otherPages' onClick={e => handlePageChange(e, page - 2)}>{page - 2}</button> : <></>}
      {page > 1 ? <button className='otherPages' onClick={e => handlePageChange(e, page - 1)}>{page - 1}</button> : <></>}

      <button className='currentPage'>{page}</button>

      <button className='otherPages' onClick={e => handlePageChange(e, page + 1)}>{page + 1}</button>
      <button className='otherPages' onClick={e => handlePageChange(e, page + 2)}>{page + 2}</button>
    </nav>

  </div>

  const toRender = <>
  <Sidebar/>
  <Pokemons arr={pokemons}/>
  </>
  //-------------------------------------
  return (
  <>
      {pageButtons}

    <div className='startPage'>
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'success' && toRender}
    </div>

      {pageButtons}

  </>
  )
}
