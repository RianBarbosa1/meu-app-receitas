module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // O Expo Router usa um plugin aqui. Ao removê-lo, 
    // forçamos o Babel a se concentrar apenas no 'app.js'
    // que o seu metro.config.js e package.json apontam.
  };
};