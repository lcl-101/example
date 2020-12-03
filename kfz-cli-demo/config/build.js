const child_process = require('child_process');
const ora = require("ora");
const spinner = ora('npm run build...\n');

exports.build = function () {
    spinner.start();
    const workerBuild = child_process.spawn('npm', ['run', 'build']);
    workerBuild.stdout.on('data', function (data) {
        console.log('info: ' + data);
    });

    workerBuild.stderr.on('data', function (data) {
        console.log('errInfo: ' + data);
    });

    workerBuild.on('close', function (code) {
        spinner.stop();
        console.log('npm run build 子进程已退出，退出码 ' + code);
        if (code != 0) {
            console.log('exitCode');
            process.exitCode = code;
        }
    });

    const workerBuildVue = child_process.spawn('npm', ['run', 'build-vue']);

    workerBuildVue.stdout.on('data', function (data) {
        console.log('vue-info: ' + data);
    });

    workerBuildVue.stderr.on('data', function (data) {
        console.log('vue-errInfo: ' + data);
    });

    workerBuildVue.on('close', function (code) {
        spinner.stop();
        console.log('npm run build-vue 子进程已退出，退出码 ' + code);
        if (code != 0) {
            console.log('exitCode');
            process.exitCode = code;
        }
    });
}