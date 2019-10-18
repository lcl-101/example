
//webpack base config

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//各文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var DIST_PATH = path.resolve(ROOT_PATH, '../dist/'); //生产环境目录打包目录
var NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules'); //npm包目录

module.exports = {
    output: {
        path:DIST_PATH,
        publicPath: '/dist/'
    },
    module: {
        rules:[
            {
            test: /\.vue$/,
            exclude: /node_modules/,
            use: {
                loader: 'vue-loader',
            }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(html|khtml)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options:{
                                ident:'postcss',
                                plugins:[
                                    require('postcss-import')(),
                                    require('postcss-url')(),
                                    require('postcss-cssnext')({ // 可使用css 最新的语法功能
                                        features:{
                                            rem:false  //这里设置false 关闭 px 和 rem转换
                                        }
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name:'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name:'fonts/[name].[ext]'
                    }
                }
            },
            {
                test: require.resolve('../static/libs/jQuery.js'),
                exclude: /node_modules/,
                use:
                [
                    {loader: 'exports-loader'},
                    {loader: 'script-loader'}
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js','.vue','.json','.css']
    }
};
