'use strict';
const gulp = require('gulp');
const spawn = require('child_process').spawn;
const del = require('del');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const prettier = require('gulp-prettier');

/**
 * Cleans build
 */
gulp.task('clean', function() {
  return del('build');
});

/**
 * Runs clasp
 */
gulp.task('clasp', function(cb) {
  cb = cb || console.log;
  const cmd = spawn('./node_modules/.bin/clasp', ['push'], {
    stdio: 'inherit'
  });
  cmd.on('close', function(code) {
    console.log('clasp exited with code ' + code);
    cb(code);
  });
});

/**
 * Specs
 */
gulp.task('iso_9', function iso9() {
  return gulp
    .src('./node_modules/iso_9/translit.js')
    .pipe(replace('module.exports = translit;', ''))
    .pipe(prettier())
    .pipe(rename('81. FORMULAS TRANSLIT.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('specs', gulp.series('iso_9'));

gulp.task('devPrep', function devPrep() {
  return gulp.src('./settings/dev/.clasp.json').pipe(gulp.dest('./'));
});

gulp.task('devassets', function devPrep() {
  return gulp
    .src('./settings/dev/assets/**/*.{js,gs,json,html}')
    .pipe(gulp.dest('build/__dev__assets__'));
});

gulp.task('prodassets', function devPrep() {
  return gulp
    .src('./settings/prod/assets/**/*.{js,gs,json,html}')
    .pipe(gulp.dest('build/__assets__'));
});

gulp.task('buildPrep', function buildPrep() {
  return gulp.src('./settings/prod/.clasp.json').pipe(gulp.dest('./'));
});

gulp.task('preBuild', function devPrep() {
  return gulp.src('./src/**/*.{js,gs,json,html}').pipe(gulp.dest('./build'));
});

/**
 * Dev
 */
gulp.task(
  'dev',
  gulp.series('clean', 'specs', 'devPrep', 'preBuild', 'devassets', 'clasp')
);

/**
 * Build
 */
gulp.task(
  'build',
  gulp.series('clean', 'specs', 'buildPrep', 'preBuild', 'prodassets', 'clasp')
);

/**
 * Watcher
 */
gulp.task(
  'watch',
  gulp.series('dev', function watch() {
    gulp.watch(['./src/**/*.{js,gs,json,html}'], gulp.series('dev'));
  })
);

/**
 * Watcher
 */
gulp.task(
  'watch-prod',
  gulp.series('build', function watch() {
    gulp.watch(['./src/**/*.{js,gs,json,html}'], gulp.series('build'));
  })
);
