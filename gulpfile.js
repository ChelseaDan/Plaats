var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var es = require('event-stream');
var tsFiles = 'client/scripts/**/*.ts';
var jsFiles = 'client/scripts/**/*.js';  
var jsDest = 'dist/scripts';

gulp.task('scripts',function() {  
    var res = gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
    return res;
});

gulp.task('watch', function(){
    var watcher = gulp.watch(tsFiles);
    watcher.on('change', function(event){
        console.log("File : " + event.path + " was changed.");
    })
});

gulp.task('default', ['scripts']);
