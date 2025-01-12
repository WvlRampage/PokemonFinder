import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f8f9fa',
    },  
    row: {
      justifyContent: 'space-between',
    },
    card: {
      flex: 1,
      margin: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
    cardContent: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    pokemonImage: {
      width: 100,
      resizeMode: 'contain',
      height: 100,
    }, 
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
    },
    emptyImage: {
      width: 200,
      height: 200,
      resizeMode:'contain',
      marginBottom: 20,
    },
    emptyText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ff4d4d',
      marginBottom: 10,
    },
    emptySubText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginBottom: 20,
    },
  });