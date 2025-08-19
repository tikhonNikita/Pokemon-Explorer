import React, { createContext, ReactNode, useState, useContext } from 'react';
import { useStore } from 'zustand';
import {
  createPokemonDetailsStore,
  PokemonDetailsStore,
} from './pokemonDetailsStore';
import { usePokemonApi } from '../../providers/ServiceProvider';

const PokemonDetailsStoreContext = createContext<ReturnType<
  typeof createPokemonDetailsStore
> | null>(null);

export const PokemonDetailsStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pokemonApi = usePokemonApi();
  const [store] = useState(() => createPokemonDetailsStore(pokemonApi));

  return (
    <PokemonDetailsStoreContext.Provider value={store}>
      {children}
    </PokemonDetailsStoreContext.Provider>
  );
};

export const usePokemonDetailsStore = <U,>(
  selector: (state: PokemonDetailsStore) => U,
) => {
  const store = useContext(PokemonDetailsStoreContext);

  if (!store) {
    throw new Error(
      'usePokemonDetailsStore must be used within PokemonDetailsStoreProvider',
    );
  }

  return useStore(store, selector);
};
