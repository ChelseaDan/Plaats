var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('watch', function(){
    var watcher = gulp.watch('client/scripts/*.js');
    watcher.on('change', function(event){
        console.log("File : " + event.path + " was changed.");
    })
});

gulp.task('minify', function(){
    gulp.src('client/scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})

gulp.task('default', function(){
    console.log("Gulp is running correctly");
});