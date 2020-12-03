const gulp = require('gulp'),
      pump = require('pump'),
      path = require('path'),
      clean = require('gulp-clean'),
      plugins = require('gulp-load-plugins')();
const config = require('./config/index');
const replace =require('gulp-replace'); //字符串替换插件

const buildPath = path.resolve(__dirname, config.build.outPath);
const copyPath = path.resolve(__dirname, config.build.copyPath);

//拷贝view
gulp.task('move:view',function(){
    gulp.src('.' + buildPath + '/views/**/*')
        .pipe(gulp.dest('.' + copyPath + '/template/views'));
});

gulp.task('move:tpl',function(){
    gulp.src('./static/tpl/**/*')
        .pipe(gulp.dest('.' + copyPath + '/template/tpl'));
});

gulp.task('clean', function(cb) {
    pump([
        gulp.src('.' + buildPath + '/views/'),
        clean()
    ], cb)
})

// 过滤head标签
gulp.task('include:head',function(){
    return gulp.src('.' + buildPath + '/views/**/*.ftl')
        .pipe(replace(/(<head>|<\/head>)/g, function (world){
            return "";
        }))
        .pipe(gulp.dest('.' + buildPath + '/views/'));
});

//默认生成环境任务
gulp.task('default', function(callback) {
    // 将你的默认的任务代码放在这
    plugins.sequence(
        'include:head',
        'move:view',
        'move:tpl'
    )(callback);
});