// const { src, dest } = require('gulp');
const gulp = require('gulp');
const folders = {
    src: 'src/',
    dist: 'dist/',
    vendor: 'vendor/'
};
const { src, dist, vendor } = folders;
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

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
