const webpack = require('webpack')
module.exports = {
	 plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    
    ],
	resolve:{
  fallback: {
       "url": require.resolve("url/"),
		"util": require.resolve("util/"),
		"fs": false 
    }
	}
};