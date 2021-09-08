function resolve(dir) {
    return require('path').join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
    configureWebpack:{
        module: {
            rules: [
                { test: /iview.src.*?js$/, loader: 'babel-loader' },
                { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
            ]
        }
    },
    chainWebpack: (config) => {
        
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@assets', resolve('src/assets'))
            .set('@utils', resolve('src/utils'))

    },
}