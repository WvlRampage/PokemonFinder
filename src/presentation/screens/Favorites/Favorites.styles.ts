import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f8f9fa',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      marginBottom: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    pokemonImage: {
      width: 50,
      height: 50,
      marginRight: 12,
    },
    pokemonName: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    pokemonTypes: {
      fontSize: 14,
      color: '#888',
      textTransform: 'capitalize',
    },
    emptyText: {
      fontSize: 18,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  