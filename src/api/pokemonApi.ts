import { Pokemon, PokemonListResponse } from '../types/pokemon';

export interface PokemonApiService {
  getPokemonList: (limit?: number, offset?: number) => Promise<PokemonListResponse>;
  getPokemonDetails: (idOrName: string | number) => Promise<Pokemon>;
  getRandomPokemon: () => Promise<Pokemon>;
}

class PokemonApi implements PokemonApiService {
  private baseUrl: string;
  private fetcher: typeof fetch;

  constructor(fetcher: typeof fetch = fetch, baseUrl = 'https://pokeapi.co/api/v2') {
    this.fetcher = fetcher;
    this.baseUrl = baseUrl;
  }

  async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    const response = await this.fetcher(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`);
    }
    return response.json();
  }

  async getPokemonDetails(idOrName: string | number): Promise<Pokemon> {
    const response = await this.fetcher(`${this.baseUrl}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon details: ${response.statusText}`);
    }
    return response.json();
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const maxPokemonId = 1010;
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
    return this.getPokemonDetails(randomId);
  }
}

export const createPokemonApi = (fetcher?: typeof fetch): PokemonApiService => {
  return new PokemonApi(fetcher);
};
