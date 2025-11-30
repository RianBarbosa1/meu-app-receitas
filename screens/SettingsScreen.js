// screens/SettingsScreen.js

import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Switch, 
    StyleSheet, 
    TouchableOpacity, 
    Modal, 
    Button, 
    SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  // 1. Estado para o componente Switch (Requisito)
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  
  // 2. Estado para o componente Modal (Requisito)
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const toggleSwitch = () => setIsDarkModeEnabled(previousState => !previousState);
  
  // Função para limpar todas as receitas (opcional, mas muito útil para debug!)
  const handleClearData = async () => {
      try {
          await AsyncStorage.removeItem('@DiarioDeReceitas:Receitas');
          alert("Todos os dados de receita foram apagados com sucesso!");
      } catch (e) {
          alert("Erro ao apagar dados.");
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ------------------- OPÇÃO COM SWITCH (Requisito) ------------------- */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Ativar Modo Escuro (Simulado)</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FF5733" }}
          thumbColor={isDarkModeEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkModeEnabled}
        />
      </View>
      
      {/* ------------------- OPÇÃO COM MODAL (Requisito) ------------------- */}
      <TouchableOpacity 
        style={styles.settingItem} 
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.settingText}>Sobre o Aplicativo</Text>
        <Ionicons name="information-circle-outline" size={24} color="#666" />
      </TouchableOpacity>

      {/* Opção para Robustez (Limpeza de Dados) */}
      <TouchableOpacity 
        style={[styles.settingItem, styles.dangerItem]} 
        onPress={handleClearData}
      >
        <Text style={[styles.settingText, styles.dangerText]}>Limpar Todos os Dados Locais</Text>
        <Ionicons name="warning-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>

      {/* O COMPONENTE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)} // Para Android (botão voltar)
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Meu App de Receitas - Projeto Final</Text>
            <Text style={styles.modalText}>
              Este projeto foi desenvolvido em React Native (Expo) para praticar:
            </Text>
            <Text style={styles.modalTextBullet}>- CRUD e Persistência com AsyncStorage</Text>
            <Text style={styles.modalTextBullet}>- Uso de Hooks (useState, useEffect, Custom Hooks)</Text>
            <Text style={styles.modalTextBullet}>- Componentes: FlatList, Picker, Slider, Switch e Modal</Text>

            <Button
              title="Fechar"
              onPress={() => setIsModalVisible(false)}
              color="#FF5733"
            />
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  // Estilos para o Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center'
  },
  modalText: {
    marginBottom: 8,
    textAlign: "center"
  },
  modalTextBullet: {
      textAlign: 'left',
      width: '100%',
      marginLeft: 20,
      marginBottom: 3,
      fontSize: 14,
  },
  dangerItem: {
      marginTop: 20,
      borderColor: '#FF3B30',
      borderWidth: 1,
  },
  dangerText: {
      color: '#FF3B30',
      fontWeight: 'bold',
  }
});