import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Importe as Telas ---
import HomeScreen from './screens/HomeScreen';
import FormReceitaScreen from './screens/FormReceitaScreen';
import SettingsScreen from './screens/SettingsScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator 
        // Define a tela inicial e estilos de header padrão
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF5733', // Cor principal do Header
          },
          headerTintColor: '#fff', // Cor do texto e ícones do Header
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        
        {/* 1. HOME SCREEN (Lista de Receitas) */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Meu Diário de Receitas',
            // O botão de configurações será adicionado dinamicamente no HomeScreen
          }} 
        />
        
        {/* 2. FORMULÁRIO (Criar/Editar Receita) */}
        <Stack.Screen 
          name="FormReceita" 
          component={FormReceitaScreen} 
          // O título será ajustado dinamicamente dentro do componente, 
          // mas esta é a opção padrão
          options={{ 
            title: 'Detalhes da Receita',
          }} 
        />
        
        {/* 3. CONFIGURAÇÕES (Switch e Modal) */}
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            title: 'Configurações do App',
          }} 
        />
        
      </Stack.Navigator>
  );
}