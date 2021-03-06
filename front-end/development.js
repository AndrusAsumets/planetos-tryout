var webpack = require('webpack');
var webpackDev = require('webpack-dev-server');
var config = require('./webpack.development.config.js');

new webpackDev(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
}).listen(3000, 'localhost', function(err) {
    if (err) {
        console.log(err);
    }

    console.log('Started application at localhost:3000');
});
