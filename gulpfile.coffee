'use strict'

gulp = require 'gulp'
nodemon = require 'gulp-nodemon'
source = require 'vinyl-source-stream'
sass = require 'gulp-sass'
pleeease = require 'gulp-pleeease'
browserify = require 'browserify'
babelify = require 'babelify'
debowerify = require 'debowerify'
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'
decodecode = require 'gulp-decodecode'
browserSync = require 'browser-sync'

SRC = './src'
DEST = './public'

gulp.task 'sass', () ->
  gulp.src "#{SRC}/sass/style.sass"
    .pipe do sass
    .pipe pleeease {
      autoprefixer: {
        browsers: [
          "ie >= 10",
          "ie_mob >= 10",
          "ff >= 30",
          "chrome >= 34",
          "safari >= 7",
          "opera >= 23",
          "ios >= 7",
          "android >= 4.4",
          "bb >= 10"
        ]
      },
      "minifier": false
    }
    .pipe gulp.dest "#{DEST}/css"

gulp.task 'css', gulp.series('sass')

gulp.task 'browserify', () ->
  return browserify("#{SRC}/js/main.js")
    .transform(babelify)
    .transform(debowerify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest("#{DEST}/js"))

gulp.task 'minify', () ->
  gulp.src("#{DEST}/js/main.js")
    .pipe (uglify {})
    .pipe (rename 'main.min.js')
    .pipe (gulp.dest "#{DEST}/js")

gulp.task 'deco', () ->
  gulp.src("#{DEST}/js/main.js")
    .pipe (decodecode
      decoArr: ['b', 'u', 't', 'c', 'h', 'i', 'j', 'p'],
    )
    .pipe (rename 'main.deco.js')
    .pipe (gulp.dest "#{DEST}/js")

gulp.task 'js', gulp.parallel('browserify')
# gulp.task 'js', gulp.series('browserify', gulp.parallel('minify', 'deco'))

gulp.task 'nodemon', () ->
  nodemon
    script: 'app.js',
    watch: "#{SRC}"
    ext: 'sass, js',
    tasks: ['build']
  # .on 'restart', ['js', 'css']

gulp.task 'watch', () ->
  gulp.watch(["#{SRC}/sass/**/*.sass"], gulp.series('css', ));
  gulp.watch(["#{SRC}/js/**/*.js"], gulp.series('js', browserSync.reload));

gulp.task 'serve', gulp.series('nodemon')

gulp.task 'build', gulp.parallel('css', 'js')
gulp.task 'default', gulp.series('build', 'serve')
