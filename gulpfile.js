var gulp = require('gulp');
var sass = require('gulp-sass');
var cssPrefix = require('gulp-autoprefixer');
var uglifyjs = require('gulp-uglify-es').default;
var BS = require('browser-sync');


var config = {
    app: './app',
    dist: './dist',
}
/*
1. gulp.task() - создание новой задачи
2. gulp.src() - позволяет выбрать файлы по шаблону или конкретные файлы
3. gulp.dest() - сохраняет уже преобразованные файлы
*/

gulp.task('default', ['html', 'sass', 'js', 'mywatch', 'server'], function () {
    console.log('task default');
});

gulp.task('html', function () {
    gulp.src([config.app + '/html/lesson6.html'])
        .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function () {

    gulp.src([config.app + '/sass/main.scss'])
        .pipe(sass())
        .pipe(cssPrefix())
        .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('js', function () {
    gulp.src([config.app + '/js/**/*.js'])
        .pipe(uglifyjs())
        .pipe(gulp.dest(config.dist + '/js'));
});

gulp.task('mywatch', function () {
    gulp.watch([config.app + '/html/lesson6.html'], ['html']);
    gulp.watch([config.app + '/sass/**/*.scss'], ['sass']);
    gulp.watch([config.app + '/js/**/*.js'], ['js']);
});

// Server
gulp.task('server', function () {
    BS({
        server: {
            baseDir: config.dist
        }
    })
});
