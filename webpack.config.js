const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const CopyWebPackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.jsx',
    analytics: './analytics.ts'
  },
  output: {
    filename: "[name].[hash].js",
    path : path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      "@models": path.resolve(__dirname,'src/models'),
      "@": path.resolve(__dirname,'src')
    }
  },
  mode: 'development',
  devServer:{
    port: 4200,
    hot: isDev
  },
  devtool: 'source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebPackPlugin({
      patterns:[
        {from: path.resolve(__dirname, 'src/favicon.ico'),
          to : path.resolve(__dirname, "dist")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{loader: 'file-loader'}]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [`file-loader`]
      },
      {
        test: /\.xml$/,
        use: [`xml-loader`]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          "presets": [
            '@babel/preset-env',
            "@babel/preset-typescript"
          ]
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-react']
        }
      },
    ]
  }
}