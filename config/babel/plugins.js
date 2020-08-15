// const environment = require('../environment')

module.exports = () => {
  const plugins = [
    'react-hot-loader/babel',

    '@babel/plugin-syntax-dynamic-import',

    '@babel/plugin-proposal-optional-chaining',

    '@babel/plugin-proposal-nullish-coalescing-operator',

    '@babel/plugin-transform-named-capturing-groups-regex',

    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],

    // https://github.com/tc39/proposal-class-fields
    ['@babel/plugin-proposal-class-properties', { loose: false }],

    // https://github.com/gajus/babel-plugin-react-css-modules
    [
      'react-css-modules',
      {
        generateScopedName: process.env.NODE_ENV === 'test' ? '[local]' : '[name]__[local]__[hash:base64:6]',
        webpackHotModuleReloading: process.env.NODE_ENV === 'development',
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
          },
        },
      },
    ],
  ]

  //
  // Production build optimizations
  //

  if (process.env.NODE_ENV === 'production') {
    // Remove console logs, which should be used only in development
    plugins.push([
      'transform-remove-console', // { exclude: ['error', 'warn'] }
    ])
  }

  return {
    plugins,
  }
}
