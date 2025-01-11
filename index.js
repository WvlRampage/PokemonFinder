/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { PokemonApp } from './src/PokemonApp';
import {name as appName} from './app.json';
import './gesture-handler-native'

AppRegistry.registerComponent(appName, () => PokemonApp);
