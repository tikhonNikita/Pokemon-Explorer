import React, { createContext, ReactNode, useState, useContext } from 'react';
import { useStore } from 'zustand';
import { createRandomPokemonStore, RandomPokemonStore } from './randomPokemonStore';
import { usePokemonApi } from '../../providers/ServiceProvider';

const RandomPokemonStoreContext = createContext<ReturnType<typeof createRandomPokemonStore> | null>(null);

export const RandomPokemonStoreProvider = ({ children }: { children: ReactNode }) => {
  const pokemonApi = usePokemonApi();
  const [store] = useState(() => createRandomPokemonStore(pokemonApi));

  return (
    <RandomPokemonStoreContext.Provider value={store}>
      {children}
    </RandomPokemonStoreContext.Provider>
  );
};

export const useRandomPokemonStore = <U,>(
  selector: (state: RandomPokemonStore) => U,
) => {
  const store = useContext(RandomPokemonStoreContext);

  if (!store) {
    throw new Error('useRandomPokemonStore must be used within RandomPokemonStoreProvider');
  }

  return useStore(store, selector);
};
