import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente funcional para exibir um card individual de receita.
 *
 * @param {object} props - Propriedades do componente.
 * @param {object} props.receita - Objeto contendo os dados da receita (nome, dificuldade, tempoPreparo).
 * @param {function} props.onEdit - Função de callback chamada ao pressionar o botão de edição.
 * @param {function} props.onDelete - Função de callback chamada ao pressionar o botão de exclusão.
 * @returns {JSX.Element} O componente CardReceita renderizado.
 */
export default function CardReceita({ receita, onEdit, onDelete }) {
  // Objeto de mapeamento para traduzir a chave de dificuldade (ex: 'facil') para um rótulo legível (ex: 'Fácil').
  // Caso a dificuldade não seja encontrada, é exibido 'N/A'.
  const dificuldadeLabel = {
    'facil': 'Fácil',
    'media': 'Média',
    'dificil': 'Difícil'
  }[receita.dificuldade] || 'N/A';
  
  return (
    // Container principal que representa o card da receita, aplicando estilos de layout e sombra.
    <View style={styles.card}>
      
      {/* Container para exibir as informações principais (nome, dificuldade, tempo) */}
      <View style={styles.infoContainer}>
        {/* Título da receita, extraído da propriedade 'nome' do objeto 'receita'. */}
        <Text style={styles.title}>{receita.nome}</Text>
        
        {/* Exibe o rótulo de Dificuldade, usando o valor traduzido definido acima. */}
        <Text style={styles.detail}>Dificuldade: <Text style={styles.detailValue}>{dificuldadeLabel}</Text></Text>
        
        {/* Exibe o tempo de preparo em minutos. Se 'tempoPreparo' for nulo, mostra '-- min'. */}
        <Text style={styles.detail}>Tempo: <Text style={styles.detailValue}>{receita.tempoPreparo || '--'} min</Text></Text>
      </View>
      
      {/* Container para os botões de ação (Editar e Deletar). */}
      <View style={styles.actionsContainer}>
        
        {/* Botão de Editar. Usa TouchableOpacity para ser clicável. Chama 'onEdit' ao ser pressionado. */}
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          {/* Ícone de caneta para representar a ação de edição. */}
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        
        {/* Botão de Deletar/Excluir. Usa TouchableOpacity. Chama 'onDelete' ao ser pressionado. */}
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          {/* Ícone de lixeira para representar a ação de exclusão. */}
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Definição dos estilos do componente usando StyleSheet.create para otimização.
const styles = StyleSheet.create({
  // Estilo principal do card: fundo branco, bordas arredondadas, padding interno,
  // layout horizontal (flexDirection: 'row') e aplicação de sombras (iOS e Android).
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Sombra (Android)
    elevation: 3, 
    // Sombra (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Container flexível que ocupa o espaço restante, empurrando as ações para a direita.
  infoContainer: {
    flex: 1,
  },
  // Estilo para o nome da receita.
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // Estilo base para os detalhes (Dificuldade, Tempo).
  detail: {
    fontSize: 14,
    color: '#666',
  },
  // Estilo para destacar os valores dos detalhes (Fácil, 30 min, etc.).
  detailValue: {
    fontWeight: '600',
    color: '#333',
  },
  // Container dos botões de ação, alinhados horizontalmente.
  actionsContainer: {
    flexDirection: 'row',
    marginLeft: 10, // Espaçamento entre as informações e os botões.
  },
  // Estilo de cada botão individual, com margem à esquerda para separá-los.
  actionButton: {
    marginLeft: 15,
    padding: 5,
  },
});