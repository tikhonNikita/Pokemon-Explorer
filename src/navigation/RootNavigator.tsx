import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { TabNavigator } from './TabNavigator';
import { PokemonDetailsScreen } from '../screens/Details/PokemonDetailsScreen';
import { PokemonDetailsStoreProvider } from '../screens/Details/PokemonDetailsStoreProvider';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const PokemonDetailsScreenWithProvider = () => (
  <PokemonDetailsStoreProvider>
    <PokemonDetailsScreen />
  </PokemonDetailsStoreProvider>
);

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={PokemonDetailsScreenWithProvider}
          options={({ route }) => ({
            title: route.params.pokemonName
              ? route.params.pokemonName.charAt(0).toUpperCase() +
                route.params.pokemonName.slice(1)
              : 'Pokémon Details',
            headerStyle: {
              backgroundColor: colors.background.primary,
            },
            headerTintColor: colors.text.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
