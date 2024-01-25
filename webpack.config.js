const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  plugins: [
    new NodePolyfillPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  watchOptions: {
    poll: true,
  },
};
