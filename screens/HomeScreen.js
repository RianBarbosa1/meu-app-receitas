import React, { useEffect, useCallback } from 'react'; 
import { useFocusEffect } from '@react-navigation/native';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import { useReceitas } from '../hooks/useReceitas';
import CardReceita from '../components/CardReceita'; 

export default function HomeScreen({ navigation }) {
  const { 
    receitas, 
    isLoading, 
    deletarReceita,
    recarregarReceitas,
  } = useReceitas();

  // LÓGICA DE RECARREGAMENTO:
  // Este efeito será chamado toda vez que a tela entrar em foco (quando você retornar do formulário).
  useFocusEffect(
    useCallback(() => {
      recarregarReceitas();
      
      return () => {
        // Limpeza, se necessário (não é necessário aqui)
      };
    }, [recarregarReceitas])
  );
  
  // --- Efeito para Adicionar Botão de Configurações no Header ---
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')} // Navega para a tela 'Settings'
          style={{ marginRight: 10 }}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
    
  // --- Função para lidar com a exclusão ---
  const handleDeletar = (id, nome) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja apagar a receita "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Apagar", 
          onPress: () => deletarReceita(id), 
          style: "destructive" 
        }
      ]
    );
  };
  
  // --- Estados de Carregamento e Vazio ---
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loadingText}>Carregando suas receitas...</Text>
      </View>
    );
  }

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="pizza-outline" size={80} color="#ccc" />
      <Text style={styles.emptyText}>Nenhuma receita cadastrada ainda.</Text>
      <Text style={styles.emptyTextHint}>Toque no '+' para adicionar a primeira!</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <CardReceita
      receita={item}
      onEdit={() => navigation.navigate('FormReceita', { receita: item })}
      onDelete={() => handleDeletar(item.id, item.nome)}
    />
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={receitas.length === 0 && styles.flatListEmpty}
      />{/* Botão flutuante para CRIAR NOVA RECEITA */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('FormReceita')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#333'
  },
  flatListEmpty: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
  },
  emptyTextHint: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#FF5733',
    borderRadius: 30,
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});