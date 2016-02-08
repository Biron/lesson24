var gulp = require('gulp'),
	copy = require('copy'),
	sass = require('gulp-sass'),	
	uglify = require('gulp-uglify'),	
    lib    = require('bower-files')(),
    browserSync = require('browser-sync').create();

var config = {
	src: "client",
	dest: "build",
	copy: {
		src: ["client/index.html", "client/images"]
	},
	js: {
		src: "client/js/*.js",
		dest: "build/js"
	},
	css: {
		src: "client/css/*.scss",
		dest: "build/css"
	}
};

gulp.task('browser-sync', function() {
	browserSync.init({
    	files: 'build/',
		server: {
            baseDir: "build"
        }
	});
});

gulp.task('js', function() {
  gulp.src(config.js.src)
      .pipe(uglify())
      .pipe(gulp.dest(config.js.dest));
});


gulp.task('bower', function () {
  gulp.src(lib.ext('js').files)
      .pipe(uglify())
      .pipe(gulp.dest(config.js.dest));
});

gulp.task('default', function() {
	gulp.start(
		'copy',
		'sass',
		'sass:watch', 
		'browser-sync',
		'js',
		'js:watch',
		'bower'
		);
});

gulp.task('copy', function() {
	gulp.src(config.copy.src)
		.pipe(gulp.dest(config.dest))
});

gulp.task('sass', ['copy'], function() {
	gulp.src(config.css.src)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest(config.css.dest))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(config.css.src, ['sass']);
});

gulp.task('js:watch', ['js'], function () {
  gulp.watch(config.js.src, ['js']);
});