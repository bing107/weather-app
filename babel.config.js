module.exports = {
  presets: [
    ['@babel/preset-react'],
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
