const CracoLessPlugin = require('craco-less');
const rawLoader = require('craco-raw-loader');

module.exports = {
  eslint: {
    configure: {
      overrides: [
        {
          files: ['**/*.ts', '**/*.tsx'],
          rules: {
            // @typescript-eslint rules
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
          },
        },
      ],
      rules: {
        'no-restricted-globals': [0, 'self'],
        'no-new-func': 'off',
        'jsx-a11y/alt-text': 'off',
        'no-empty-pattern': 'off',
        'no-loop-func': 'off',
        'array-callback-return': 'off',
      },
    },
  },
  babel: {
    plugins: [
      [
        '@babel/plugin-transform-typescript',
        {
          allowNamespaces: true,
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    { plugin: rawLoader, options: { test: /\.(md|txt)$/ } },
  ],
};
