// constants/ReceitaConstants.js

/**
 * Array de objetos que define as opções de dificuldade de uma receita.
 * * Usado tipicamente em componentes de seleção (Picker/Dropdown) em formulários.
 * Cada objeto possui um 'label' (para exibição na interface) e um 'value' 
 * (o valor real armazenado no banco de dados ou estado da aplicação).
 */
export const DIFICULDADE_OPCOES = [
  // Opção inicial ou 'placeholder' que instrui o usuário a selecionar uma opção. O 'value' vazio é útil para validação.
  { label: 'Selecione a Dificuldade', value: '' }, 
  { label: 'Fácil', value: 'facil' },
  { label: 'Média', value: 'media' },
  { label: 'Difícil', value: 'dificil' },
];

/**
 * Objeto que define os limites mínimo e máximo para o campo de Tempo de Preparo.
 * * Estes limites são frequentemente usados para configurar componentes de input numérico 
 * ou Sliders (controles deslizantes), garantindo que o tempo inserido esteja dentro 
 * de um intervalo razoável (5 a 120 minutos, neste exemplo).
 */
export const TEMPO_PREPARO_MIN_MAX = {
  min: 5,
  max: 120,
};