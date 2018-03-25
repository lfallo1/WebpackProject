var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
    module: {
      rules: [
          {
              use: 'babel-loader',
              test: /\.js$/,
              exclude: /node_modules/
          },
          {
              //css-loader: allows webpack to read/understand contents of css files imported into project
              //style-loader: takes all css modules and sticks them inside style tag in html document
              use: ['style-loader', 'css-loader'],
              test: /\.css$/
          }
      ]
    }
};
