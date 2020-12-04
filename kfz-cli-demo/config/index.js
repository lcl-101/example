module.exports = {
    build: {
        outPath: '/src/main/resources/webroot/static/',                 //打包后的输出的路径
        publicPath: '/static/',                                 //静态资源打包后的文件夹
        copyPath: '/src/main/resources/',                       //拷贝路径
        domain: ""            //静态资源的域名
    },
    maven: {                                                    //线上构建配置项
        env: 'production',                                      //构建环境 development 开发环境 production 生产环境
        isInstall: true                                        //是否执行 npm install 命令
    }
};
