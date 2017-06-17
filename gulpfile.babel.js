'use strict';

// import
import gulp from 'gulp';
import _ from 'lodash';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import pleeease from 'gulp-pleeease';
import browserify from 'browserify';
import babelify from 'babelify';
import pug from 'gulp-pug';
import postman from 'gulp-postman';
import data from 'gulp-data';
import path from 'path';
import rename from 'gulp-rename';
import rimraf from 'rimraf';
import uglify from 'gulp-uglify';
import decodecode from 'gulp-decodecode';
import browserSync from 'browser-sync';
import readConfig from 'read-config';
import watch from 'gulp-watch';


// const
const SRC = './src';
const CONFIG = './src/config';
const DEST = './docs';

// font
gulp.task('copy-fonts', () => { 
  return gulp.src(
    [
      'mdi/fonts/materialdesignicons-webfont.eot',
      'mdi/fonts/materialdesignicons-webfont.svg',
      'mdi/fonts/materialdesignicons-webfont.ttf',
      'mdi/fonts/materialdesignicons-webfont.woff',
      'mdi/fonts/materialdesignicons-webfont.woff2'
    ], {
    cwd: 'node_modules',
  })
    .pipe(gulp.dest(`${DEST}/fonts`))
  ;
});

gulp.task('font', gulp.series('copy-fonts'));

// css
gulp.task('copy-css-modules', () => { 
  return gulp.src(
    [
      'material-design-lite/material.min.css',
      'material-design-lite/material.min.css.map',
      'mdi/css/materialdesignicons.min.css',
      'mdi/css/materialdesignicons.min.css.map'
    ], {
    cwd: 'node_modules',
  })
    .pipe(gulp.dest(`${DEST}/css`))
  ;
});

gulp.task('sass', () => {
  const config = readConfig(`${CONFIG}/pleeease.json`);
  return gulp.src(`${SRC}/scss/style.scss`)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(pleeease(config))
    .pipe(gulp.dest(`${DEST}/css`))
  ;
});

gulp.task('css', gulp.parallel('sass', 'copy-css-modules'));


// js
gulp.task('copy-js-modules', () => { 
  return gulp.src(
    [
      'jquery/dist/jquery.min.js',
      'jquery/dist/jquery.min.map',
      'lodash/lodash.min.js',
      'material-design-lite/material.min.js',
      'material-design-lite/material.min.js.map'
    ], {
    cwd: 'node_modules',
  })
    .pipe(gulp.dest(`${DEST}/js/lib`))
  ;
});

gulp.task('browserify', () => {
  return browserify(`${SRC}/js/script.js`)
    .transform(babelify)
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest(`${DEST}/js`))
  ;
});

gulp.task('minify', () => {
  return gulp.src(`${DEST}/js/script.js`)
    .pipe(uglify({}))
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest(`${DEST}/js`))
  ;
});

gulp.task('deco', () => {
  return gulp.src(`${DEST}/js/script.js`)
    .pipe(decodecode({
      decoArr: ['b', 'u', 't', 'c', 'h', 'i'],
    }))
    .pipe(rename('script.deco.js'))
    .pipe(gulp.dest(`${DEST}/js`))
  ;
});

gulp.task('es6', gulp.series('browserify', gulp.parallel('minify', 'deco')));
gulp.task('js', gulp.parallel('copy-js-modules', 'es6'));

// html
gulp.task('pug', () => {
  const locals = {
    require: require,
    _: _,
    markdown: require('markdown-it')({
      html: true,
    }),
    settings: readConfig(`${CONFIG}/meta.yml`),
    bib: readConfig(`${CONFIG}/bib.yml`),
    interest: readConfig(`${CONFIG}/interest.yml`),
    works: readConfig(`${CONFIG}/works.json`).sheet,
    dataPageSymbol: readConfig(`${CONFIG}/symbol.yml`),
  };

  return gulp.src([`${SRC}/pug/**/[!_]*.pug`, `!${SRC}/pug/_**/*`])
    .pipe(postman({
      markdown: `${SRC}/config/_works/**/*.md`,
      template: `${SRC}/pug/_works/works.pug`,
      locals,
    }))
    // from [Pug(Jade)で効率的なマークアップ環境を作る ｜ Tips Note by TAM](http://www.tam-tam.co.jp/tipsnote/html_css/post10973.html)
    .pipe(data(function(file) {
      locals.pugPath = path.relative(file.base, file.path);
        return locals;
    }))
    .pipe(pug({
      pretty: true,
      basedir: `${SRC}/pug`,
    }))
    .pipe(gulp.dest(`${DEST}`))
  ;
});

gulp.task('rename-works', () => {
  return gulp.src(`${DEST}/_works/**/*`)
    .pipe(rename(function (path) {
      if (path.extname) {
        path.dirname = path.basename;
        path.basename = 'index';
      }
    }))
    .pipe(gulp.dest(`${DEST}/works`))
  ;
});

gulp.task('clean', (cb) => {
  rimraf(`${DEST}/_works`, cb)
});

gulp.task('html', gulp.series('pug', 'rename-works', 'clean'));

gulp.task('browser-sync' , () => {
  browserSync({
    server: {
      baseDir: DEST
    },
  });

  watch([`${SRC}/scss/**/*.scss`], gulp.series('sass', browserSync.reload));
  watch([`${SRC}/js/**/*.js`], gulp.series('browserify', browserSync.reload));
  watch([
      `${SRC}/pug/**/*.pug`,
      `${SRC}/config/*`
  ], gulp.series('html', browserSync.reload));
});


gulp.task('redirect', () => {
  const redirectLi = readConfig(`${CONFIG}/redirect.yml`);

  let redirectArr = redirectLi.list

  let ret;

  redirectArr.forEach((item) => {
    const locals = item;

    let filename = item.filename || 'index.html';

    ret = gulp.src(`${SRC}/pug/_redirect/index.pug`)
      .pipe(pug({
        locals: locals,
        pretty: true,
        basedir: `${SRC}/pug`,
      }))
      .pipe(rename(filename))
      .pipe(gulp.dest(`${DEST}${item.path}`))
    ;
  });

  return ret;
});


gulp.task('serve', gulp.series('browser-sync'));

gulp.task('build', gulp.parallel('font', 'css', 'js', 'redirect', 'html'));
gulp.task('build-partial', gulp.parallel('sass', 'es6', 'html'));
gulp.task('default', gulp.series('build-partial', 'serve'));
