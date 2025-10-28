import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import UsuarioPage from './pages/UsuarioPage';
import ConsumoInternoPage from './pages/ConsumoInternoPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [savedUser, setSavedUser] = useState(null);
  const [savedToken, setSavedToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const usuario = await AsyncStorage.getItem('usuario');
      if (token && usuario) {
        setSavedUser(usuario);
        setSavedToken(token);
        setInitialRoute('Usuario');
      }
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login">
          {props => <LoginPage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Usuario">
          {props => <UsuarioPage {...props} usuario={savedUser} token={savedToken} />}
        </Stack.Screen>
        <Stack.Screen name="ConsumoInterno">
          {props => <ConsumoInternoPage {...props} token={savedToken} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
