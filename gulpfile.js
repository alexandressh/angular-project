var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-ruby-sass'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  server = require( 'gulp-develop-server' );

  // sass task
  gulp.task('sass', function () {
   return sass('./app/styles/**/*.scss', { 
        noCache: true,
        style: "expanded",
        lineNumbers: true,
        loadPath: './app/styles/*'
      })
      .pipe(gulp.dest('./app/styles'))
      .pipe(notify({
        message: "Sassy Sass! You just got super Sassy!"
      }));
  });

  // uglify task
  gulp.task('js', function() {
    // main app js file
    gulp.src('./app/scripts/app.js')
    .pipe(uglify())
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest('./app/scripts/'))
    .pipe( notify({ message: "Javascript is now ugly! Ew!"}) );

    // create 1 vendor.js file from all vendor plugin code
    // gulp.src('./assets/js/vendor/**/*.js')
    // .pipe(uglify())
    // .pipe(concat("vendor.js"))
    // .pipe(gulp.dest('./assets/js'))
    // .pipe( notify({ message: "Javascript is now ugly!"}) );
  });
  
  gulp.task( 'server:start', function() {
      server.listen( { path: './server.js' } );
  });
   
  // restart server if app.js changed 
  gulp.task( 'server:restart', function() {
      gulp.watch( [ './server.js' ], server.restart );
  });

  gulp.task('watch', function() {
    // watch scss files
    gulp.watch('./app/styles/**/*.scss', function() {
      gulp.run('sass');
    });

    gulp.watch('./app/scripts/**/*.js', function() {
      gulp.run('js');
    });
  });

gulp.task('default', ['sass', 'js', 'watch', 'server:start', 'server:restart']);