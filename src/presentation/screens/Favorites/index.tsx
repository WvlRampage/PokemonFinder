import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/StackNavigator';
import axios from 'axios';
import { styles } from './Favorites.styles';

type DetailedPokemon = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
};

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<DetailedPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const fetchFavoritePokemons = async () => {
    setLoading(true);
    try {
      const pokemons = await Promise.all(
        favorites.map(async (id) => {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return response.data as DetailedPokemon;
        })
      );
      setFavoritePokemons(pokemons);
    } catch (error) {
      console.error('Failed to fetch favorite Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        await loadFavorites();
      };
      loadData();
    }, [])
  );

  React.useEffect(() => {
    if (favorites.length > 0) {
      fetchFavoritePokemons();
    } else {
      setFavoritePokemons([]);
      setLoading(false);
    }
  }, [favorites]);

  const renderItem = ({ item }: { item: DetailedPokemon }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { name: item.name })}
    >
      <Image source={{ uri: item.sprites.front_default }} style={styles.pokemonImage} />
      <View>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <Text style={styles.pokemonTypes}>
          {item.types.map((type) => type.type.name).join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : favoritePokemons.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favoritePokemons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
