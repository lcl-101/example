const path = require('path');

//生成环境
const NODE_ENV = process.env.NODE_ENV;
let isProduction = NODE_ENV === 'production';

module.exports = {
    entry: './src/modules/demo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'demo.bundle.js'
    },
    mode: NODE_ENV
}