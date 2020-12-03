// 分离css代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    module: {
        rules: [
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
                test: /\.(html)$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 0,
                        name:'[name].[hash:8].[ext]',
                        outputPath:'img/'
                    }
                }
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {

                        }
                    }
                ]
            },
            {
                test:/\.(ttf|eot|woff|svg)$/,
                use:{
                    loader:'file-loader',
                    options: {
                        outputPath:'font/'
                    }
                }
            },
            {
                test: /\.dot$/,
                exclude: /node_modules/,
                use: {
                    loader: 'dot-loader',
                    options: {

                    }
                }
            }
        ],
        noParse: /jquery/
    },
    resolve: {
        modules: [path.resolve(__dirname, '../static/'),'node_modules'], //告诉webpack，我是要到node_modules目录下和src目录下去找这两个文件
        extensions: ['.js','.vue','.json','.css'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            "request": "../../../common/libs/request/request.js"
        }
    }
};