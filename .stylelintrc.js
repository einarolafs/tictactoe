module.exports = {
  extends: [
    // https://github.com/stylelint/stylelint-config-recommended
    'stylelint-config-recommended',

    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',

    // https://github.com/pascalduez/stylelint-config-css-modules
    'stylelint-config-css-modules',
  ],
  plugins: [
    'stylelint-a11y',
    'stylelint-csstree-validator',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-declaration-use-variable',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-scss',
  ],
  rules: {
    // https://github.com/YozhikM/stylelint-a11y
    // "a11y/font-size-is-readable": [true, { "severity": "warning" }],
    // "a11y/line-height-is-vertical-rhythmed": [true, { "severity": "warning" }],
    'a11y/no-obsolete-attribute': [true, { severity: 'warning' }],
    'a11y/no-obsolete-element': [true, { severity: 'warning' }],
    // "a11y/no-outline-none": true,
    'a11y/no-spread-text': [true, { severity: 'warning' }],
    'a11y/no-text-align-justify': [true, { severity: 'warning' }],
    // 'a11y/media-prefers-reduced-motion': true,
    'a11y/no-display-none': true,
    'a11y/selector-pseudo-class-focus': true,

    // https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md
    'at-rule-blacklist': ['extend', { message: 'Use `composes` instead of @extend' }],
    'at-rule-no-unknown': null, // replaced with scss/at-rule-no-unknown
    'at-rule-no-vendor-prefix': true, // we are using autoprefixer, so no need for vendor prefixes
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': null,
    'declaration-property-value-blacklist': null,
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-whitespace-after': 'always',
    'length-zero-no-unit': true,
    'max-empty-lines': 1,
    'media-feature-name-no-unknown': [true, { ignoreMediaFeatureNames: ['prefers-reduced-motion'] }],
    'media-feature-name-no-vendor-prefix': true,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'property-case': 'lower',
    'selector-class-pattern': /^[a-z0-9-]+$/,
    'selector-list-comma-newline-after': 'always',
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-no-unknown': true,
    'selector-type-case': 'lower',
    'string-quotes': ['double', { avoidEscape: true }],
    'unit-case': 'lower',
    'value-keyword-case': 'lower',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never-single-line',
    'value-list-max-empty-lines': 0,
    'value-no-vendor-prefix': true,

    // https://github.com/kristerkari/stylelint-scss
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': null,
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-named-arguments': null,
    'scss/at-function-parentheses-space-before': 'always',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-named-arguments': ['always', { ignore: ['single-argument'] }],
    'scss/at-mixin-parentheses-space-before': 'always',
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-colon-newline-after': 'always-multi-line',
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-pattern': /^[a-z]*(-[a-z]*)*$/,
    'scss/dollar-variable-default': null,
    'scss/dollar-variable-empty-line-before': [
      'always',
      { except: ['first-nested', 'after-comment', 'after-dollar-variable'] },
    ],
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['between-comments', 'stylelint-commands'],
      },
    ],
    'scss/double-slash-comment-inline': null,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/declaration-nested-properties': ['never', { except: ['only-of-namespace'] }],
    'scss/declaration-nested-properties-no-divided-groups': true,
    'scss/media-feature-value-dollar-variable': 'always',
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/partial-no-import': true,
    'scss/selector-no-redundant-nesting-selector': true,

    // https://github.com/csstree/stylelint-validator
    'csstree/validator': { ignore: ['composes'] },

    // https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
    'plugin/declaration-block-no-ignored-properties': true,

    // https://github.com/sh-waqar/stylelint-declaration-use-variable
    //'sh-waqar/declaration-use-variable': [['/color/', 'font-family', '/margin/', '/padding/']],
    'sh-waqar/declaration-use-variable': 'off',

    // https://github.com/kristerkari/stylelint-high-performance-animation
    'plugin/no-low-performance-animation-properties': null,


    // https://github.com/ismay/stylelint-no-unsupported-browser-features
    'plugin/no-unsupported-browser-features': [
      'off',
      {
        ignore: ['css-appearance', 'flexbox'],
        severity: 'warning',
      },
    ],
  },
}
