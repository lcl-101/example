const gulp = require('gulp'),
      pump = require('pump'),
      path = require('path'),
      clean = require('gulp-clean'),
      plugins = require('gulp-load-plugins')();
const config = require('./config/index');
const replace =require('gulp-replace'); //字符串替换插件

const buildPath = config.build.outPath;
const copyPath = config.build.copyPath;
const publicPath = config.build.publicPath;
const domain = config.build.domain;

console.log(__dirname);
console.log(buildPath);

//拷贝view
gulp.task('move:view',function(){
    gulp.src( '.' + buildPath + '../' + '/template/*.ftl')
        .pipe(gulp.dest('.' + copyPath + '/template/'));
});

gulp.task('move:tpl',function(){
    gulp.src('./static/tpl/**/*')
        .pipe(gulp.dest('.' + copyPath + '/template/'));
});

// 过滤head标签
gulp.task('include:head',function(){
    return gulp.src('.' + buildPath + '../' + '/template/*.ftl')
        .pipe(replace(/(<head>|<\/head>)/g, function (world){
            return "";
        }))
        .pipe(gulp.dest('.' + buildPath + '../' + '/template/'));
});

// 全局替换 libs ，zepto or jq 需要
gulp.task('include:jQuery',function(){
    const lib_jQuery = domain + publicPath + 'libs/jQuery.js';
    const lib_script = '<script type="text/javascript" src="' + lib_jQuery +'"></script>';

    return gulp.src('.' + buildPath + '../' +'/views/**/*.ftl')
        .pipe(replace('<!--build:jQuery-->',lib_script))
        .pipe(gulp.dest('.' + buildPath + '../' + '/views/'));
});

//默认生成环境任务
gulp.task('default', function(callback) {
    // 将你的默认的任务代码放在这
    plugins.sequence(
        'include:jQuery',
        'move:view',
        'move:tpl'
    )(callback);
});
