import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
const folders = {
    src: 'src/',
    dist: 'dist/',
    vendor: 'vendor/'
};
const { src, dist, vendor } = folders;

gulp.task('js', () => {
    return gulp.src([`${src}**/*.js`, `!${vendor}*.js`])
    .pipe(babel())
    .pipe(gulp.src('vendor/**/*.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(gulp.dest(`${dist}`));
});

gulp.task('watch', () => {
    gulp.watch(`${src}**/*.js`, gulp.parallel('js'));
});

gulp.task('default', gulp.series('watch'));
