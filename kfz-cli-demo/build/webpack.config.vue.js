const fs = require("fs");
const path = require('path');
const merge = require('webpack-merge');
const config = require('../config/index');
const baseConfig = require('./webpack.base.config.vue');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 分离css代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const TerserPlugin = require('terser-webpack-plugin'); // js压缩优化 用terser-webpack-plugin替换掉uglifyjs-webpack-plugin解决uglifyjs不支持es6语法问题
const CopyWebpackPlugin = require("copy-webpack-plugin");  //文件拷贝
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const EndWebpackPlugin = require('./EndWebpackPlugin');
const exec = require('child_process').exec;
const proxy = require("../proxy");

// 打包地址
const buildPath = path.resolve(__dirname, '../' + config.build.outPath);
const ROOT_PATH = path.resolve(__dirname, '../'); //源码目录
const VIEWS_PATH = path.resolve(__dirname, '../static/views/'); //模板目录
const JS_PATH = path.resolve(__dirname, '../static/module/'); //模板目录

// 检查是否有打包目录
!fs.existsSync(buildPath) && fs.mkdirSync(buildPath);

// 页面入口
const pageEntry = {};
// 页面模板
const pageHtml = [];
//入口页面
const pages = fs.readdirSync(VIEWS_PATH);

pages.forEach((name, index) => {
    //入口路径
    const entryPath = path.join(VIEWS_PATH, name);

    //检测文件类型
    const readDir = fs.readdirSync(entryPath);
    path.join(entryPath,readDir[0]);
    for (let i = 0; i < readDir.length; i++) {
        const statInfo = fs.statSync(path.join(entryPath, readDir[i]));
        console.log("readDir:" + readDir);
        console.log("statInfo:" + statInfo.isFile());
        if(statInfo.isFile()){
            if(!(readDir[i].indexOf('.html') !== -1)){
                return false;
            }
        }
    }
    //入口js
    pageEntry[name] = path.join(JS_PATH, `${name}/${name}.js`);
    // 输出页面模板
    pageHtml.push(new HtmlWebpackPlugin({
        entryName: name,
        template: `${entryPath}/${name}.html`,
        filename: `views/${name}/${name}.html`,
        inject:'body',
        chunks: ['common',name]
    }));
});

//生成环境
const NODE_ENV = process.env.NODE_ENV;
let isProduction = NODE_ENV === 'production';
isProduction ? pageHtml.push(new OptimizeCSSAssetsPlugin ()): [];

module.exports = merge(baseConfig, {
    entry: Object.assign(pageEntry, {

    }),
    output: {
        path: path.resolve(__dirname, '../'+config.build.outPath),                              // 借助node的path模块来拼接一个绝对路径
        publicPath: NODE_ENV === 'development' ? config.build.publicPath : config.build.domain + config.build.publicPath,
        filename: isProduction ? "[name]/[name].[chunkhash].min.js": "[name]/[name].js",
        chunkFilename: isProduction ? '[name].[chunkhash].min.js': '[name].js'
    },
    mode: NODE_ENV,
    devServer:{
        contentBase: buildPath,
        historyApiFallback: true,
        inline: true,
        open: true,
        hot:true,
        proxy: proxy
    },
    devtool: isProduction? 'none' : 'source-map',        //开发环境下使用
    optimization: {
        minimize: true,             //默认为true，效果就是压缩js代码
        minimizer: isProduction ? [
            (compiler) => {
                new TerserPlugin({
                    parallel: true, // 使用多进程并行运行可提高构建速度。并发运行的默认次数：os.cpus().length - 1
                    sourceMap: false,
                    extractComments: false, //禁止提取注释到LICENSE.txt文件中
                    terserOptions: {
                        compress: {
                            pure_funcs: ["console.log"] // 去除console.log打印信息
                        },
                        format: {   //删除注释
                            comments: false,
                        }
                    }
                }).apply(compiler);
            }
        ]: [],
        // 将多入口的webpack运行时文件打包成一个 runtime文件
        runtimeChunk: true,
        splitChunks: {
            name: 'splitChunks/vendor-common',
            chunks: 'all', //同时分割同步和异步代码,推荐。//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            cacheGroups: {
                commons: {
                    chunks: 'initial', // 'initial', 'async', 'all'
                    name: 'splitChunks/commons',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 0 // 优先级
                },
                // 单独打包vue插件
                'vue-vendor': {
                    chunks: 'initial', // 'initial', 'async', 'all',
                    test: /[\/]node_modules[\/]vue/, // <- window | mac -> /node_modules/vue/
                    name: 'splitChunks/vue-vendor',
                    priority: -9,
                    enforce: true
                },
                vant: {
                    chunks: 'all', // 'initial', 'async', 'all',
                    test: /[\/]node_modules[\/]vant/,
                    name: 'splitChunks/vant-vendor',
                    priority: -9,
                    enforce: true
                },
                vendor: {
                    chunks: 'initial', // 'initial', 'async', 'all'
                    test: /[\/]node_modules[\/]/,
                    name: 'splitChunks/vendor',
                    priority: -10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name]/[name].[contenthash:20].min.css':'[name]/[name].css',
            chunkFilename: isProduction ? '[name]/[name].[contenthash:20].min.css':'[name]/[name].css',
            ignoreOrder: true
        }),
        new CopyWebpackPlugin([
            {
                from: ROOT_PATH + '/static/libs',
                to: buildPath + '/libs',
                toType: 'dir'
            },{
                from: ROOT_PATH + '/static/common/assets',
                to: buildPath + '/assets',
                toType: 'dir'
            }
        ]),
        new EndWebpackPlugin(() => {
            //运行gulp构建
            exec('npm run gulp', function(error, stdout, stderr){
                if(error) {
                    console.error('error: ' + error);
                    return;
                }
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + typeof stderr);
            });
        },(err) => {
            console.log(err);
        })
    ].concat(pageHtml),
    performance: {
        maxEntrypointSize: 300000
    }
});