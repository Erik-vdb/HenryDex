//-------------Imports-----------------
import '../ComponentsStyles/MainPage.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemons, changeOptions, applyOptions } from '../redux/pokemons'
import Pokemons from './Pokemons'
import { render } from 'react-dom'

//-------------------------------------
//-------------Component---------------
export default function MainPage() {
	const dispatch = useDispatch()
	const { pokemons, allPokemons, status, options } = useSelector(state => state.pokemons)

	let [source, setSource] = useState('Any')
  let [type, setType] = useState('None')
  let [orderDir, setOrderDir] = useState(options.orderDir)
  let [order, setOrder] = useState('ID')
	let [page, setPage] = useState(1)
	//-----------------------------------
  
  useEffect(()=>{
    dispatch(applyOptions())
  },[allPokemons])

	//-------------Controllers-----------
	//-------------Pages-----------------
	const handlePageChange = (e, newPage) => {
		if (status !== 'loading') {
      
			e.preventDefault()
			setPage(newPage)
		}
	}
	useEffect(() => {
    dispatch(getPokemons(page))
	}, [dispatch, page])
	//-----------------------------------

	//-------------Sources---------------
	const handleSources = (e, newSource) => {
    
		e.preventDefault()

		if(status !== 'loading'){
			setSource(newSource)
		}
	}

	useEffect(() => {
    dispatch(changeOptions(['source', source]))
    status === 'success' && dispatch(applyOptions())
	}, [source])
	//-----------------------------------

  //-------------Types-----------------
  const handleTypes = (e) => {
    
    e.preventDefault()
    const newType = e.target.value
    if (status !== 'loading'){
      setType(newType)
    }
  }

  useEffect(() => {
    dispatch(changeOptions(['types', type]))
    status === 'success' && dispatch(applyOptions())
  }, [type])
  //-----------------------------------

  //----------Order Button------------
  const handleOrderDir = (e) => {
    e.preventDefault()
    orderDir === 'Asc' ? setOrderDir('Desc') : setOrderDir('Asc')

  }
  
  useEffect(() => {
    dispatch(changeOptions(['orderDir', orderDir]))
    status === 'success' && dispatch(applyOptions())
  }, [orderDir])
  //-----------------------------------

  //-------------Ordering--------------
  const handleOrderChange = (e, newOrder) => {
    e.preventDefault()
    
    
    if(status !== 'loading'){
      setOrder(newOrder)
    }
  }
  
  useEffect(() => {
    dispatch(changeOptions(['order', order]))
    status === 'success' && dispatch(applyOptions())
  }, [order])
  //-----------------------------------

	//-------------Auxs--------------------
	const pageButtons = <div className='pages'>
		<div className="sources">
			<button className={source === 'Api' ? 'currentSource source' : 'otherSource source'} onClick={e => handleSources(e, 'Api')}>Api</button>
			<button className={source === 'Any' ? 'currentSource source' : 'otherSource source'} onClick={e => handleSources(e, 'Any')}>Any</button>
			<button className={source === 'DB' ? 'currentSource source' : 'otherSource source'} onClick={e => handleSources(e, 'DB')}>DB</button>
		</div>

		<nav className='pagination'>
			{page > 3 && <button className='cornerPages' onClick={e => handlePageChange(e, 1)}> 1 </button>}
			{page > 2 && <button className='otherPages' onClick={e => handlePageChange(e, page - 2)}>{page - 2}</button>}
			{page > 1 && <button className='otherPages' onClick={e => handlePageChange(e, page - 1)}>{page - 1}</button>}
      {/* Current Page */} <button className='currentPage'>{page}</button> {/* Current Page */}
			{page <= 74 && <button className='otherPages' onClick={e => handlePageChange(e, page + 1)}>{page + 1}</button>}
			{page <= 73 && <button className='otherPages' onClick={e => handlePageChange(e, page + 2)}>{page + 2}</button>}
			{page <= 72 && <button className='cornerPages' onClick={e => handlePageChange(e, 75)}> 75 </button>}
		</nav>

		<select name='Type' value={type} id='TypeSelect' onChange={e => handleTypes(e)}>
			<option value="None">Select Types</option>
			<option value="normal">Normal</option>
			<option value="fighting">Figthing</option>
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

    <select value={order} name="Order" id="orderSelect" onChange={e => handleOrderChange(e, e.target.value)}>
      <option value="id">ID/Default</option>
      <option value="name">Nombre</option>
      <option value="fuerza">Fuerza</option>
    </select>

    <button id='orderButton' onClick={e => handleOrderDir(e)}>{orderDir === 'Asc' ? '↑' : '↓'}</button>
	</div>


	//-------------------------------------
	return (
		<>
			{pageButtons}

			<div className='startPage'>
				{status === 'loading' && <img className='loading' src='https://thumbs.gfycat.com/AmbitiousInfantileIndochinesetiger.webp' alt='' />}
				{status === 'success' && <Pokemons props={orderDir === 'Asc' ? pokemons : pokemons.slice(0).reverse()} key={0}/>}
			</div>

			{pageButtons}

		</>
	)
}
