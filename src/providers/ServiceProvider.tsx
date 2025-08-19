import React, { createContext, useContext, useRef } from 'react';
import { createPokemonApi, PokemonApiService } from '../api/pokemonApi';

interface ServiceContextValue {
  pokemonApi: PokemonApiService;
}

const ServiceContext = createContext<ServiceContextValue | null>(null);

interface ServiceProviderProps {
  children: React.ReactNode;
  pokemonApi?: PokemonApiService;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children, pokemonApi }) => {
  const servicesRef = useRef<ServiceContextValue | undefined>(undefined);

  if (!servicesRef.current) {
    servicesRef.current = {
      pokemonApi: pokemonApi || createPokemonApi(),
    };
  }

  return (
    <ServiceContext.Provider value={servicesRef.current}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within ServiceProvider');
  }
  return context;
};

export const usePokemonApi = () => {
  const { pokemonApi } = useServices();
  return pokemonApi;
};
