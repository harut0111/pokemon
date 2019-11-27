import React from 'react';
import PokemonSearch from './components/PokemonSearch'
import './App.css';

const App: React.FC = () => {

  return (
    <div className="App">
        <div className='App-header'>
          <PokemonSearch name="John Doe" numberOfPokemons={12} />
        </div>
    </div>
  );
}

export default App;
