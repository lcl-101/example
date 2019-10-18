
//webpack dev config for client service

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var baseConf = require('./webpack.base.config.js');

//各文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, '../static/modules/'); //源码目录
var VIEWS_PATH = path.resolve(ROOT_PATH, '../static/views/'); //模板目录


var entryTpl = {}; //存放模板对象 用于跟入口js对应
var pluginTpls = []; //存放动态生成的插件数组

//入口html
var entryHtml = glob.sync(VIEWS_PATH + '/**/*.{html,khtml}');
//var entryHtmlArr=[];
entryHtml.forEach(function(filePath){
    var entryPath = path.dirname(filePath);
        entryPath = entryPath.substring(entryPath.lastIndexOf('\/')+1);
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    var conf = {
        template: filePath,
        filename: 'views/' + entryPath + '/'+ filename + '.html',
        inject:'body',
        chunks:['runtime','babel-polyfill','vendor','jQuery',filename]
    }
    pluginTpls.push(new HtmlwebpackPlugin(conf));
    entryTpl[filename] = filePath;
});

//入口js
var entryFiles = glob.sync(SRC_PATH + '/**/*.{js,vue}');
var entryJs = {};
entryFiles.forEach(function(filePath){
    var entryName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    if(entryName in entryTpl){
        entryJs[entryName] = filePath;
        //console.log(entryPath);
    }
});



module.exports = merge(baseConf,{
    entry: Object.assign(entryJs,{
        'vendor': ['vue','vuex','vue-router'],
        'babel-polyfill':'babel-polyfill',
        'jQuery':require.resolve('../static/libs/jQuery.js')
    }),
    output: {
        filename:'[name]/[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names:['jQuery','vendor','babel-polyfill','runtime'],
            filename:'[name]/[name].js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin('[name]/[name].css'),
        new webpack.HotModuleReplacementPlugin(), //热更新插件
        new webpack.NoEmitOnErrorsPlugin(), //不触发错误,即编译后运行的包正常运行
        new FriendlyErrorsPlugin() //友好的错误提示
    ].concat(pluginTpls),
   devtool:'source-map',
   devServer: {
        // contentBase:"./dist",
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        inline: true,
        progress: true,
        stats: {
            cached: false,
            colors: true
        },
        proxy: {
            '/': {
                target: 'http://message.kongfz.com/',
                secure: false,
                changeOrigin: true
            }
        }
    }
});
