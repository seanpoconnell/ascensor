const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const {src, dest} = require('gulp');

let bases = {
        app: 'assets/',
        dist: 'dist/',
        fonts: 'fonts/',
        root: '../../'
    },
    paths = {
        scripts: [
            'js/custom.js',
            'js/custom/*.js'
        ],
        libs: [
            //'../node_modules/jquery/dist/jquery.js',
            '../node_modules/@popperjs/core/dist/umd/popper.js',
            '../node_modules/bootstrap/dist/js/bootstrap.js',
        ],
        styles: [
            'scss/screen.scss',
        ],
        _views: [],
        fonts: ['fonts/**/*', '!libs/**/*'],
        images: ['images/**/*.*'],
        extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
    };

// Custom js scripts minify
gulp.task('scripts', function () {
    return gulp.src(paths.scripts, {cwd: bases.app, allowEmpty: true})
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify().on('error', function (e) {
        }))
        .pipe(concat('script.js'))
        .pipe(dest(bases.dist + 'scripts/'));
});

// Js libraries combine
gulp.task('scripts_lib', function () {
    // Concat lib scripts
    return gulp.src(paths.libs, {cwd: 'assets/**', allowEmpty: true})
        .pipe(uglify({output: {max_line_len: 120000}}))
        .pipe(concat('lib.js'))
        .pipe(dest(bases.dist + 'scripts/'));
});

// CSS Combine and minify
gulp.task('styles', function () {
    return gulp.src(paths.styles, {cwd: bases.app, allowEmpty: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
        .pipe(dest(bases.dist + 'styles/'));
});

// Images Minify and copy
gulp.task('imagemin', function () {
    return gulp.src(paths.images, {cwd: bases.app})
        .pipe(dest(bases.dist + 'images/'));
});

// Fonts copy
gulp.task('fonts', function () {
    return gulp.src(paths.fonts, {cwd: 'assets/**'}).pipe(dest(bases.dist));
});

// Gulp Watch Task
gulp.task('watch', function () {
    gulp.watch('assets/**/*', gulp.series('scripts', 'styles', 'reload'));
});

// Gulp Build Task
gulp.task('build', gulp.parallel('scripts', 'scripts_lib', 'styles', 'imagemin', 'fonts'));

// Browser Sync
gulp.task('browserSyncInit', function () {
    browserSync.init({
        port: 8081
    });
});

gulp.task('reload', function (done) {
    browserSync.reload({});
    done();
});

gulp.task('default', gulp.parallel('browserSyncInit', 'watch'));