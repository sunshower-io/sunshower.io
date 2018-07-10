
var gulp = require('gulp'),
    scss = require('gulp-sass'),
    cleanStyles = require('gulp-clean-css'),
    del = require('del'),
    paths = {
        styles: {
            src: 'new/sass/main.scss',
            destination: 'new/build/assets/compiled.scss'
        }
    };


function buildStyles() {
    return gulp.src(paths.styles.src)
        .pipe(scss())
        .pipe(cleanStyles())
        .pipe(gulp.dest(paths.styles.destination));
}

function clean() {
    return del(['new/build']);
}

function watch() {
    gulp.watch(paths.styles.src, buildStyles);
}

// var buildAll = gulp.series(clean, gulp.parallel(buildStyles));

gulp.task('clean', clean);
gulp.task('watch', watch);
gulp.task('build', buildStyles);

