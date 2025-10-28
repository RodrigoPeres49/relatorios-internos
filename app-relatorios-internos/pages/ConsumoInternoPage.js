import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';

export default function ConsumoInternoPage({ route }) {
  const { token } = route.params;

  const [produto, setProduto] = useState('');
  const [data, setData] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [consumos, setConsumos] = useState([]);
  const [editId, setEditId] = useState(null);

  // BUSCAR CONSUMO INTERNO


  const fetchConsumos = async () => {
    try {
      const response = await fetch('http://localhost:3000/consumo_interno/listar-consumo', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok || Array.isArray(data)) {
        setConsumos(data);
      } else {
        Alert.alert('Erro', data.error || 'Falha ao carregar consumos');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  useEffect(() => {
    fetchConsumos();
  }, []);

  // INSERIR OU EDITAR CONSUMO INTERNO


  const handleSalvar = async () => {
    const metodo = editId ? 'PUT' : 'POST';
    const url = editId
      ? `http://localhost:3000/consumo_interno/${editId}`
      : 'http://localhost:3000/consumo_interno/';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ produto, data, quantidade, preco }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', editId ? 'Consumo atualizado!' : 'Consumo registrado!');
        fetchConsumos();
        setProduto('');
        setData('');
        setQuantidade('');
        setPreco('');
        setEditId(null);
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  // EDITAR CONSUMO INTERNO


  const handleEditar = (item) => {
    setProduto(item.produto);
    setData(item.data);
    setQuantidade(item.quantidade.toString());
    setPreco(item.preco.toString());
    setEditId(item.id);
  };

  // DELETAR CONSUMO INTERNO

  const handleDeletar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/consumo_interno/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Consumo deletado!');
        fetchConsumos();
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>{editId ? 'Editar Consumo Interno' : 'Registrar Consumo Interno'}</Text>

      <TextInput
        placeholder="Produto"
        value={produto}
        onChangeText={setProduto}
      />
      <TextInput
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
      />
      <Button title={editId ? "Salvar Alterações" : "Cadastrar"} onPress={handleSalvar} />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Lista de Consumos Internos:</Text>
      <FlatList
        data={consumos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5, borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text>Produto: {item.produto}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Preço: {item.preco}</Text>
            <Text>Usuário: {item.usuario?.nome_usuario || 'N/A'}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Button title="Editar" onPress={() => handleEditar(item)} />
              <View style={{ width: 10 }} />
              <Button title="Deletar" onPress={() => handleDeletar(item.id)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
}
