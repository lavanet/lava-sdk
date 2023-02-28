const path = require('path');
const webpack = require('webpack')

module.exports = [
    {
  entry: './bin/examples/ether.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',

  resolve: {
    fallback: {
      crypto: false,
      events: false,
      path: false,
      stream: require.resolve("stream-browserify"),
      string_decoder: false,
      http: false,
      https:false,
      url: false,
      fs:false,
      net: false,
      tls: false, 
      zlib: false,
      bufferutil: false,
      "utf-8-validate": false,
    },
  }, 
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  devtool: "source-map",
},
];