import React, {useCallback} from 'react'
import User from '../interfaces/User.interface'
import SearchState from '../interfaces/Search.state'


const PokemonSearch = (props: User) => {

    const [searchValue, setSearchValue] = React.useState('1');
   
    const initial = {
        error: false,
        name: '',
        numberOfAbilites: 0,
        baseExperience: 0,
        imageUrl: ''
    }

    const [searchState, setSearchState] = React.useState<SearchState>(initial)
    
    async function fetchPokemon() {

        // const inputValue = pokemonRef.current.value;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
       
        if(response.status === 200 && searchValue) {

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

    const memorizedFetchPokemon = useCallback(fetchPokemon, []);

    React.useMemo(() => {
        memorizedFetchPokemon();
    },[memorizedFetchPokemon])

    const { name, numberOfPokemons } = props;

    return (
        <div>
            <p>User {name} has {numberOfPokemons} pokemons</p>
            {searchState.error ? <p style={{color: 'red'}}>Pokemon not found, please try again</p> : (
                <div>
                    <img src={searchState.imageUrl} alt="pokemon" className="pokemon-image" width='100' />
                    <p>
                        {searchState.name} has {searchState.numberOfAbilites} abilities and {searchState.baseExperience}{' '}
                         base experience points
                    </p>
                </div>
            )}
            <input type='text' onChange={e => setSearchValue(e.target.value)} />
            <button onClick={() => fetchPokemon()} className='my-button'>
                Search
            </button>
        </div>
    )
}

export default PokemonSearch;
