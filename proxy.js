var proxey = require('proxey');

proxey.run({
	rootFolder: './dist',
	port: (process.env.PORT || 5000),
	proxy: {
	 '/goldark-api': 'http://vcengenharia.goldarkapi.com'
	},
	routes: {"/": "index.html"}

});