const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.kek': JSON.stringify('prod-kek'),
    }),
  ],
  // below questionable option
  output: {
    publicPath: '',
  },
}