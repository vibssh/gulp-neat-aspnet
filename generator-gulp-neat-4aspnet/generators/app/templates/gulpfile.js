/*

  ==================================================
  ** Project : Gulpfile for Gulp-Neat-ASPNET
  ** Version : 0.0.0
  ** Author  : Leo Jacobs
  ** Date    : 21.05.2015
  ==================================================

*/


// Gulp Plugins
var gulp          = require('gulp'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    compass       = require('gulp-compass'),
    cssmin        = require('gulp-minify-css'),
    rename        = require('gulp-rename'),
    ignore        = require('gulp-ignore'), // Ignore files that don't need to be deleted from the folder
    rimraf        = require('gulp-rimraf'), // Cleaning CSS file generated
    gutil         = require('gulp-util'),   // Utility like beep when error
    plumber       = require('gulp-plumber'), // This is used so that the gulp watch doesn't break even though error
    imagemin      = require('gulp-imagemin'),
    pngcrush      = require('imagemin-pngcrush'),
    notify        = require('gulp-notify'),
    livereload    = require('gulp-livereload');

// Define path
var paths = {
    sass        : 'app/sass/**/*.scss',
    stylesheet  : 'app/sass',
    img         : 'app/images/*',
    template    : 'Views/**/*.cshtml'
};

var dest  = {
    css         : 'Css',
    image       : 'images'
};

// Compass Modules here
var modules = ['breakpoint'];


// Plumber Error
var onError = function (){
  gutil.beep();
  this.emit('end');
};


// Notification Centre
var cleanUp       = "Cleanup Done";
var cssMessage    = "Compass Compilation Done";
var htmlMessage   = "HTML Changes Reloaded";
var imgMesssage   = "Images Compressed";



/* ==========================

 ** TASKS BEGIN HERE

   ==========================
*/

// Compass Tasks here
gulp.task('compass', function() {
  return gulp
        .src(paths.sass)
        .pipe(plumber({
          errorHandler: notify.onError("Compass build failed")
        }))
        .pipe(compass({
            sass        : paths.stylesheet,
            css         : dest.css,
            require     : modules

        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest.css))
        .pipe(notify({message: cssMessage}))
        .pipe(livereload());
});



// Image Minfication Tasks Here
gulp.task('image', function() {
  return gulp
        .src(paths.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest.image))
        .pipe(notify({message: imgMesssage}))
        .pipe(livereload()); // This is for Browser-Sync
});


// HTML Task Here
gulp.task('template', function() {

});


// Clean up files that we don't need post build
gulp.task('clean', function() {
  return gulp
        .src('css/*.css', {read: false}) // Source of Folder to clean the files from
        .pipe(ignore('*.min.css')) // Ignore files that don't need cleanup
        .pipe(rimraf()) // Actual clean up plugin
        .pipe(notify({message: cleanUp }))
        .pipe(livereload()); // This is for Browser-Sync
});


//Watch here
gulp.task('watch', function() {
        livereload.listen();
        gulp.watch(paths.sass, ['compass']);  // Compass Watch
        gulp.watch('css/*.css', ['clean']); // Clean Watch
        gulp.watch(paths.img, ['image']); // ImageMin Watch
        gulp.watch(paths.template, ['template']).on('change', livereload.changed); // Template Watch
});

// Build Task here
gulp.task('build', ['compass', 'clean','image', 'template']).on('change',livereload.changed);

// Default Tasks
gulp.task('default', ['build', 'watch']); // Default Task
