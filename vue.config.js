const path = require('path');

module.exports = {
  configureWebpack: function(config)  {
    return {
      resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('node_compoents')
        ]
      },
      mode: 'development',
      output: {
        globalObject: 'this',
        library: 'VueObibaSearchResult',
        libraryExport: 'default',
        libraryTarget: 'umd',
      }
    }
  }
};
