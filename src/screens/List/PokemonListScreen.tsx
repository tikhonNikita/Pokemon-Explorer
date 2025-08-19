import React, { useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { ErrorView } from '../../components/ErrorView';
import { usePokemonListStore } from './PokemonListStoreProvider';
import { PokemonWithDetails } from './pokemonListStore';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TabParamList } from '../../navigation/types';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'List'>,
  StackNavigationProp<RootStackParamList>
>;

export const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const pokemonList = usePokemonListStore(state => state.pokemonList);
  const isLoading = usePokemonListStore(state => state.isLoading);
  const error = usePokemonListStore(state => state.error);
  const fetchPokemonList = usePokemonListStore(state => state.fetchPokemonList);
  const fetchMorePokemon = usePokemonListStore(state => state.fetchMorePokemon);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  const handlePokemonPress = useCallback(
    (pokemon: PokemonWithDetails) => {
      navigation.navigate('Details', {
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        pokemonSprite: pokemon.sprite,
      });
    },
    [navigation],
  );

  const renderPokemonItem = ({ item }: { item: PokemonWithDetails }) => (
    <TouchableOpacity
      style={styles.pokemonItem}
      onPress={() => handlePokemonPress(item)}
      activeOpacity={0.7}
    >
      {item.sprite ? (
        <Image source={{ uri: item.sprite }} style={styles.pokemonImage} />
      ) : (
        <View style={[styles.pokemonImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>?</Text>
        </View>
      )}
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonNumber}>
          #{item.id.toString().padStart(3, '0')}
        </Text>
        <Text style={styles.pokemonName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading || pokemonList.length === 0) return null;
    return (
      <View style={styles.footerLoader}>
        <LoadingIndicator size="small" />
      </View>
    );
  };

  if (isLoading && pokemonList.length === 0) {
    return <LoadingIndicator />;
  }

  if (error && pokemonList.length === 0) {
    return <ErrorView error={error} onRetry={fetchPokemonList} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokédex</Text>
      </View>
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onEndReached={fetchMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.shadow.base,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pokemonImage: {
    width: 80,
    height: 80,
    backgroundColor: colors.background.primary,
    borderRadius: 8,
  },
  pokemonInfo: {
    marginLeft: 16,
    flex: 1,
  },
  pokemonNumber: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.placeholder,
  },
  placeholderText: {
    fontSize: 32,
    color: colors.text.light,
    fontWeight: 'bold',
  },
});
