const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');

module.exports = merge(commonConfiguration, {
	mode: 'development',
	devServer: {
		host: '0.0.0.0',
		port: portFinderSync.getPort(5000),
		contentBase: './dist',
		watchContentBase: true,
		open: true,
		https: false,
		useLocalIp: true,
		disableHostCheck: true,
		overlay: true,
		noInfo: true,
		after: function (app, server, compiler) {
			const port = server.options.port;
			const https = server.options.https ? 's' : '';

			const domain2 = `http${https}://localhost:${port}`;

			console.log(`Project running at:\n  ${domain2}`);
		},
	},
});
