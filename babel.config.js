const rootImportOpts = {
  paths: [
    {
      root: __dirname,
      rootPathPrefix: '~/',
      rootPathSuffix: './app',
    },
    {
      root: __dirname,
      rootPathPrefix: '~/',
      rootPathSuffix: './components',
    },
    {
      root: __dirname,
      rootPathPrefix: '~/',
      rootPathSuffix: './lib',
    },
  ],
};

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: ['react-native-reanimated/plugin', ['babel-plugin-root-import', rootImportOpts]],
  };
};
