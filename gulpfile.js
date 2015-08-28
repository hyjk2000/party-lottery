var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", ["babel"]);

gulp.task("babel", function() {
  var files = [
    "src/config.js",
    "src/names-panel.js",
    "src/options-panel.js",
    "src/main.js",
  ];

  gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
