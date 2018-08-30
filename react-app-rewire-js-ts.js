const path = require('path');

const tsLoaderMatcher = function(rule) {
  return rule.test && rule.test.toString() === /\.(ts|tsx)$/.toString();
};

const jsLoaderMatcher = function(rule) {
  return (
    rule.loader &&
    rule.loader.indexOf(`${path.sep}babel-loader${path.sep}`) !== -1
  );
};

const getLoader = function(rules, matcher) {
  let loader;

  rules.some(rule => {
    return (loader = matcher(rule)
      ? rule
      : getLoader(rule.use || rule.oneOf || [], matcher));
  });

  return loader;
};

const getTsLoader = function(rules) {
  return getLoader(rules, tsLoaderMatcher);
};

const getJsLoader = function(rules) {
  return getLoader(rules, jsLoaderMatcher);
};

function tsConfig(config, env, babelPlugins) {
  const tsLoader = getTsLoader(config.module.rules);
  if (!tsLoader) {
    console.log('ts-loader not found');
    return config;
  }

  delete tsLoader.loader;
  delete tsLoader.options;

  // Replace loader with array of loaders with  use: []
  tsLoader.use = [
    {
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        babelrc: false,
        compact: true,
        presets:
          env === 'production'
            ? [require.resolve('babel-preset-react-app')]
            : [],
        plugins:
          env === 'production'
            ? [...babelPlugins]
            : [require.resolve('react-hot-loader/babel'), ...babelPlugins],
      },
    },
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true,
        configFile:
          env === 'production' ? 'tsconfig.json' : 'tsconfig.dev.json',
      },
    },
  ];
}

function jsConfig(config, env, babelPlugins) {
  const jsLoader = getJsLoader(config.module.rules);
  if (!jsLoader) {
    console.log('js-loader not found');
    return config;
  }

  delete jsLoader.loader;
  delete jsLoader.options;

  if (env === 'production') {
    jsLoader.include = [/node_modules/];
  }

  // Replace loader with array of loaders with  use: []
  jsLoader.use = [
    {
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        babelrc: false,
        compact: true,
        presets: [
          [
            require.resolve('babel-preset-env'),
            {
              targets: {
                browsers: ['>= 1%', 'chrome >= 45', 'Explorer 11'],
              },
            },
          ],
          require.resolve('babel-preset-react-app'),
        ],
        plugins:
          env === 'production'
            ? [...babelPlugins]
            : [require.resolve('react-hot-loader/babel'), ...babelPlugins],
      },
    },
  ];
}

module.exports = (config, env, babelPlugins = []) => {
  // Typescript
  tsConfig(config, env, babelPlugins);

  // JavaScript
  jsConfig(config, env, babelPlugins);

  return config;
};
