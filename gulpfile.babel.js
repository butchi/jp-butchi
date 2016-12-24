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
import debowerify from 'debowerify';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
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
gulp.task('copy-bower-fonts', () => { 
  return gulp.src(
    [
      'mdi/fonts/materialdesignicons-webfont.eot',
      'mdi/fonts/materialdesignicons-webfont.svg',
      'mdi/fonts/materialdesignicons-webfont.ttf',
      'mdi/fonts/materialdesignicons-webfont.woff',
      'mdi/fonts/materialdesignicons-webfont.woff2'
    ], {
    cwd: 'bower_components',
  })
    .pipe(gulp.dest(`${DEST}/fonts`))
  ;
});

gulp.task('font', gulp.series('copy-bower-fonts'));

// css
gulp.task('copy-bower-css', () => { 
  return gulp.src(
    [
      'material-design-lite/material.min.css',
      'material-design-lite/material.min.css.map',
      'mdi/css/materialdesignicons.min.css',
      'mdi/css/materialdesignicons.min.css.map'
    ], {
    cwd: 'bower_components',
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

gulp.task('css', gulp.parallel('sass', 'copy-bower-css'));


// js
gulp.task('copy-bower-js', () => { 
  return gulp.src(
    [
      'jquery/dist/jquery.min.js',
      'jquery/dist/jquery.min.map',
      'lodash/dist/lodash.min.js',
      'material-design-lite/material.min.js',
      'material-design-lite/material.min.js.map'
    ], {
    cwd: 'bower_components',
  })
    .pipe(gulp.dest(`${DEST}/js/lib`))
  ;
});

gulp.task('browserify', () => {
  return browserify(`${SRC}/js/script.js`)
    .transform(babelify)
    .transform(debowerify)
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

// gulp.task 'js', gulp.parallel('browserify', 'copy-bower-js')
gulp.task('js', gulp.parallel('copy-bower-js', gulp.series('browserify', gulp.parallel('minify', 'deco'))));

gulp.task('works', () => {
  const worksLi = readConfig(`${CONFIG}/works.yml`);

  let ret;

  _.map(worksLi, (item, name) => {
    item.name = name;
  });

  let tagArr = _.union(...(_.map(worksLi, 'tag')));

  tagArr.forEach((tag) => {
    const locals = {};

    let destination;
    if(tag === 'works') {
      destination = `${DEST}/works`;
    } else {
      destination = `${DEST}/works/tag/${tag}`;
    }

    let filteredArr = _.filter(worksLi, (item, name) => {
      return item.tag.includes(tag);
    });

    locals.tagName = tag;
    locals.workArr = filteredArr;

    ret = gulp.src([`${SRC}/pug/_works-tag/index.pug`])
      .pipe(pug({
        locals: locals,
        pretty: true,
        basedir: `${SRC}/pug`,
      }))
      .pipe(gulp.dest(destination))
    ;
  });

  // TODO: /tags/

  Object.keys(worksLi).forEach((name) => {
    let locals = worksLi[name];

    ret = gulp.src([`${SRC}/pug/_works-item/index.pug`])
      .pipe(pug({
        locals: locals,
        pretty: true,
      }))
      .pipe(gulp.dest(`${DEST}/works/${name}`))
    ;
  });

  return ret;
});


// html
gulp.task('pug', () => {
  var locals = readConfig(`${CONFIG}/meta.yml`);

  locals.bib = readConfig(`${CONFIG}/bib.yml`);
  locals.interest = readConfig(`${CONFIG}/interest.yml`);
  locals.works = readConfig(`${CONFIG}/works.yml`);

  return gulp.src([`${SRC}/pug/**/[!_]*.pug`, `!${SRC}/pug/_**/*`])
    .pipe(pug({
      locals: locals,
      pretty: true,
      basedir: `${SRC}/pug`,
    }))
    .pipe(gulp.dest(`${DEST}`))
  ;
});

gulp.task('html', gulp.series('pug'));

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
      `${SRC}/config/meta.yml`
  ], gulp.series('pug', browserSync.reload));
});

gulp.task('serve', gulp.series('browser-sync'));

gulp.task('build', gulp.parallel('font', 'css', 'js', 'html'));
gulp.task('default', gulp.series('build', 'serve'));
