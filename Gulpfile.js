'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const copy = require('gulp-copy');

function taskCopy() {
  return (gulp.src([ 'src/module/**/*.*' ])
    .pipe(copy('src/transModule', { prefix: 2 }))
    .pipe(gulp.dest('src/transModule')));
};

function taskCopyOriginal () {
  return (gulp.src([ 'src/transModule/**/*.*' ])
    .pipe(copy('dist/original', { prefix: 2 }))
    .pipe(gulp.dest('dist/original')));
};

function taskCopyBin () {
  return (gulp.src([ 'bin/**/*.*' ])
    .pipe(copy('dist'))
    .pipe(gulp.dest('dist')));
};

function taskMocha (cb) {
  return (gulp.src('./src/module/**/*.spec.js', { read: false }).
	pipe(mocha({ timeout: 105000 })).
	once('error', function (err) {
  /* eslint-disable no-console */
  console.log(err.stack);
  /* eslint-enable no-console*/
  process.exit(1);
	}).
	once('end', function () {
  cb();
  process.exit();
	}));
};

exports.copy = gulp.series(taskCopy);
exports.copyOriginal = gulp.series(taskCopyOriginal);
exports.copyBin = gulp.series(taskCopyBin);
exports.mocha = gulp.series(taskMocha);
