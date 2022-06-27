const { parallel, series, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    styles: {
        src: 'src/sass/style.scss',
        dest: 'public/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'public/js/'
    },
    templates: {
        src: 'src/templates/**/*.html',
        dest: 'public/'
    }
};

function templates() {
    return src(paths.templates.src)
        .pipe(dest(paths.templates.dest));
}

function css() {
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(dest(paths.styles.dest));
}

// TODO: add js minifier
function scripts() {
    return src(paths.scripts.src)
        .pipe(dest(paths.scripts.dest));
}

exports.build = parallel(scripts, css, templates);