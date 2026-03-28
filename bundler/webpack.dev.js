const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');

module.exports = merge(commonConfiguration, {
	mode: 'development',
	devServer: {
		host: '0.0.0.0', // Allows access from outside the container
		port: portFinderSync.getPort(5000),
		open: true,
		https: false,
		liveReload: true,
		allowedHosts: 'all',
		watchFiles: ['src/**/*', 'static/**/*'],
		onListening: function (devServer) {
			if (!devServer) {
				throw new Error('not runnin');
			}
		},
	},
});
