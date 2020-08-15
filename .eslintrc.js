/* eslint-disable filenames/match-regex */
const path = require('path')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    // build environment variables
    VERSION: false,
    ENVIRONMENT: false,
    // jest Global variables
    render: false,
    screen: false,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      generators: true,
    },
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
      alias: {
        map: [['src', path.resolve(__dirname, 'src')]],
      },
    },
  },
  plugins: [
    'import',
    'jsx-a11y',
    'node',
    'react',
    'promise',
    'filenames',
    'css-modules',
    'compat',
    'react-hooks',
    '@typescript-eslint',
    'jest',
    'prettier',
  ],
  extends: [
    'eslint:all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react/all',
    'plugin:promise/recommended',
    'plugin:css-modules/recommended',
    'plugin:compat/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  rules: {
    // http://eslint.org/docs/rules/
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'capitalized-comments': 'off',
    'default-param-last': 'off',
    'dot-location': ['error', 'property'],
    'eol-last': ['error', 'always'],
    'function-call-argument-newline': 'off',
    'id-length': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'line-comment-position': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-len': 'off',
    'max-lines': ['error', 330],
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'multiline-comment-style': 'off',
    'multiline-ternary': ['error', 'always-multiline'],
    'newline-after-var': ['error', 'always'],
    'no-await-in-loop': 'error',
    'no-console': 'off',
    'no-extra-parens': ['error', 'all', { ignoreJSX: 'all', returnAssign: false, nestedBinaryExpressions: false }],
    'no-inline-comments': 'off',
    'no-invalid-this': 'off',
    'no-magic-numbers': 'off',
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'no-process-env': 'off',
    'no-prototype-builtins': 'error',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-trailing-spaces': 'error',
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-warning-comments': 'off',
    /* 'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, consistent: true, minProperties: 2 },
      },
    ], */
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'off',
    'one-var': ['error', { uninitialized: 'always', initialized: 'never' }],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'prefer-named-capture-group': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'require-jsdoc': 'off',
    'require-unicode-regexp': 'off',
    semi: ['error', 'never'],
    'sort-imports': 'off',
    'sort-keys': 'off',
    strict: 'off',

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/default': 'error',
    'import/export': 'error',
    'import/exports-last': 'error',
    'import/extensions': ['error', 'never', { json: 'always', scss: 'always' }],
    'import/first': 'error',
    'import/max-dependencies': ['error', { max: 20 }],
    'import/named': 'error',
    'import/namespace': ['error', { allowComputed: true }],
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-commonjs': 'error',
    'import/no-default-export': 'off',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', 'test/**/*.ts', '**/*.test.tsx', 'test/**/*.tsx'],
        optionalDependencies: true,
        peerDependencies: false,
      },
    ],
    'import/no-internal-modules': 'off',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'error',
    'import/no-unassigned-import': ['error', { allow: ['**/*.scss'] }],
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/unambiguous': 'error',

    'init-declarations': 'off',

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-onchange': 'off',

    'react/display-name': 'off',
    'react/no-array-index-key': 'off',

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/function-component-definition': 'off',
    'react/forbid-prop-types': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/forbid-component-props': [
      'error',
      {
        forbid: [
          { propName: 'className', allowedFor: ['Link', 'Component', 'Element', 'Text'] },
          { propName: 'style', allowedFor: ['Draggable', 'Element', 'Component'] },
        ],
      },
    ],
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'forbid',
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-handler-names': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-depth': ['error', { max: 5 }],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-no-bind': ['error', { ignoreRefs: true }],
    'react/jsx-no-literals': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-set-state': 'off',
    'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
    'react/prop-types': 'error',
    'react/require-default-props': 'off',
    'react/require-optimization': 'off',
    'react/button-has-type': 'off',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',

    // https://www.npmjs.com/package/eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // https://github.com/xjamundx/eslint-plugin-promise#rules
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-callback-in-promise': 'error',
    'promise/avoid-new': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',

    // https://github.com/selaux/eslint-plugin-filenames#rules
    'filenames/match-regex': ['error', '^[a-z0-9-]+(.story(.data)?|.test|.i18n|.provider|.container|.d)?$', true],
    'filenames/match-exported': ['error', 'kebab'],
    'filenames/no-index': 'off',

    // https://github.com/atfzl/eslint-plugin-css-modules#rules
    'css-modules/no-unused-class': 'error',
    'css-modules/no-undef-class': 'error',

    // https://github.com/amilajack/eslint-plugin-compat
    'compat/compat': 'off',
  },
  overrides: [
    {
      files: [
        '**/webpack.config.js',
        '**/babel.config.js',
        'config/**/*.js',
        'scripts/**/*.js',
        '.eslintrc.js',
        './server/**/*.js',
        './src/test/**/*js',
        '*.config.js',
      ],
      rules: {
        camelcase: 'off',
        'no-sync': 'off',
        'prefer-destructuring': 'off', // Node 'process' cannot be deconstructed, will return a error
        'import/no-commonjs': 'off',
        'import/no-nodejs-modules': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/unambiguous': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'filenames/match-regex': 'off',
        'import/no-unassigned-import': 'off',
      },
    },
    {
      files: ['**/webpack.config.js', '**/babel.config.js'],
      rules: {
        'filenames/match-exported': 'off',
        'filenames/match-regex': 'off',
      },
    },
    {
      files: ['src/store/reducers/*'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['src/store/sagas/*'],
      rules: {
        'func-style': 'off',
      },
    },
  ],
}
