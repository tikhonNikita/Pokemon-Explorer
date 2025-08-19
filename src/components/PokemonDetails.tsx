import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Pokemon } from '../types/pokemon';
import { PokemonType } from './PokemonType';
import { PokemonStats } from './PokemonStats';

interface PokemonDetailsProps {
  pokemon: Pokemon;
}
export const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  const imageUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default;

  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { width: width * 0.6, height: width * 0.6 }]}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.pokemonNumber}>
          #{pokemon.id.toString().padStart(3, '0')}
        </Text>
        <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>

        <View style={styles.typesContainer}>
          <PokemonType types={pokemon.types} />
        </View>

        <View style={styles.measurementsContainer}>
          <View style={styles.measurement}>
            <Text style={styles.measurementLabel}>Height</Text>
            <Text style={styles.measurementValue}>{pokemon.height / 10} m</Text>
          </View>
          <View style={styles.measurement}>
            <Text style={styles.measurementLabel}>Weight</Text>
            <Text style={styles.measurementValue}>
              {pokemon.weight / 10} kg
            </Text>
          </View>
        </View>

        <View style={styles.abilitiesContainer}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          <View style={styles.abilitiesList}>
            {pokemon.abilities.map((ability, index) => (
              <View key={index} style={styles.abilityItem}>
                <Text style={styles.abilityText}>
                  {ability.ability.name.replace('-', ' ')}
                </Text>
                {ability.is_hidden && (
                  <Text style={styles.hiddenAbility}> (Hidden)</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <PokemonStats stats={pokemon.stats} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.background.secondary,
  },
  image: {
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 20,
  },
  pokemonNumber: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  typesContainer: {
    marginBottom: 20,
  },
  measurementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  measurement: {
    alignItems: 'center',
  },
  measurementLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  measurementValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  abilitiesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text.primary,
  },
  abilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  abilityText: {
    fontSize: 14,
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  hiddenAbility: {
    fontSize: 12,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
});
