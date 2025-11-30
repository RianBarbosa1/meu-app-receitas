import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardReceita({ receita, onEdit, onDelete }) {
  // Tradução simples para exibição (apenas para exemplo)
  const dificuldadeLabel = {
    'facil': 'Fácil',
    'media': 'Média',
    'dificil': 'Difíci'
  }[receita.dificuldade] || 'N/A';
  
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{receita.nome}</Text>
        {/* Compactação dos detalhes em uma única linha */}
        <Text style={styles.detail}>Dificuldade: <Text style={styles.detailValue}>{dificuldadeLabel}</Text></Text>
        <Text style={styles.detail}>Tempo: <Text style={styles.detailValue}>{receita.tempoPreparo || '--'} min</Text></Text>
      </View>{/* Compactação aqui */}
      
      <View style={styles.actionsContainer}>
        {/* Botão de Editar */}
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>{/* Compactação aqui */}
        
        {/* Botão de Deletar */}
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Sombra básica (Android)
    elevation: 3, 
    // Sombra básica (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontWeight: '600',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionButton: {
    marginLeft: 15,
    padding: 5,
  },
});