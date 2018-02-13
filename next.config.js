const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const uuid = require('uuid/v4')
const webpack = require('webpack')

module.exports = {
  webpack: (config, {dev}) => {
    const oldEntry = config.entry

    config.entry = () => oldEntry().then(entry => {
      if (entry['main.js']) {
        entry['main.js'].push(path.resolve('./utils/offline'))
      }
      return entry
    })

    if (!dev) {
      config.plugins.push(new SWPrecacheWebpackPlugin({
        cacheId: uuid(),
        filepath: path.resolve('./static/sw.js'),
        staticFileGlobs: [
          'static/**/*'
        ],
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [{
          handler: 'fastest',
          urlPattern: /[.](png|jpg|css)/
        }, {
          handler: 'networkFirst',
          urlPattern: /^http.*/
        }]
      }))
    }

    config.plugins = config.plugins.filter(
      (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
   )

    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    )

    return config
  }
}
