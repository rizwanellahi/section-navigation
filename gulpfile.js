/** @format */

const { src, dest, parallel, series, watch, gulp } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const del = require("del");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");

// Clean assets
function clean() {
  return del(["public"], { force: true });
}

// Compile SCSS
function scss() {
  return (
    src("src/scss/*.scss")
      // .pipe(uglify())
      .pipe(
        sass({
          outputStyle: "compressed",
        }).on("error", sass.logError)
      )
      .pipe(concat("section-navigation.min.css"))
      .pipe(dest("dist/css"))
      .pipe(browserSync.stream())
  );
}

// Compile JS
function js() {
  return src(["src/js/*.js"])
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(concat("section-navigation.js"))
    .pipe(dest("dist/js"));
}

// Watch Files
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  watch("./src/scss/*.scss", scss);
  watch("./*.html").on("change", browserSync.reload);
  watch("./src/js/*.js", js).on("change", browserSync.reload);
}

// Build
const build = series(clean, parallel(scss, js));

// Exports
exports.scss = scss;
exports.js = js;
exports.watch = watchFiles;
exports.build = build;
