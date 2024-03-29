'use strict'
const fs = require('fs');
const path = require('path')
const defaultSettings = require('./src/settings.js')
const {targetapi} = require('./constant/rootapi.js')
console.log(targetapi);

function resolve(dir) {
    return path.join(__dirname, dir)
}


const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

fs.readFile(path.join(__dirname, 'public/config.js'), 'utf8', function (err, data) {
    if (err) throw err;
    var newContent = ''

    if(process.env.CUSTOMIZE == 'sandbox'){
        newContent = 'var BASEROUTER = "/sandbox"'
    }else{
        newContent = 'var BASEROUTER = "/"'
    }
    
    fs.writeFile('public/config.js', newContent, 'utf8', (err) => {
        if (err) throw err;
    });
});

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: process.env.CUSTOMIZE == 'sandbox' ? '/sandbox' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    //   lintOnSave: process.env.NODE_ENV === 'development',
    lintOnSave:false,
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy:{
            '/api': {
                // target: targetapi,
                target: "http://172.51.215.195/",
                // target: "http://172.18.39.165:10700/",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            } ,
            '/zbAPI': {
                target: "http://172.16.222.166:5000/",
                changeOrigin: true,
                pathRewrite: {
                    '^/zbAPI': '/'
                }
            } ,
            '/verAPI': {
                target: "http://172.51.216.75:8088/",
                changeOrigin: true,
                pathRewrite: {
                    '^/verAPI': '/'
                }
            } ,
            '/warning_manage': {
                target: "http://172.51.216.75:8090",
                // target: "http://172.18.39.165:10700/",
                changeOrigin: true,
                pathRewrite: {
                    '^/warning_manage': '/warning_manage'
                }
            } , 
            '/Middle': {
                target: "http://172.51.216.75:9000",
                // target: "http://172.18.39.165:10700/",
                changeOrigin: true,
                pathRewrite: {
                    '^/Middle': '/Middle'
                }
            } , 
            '/gaode':{
                target:"http://restapi.amap.com",
                changeOrigin: true,
                pathRewrite: {
                    '^/gaode': '/'
                }
            }

        },
        // after: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload') //  need test
        config.plugins.delete('prefetch') //  need test

        // set svg-sprite-loader
        config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
        config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()

        // set preserveWhitespace
        config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
            options.compilerOptions.preserveWhitespace = true
            return options
        })
        .end()

        config
        // https://webpack.js.org/configuration/devtool/#development
        .when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
        )

        config
        .when(process.env.NODE_ENV !== 'development',
            config => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [{
                // `runtime` must same as runtimeChunk name. default is `runtime`
                inline: /runtime\..*\.js$/
                }])
                .end()
            config
                .optimization.splitChunks({
                    chunks: 'all',
                    cacheGroups: {
                        libs: {
                            name: 'chunk-libs',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: 'initial' // only package third parties that are initially dependent
                        },
                        elementUI: {
                            name: 'chunk-elementUI', // split elementUI into a single package
                            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                        },
                        commons: {
                            name: 'chunk-commons',
                            test: resolve('src/components'), // can customize your rules
                            minChunks: 3, //  minimum common number
                            priority: 5,
                            reuseExistingChunk: true
                        }
                    }
                })
            config.optimization.runtimeChunk('single')
            }
        )

        config.module
        .rule('swf')
        .test(/\.swf$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
        limit: 1024,
        name: 'file/[path][name].[hash:7].[ext]'
        })
        .end()

    }
}
