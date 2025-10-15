const path = require('path');

module.exports = function override(config, env) {
  // Добавляем alias для React
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      // Добавляем alias для самого UI-kit если нужно
      'task_3-6': path.resolve(__dirname, 'node_modules/task_3-6')
    }
  };

  // Для Create React App 5+ нужно обработать webpack 5 конфиг
  if (config.resolve.fallback) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "path": false,
      "fs": false
    };
  }

  return config;
};