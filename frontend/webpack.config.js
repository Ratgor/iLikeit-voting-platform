//var nodeExternals = require('webpack-node-externals');

module.exports = {

/*    target: 'node', // important in order not to bundle built-in modules like path, fs, etc.
    externals: [nodeExternals({
        // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
        allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
    })],*/

  node: false, //  439 KiB with crypto-js
  //node: { crypto: true, stream: true }, // 1.08 MiB with crypto-js
  /* "node" option and crypto-js
  https://ru.stackoverflow.com/questions/1145063/
  https://github.com/brix/crypto-js/issues/295
  https://github.com/tensorflow/tfjs/issues/494#issuecomment-403575354
  */

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
        //exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
        /*
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
        */
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

      /*{
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }]
        }*/
    ]
  }
};
