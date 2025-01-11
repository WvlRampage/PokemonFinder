import { SafeAreaView } from 'react-native';
import {AppNavigator} from './presentation/navigation/StackNavigator';

export const PokemonApp = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <AppNavigator />
    </SafeAreaView>
  );
};