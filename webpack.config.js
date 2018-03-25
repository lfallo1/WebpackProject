var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VENDOR_LIBS = Object.keys(require('./package.json').dependencies); //array of vendor library names

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js', //'name' references the entry key (i.e., 'bundle')
        hashDigestLength: 20
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
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'src/index.html' //template to use for generating html file (by default it will save to the 'output path' and be named 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'] //only add dependencies in 'vendor', if there duplicates... manifest used to help browser determine if vendor file was changed
        }),
        new CleanWebpackPlugin(['dist/*.*'])
    ]
};
