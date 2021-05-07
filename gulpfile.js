const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const concat = require("gulp-concat");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//HTML

const htmlMake = () => {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

exports.htmlMake = htmlMake;

//JS

const concatScripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("source/js/"))
}

exports.concatScripts = concatScripts;

const scripts = () => {
  return gulp.src("source/js/scripts.js")
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

//Pictures

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = optimizeImages; //Оптимизирует картинки

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}

exports.images = copyImages; //Просто копирует картинки

//WebP

const createWebp = () => {
  return gulp.src(["source/img/**/*.{jpg,png}", "!source/img/fav*.{jpg,png}", "!source/img/152.png"])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

//Sprite

const createSprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.createSprite = createSprite;

//Only copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "source/*.webmanifest",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build' //Замена каталога на пользовательский
    },
    cors: true,
    notify: false,
    ui: false,
    //open: false
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Clean

const clean = () => {
  return del(["build", "source/js/scripts.js"]);
};

const cleanJS  = () => {
  return del("source/js/scripts.js");
};

exports.cleanJS = cleanJS ;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch(["source/js/*.js", "!source/js/scripts.js"], gulp.series(cleanJS, concatScripts, scripts, reload));
  gulp.watch("source/*.html", gulp.series(htmlMake, reload));
  // gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);

//Get build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  concatScripts,
  gulp.parallel(
    styles,
    htmlMake,
    scripts,
    createSprite,
    createWebp
  ),
);

exports.build = build;

//Get start

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  concatScripts,
  gulp.parallel(
    styles,
    htmlMake,
    scripts,
    createSprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
