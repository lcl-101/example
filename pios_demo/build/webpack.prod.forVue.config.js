
//webpack config for vue

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var merge = require('webpack-merge');

var baseConf = require('./webpack.base.config.js');


//各文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, '../static/modules/'); //源码目录
var VIEWS_PATH = path.resolve(ROOT_PATH, '../static/views/'); //模板目录


var entryTpl = {}; //存放模板对象 用于跟入口js对应
var pluginTpls = []; //存放动态生成的插件数组

//入口html
var entryHtml = glob.sync(VIEWS_PATH + '/**/*.html');
//var entryHtmlArr=[];
entryHtml.forEach(function(filePath){
    var entryPath = path.dirname(filePath);
        entryPath = entryPath.substring(entryPath.lastIndexOf('\/')+1);
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    var conf = {
        template: filePath,
        filename: 'views/' + entryPath + '/'+ filename + '.html',
        inject:'body',
        chunks:['runtime','babel-polyfill','vendor',filename]
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
        'babel-polyfill':'babel-polyfill'
    }),
    output: {
        filename:'[name]/[name].[chunkhash].js',
        chunkFilename:'[name].[chunkhash].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendor','babel-polyfill','runtime'],
            filename:'[name]/[name].[hash].js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin('[name]/[name].[contenthash:20].css'),
        new UglifyJSPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions:{
                autoprefixer: { remove: false } //此配置解决 css 压缩后 被删除 -webkit 前缀 问题
            }
        }), //压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
        new webpack.optimize.OccurrenceOrderPlugin(),
        new FriendlyErrorsPlugin(), //友好的错误提示
        new webpack.NoEmitOnErrorsPlugin() //不触发错误,即编译后运行的包正常运行
    ].concat(pluginTpls)
});
