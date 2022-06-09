import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Nav from './Components/Nav.jsx';
import Landing from './Components/Landing.jsx';
import MainPage from './Components/MainPage'
import Creation from './Components/Creation'
import PokemonDetail from './Components/PokemonDetail';
import PokemonByName from './Components/PokemonByName';


function App() {
  return (
    <BrowserRouter>
      <div id='root'>
      <Nav />
        <Routes>
          < Route exact path='/' element={<Landing/>} />
          < Route exact path='/home' element={<MainPage/>} />
          < Route exact path='/create' element={<Creation/>} />
          < Route exact path='/pokemon/:name' element={<PokemonByName/>}/>
          < Route exact path='/pokemons/:id' element={<PokemonDetail/>}/>
          < Route exact path='/:error'/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
