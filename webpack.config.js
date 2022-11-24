const path = require('path');
const webpack = require('webpack')

module.exports = [
    {
  entry: './bin/examples/basic.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  resolve: {
    fallback: {
      buffer: false,
      crypto: false,
      events: false,
      path: false,
      stream: false,
      string_decoder: false,
    },
  }, 
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devtool: "source-map",
  cache: false,
},
];