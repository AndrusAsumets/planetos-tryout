require('dotenv').load();

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './index'
    ],
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: 'bundle.min.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.otf$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production'),
                SERVER_HOST: JSON.stringify(process.env.SERVER_HOST),
                SERVER_PORT: JSON.stringify(process.env.SERVER_PORT)
            }
        }),
        new webpack.NoErrorsPlugin(),
        //new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]
}
