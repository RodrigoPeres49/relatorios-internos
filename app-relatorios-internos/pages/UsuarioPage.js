import React from 'react';
import { View, Text, Button } from 'react-native';

export default function UsuarioPage({ route, navigation }) {
  const { usuario, token } = route.params;

  return (
    <View>
      <Text>Bem-vindo(a)!</Text>
      <Text>{usuario}</Text>

      <Button
        title="Registrar Consumo Interno"
        onPress={() => navigation.navigate('ConsumoInterno', { token })}
      />
    </View>
  );
}