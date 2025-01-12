import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/StackNavigator';
import { globalStyles } from '../../themes/global.styles';
import { styles } from './Detail.styles';

type DetailScreenProps = NativeStackScreenProps<StackParamList, 'Detail'>;

export const Detail: React.FC<DetailScreenProps> = ({ route }) => {
  const { name } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemonDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch Pokémon details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>{pokemonDetails.name}</Text>
      <Image
        source={{ uri: pokemonDetails.sprites.front_default }}
        style={styles.image}
      />
      <Text style={styles.info}>Height: {pokemonDetails.height}</Text>
      <Text style={styles.info}>Weight: {pokemonDetails.weight}</Text>
      <Text style={styles.info}>Base Experience: {pokemonDetails.base_experience}</Text>
    </View>
  );
};