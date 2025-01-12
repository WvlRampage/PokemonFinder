import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import { StackParamList } from '../../navigation/StackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../../themes/global.styles';
import { styles } from './Home.styles';

type Pokemon = {
  name: string;
  url: string;
};

type DetailedPokemon = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
};

export const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<DetailedPokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<DetailedPokemon[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`
      );
      const detailedData = await Promise.all(
        response.data.results.map(async (pokemon: Pokemon) => {
          const details = await axios.get(pokemon.url);
          return details.data as DetailedPokemon;
        })
      );
      setPokemons((prev) => [...prev, ...detailedData]);
      setFilteredPokemons((prev) => [...prev, ...detailedData]);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const toggleFavorite = async (pokemonId: number) => {
    try {
      const updatedFavorites = favorites.includes(pokemonId)
        ? favorites.filter((id) => id !== pokemonId)
        : [...favorites, pokemonId];

      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const filterPokemons = debounce((query: string) => {
    if (!query) {
      setFilteredPokemons(pokemons);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const matchedPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredPokemons(matchedPokemons);
  }, 300);

  useEffect(() => {
    fetchPokemons();
    loadFavorites();
  }, [page]);

  useEffect(() => {
    filterPokemons(searchQuery);
  }, [searchQuery, pokemons]);

  const renderItem = ({ item }: { item: DetailedPokemon }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate('Detail', { name: item.name })}
      >
        <Image source={{ uri: item.sprites.front_default }} style={styles.pokemonImage} />
        <View>
          <Text style={globalStyles.subtitle}>{item.name}</Text>
          <Text style={globalStyles.description}>
            {item.types.map((type) => type.type.name).join(', ')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Icon
          name="star"
          size={24}
          color={favorites.includes(item.id) ? 'gold' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Pokemon Finder</Text>
      <TextInput
        style={globalStyles.Input}
        placeholder="Search Pokémon"
        placeholderTextColor="#336633 "
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {loading && pokemons.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredPokemons.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{ uri: 'https://i.imgur.com/ctjQ5Z8.png' }} 
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No Pokémon found!</Text>
          <Text style={styles.emptySubText}>
            Try searching for a different Pokémon name.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={() => !searchQuery && setPage((prev) => prev + 1)}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};
