ALUNOS: Rian Pablo e Vinicius Kauã


📔 Meu Diário de Receitas

🛠️ Visão Geral do Projeto

Este projeto é uma aplicação móvel desenvolvida em React Native (Expo). O objetivo principal é simular um "Diário de Receitas", permitindo aos utilizadores criar, visualizar, editar e excluir receitas (CRUD), com persistência de dados local usando AsyncStorage.

O projeto foi desenvolvido para praticar e demonstrar o uso de componentes nativos do React Native e a gestão de estado complexa.

Objetivos de Aprendizagem e Componentes Praticados

O desenvolvimento desta aplicação focou-se na implementação dos seguintes conceitos e componentes:

Gestão de Estado: Uso de useState e useEffect para gerenciar o ciclo de vida e estado dos componentes.

Persistência de Dados: Implementação de um Custom Hook (useReceitas) para persistência estável no AsyncStorage.

Componentes Nativos: Uso correto de:

FlatList / ScrollView: Para a listagem de receitas e layout responsivo.

Picker / Slider: Para seleção de opções no formulário de receitas (ex: dificuldade, tempo).

Switch / Modal: Para configurações e confirmações.

Arquitetura: Organização do código em componentes reutilizáveis e utilização de um Provedor de Contexto (Context API) para estado global (embora removido na versão final, a estrutura do Custom Hook suporta o Context API).

🚀 Como Executar o Projeto

Siga estes passos para clonar e iniciar o aplicativo no seu ambiente de desenvolvimento.

1. Pré-requisitos

Node.js (LTS)

NPM ou Yarn

Expo CLI (npm install -g expo-cli)

2. Instalação e Execução

Clone o Repositório:

git clone [https://github.com/RianBarbosa1/meu-app-receitas]
cd meu-app-receitas


Instale as Dependências:

npm install
# ou
yarn install


Inicie o Servidor do Expo:

npx expo start --tunnel --clear


Aceda à Aplicação:

Use o aplicativo Expo Go no seu telemóvel para digitalizar o código QR exibido no terminal.

Ou, use um emulador/simulador (Android Studio ou Xcode).

📂 Estrutura do Código

A aplicação segue uma estrutura modular para organização e reutilização.

Pasta/Ficheiro

Descrição

app.js

Componente principal que define o Stack.Navigator (estrutura de navegação).

hooks/useReceitas.js

Lógica central do aplicativo. Contém o estado principal (receitas), as funções CRUD (adicionar, deletar, etc.) e a gestão de AsyncStorage.

screens/

Contém os ecrãs principais do aplicativo (Home, Formulário, Configurações).

screens/HomeScreen.js

Ecrã de listagem de receitas (FlatList).

screens/FormReceitaScreen.js

Ecrã para criar ou editar receitas.

screens/SettingsScreen.js

Ecrã de configurações com Switch (Modo Escuro) e Modals (Informação e Confirmação de Limpeza).

components/CardReceita.js

Componente reutilizável para exibir cada item da receita na lista.

🧪 Checklist de Testes Manuais

Para verificar a robustez do aplicativo, execute os seguintes testes:

Ação de Teste

Resultado Esperado

Criar Receita

A nova receita deve aparecer imediatamente no HomeScreen.

Persistir Dados

Criar 2-3 receitas, fechar e reabrir o aplicativo. As receitas devem permanecer na lista.

Editar Receita

Modificar o nome/ingredientes de uma receita existente. A alteração deve refletir-se na lista.

Apagar Receita

Clicar em deletar numa receita. Ela deve ser removida da lista e do armazenamento.

Limpar Dados

Ir a Configurações, confirmar a limpeza. O HomeScreen deve ficar vazio após o recarregamento.

Navegação

A navegação entre Home, Formulário e Configurações deve ser fluida e sem erros.