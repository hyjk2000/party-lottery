var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var watch = require("gulp-watch");

gulp.task("default", ["babel", "sass"]);

var jsFiles = [
  "src/config.js",
  "src/names-panel.js",
  "src/options-panel.js",
  "src/main.js",
];

gulp.task("babel", function () {
  gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task("babel:watch", function () {
  gulp.watch(jsFiles, ["babel"]);
});

var sassFiles = "sass/**/*.scss";

gulp.task("sass", function () {
  gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(concat("all.css"))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task("sass:watch", function () {
  gulp.watch(sassFiles, ["sass"]);
});
