'use strict';

let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');

gulp.task('default', ['babel', 'sass']);

let jsFiles = [
  'src/config.js',
  'src/names-panel.js',
  'src/options-panel.js',
  'src/main.js'
];

gulp.task('babel', function () {
  gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel:watch', function () {
  gulp.watch(jsFiles, ['babel']);
});

let sassFiles = [
  'sass/main.scss',
  'sass/*-panel.scss',
  'sass/*-theme.scss'
];

gulp.task('sass', function () {
  gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('all.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass:watch', function () {
  gulp.watch(sassFiles, ['sass']);
});
