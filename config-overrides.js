const overrideJsTsLoader = require('./react-app-rewire-js-ts');
const rewireCssModules = require('./react-app-rewire-css');

/* config-overrides.js */
module.exports = function override(config, env) {
  // (config, env, babelPlugins = [])
  config = overrideJsTsLoader(config, env);

  // polyfills
  config.entry = ['babel-polyfill', ...config.entry];

  // css, sass, less
  config = rewireCssModules(config, env);

  // ForkTsCheckerWebpackPlugin overide
  config.plugins.forEach((plugin, idx) => {
    try {
      const objectName = plugin.constructor.name;
      if (objectName === 'ForkTsCheckerWebpackPlugin') {
        const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
        config.plugins[idx] = new ForkTsCheckerWebpackPlugin({
          ...plugin.options,
          workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
          memoryLimit: 2048,
        });
      }
    } catch (error) {}
  });

  // webpack-bundle-analyzer
  if (process.env.WEBPACK_ANALYZER) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin;
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
