import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { usePokemonDetailsStore } from './PokemonDetailsStoreProvider';
import { PokemonDetails } from '../../components/PokemonDetails';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { ErrorView } from '../../components/ErrorView';
import { RootStackParamList } from '../../navigation/types';

type PokemonDetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export const PokemonDetailsScreen: React.FC = () => {
  const route = useRoute<PokemonDetailsRouteProp>();
  const { pokemonId } = route.params;
  
  const pokemon = usePokemonDetailsStore((state) => state.pokemon);
  const isLoading = usePokemonDetailsStore((state) => state.isLoading);
  const error = usePokemonDetailsStore((state) => state.error);
  const fetchPokemonDetails = usePokemonDetailsStore((state) => state.fetchPokemonDetails);

  useEffect(() => {
    fetchPokemonDetails(pokemonId);
  }, [pokemonId, fetchPokemonDetails]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={() => fetchPokemonDetails(pokemonId)} />;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <PokemonDetails pokemon={pokemon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
