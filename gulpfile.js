var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
	var sources = [];
	sources.push('app/directives/**/*.js');
	sources.push('app/partials/**/*.js');
	sources.push('app/services/*.js');
	sources.push('app/modals/**/*.js');
	sources.push('app/app.js');

	gulp.src(sources)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('vendor', function() {
	var sources = [];
	sources.push('app/bower_components/**/*.js');

	gulp.src(sources)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('styles', function() {
	var sources = [];
	sources.push('app/css/*.css');
	sources.push('app/bower_components/bootstrap/dist/css/bootstrap.css');

	gulp.src(sources)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('imgs', function(){
	var sources = [];
	sources.push('app/img/*');
	gulp.src(sources)
	.pipe(gulp.dest('./dist/img'))
});

gulp.task('templates', function() {
	var sources = [];
	sources.push('app/partials/building-menu/*.html');
	sources.push('app/partials/login/*.html');
	sources.push('app/partials/main/*.html');

	sources.push('app/directives/building-details/*.html');
	sources.push('app/directives/building-status/*.html');
	sources.push('app/directives/header/*.html');
	sources.push('app/directives/header-page/*.html');
	sources.push('app/directives/menu/*.html');
	sources.push('app/directives/photo-gallery/*.html');

	sources.push('app/modals/photo-modal/*.html');
	
	gulp.src(sources)
    .pipe(gulp.dest('./dist/templates'))
});