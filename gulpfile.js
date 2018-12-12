var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
    console.log("hooray you created a gulp task");
});

gulp.task('html', function(){
    console.log("Imagine sth useful being done");
});

gulp.task('style', function(){
    return gulp.src('./app/assets/styles/style.css')    
        .pipe(postcss([ cssImport, cssvars, nested, autoprefixer])) 
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    gulpWatch('./app/index.html', function() {
        browserSync.reload();

    });

    gulpWatch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });
}); 

gulp.task('cssInject', ['style'], function() {
    return gulp.src('./app/temp/styles/style.css')
    .pipe(browserSync.stream());
});