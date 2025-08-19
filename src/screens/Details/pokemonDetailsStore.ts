import { createStore } from 'zustand/vanilla';
import { Pokemon } from '../../types/pokemon';
import { PokemonApiService } from '../../api/pokemonApi';

export interface PokemonDetailsState {
  pokemon: Pokemon | null;
  isLoading: boolean;
  error: string | null;
}

export interface PokemonDetailsActions {
  fetchPokemonDetails: (idOrName: string | number) => Promise<void>;
  setPokemon: (pokemon: Pokemon) => void;
  reset: () => void;
}

export type PokemonDetailsStore = PokemonDetailsState & PokemonDetailsActions;

export const createPokemonDetailsStore = (api: PokemonApiService) => {
  return createStore<PokemonDetailsStore>()((set) => ({
    pokemon: null,
    isLoading: false,
    error: null,

    fetchPokemonDetails: async (idOrName: string | number) => {
      set({ isLoading: true, error: null });
      try {
        const pokemon = await api.getPokemonDetails(idOrName);
        set({ pokemon, isLoading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'An error occurred',
          isLoading: false,
        });
      }
    },

    setPokemon: (pokemon: Pokemon) => {
      set({ pokemon, isLoading: false, error: null });
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
