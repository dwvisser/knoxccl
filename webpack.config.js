const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000
  },
  module: {
    rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            {
              // Run postcss actions (config in postcss.config.js)
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
            // Compiles Sass to CSS
            "sass-loader"
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          type: 'asset/resource',
        }
    ]
  },
  // see https://www.npmjs.com/package/bootstrap-loader#user-content-bootstrap-4-internal-dependency-solution
  plugins: [
    new Dotenv(),
    new webpack.ProvidePlugin({
      Tether: "tether",
      "window.Tether": "tether",
      // NOTE: Popper is needed if we use any of Tooltip, Popover, or Dropdown
      Popper: ['popper.js', 'default'],
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static',
          globOptions: { ignore: ['**/*.xcf', '**/*.xbs'] }
        }
      ]
    }),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : [])
  ]
};