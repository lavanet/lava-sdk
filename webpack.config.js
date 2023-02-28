const path = require('path');
const webpack = require('webpack')

module.exports = [
    {
  entry: './bin/examples/tendermintRPC.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',

  resolve: {
    extensions: [".js", ".jsx", "tsx", "ts"],
    fallback: {
      buffer: false,
      crypto: false,
      events: false,
      path: false,
      stream: false,
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
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  devtool: "source-map",
},
];