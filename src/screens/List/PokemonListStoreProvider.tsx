import React, { createContext, ReactNode, useState, useContext } from 'react';
import { useStore } from 'zustand';
import { createPokemonListStore, PokemonListStore } from './pokemonListStore';
import { usePokemonApi } from '../../providers/ServiceProvider';

const PokemonListStoreContext = createContext<ReturnType<typeof createPokemonListStore> | null>(null);

export const PokemonListStoreProvider = ({ children }: { children: ReactNode }) => {
  const pokemonApi = usePokemonApi();
  const [store] = useState(() => createPokemonListStore(pokemonApi));

  return (
    <PokemonListStoreContext.Provider value={store}>
      {children}
    </PokemonListStoreContext.Provider>
  );
};

export const usePokemonListStore = <U,>(
  selector: (state: PokemonListStore) => U,
) => {
  const store = useContext(PokemonListStoreContext);

  if (!store) {
    throw new Error('usePokemonListStore must be used within PokemonListStoreProvider');
  }

  return useStore(store, selector);
};
