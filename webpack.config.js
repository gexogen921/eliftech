const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    app: path.join(__dirname, '/client/index.js'),
  },
  output: {
    path: path.join(__dirname, '/bundle'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devtool: 'inline-source-map',

  devServer: {
    host: '127.0.0.1',
    port: 4200,
    contentBase: __dirname,
    publicPath: '/bundle/',
    historyApiFallback: true,
    stats: 'minimal',
    overlay: false,
    https: false,
  },
};
