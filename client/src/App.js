import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Landing from './Components/Landing.jsx';
import Nav from './Components/Nav.jsx';
import MainPage from './Components/MainPage'
import Creation from './Components/Creation'
import PokemonDetail from './Components/PokemonDetail';


function App() {
  return (
    <BrowserRouter>
      <div id='root'>
      <Nav />
        <Routes>
          < Route exact path='/' element={<Landing/>} />
          < Route exact path='/home' element={<MainPage/>} />
          < Route exact path='/create' element={<Creation/>} />
          < Route exact path='/pokemons/:name' element={<PokemonDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
