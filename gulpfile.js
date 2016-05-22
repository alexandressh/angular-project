var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-ruby-sass'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  server = require( 'gulp-develop-server' ),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  mainBowerFiles = require('main-bower-files');
  
var paths = {
    scripts: {
      src: 'app/scripts/**/*.js',
      dest: 'build/js'
    },
    config: {
      app: 'app/app.config.js',
      modules: 'app/app.modules.js'
    },
    style: {
      src: 'app/styles/**/*.scss',
      dest: 'build/css'
    },
    build: 'build',
    index: 'app/index.html',
    server: 'server.js'
};

  // sass task
  gulp.task('sass', function () {
   return sass(paths.style.src, { 
        noCache: true,
        style: "expanded"
        })
      .pipe(gulp.dest(paths.style.dest))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssnano())
      .pipe(gulp.dest(paths.style.dest));
  });

  gulp.task('js', function() {
    gulp.src([paths.config.app, paths.config.modules, paths.scripts.src])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
  });
  
  gulp.task('index', function() {
    gulp.src(paths.index)
    .pipe(gulp.dest(paths.build));
  });
  
  
  gulp.task('bower', function() {
    gulp.src(mainBowerFiles().concat())
    .pipe(concat('vendor.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
  });
  
  gulp.task( 'server:start', function() {
      server.listen( { path: paths.server} );
  });
   
  // gulp.task( 'server:restart', function() {
  //     gulp.watch( [ paths.server ], server.restart );
  // });

  gulp.task('watch', function() {
    gulp.watch(paths.style.src, function() {
      gulp.run('sass');
    });

    gulp.watch(paths.scripts.src, function() {
      gulp.run('js');
    });
  });

// gulp.task('default', ['bower', 'sass', 'js', 'index', 'watch', 'server:start', 'server:restart']);
gulp.task('default', ['bower', 'sass', 'js', 'index', 'server:start']);