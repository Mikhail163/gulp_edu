var gulp = require('gulp');
var sass = require('gulp-sass');
//uglifyjs = require('gulp-uglifyjs'),
//cssPrefix = require('gulp-autoprefixer'),
/*BS = require('browser-sync')*/
;

var config = {
    app: './app',
    dist: './dist',
}
/*
1. gulp.task() - создание новой задачи
2. gulp.src() - позволяет выбрать файлы по шаблону или конкретные файлы
3. gulp.dest() - сохраняет уже преобразованные файлы
*/

gulp.task('test', function () {
    console.log('Hello world');
});

gulp.task('default', ['test', 'html', 'sass'], function () {
    console.log('task default');
});

gulp.task('html', function () {
    gulp.src([config.app + '/html/lesson6.html'])
        .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function () {

    gulp.src([config.app + '/sass/main.scss'])
        .pipe(sass())
        //.pipe(cssPrefix())
        .pipe(gulp.dest(config.dist + '/css'));
});
