const path = require('path');

module.exports = [
    {
  entry: './bin/main.js',
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
      fs:false,
      process:false,
      child_process:false
    },
  },   

},
];