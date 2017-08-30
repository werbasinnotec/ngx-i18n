'use strict';

const gulp = require('gulp');

gulp.task('copyfont', () => {
  const run = gulp.src(['./components/fonts/**/*.*'])
    .pipe(gulp.dest('./build/fonts'));

  return run;
});
