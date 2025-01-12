import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      marginBottom: 16,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 16,
    },
    info: {
      fontSize: 18,
      marginBottom: 8,
    },
  });