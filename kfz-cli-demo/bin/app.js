const config = require('../config/index');
const spawnInstall = require('../config/install');
const spawnDev = require('../config/dev');
const spawnBuild = require('../config/build');

//判断是maven发版是否是开发环境  开发环境(-Dpackage.env=FAT) 线上环境(-Dpackage.env=PRO)
if(process.env.npm_package_scripts_maven && process.env.npm_package_scripts_maven.indexOf('Dpackage.env=FAT') !== -1){
    // 是否执行 npm install
    if (config.maven.isInstall) {
        spawnInstall.install(function () {
            run();
        });
    } else {
        //执行构建命令
        run();
    }
}else {
    // 是否执行 npm install
    if (config.maven.isInstall) {
        spawnInstall.install(function () {
            spawnBuild.build();
        });
    } else {
        spawnBuild.build();
    }
}

//执行构建命令
function run() {
    if (config.maven.env === "production") {
        spawnBuild.build();
    } else if (config.maven.env === "development") {
        spawnDev.dev();
    }
}