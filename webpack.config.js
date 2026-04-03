const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
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
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",
      exclude: [/\.map$/, /^manifest.*\.js$/, /^CNAME$/],
      maximumFileSizeToCacheInBytes: 500000,
      inlineWorkboxRuntime: false,

      // Define runtime caching rules.
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg|pdf)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-and-docs', // Use a custom cache name.
          expiration: {
            maxEntries: 100,
          },
        },
      }],
      // See
      // https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
      // The following 2 options force kicking out the old ServiceWorker and
      // activating the new one on all client tabs as soon as the new ServiceWorker
      // is installed. It is an anti-pattern for PWAs in general (see
      // https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68),
      // but for this simple "static" site I would rather users always see the latest
      // content.
      skipWaiting: true,
      clientsClaim: true
    }),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : [])
  ]
};