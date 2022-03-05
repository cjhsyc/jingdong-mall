module.exports = {
    //关闭eslint
    lintOnSave: false,
    //配置代理服务器
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite:{'^/api':''}
            }
        }
    },
    //打包后不生成map文件
    productionSourceMap: false,
    publicPath: './',//默认是'/'
}