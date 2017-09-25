'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('mocha', () => {
  return gulp.src('./lib/cli/**/*.spec.js', { read: false }).
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
