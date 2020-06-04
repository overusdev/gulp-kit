import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import minifyCss from 'gulp-clean-css';
import dependents from 'gulp-dependents';

sass.compiler = require('node-sass');

const folders = {
    src: 'src/',
    dist: 'dist/',
    vendor: 'vendor/'
};
const { src, dist, vendor } = folders;

gulp.task('js', () => {
    return gulp.src([`${src}js/**/*.js`, `!${vendor}*.js`])
        .pipe(babel())
        .pipe(gulp.src('vendor/**/*.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js'}))
        .pipe(gulp.dest(`${dist}js`));
});

gulp.task('sass', () => {
    return gulp.src([`${src}sass/**/*.scss`, `${src}**/*.sass`])
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(dependents())
        .pipe(autoprefixer({
            grid: true
        }))
        .pipe(minifyCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(`${dist}css`));
});

const watch = [
    src + 'sass/**/*.scss',
    src + 'js/**/*.js',
];

gulp.task('watch', () => {
    gulp.watch(watch, gulp.parallel(['js', 'sass']));
});

gulp.task('default', gulp.series('watch'));
