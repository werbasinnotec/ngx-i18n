'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  const run = gulp.src([ 'components/**/*.sass', 'demo/**/*.sass' ])
    .pipe(sass({
      outputStyle: 'compressed',
      importOnce: { css: true }
    }))
    .pipe(gulp.dest('./components'));

  return run;
});
