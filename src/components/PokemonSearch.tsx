import React, { useCallback } from "react";
import User from "../interfaces/User.interface";
import SearchState from "../interfaces/Search.state";
import Api from "../api";

const PokemonSearch = (props: User) => {
  const [searchValue, setSearchValue] = React.useState("1");

  const initial = {
    error: false,
    name: "",
    numberOfAbilites: 0,
    baseExperience: 0,
    imageUrl: "",
  };

  const [searchState, setSearchState] = React.useState<SearchState>(initial);
  const [loading, setLoading] = React.useState(false);

  async function fetchPokemon() {
    setLoading(true);
    try {
      // simulate delay
      await new Promise((res) => setTimeout(() => res(null), 1000));
      const data = await Api.getPokemon(searchValue);
      setSearchState({
        error: false,
        name: data.name,
        numberOfAbilites: data.abilities.length,
        baseExperience: data.base_experience,
        imageUrl: data.sprites.back_default,
      });
    } catch (error) {
      setSearchState({ ...searchState, error: true });
    } finally {
      setLoading(false);
    }
  }

  const memorizedFetchPokemon = useCallback(fetchPokemon, []);

  React.useEffect(() => {
    memorizedFetchPokemon();
  }, [memorizedFetchPokemon]);

  const { name, numberOfPokemons } = props;

  return (
    <div>
      <p>
        User {name} has {numberOfPokemons} pokemons
      </p>
      {searchState.error ? (
        <p style={{ color: "red" }}>Pokemon not found, please try again</p>
      ) : loading ? (
        <div style={{ height: "100px" }}>Loading ...</div>
      ) : (
        <div>
          <img
            src={searchState.imageUrl}
            alt="pokemon"
            className="pokemon-image"
            width="100"
          />
          <p>
            {searchState.name} has {searchState.numberOfAbilites} abilities and{" "}
            {searchState.baseExperience} base experience points
          </p>
        </div>
      )}
      <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={fetchPokemon} className="my-button">
        Search
      </button>
    </div>
  );
};

export default PokemonSearch;
