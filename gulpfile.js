var gulp = require('gulp');
var uglify = require('gulp-uglify');
var typescript = require('gulp-typescript');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var es = require('event-stream');
var tsFiles = 'client/scripts/**/*.ts';
var jsFiles = 'client/scripts/**/*.js';  
var jsDest = 'dist/scripts';

gulp.task('compile', ['clean'], function() {
    var res = gulp.src(tsFiles)
        .pipe(typescript())
        .pipe(gulp.dest(jsFiles));
    return res;
});

gulp.task('scripts', ['clean', 'compile'],function() {  
    var res = gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
    return res;
});

gulp.task('clean', function() {
    var res = es.concat(
        gulp.src(jsDest, {read: false})
            .pipe(clean()),
        gulp.src(jsFiles, {read: false})
            .pipe(clean())
    );
    return res;
});

gulp.task('watch', function(){
    var watcher = gulp.watch(tsFiles);
    watcher.on('change', function(event){
        console.log("File : " + event.path + " was changed.");
    })
});

gulp.task('default', ['clean','compile', 'scripts']);