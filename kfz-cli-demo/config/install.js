const child_process = require('child_process');
const ora = require("ora");
const spinner = ora('npm install...\n');

exports.install = function (callback) {
    spinner.start();
    const workerInstall = child_process.spawn('npm', ['install']);
    workerInstall.stdout.on('data', function (data) {
        console.log('info: ' + data);
    });

    workerInstall.stderr.on('data', function (data) {
        console.log('errInfo: ' + data);
    });

    workerInstall.on('close', function (code) {
        spinner.stop();
        console.log('npm install 子进程已退出，退出码 ' + code);
        if (code != 0) {
            console.log('exitCode');
            process.exitCode = code;
        } else {
            callback && callback();
        }
    });
};