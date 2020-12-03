const child_process = require('child_process');
const ora = require("ora");
const spinner = ora('npm run build...\n');

exports.dev = function () {
    spinner.start();
    const workerDev = child_process.spawn('npm', ['run', 'dev']);
    workerDev.stdout.on('data', function (data) {
        console.log('info: ' + data);
    });

    workerDev.stderr.on('data', function (data) {
        console.log('errInfo: ' + data);
    });

    workerDev.on('close', function (code) {
        spinner.stop();
        console.log('npm run dev 子进程已退出，退出码 ' + code);
        if (code != 0) {
            console.log('exitCode');
            process.exitCode = code;
        }
    });

    const workerDevVue = child_process.spawn('npm', ['run', 'dev-vue']);

    workerDevVue.stdout.on('data', function (data) {
        console.log('vue-info: ' + data);
    });

    workerDevVue.stderr.on('data', function (data) {
        console.log('vue-errInfo: ' + data);
    });

    workerDevVue.on('close', function (code) {
        spinner.stop();
        console.log('npm run dev-vue 子进程已退出，退出码 ' + code);
        if (code != 0) {
            console.log('exitCode');
            process.exitCode = code;
        }
    });
};