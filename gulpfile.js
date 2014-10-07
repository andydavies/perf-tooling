/**
 *
 *  how to speedup a landingpage with gulp.
 *
 */

'use strict';

// Require the needed packages
var gulp        = require( 'gulp' ),
    gutil       = require( 'gulp-util'),
    less        = require( 'gulp-less' ),
    prefix      = require( 'gulp-autoprefixer' ),
    clean       = require( 'gulp-clean' ),
    minifyCSS   = require( 'gulp-minify-css' ),
    size        = require( 'gulp-size' ),
    watch       = require( 'gulp-watch' ),
    uglify      = require( 'gulp-uglify' ),
    tasks       = require( 'gulp-task-listing' ),
    svgstore    = require( 'gulp-svgstore' ),

    // all paths for watching and regeneration
    PATHS      = {
      less     : './less/**/*.less'
    },

    stylesHash = '';

/*******************************************************************************
 * HELP TASK
 *
 * This task will list out other available tasks when you run `gulp help`
 */
gulp.task('help', tasks);


/*******************************************************************************
 * STYLE TASK
 *
 * this task is responsible for the style files
 * - we will compile the less files to css
 * - we will minify the css files
 * - we will run them through autoprefixer
 * - and save it to public
 */
gulp.task( 'styles', function () {
  return gulp.src( 'less/main.less' )
    .pipe( less() )
    .pipe( minifyCSS() )
    .pipe( prefix( 'last 1 version', '> 1%', 'ie 8', 'ie 7' ) )
    .pipe( gulp.dest( 'public/' ) );
});


/*******************************************************************************
 * SCRIPT TASKS
 *
 * this task is responsible for the JavaScript files
 * - uglify the js
 * - and save it to public
 */
gulp.task( 'scripts', function() {
  return gulp.src( 'js/tooling.js' )
    .pipe( uglify() )
    .pipe( gulp.dest( 'public' ) );
});


/*******************************************************************************
 * SVG TASK
 *
 * this task is responsible for crunching all svg's together
 * - crunch svg files
 * - minify the files
 */
gulp.task( 'svg', function () {
  return gulp.src( 'svg/*.svg')
             .pipe( svgstore( {
                fileName  : 'icons.svg',
                prefix    : 'icon-',
                inlineSvg : true
              } ) )
             .pipe( gulp.dest( 'public/' ) );
});




/*******************************************************************************
 * SIZE
 *
 * this task will show you file sizes after build process
 */
gulp.task( 'size' , function() {
  gutil.log( '********************************' );
  gutil.log( '--> current file sizes not gzipped: ' );

  return gulp.src( PUBLIC_DIR + '/**/*' )
    .pipe( size( { showFiles : true } ) )
    .pipe( gulp.dest( PUBLIC_DIR ) );
});


/*******************************************************************************
 * BUILD
 *
 * run all build related tasks with:
 *
 *  $ gulp build
 *
 */
gulp.task( 'build', [ 'styles', 'scripts', 'svg' ] );


/*******************************************************************************
 * this task will kick off the watcher for JS, CSS, HTML files
 * for easy and instant development
 */
gulp.task( 'watch', function() {
  gulp.watch( 'less/**/*.less', [ 'styles' ] );
  gulp.watch( 'js/**/*.js', [ 'scripts' ] );
});


/*******************************************************************************
 * DEV
 *
 * run all build related tasks, kick of server at 8080
 * and enable file watcher with:
 *
 * $ gulp dev
 *
 */
gulp.task( 'dev', [ 'build', 'watch' ] );


/**
 * Default gulp task will run all landingpage task.
 * This is just a shorcut for $ gulp landingpage
 *
 *  $ gulp
 *
 */
gulp.task( 'default', [ 'build' ] );
