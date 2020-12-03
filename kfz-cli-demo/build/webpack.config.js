const fs = require("fs");
const path = require('path');
const merge = require('webpack-merge');
const config = require('../config/index');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 分离css代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  //压缩js兼容ie8
const CopyWebpackPlugin = require("copy-webpack-plugin");  //文件拷贝
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
            if(!(readDir[i].indexOf('.ftl') !== -1)){
                return false;
            }
        }
    }

    //入口js
    pageEntry[name] = path.join(JS_PATH, `${name}/${name}.ts`);
    // 输出页面模板
    pageHtml.push(new HtmlWebpackPlugin({
        entryName: name,
        template: `${entryPath}/${name}.ftl`,
        filename: `views/${name}/${name}.ftl`,
        inject:'body',
        chunks: ['runtime','babel-polyfill',name]
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
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name]/[name].[contenthash:20].min.css':'[name]/[name].css',
            chunkFilename: isProduction ? '[name]/[name].[contenthash:20].min.css':'[name]/[name].css'
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
                exec('npm run clear', function(error, stdout, stderr){
                    if(error) {
                        console.error('error: ' + error);
                        return;
                    }
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + typeof stderr);
                });
            });
        },(err) => {
            console.log(err);
        })
    ].concat(pageHtml)
});
