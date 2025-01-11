import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Login} from '../screens/Login';
import {Home} from '../screens/Home';
import {Favorites} from '../screens/Favorites';
import {Detail} from '../screens/Detail';

export type StackParamList = {
  Login: undefined;
  HomeScreen: undefined; // Tab Navigator
  Detail: { name: string }; // Pokémon Detail Screen
};

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        tabBarActiveTintColor:'#207394',
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}      
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="star" color={color} size={size} />,
        tabBarActiveTintColor:'#207394',
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'HomeScreen'>('Login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('userLoggedIn');
      setInitialRoute(loggedIn === 'true' ? 'HomeScreen' : 'Login');
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (loading) return null; // Avoid rendering until initial route is determined

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={{headerTitle:""}}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: true,
            headerTitle: 'Pokémon Details',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
