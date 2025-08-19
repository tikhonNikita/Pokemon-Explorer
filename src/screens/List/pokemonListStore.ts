import { createStore } from 'zustand/vanilla';
import { PokemonApiService } from '../../api/pokemonApi';

export interface PokemonWithDetails {
  id: number;
  name: string;
  url: string;
  sprite: string;
}

export interface PokemonListState {
  pokemonList: PokemonWithDetails[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  offset: number;
}

export interface PokemonListActions {
  fetchPokemonList: () => Promise<void>;
  fetchMorePokemon: () => Promise<void>;
  reset: () => void;
}

export type PokemonListStore = PokemonListState & PokemonListActions;

export const createPokemonListStore = (api: PokemonApiService) => {
  return createStore<PokemonListStore>()((set, get) => ({
    pokemonList: [],
    isLoading: false,
    error: null,
    hasMore: true,
    offset: 0,

    fetchPokemonList: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await api.getPokemonList(20, 0);

        const pokemonWithDetails = await Promise.all(
          response.results.map(async pokemon => {
            const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10);
            const details = await api.getPokemonDetails(id);
            return {
              ...pokemon,
              id,
              sprite: details.sprites.front_default || '',
            };
          }),
        );

        set({
          pokemonList: pokemonWithDetails,
          isLoading: false,
          hasMore: response.next !== null,
          offset: 20,
        });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'An error occurred',
          isLoading: false,
        });
      }
    },

    fetchMorePokemon: async () => {
      const { offset, pokemonList, hasMore } = get();
      if (!hasMore) return;

      set({ isLoading: true, error: null });
      try {
        const response = await api.getPokemonList(20, offset);

        const pokemonWithDetails = await Promise.all(
          response.results.map(async pokemon => {
            const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10);
            const details = await api.getPokemonDetails(id);
            return {
              ...pokemon,
              id,
              sprite: details.sprites.front_default || '',
            };
          }),
        );

        set({
          pokemonList: [...pokemonList, ...pokemonWithDetails],
          isLoading: false,
          hasMore: response.next !== null,
          offset: offset + 20,
        });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'An error occurred',
          isLoading: false,
        });
      }
    },

    reset: () => {
      set({
        pokemonList: [],
        isLoading: false,
        error: null,
        hasMore: true,
        offset: 0,
      });
    },
  }));
};
