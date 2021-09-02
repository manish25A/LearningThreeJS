const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');

module.exports = merge(commonConfiguration, {
	mode: 'development',
	devServer: {
		host: 'localhost',
		allowedHosts: '127.0.0.1',
		port: portFinderSync.getPort(5000),
		open: true,
		https: false,
		liveReload: true,
	},
});
