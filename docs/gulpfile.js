var gulp = require('gulp'),
	watch = require('gulp-watch');
	sass = require('gulp-sass');


gulp.task('sass', function () {
	gulp.src(['scss/*.scss'])
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('html/assets/css'));
});

gulp.task('watch',function(){
	gulp.watch('scss/*.scss',['sass']);
});

gulp.task('default', ['sass', 'watch']);