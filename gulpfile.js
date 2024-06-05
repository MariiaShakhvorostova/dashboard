const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

gulp.task("pug", function () {
  return gulp
    .src("src/pug/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return gulp
    .src("src/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.stream());
});

gulp.task("serve", function () {
  browserSync.init({
    server: "./dist",
  });

  gulp.watch("src/pug/*.pug", gulp.series("pug"));
  gulp.watch("src/styles/*.scss", gulp.series("sass"));
  gulp.watch("src/js/*.js", gulp.series("js")).on("change", browserSync.reload);
  gulp.watch("dist/*.html").on("change", browserSync.reload);
});

gulp.task("default", gulp.series("pug", "sass", "serve"));
