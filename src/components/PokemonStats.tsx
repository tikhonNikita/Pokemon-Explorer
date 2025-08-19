import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { Pokemon } from '../types/pokemon';

interface PokemonStatsProps {
  stats: Pokemon['stats'];
}

const statColors = colors.pokemonStats;

const maxStat = 255;

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Base Stats</Text>
      {stats.map(stat => {
        const percentage = (stat.base_stat / maxStat) * 100;
        const statName = stat.stat.name;

        return (
          <View key={statName} style={styles.statRow}>
            <Text style={styles.statName}>
              {statName.replace('-', ' ').toUpperCase()}
            </Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
            <View style={styles.statBarContainer}>
              <View
                style={[
                  styles.statBar,
                  {
                    width: `${percentage}%`,
                    backgroundColor:
                      statColors[statName as keyof typeof statColors] ||
                      colors.button.fallback,
                  },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text.primary,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statName: {
    flex: 1,
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  statValue: {
    width: 45,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'right',
    marginRight: 10,
  },
  statBarContainer: {
    flex: 2,
    height: 20,
    backgroundColor: colors.background.light,
    borderRadius: 10,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 10,
  },
});
