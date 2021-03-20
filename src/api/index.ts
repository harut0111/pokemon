const API_URL = "https://pokeapi.co/api/v2/pokemon";

interface pokemonData {
  name: string;
  abilities: [];
  base_experience: number;
  sprites: {
    back_default: string;
  };
}

export default class Api {
  static async getPokemon(searchValue: string): Promise<pokemonData> {
    const response = await fetch(`${API_URL}/${searchValue}`);
    if (response.ok) return await response.json();
    throw new Error(`An error has occurred: ${response.status}`);
  }
}
