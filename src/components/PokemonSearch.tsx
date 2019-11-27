import React from 'react'
import User from '../interfaces/User.interface'
import SearchState from '../interfaces/Search.state'


const PokemonSearch = (props: User) => {

    const pokemonRef = React.useRef<HTMLInputElement>(null);
   
    
    
    const initial = {
        error: false,
        name: '',
        numberOfAbilites: 0,
        baseExperience: 0,
        imageUrl: ''
    }

    const [searchState, setSearchState] = React.useState<SearchState>(initial)
    
    async function onSearchClick() {

        const inputValue = pokemonRef.current.value;
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
       
        if(response.status === 200 && inputValue) {

            const data = await response.json();
            setSearchState({
                error: false,
                name: data.name,
                numberOfAbilites: data.abilities.length,
                baseExperience: data.base_experience,
                imageUrl: data.sprites.front_default,
            })
        } else {
            setSearchState({...searchState, error: true});
        }        
    }

    console.log(searchState);

    const { name, numberOfPokemons } = props;

    return (
        <div>
            <p>User {name} has {numberOfPokemons} pokemons</p>
            {searchState.error ? <p>Pokemon not found, please try again</p> : (
                <div>
                    <img src={searchState.imageUrl} alt="pokemon" className="pokemon-image" />
                    <p>
                        {searchState.name} has {searchState.numberOfAbilites} abilities and {searchState.baseExperience}{' '}
                         base experience points
                    </p>
                </div>
            )}
            <input type='text' ref={pokemonRef} />
            <button onClick={onSearchClick} className='my-button'>
                Search
            </button>
        </div>
    )
}

export default PokemonSearch;
