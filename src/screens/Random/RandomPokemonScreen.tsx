import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRandomPokemonStore } from './RandomPokemonStoreProvider';
import { PokemonDetails } from '../../components/PokemonDetails';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { ErrorView } from '../../components/ErrorView';

export const RandomPokemonScreen: React.FC = () => {
  const pokemon = useRandomPokemonStore((state) => state.pokemon);
  const isLoading = useRandomPokemonStore((state) => state.isLoading);
  const error = useRandomPokemonStore((state) => state.error);
  const fetchRandomPokemon = useRandomPokemonStore((state) => state.fetchRandomPokemon);

  useEffect(() => {
    fetchRandomPokemon();
  }, [fetchRandomPokemon]);

  const handleNewRandomPokemon = () => {
    fetchRandomPokemon();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={fetchRandomPokemon} />;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Random Pokémon</Text>
        <TouchableOpacity
          style={styles.randomButton}
          onPress={handleNewRandomPokemon}
          activeOpacity={0.8}
        >
          <Text style={styles.randomButtonText}>🎲 New</Text>
        </TouchableOpacity>
      </View>
      <PokemonDetails pokemon={pokemon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  randomButton: {
    backgroundColor: colors.button.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  randomButtonText: {
    color: colors.text.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
