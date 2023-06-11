const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
module.exports = {
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          BASE_URL: `"${process.env.BASE_URL}"`,
          SOCKET_BASE_URL: `"${process.env.SOCKET_BASE_URL}"`,
        }
      }

    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ]
  }
};