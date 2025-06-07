import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function UsuarioGitHub() {
  const [usuario, setUsuario] = useState('');
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const consultarUsuario = async () => {
    if (!usuario) return;

    setCarregando(true);
    setErro(null);
    setDados(null);

    try {
      const resposta = await fetch(`https://api.github.com/users/${usuario}`);
      if (!resposta.ok) throw new Error('Usuário não encontrado');
      const dadosJson = await resposta.json();
      setDados(dadosJson);
    } catch (erro) {
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>🔮 Consultar Usuário do GitHub 🔮</Text>

      <TextInput
        style={estilos.input}
        placeholder="Digite o nome do usuário"
        placeholderTextColor="#d8b4fe"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TouchableOpacity style={estilos.botao} onPress={consultarUsuario}>
        <Text style={estilos.botaoTexto}>Consultar</Text>
      </TouchableOpacity>

      {carregando && <ActivityIndicator size="large" color="#d8b4fe" style={{ marginTop: 20 }} />}
      {erro && <Text style={estilos.erro}>{erro}</Text>}

      {dados && (
        <View style={estilos.resultado}>
          <Image source={{ uri: dados.avatar_url }} style={estilos.avatar} />
          <Text style={estilos.nome}>{dados.name || 'Nome não disponível'}</Text>
          <Text style={estilos.login}>@{dados.login}</Text>
          <Text style={estilos.bio}>{dados.bio || 'Sem bio disponível'}</Text>
          <Text style={estilos.info}>Repositórios: {dados.public_repos}</Text>
          <Text style={estilos.info}>Seguidores: {dados.followers}</Text>
          <Text style={estilos.info}>Seguindo: {dados.following}</Text>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2e003e',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d8b4fe',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#9f5afd',
    backgroundColor: '#3e065f',
    color: '#ffffff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#9f5afd',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#3e065f',
    padding: 20,
    borderRadius: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#d8b4fe',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  login: {
    fontSize: 16,
    color: '#d8b4fe',
  },
  bio: {
    fontStyle: 'italic',
    marginVertical: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  info: {
    color: '#d8b4fe',
    marginTop: 5,
  },
  erro: {
    color: '#ff6b81',
    marginTop: 20,
    textAlign: 'center',
  },
});
