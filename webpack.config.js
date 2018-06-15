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
};
