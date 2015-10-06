var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
	var sources = [];
	
	sources.push('app/app.js');
	sources.push('app/partials/**/*.js');
	sources.push('app/directives/**/*.js');
	sources.push('app/services/*.js');
	sources.push('app/modals/**/*.js');

	gulp.src(sources)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/scripts'));
    // .pipe(uglify())
    // .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('vendor', function() {
	var sources = [];

	sources.push('app/bower_components/jquery/dist/jquery.js');
	sources.push('app/bower_components/angular/angular.js');
	sources.push('app/bower_components/angular-animate/angular-animate.js');
	sources.push('app/bower_components/angular-route/angular-route.js');
	sources.push('app/bower_components/angular-resource/angular-resource.js');
	sources.push('app/bower_components/ui-bootstrap/ui-bootstrap-tpls-0.12.1.min.js');
	sources.push('app/bower_components/angular-touch/angular-touch.min.js');
	sources.push('app/bower_components/ngstorage/ngStorage.min.js');
	sources.push('app/bower_components/rounding-progres-bar/roundProgress.min.js');
	
	gulp.src(sources)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/scripts'));
    // .pipe(uglify())
    // .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('styles', function() {
	var sources = [];
	sources.push('app/bower_components/bootstrap/dist/css/bootstrap.css');
	sources.push('app/css/*.css');

	gulp.src(sources)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/styles'));

   	sources = [];
   	sources.push('app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot');
   	sources.push('app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg');
   	sources.push('app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf');
   	sources.push('app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff');

   	gulp.src(sources).pipe(gulp.dest('./dist/fonts/'));

});

gulp.task('imgs', function(){
	var sources = [];
	sources.push('app/img/*');
	gulp.src(sources)
	.pipe(gulp.dest('./dist/img'))
});

gulp.task('templates', function() {

// PARTIALS
	var sources = [];
	sources.push('app/partials/building-menu/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/partials/building-menu/'));

	var sources = [];
	sources.push('app/partials/login/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/partials/login/'));

	var sources = [];
	sources.push('app/partials/main/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/partials/main/'));
// PARTIALS - END

// DIRECTIVES
	var sources = [];
	sources.push('app/directives/building-details/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/directives/building-details/'));

	var sources = [];
	sources.push('app/directives/building-status/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/directives/building-status/'));

	var sources = [];
	sources.push('app/directives/header/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/directives/header/'));

	var sources = [];
	sources.push('app/directives/header-page/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/directives/header-page/'));

	var sources = [];
	sources.push('app/directives/menu/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/directives/menu/'));

	var sources = [];
	sources.push('app/directives/photo-gallery/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/directives/photo-gallery/'));
// DIRETIVES - END

//MODALS
	var sources = [];
	sources.push('app/modals/photo-modal/*.html');
	gulp.src(sources).pipe(gulp.dest('./dist/modals/photo-modal/'));
//MODALS - END

});