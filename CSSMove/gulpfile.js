// gulpfile.js
var gulp = require('gulp');
var sass = require('gulp-sass'); // 编译scss 为 css
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


// 编译任务：sass文件夹下的sass文件编译为css文件存放在src/css下面
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream: true}))
})
