import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔑 Chave de armazenamento no AsyncStorage
const STORAGE_KEY = '@DiarioDeReceitas:Receitas';

/**
 * Hook customizado para gerenciar a lista de receitas,
 * incluindo o carregamento inicial e a persistência de dados.
 */
export function useReceitas() {
  // 🍳 Estado principal para armazenar as receitas
  const [receitas, setReceitas] = useState([]);
  // ⏳ Estado para indicar se os dados estão sendo carregados
  const [isLoading, setIsLoading] = useState(true);

  // --- Funções Auxiliares de Persistência ---

  /**
   * Salva o array atual de receitas no AsyncStorage.
   */
  const salvarReceitas = async (receitasData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(receitasData));
      console.log('Receitas salvas com sucesso.');
    } catch (error) {
      console.error("Erro ao salvar receitas:", error);
    }
  };

  /**
   * Carrega as receitas salvas do AsyncStorage ao iniciar o app.
   * Também é usada para recarregar dados quando a tela Home volta ao foco.
   */
  const carregarReceitas = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data !== null) {
        setReceitas(JSON.parse(data));
      } else {
        setReceitas([]); // Garante que a lista fique vazia se o storage estiver vazio
      }
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
    } finally {
      setIsLoading(false); // Fim do carregamento, independente do sucesso.
    }
  };

  // --- Efeito de Montagem para Carregamento Inicial ---

  // Roda apenas uma vez ([]), carregando os dados do storage na montagem.
  useEffect(() => {
    carregarReceitas();
  }, []);
  
  // 🆕 FIX: Renomeamos carregarReceitas para recarregarReceitas para clareza na interface e retorno.
  const recarregarReceitas = carregarReceitas; 

  // --- Funções CRUD (Create, Read, Update, Delete) ---

  /**
   * Adiciona uma nova receita à lista.
   * @param {object} novaReceita - Objeto da receita (ex: { nome, ingredientes, modoPreparo }).
   */
  const adicionarReceita = async (novaReceita) => {
    // Garante que toda receita tenha um ID único.
    const id = Date.now().toString(); 
    const receitaComId = { ...novaReceita, id };
    
    // Utilizamos uma função de callback no setReceitas para garantir 
    // que estamos trabalhando com o estado mais atualizado antes de salvar.
    setReceitas(prevReceitas => {
      const novasReceitas = [...prevReceitas, receitaComId];
      // Salva a nova lista no storage
      salvarReceitas(novasReceitas);
      return novasReceitas;
    });

  };

  /**
   * Atualiza uma receita existente pelo ID.
   * @param {string} id - ID da receita a ser atualizada.
   * @param {object} dadosAtualizados - Novos dados da receita.
   */
  const atualizarReceita = async (id, dadosAtualizados) => {
    setReceitas(prevReceitas => {
      const receitasAtualizadas = prevReceitas.map(rec =>
        rec.id === id ? { ...rec, ...dadosAtualizados } : rec
      );
      // Salva a nova lista no storage
      salvarReceitas(receitasAtualizadas);
      return receitasAtualizadas;
    });
  };

  /**
   * Remove uma receita da lista pelo ID.
   * @param {string} id - ID da receita a ser deletada.
   */
  const deletarReceita = async (id) => {
    setReceitas(prevReceitas => {
      const novasReceitas = prevReceitas.filter(rec => rec.id !== id);
      // Salva a nova lista no storage
      salvarReceitas(novasReceitas);
      return novasReceitas;
    });
  };

  /**
   * 🛑 FUNÇÃO EXTRA: Limpa todos os dados de receitas do AsyncStorage.
   * Útil para testes/debug.
   */
  const limparTodasReceitas = async () => {
      try {
          await AsyncStorage.removeItem(STORAGE_KEY);
          setReceitas([]);
          console.log("Todas as receitas foram removidas do storage.");
      } catch (error) {
          console.error("Erro ao limpar receitas:", error);
      }
  };


  // Retorna os dados e as funções que os componentes precisam usar.
  return {
    receitas,
    isLoading,
    adicionarReceita,
    atualizarReceita,
    deletarReceita,
    limparTodasReceitas, // Opcional, para testes
    recarregarReceitas, // 🔑 FIX: Agora a função está sendo retornada
  };
}

// Exemplo de como uma receita pode ser estruturada:
/*
{
    id: '1700000000000',
    nome: 'Bolo de Chocolate Simples',
    ingredientes: [
        { nome: 'Farinha', quantidade: '2 xícaras' },
        { nome: 'Ovos', quantidade: '3' },
        // ...
    ],
    modoPreparo: 'Misture os secos, adicione os líquidos, asse por 40 min.',
    // ... outros campos (tempo de preparo, dificuldade, etc)
}
*/