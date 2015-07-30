var gulp      = require('gulp'),
    plumber   = require('gulp-plumber'),
    compass   = require('gulp-compass'),
    rename    = require('gulp-rename'),
    path      = require('path'),
    notify    = require('gulp-notify'),
    gzip      = require('gulp-gzip'),
    minifyCSS = require('gulp-minify-css');

var notifyInfo = {
    title: 'Gulp',
    icon : path.join(__dirname, 'gulp.png')
};
//error notification settings for plumber
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title  : notifyInfo.title,
        icon   : notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};

gulp.task('styles', function () {
    return gulp.src(['src/playground.scss'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            sass : 'src/',
            image: 'src/images'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(rename('playground.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'));
});