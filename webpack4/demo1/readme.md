## webpack4构建开发到实际项目使用(第一期)

> 前言: 这里会记录webpack4从0开始,一步一步搭建成一个完整的项目,还有自己在实际项目中经常用的插件和碰到一写问题和解决方案, 基本概念在这里不做解释,小白可以去官网查看, 本教程全是实践应用.

## 本期内容
搭建一套简单的构建系统

1. 通过npm init初始化项目,生成 package.json文件
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4bbdd25163b46f9beb61296e926c468~tplv-k3u1fbpfcp-watermark.image)

2. 安装webpack包,这里安装的都是指定版本的包
```
npm i webpack@4.41.5 webpack-cli@3.3.10 webpack-dev-server@3.10.1 --save
```

3. 创建文件目录结构
创建src目录,在src下创建modules目录,创建demo.js
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0de3fd4dafdd4a94bc262e7c1d4b89f0~tplv-k3u1fbpfcp-watermark.image)

4. 创建webpack.congfig.js文件
```js
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
```

5. 修改package.json文件中scripts配置
```js
"scripts": {
    "dev": "env NODE_ENV=development node_modules/.bin/webpack-cli --config ./webpack.config.js --progress --colors"
  },
```

6. 运行 npm run dev
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b546ef3bcda44080ab31de3567e98283~tplv-k3u1fbpfcp-watermark.image)

到此为止可以简单的打包js文件,不过在实际的项目,我们需要把js打包到对应模板页面中,会在下一期里做讲解

[源码地址链接](https://github.com/lcl-101/example/tree/master/webpack4/demo1)


