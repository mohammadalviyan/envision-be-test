const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, args) => ({
  mode: args.mode,
  entry: {
    server: './src/server/index.js',
    '/database/sequelizeConfig': './sequelize-migration/sequelizeConfig.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  target: 'node',
  devtool: 'source-map',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader'
      }
    ],
  },
  plugins: [
    new CopyPlugin(
      {
        patterns: [
          { from: './sequelize-migration/migrations', to: 'database/migrations' },
          // { from: './sequelize-migration/seeders', to: 'database/seeders' },
          { from: './src/server/api-docs.yaml', to: 'api-docs.yaml' }
        ],
      }
    ),
    new CleanWebpackPlugin()
  ],
});
