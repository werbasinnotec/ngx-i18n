'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const fs = require('fs');
const copy = require('gulp-copy');
const shell = require('gulp-shell');
const inline = require('gulp-ng-pug-to-inline');

gulp.task('copy', function() {
  gulp.src([ 'src/module/**/*.*' ])
    .pipe(copy('src/transModule', { prefix: 2 }))
    .pipe(gulp.dest('src/transModule'));
});

gulp.task('copy-original', function () {
  gulp.src([ 'src/transModule/**/*.*' ])
    .pipe(copy('dist/original', { prefix: 2 }))
    .pipe(gulp.dest('dist/original'));
});

gulp.task('copy-bin', function () {
  gulp.src([ 'bin/**/*.*' ])
    .pipe(copy('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('mocha', () => {
  return gulp.src('./src/module/**/*.spec.js', { read: false }).
	pipe(mocha({ timeout: 105000 })).
	once('error', function (err) {
  /* eslint-disable no-console */
  console.log(err.stack);
  /* eslint-enable no-console*/
  process.exit(1);
	}).
	once('end', function () {
  process.exit();
	});
});


gulp.task('default', shell.task([
  'gulp copy'
]));
