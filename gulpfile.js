var gulp      = require('gulp'),
    del       = require('del'),
    path      = require('path'),
    sync      = require('gulp-sync')(gulp),
    plumber   = require('gulp-plumber'),
    compass   = require('gulp-compass'),
    rename    = require('gulp-rename'),
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

gulp.task('clean', function (cb) {
    del(['dist/*'], cb);
});

gulp.task('compass', function () {
    return gulp.src(['src/playground.scss'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            sass : 'src/',
            image: 'src/images',
            debug: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(rename('playground.min.css'))
        .pipe(minifyCSS())
        .pipe(gzip({append: false}))
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', sync.sync(['clean', ['compass', 'fonts']]));