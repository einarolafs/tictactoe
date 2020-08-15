module.exports = (api) => {
  const isTestEnv = api.env('test')

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTestEnv ? 'commonjs' : false,
        },
      ],
      '@babel/typescript',
      '@babel/react',
    ],
  }
}
