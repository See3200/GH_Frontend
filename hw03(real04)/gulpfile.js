var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rev = require('gulp-rev-append');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');


gulp.task('bs', ['sass'], function () {
    bs.init({
        server: {
            baseDir: "./src/"
        },
        notify: false
    });
});


gulp.task('sass', function () {
    gulp.src('./src/style/sass/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer('last 4 versions', 'true'))
        .pipe(gulp.dest('./src/style'))
        .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/style'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('script', function () {
    gulp.src('./src/script/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./src/js/'))
        .pipe(uglify().on('error', function (e) {console.log(e);}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/js/'))
        .pipe(bs.reload({stream: true}));
});


gulp.task('rev', function() {
    gulp.src('./src/*.html')
        .pipe(rev())
        .pipe(gulp.dest('./build/'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('imgmin', function() {
    gulp.src('./src/img/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 1}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./build/img/'))
});

gulp.task('clean', ['rev', 'imgmin', 'fonts', 'html', 'js', 'css', 'download'], function () {
    return gulp.src([
        './build/**/*.map',
    ], {read: false})
        .pipe(clean());
});


gulp.task('fonts', function() {
    gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'))
});
gulp.task('download', function() {
    gulp.src('./src/download/**/*.*')
        .pipe(gulp.dest('./build/download'))
});

gulp.task('css', function() {
    gulp.src('./src/style/**/*.css')
        .pipe(gulp.dest('./build/style/'))
});
gulp.task('js', function() {
    gulp.src('./src/js/**/*.*')
        .pipe(gulp.dest('./build/js/'))
});
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./build/'))
});

gulp.task('watch', ['bs', 'sass', 'script'], function () {
    gulp.watch("./src/style/sass/**/*.scss", ['sass'], bs.reload);
    gulp.watch(['./src/script/*.js'], ['script'], bs.reload);
    gulp.watch('./src/*.html', bs.reload)
});

gulp.task('build', ['clean']);
gulp.task('default', ['watch']);