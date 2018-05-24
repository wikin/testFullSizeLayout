// Node modules
var merge = require('deeply'),  es = require('event-stream'), cs = require('combined-stream');
var gutil = require('gulp-util');

// Gulp and plugins
var gulp = require('gulp'), concat = require('gulp-concat'), 
    replace = require('gulp-replace'), uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-clean-css'), less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch');

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {

    var uglify = require('gulp-uglify');
    var combinedStream = cs.create().on('error', swallowError);

    combinedStream.append(  gulp.src('./bower_modules/jquery/dist/jquery.js') );
    combinedStream.append(  gulp.src('./js/script.js') );

    var combinedJS = combinedStream.pipe(concat('scripts/script.js'));
    return combinedJS
        .pipe(uglify({ output:{ comments : 'some'} }))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('../WWWROOT'));
});



// Concatenates LESS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('less', function () {


    var appCss = gulp.src('./less/style.less')
                .pipe(less())
                .on('error', swallowError)
                .pipe(replace(/url\((')?\.\.\/bower_modules\/font\-awesome\/fonts\//g, 'url($1../fonts/'))
                .pipe(autoprefixer('last 10 versions', 'ie 9'))
                .pipe(minifyCSS()),
        combinedStream = cs.create(),
        fontAwesomeFiles = gulp.src('./bower_modules/font-awesome/fonts/*', { base: './bower_modules/font-awesome/' });


    combinedStream.append(appCss);
    var combinedCss = combinedStream
        .pipe(concat('css/style.css'));

    return es.concat(combinedCss, fontAwesomeFiles)
        .pipe(gulp.dest('../WWWROOT'));

});





gulp.task('default', ['less', 'js'], function(callback) {
    callback();
});





gulp.task('watch', function() {
 
    watch('./less/**/*.less', function(){ gulp.start('less') });
    watch('./js/**/*.js', function(){ gulp.start('js') });
    watch('./libs/**/*.js', function(){ gulp.start('js') });

});
