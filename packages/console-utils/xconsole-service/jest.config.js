module.exports = {
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  transformIgnorePatterns: ['node_modules/(?!(@ali|@babel))'],
};
