// constants/ReceitaConstants.js

export const DIFICULDADE_OPCOES = [
  { label: 'Selecione a Dificuldade', value: '' }, // Opção placeholder
  { label: 'Fácil', value: 'facil' },
  { label: 'Média', value: 'media' },
  { label: 'Difícil', value: 'dificil' },
];

// Se for usar o Slider, pode definir os limites aqui
export const TEMPO_PREPARO_MIN_MAX = {
  min: 5,
  max: 120,
};