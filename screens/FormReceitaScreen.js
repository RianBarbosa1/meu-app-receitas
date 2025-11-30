// screens/FormReceitaScreen.js

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  ScrollView, 
  Alert, 
  StyleSheet 
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useReceitas } from '../hooks/useReceitas';

export default function FormReceitaScreen({ navigation, route }) {
  const receitaExistente = route.params?.receita || null; 
  const isEditing = !!receitaExistente;

  const { adicionarReceita, atualizarReceita } = useReceitas();

  // --- Estado do Formulário ---
  const [nome, setNome] = useState(receitaExistente?.nome || '');
  const [dificuldade, setDificuldade] = useState(receitaExistente?.dificuldade || 'Fácil'); 
  const [tempoPreparo, setTempoPreparo] = useState(receitaExistente?.tempoPreparo || 30); 
  const [ingredientesTexto, setIngredientesTexto] = useState(
    Array.isArray(receitaExistente?.ingredientes) 
      ? receitaExistente.ingredientes.map(i => `${i.quantidade} de ${i.nome}`).join('\n')
      : ''
  );
  const [modoPreparo, setModoPreparo] = useState(receitaExistente?.modoPreparo || '');

  // --- Função auxiliar para formatar ingredientes ---
  const formatarIngredientes = (texto) => {
    return texto.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split(' de ', 2);
        return {
          quantidade: parts.length > 1 ? parts[0] : 'Qtd. Indefinida',
          nome: parts.length > 1 ? parts[1] : line
        };
      });
  };

  // --- Atualiza o título do header ---
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Receita' : 'Adicionar Nova Receita',
    });
  }, [navigation, isEditing]);

  // --- Lógica de Salvar ---
  const handleSave = async () => {
    if (!nome.trim() || !dificuldade.trim() || !ingredientesTexto.trim() || !modoPreparo.trim()) { 
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return; 
    }

    const dadosReceita = {
      nome: nome.trim(),
      dificuldade: dificuldade.trim(),
      tempoPreparo: Math.round(tempoPreparo || 0),
      ingredientes: formatarIngredientes(ingredientesTexto),
      modoPreparo: modoPreparo.trim(),
    };

    try {
      // Verifica se receitaExistente existe e tem ID antes de chamar atualizarReceita
      if (isEditing && receitaExistente?.id) {
        await atualizarReceita(receitaExistente.id, dadosReceita);
      } else {
        await adicionarReceita(dadosReceita);
      }
      Alert.alert('Sucesso', isEditing ? 'Receita atualizada!' : 'Nova receita criada!');
      navigation.goBack();
    } catch (e) {
      console.error('Erro ao salvar receita:', e);
      Alert.alert('Erro', 'Não foi possível salvar a receita.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Receita' : 'Nova Receita'}</Text><View style={styles.inputGroup}>
        <Text style={styles.label}>Nome da Receita *</Text>
        <TextInput
          style={styles.input}
          value={nome || ''}
          onChangeText={setNome}
          placeholder="Ex: Torta de Limão"
        />
      </View><View style={styles.inputGroup}>
        <Text style={styles.label}>Dificuldade (Fácil, Médio, Difícil) *</Text>
        <TextInput
          style={styles.input}
          value={dificuldade || ''}
          onChangeText={setDificuldade}
          placeholder="Ex: Fácil"
        />
      </View><View style={styles.inputGroup}>
        <Text style={styles.label}>Tempo de Preparo (minutos)</Text>
        <Text style={styles.sliderValue}>{`${Math.round(tempoPreparo || 0)} min`}</Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={120}
          step={5}
          value={tempoPreparo || 0}
          onValueChange={setTempoPreparo}
          minimumTrackTintColor="#FF5733"
          maximumTrackTintColor="#AAAAAA"
          thumbTintColor="#FF5733"
        />
      </View><View style={styles.inputGroup}>
        <Text style={styles.label}>Ingredientes (um por linha) *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={ingredientesTexto || ''}
          onChangeText={setIngredientesTexto}
          placeholder="Ex: 2 xícaras de Farinha"
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View><View style={styles.inputGroup}>
        <Text style={styles.label}>Modo de Preparo *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={modoPreparo || ''}
          onChangeText={setModoPreparo}
          placeholder="Descreva passo a passo..."
          multiline={true}
          numberOfLines={8}
          textAlignVertical="top"
        />
      </View><View style={styles.buttonContainer}>
        <Button
          title={isEditing ? 'Atualizar Receita' : 'Salvar Receita'}
          onPress={handleSave}
          color="#FF5733"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, fontSize: 16, backgroundColor: '#fff' },
  textArea: { height: 120, paddingTop: 12, textAlignVertical: 'top' },
  slider: { width: '100%', height: 40 },
  sliderValue: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', color: '#FF5733', marginBottom: 10 },
  inputGroup: { marginBottom: 15 },
  buttonContainer: { marginTop: 15, marginBottom: 50 }
});