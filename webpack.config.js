module.exports = {
    entry: {
        app : "./scripts/index.js"
    },
    output: {
        path: './bin',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    }
};