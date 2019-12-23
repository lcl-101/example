var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var gulpSequence = require('gulp-sequence');
var replace =require('gulp-replace');           //字符串替换插件

// move common assets
gulp.task('move:assets', function () {
    return gulp.src('./static/assets/**')
        .pipe(gulp.dest('./dist/assets/'));
});

//move conf
gulp.task('move:site', function () {
    return gulp.src('./conf/**')
        .pipe(gulp.dest('./dist/conf/'));
});

//站点配置信息替换 TODO:待优化成自动处理模板
gulp.task('include:site',function(){
  var r = parseInt(Math.random()*1000000000);
  var site = '/dist/conf/kfz_sys.js';
  var st = '<script type="text/javascript" src="'+site+'?='+r+'"></script>';
  return gulp.src('./dist/views/index/index.html')
        .pipe(replace('<script type="text/javascript" src="/dist/conf/kfz_sys.js"></script>',''))
        .pipe(replace('<!--build:kfz_sys-->',st))
        .pipe(gulp.dest('./dist/views/index/'));
});

//dev模式构建，不压缩代码
gulp.task('build-dev', ['build-dev-for-jq','build-dev-for-vue','move:assets','move:site'], function (callback) {
  gulpSequence('include:site')(callback);
});
gulp.task('build-dev-for-jq', function(callback) {
    webpack(require('./build/webpack.dev.config.js'), function(err, stats) {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        var info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        callback();
    });
});
gulp.task('build-dev-for-vue', function(callback) {
    webpack(require('./build/webpack.dev.forVue.config.js'), function(err, stats) {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        var info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        callback();
    });
});

//线上生产环境构建
gulp.task('build',['build-for-jq','build-for-vue','move:assets','move:site'], function (callback) {
  gulpSequence('include:site')(callback);
});
gulp.task('build-for-jq', function(callback) {
    webpack(require('./build/webpack.prod.config.js'), function(err, stats) {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        var info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        callback();
    });
});
gulp.task('build-for-vue', function(callback) {
    webpack(require('./build/webpack.prod.forVue.config.js'), function(err, stats) {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        var info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        callback();
    });
});

//clean 不要随意使用
gulp.task('clean',function(){
    return gulp.src('dist',{read:false}).pipe(clean());
});
