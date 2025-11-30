// metro.config.js
// Força o Metro a iniciar a partir do seu App.js (ou app.js)

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adicione as configurações de Metro específicas aqui
config.resolver.assetExts.push('json');
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'cjs', 'mjs', 'json'];

// Define o entry point principal como o seu arquivo, ignorando o expo-router
config.resolver.entry = {
    web: {
        entryPoint: 'app.js', // Ou 'App.js', dependendo do seu nome de arquivo
        bundler: 'metro',
    },
    // Você pode adicionar android e ios aqui se o erro persistir em outras plataformas
};

module.exports = config;