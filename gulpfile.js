var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    port = process.env.port || 5100;


//live reload
gulp.task('connect',function(){
    connect.server({
        root:'./',
        port:port,
        livereload:true,
    })
});
// sass
gulp.task('scss',function(){
  gulp.src('./src/scss/*.scss')
          .pipe(sass({ style: 'expanded' }))
          .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
          .pipe(gulp.dest('dist/css'))
          .pipe(rename({suffix: '.min'}))
          .pipe(minifycss())
          .pipe(gulp.dest('./dist/css/'))
          .pipe( connect.reload() )
          .pipe(notify({ message: 'Styles  task complete' }));

});
// reload js
gulp.task('js',function(){
  gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe( connect.reload() )
        .pipe(notify({ message: 'Scripts task complete' }));

});
// images
gulp.task('img',function(){
  gulp.src('./src/images/*')
  .pipe(gulp.dest('./dist/images'))
  .pipe( connect.reload() )
  .pipe(notify({ message: 'images task complete' }));
});
// html
gulp.task('html',function(){
  gulp.src('./**.html')
  .pipe( connect.reload() )
  .pipe(notify({ message: 'html task complete' }));
});

gulp.task('watch',function(){
  gulp.watch('./src/scss/*.scss',['scss']);
  gulp.watch('./src/js/*.js',['js']);
  gulp.watch('./src/images/*',['img']);
  gulp.watch('./**.html',['html']);

});

gulp.task('default',['watch']);

gulp.task('serve',['connect','watch']);
