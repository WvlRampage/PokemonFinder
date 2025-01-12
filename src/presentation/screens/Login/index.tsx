import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimaryButton } from '../../components';
import { globalStyles } from '../../themes/global.styles';
import { styles } from './Login.styles';

type LoginProps = {
  navigation: {
    replace: (screen: string) => void;
  };
};

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
      return;
    }

    try {
      await AsyncStorage.setItem('userLoggedIn', 'true');
      navigation.replace('HomeScreen'); // Navigate to Home screen
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (    
    <ImageBackground source={require('../../../../assets/images/pika.jpg')} style={styles.bgContainer}>  
      <View style={styles.titleContainer}>
        <Text style={globalStyles.title}>Pokemon Finder</Text>
      </View>
      <View style={styles.container}>
      <Text style={globalStyles.description}>Login to start and find the best pokemon for you!</Text>
        <TextInput
          style={globalStyles.Input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={globalStyles.Input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PrimaryButton label="Login" onPress={handleLogin} />

      </View>
    </ImageBackground>
  );
};

