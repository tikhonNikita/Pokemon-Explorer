import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme/colors';
import { PokemonListScreen } from '../screens/List/PokemonListScreen';
import { PokemonListStoreProvider } from '../screens/List/PokemonListStoreProvider';
import { RandomPokemonScreen } from '../screens/Random/RandomPokemonScreen';
import { RandomPokemonStoreProvider } from '../screens/Random/RandomPokemonStoreProvider';
import { TabParamList } from './types';
import { Text, TextStyle } from 'react-native';

const Tab = createBottomTabNavigator<TabParamList>();

const PokedexIcon = ({ color, size }: { color: string; size: number }) => {
  const iconStyle: TextStyle = { fontSize: size, color };
  return <Text style={iconStyle}>📚</Text>;
};

const RandomIcon = ({ color, size }: { color: string; size: number }) => {
  const iconStyle: TextStyle = { fontSize: size, color };
  return <Text style={iconStyle}>🎲</Text>;
};

const PokemonListScreenWithProvider = () => (
  <PokemonListStoreProvider>
    <PokemonListScreen />
  </PokemonListStoreProvider>
);

const RandomPokemonScreenWithProvider = () => (
  <RandomPokemonStoreProvider>
    <RandomPokemonScreen />
  </RandomPokemonStoreProvider>
);

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.button.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
          paddingTop: 8,
          paddingBottom: 13,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="List"
        component={PokemonListScreenWithProvider}
        options={{
          tabBarLabel: 'Pokédex',
          tabBarIcon: PokedexIcon,
        }}
      />
      <Tab.Screen
        name="Random"
        component={RandomPokemonScreenWithProvider}
        options={{
          tabBarLabel: 'Random',
          tabBarIcon: RandomIcon,
        }}
      />
    </Tab.Navigator>
  );
};
