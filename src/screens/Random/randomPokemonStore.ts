import { createStore } from 'zustand/vanilla';
import { Pokemon } from '../../types/pokemon';
import { PokemonApiService } from '../../api/pokemonApi';

export interface RandomPokemonState {
  pokemon: Pokemon | null;
  isLoading: boolean;
  error: string | null;
}

export interface RandomPokemonActions {
  fetchRandomPokemon: () => Promise<void>;
  reset: () => void;
}

export type RandomPokemonStore = RandomPokemonState & RandomPokemonActions;

export const createRandomPokemonStore = (api: PokemonApiService) => {
  return createStore<RandomPokemonStore>()((set) => ({
    pokemon: null,
    isLoading: false,
    error: null,

    fetchRandomPokemon: async () => {
      set({ isLoading: true, error: null });
      try {
        const pokemon = await api.getRandomPokemon();
        set({ pokemon, isLoading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'An error occurred',
          isLoading: false,
        });
      }
    },

    reset: () => {
      set({
        pokemon: null,
        isLoading: false,
        error: null,
      });
    },
  }));
};
