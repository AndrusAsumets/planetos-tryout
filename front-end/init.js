if (process.env.NODE_ENV === 'production') require('./production')
else if (process.env.NODE_ENV === 'build') require('./webpack.production.config.js')
else require('./development.js')
