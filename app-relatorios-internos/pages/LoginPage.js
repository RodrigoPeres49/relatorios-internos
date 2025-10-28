import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function LoginPage({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_usuario: usuario, senha }),
      });
      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Usuario', { usuario, token: data.token });
      } else {
        Alert.alert('Erro', data.error);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
