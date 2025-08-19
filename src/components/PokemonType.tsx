import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface PokemonTypeProps {
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

const typeColors = colors.pokemonTypes;

export const PokemonType: React.FC<PokemonTypeProps> = ({ types }) => {
  return (
    <View style={styles.container}>
      {types.map((type, index) => (
        <View
          key={index}
          style={[
            styles.typeBadge,
            {
              backgroundColor:
                typeColors[type.type.name as keyof typeof typeColors] ||
                colors.button.fallback,
            },
          ]}
        >
          <Text style={styles.typeText}>{type.type.name.toUpperCase()}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    color: colors.text.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
