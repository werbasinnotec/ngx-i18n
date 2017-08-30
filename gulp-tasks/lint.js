'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src([ './lib/cli/**/*.js' ]).
  pipe(eslint({
    parserOptions: {
      ecmaVersion: 8
    }
  })).
  pipe(eslint.format()).
  pipe(eslint.failAfterError());
});
