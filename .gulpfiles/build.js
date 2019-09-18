import gulp from 'gulp';
import sequence from 'gulp-sequence';

gulp.task('copy', () => {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dest'));
});

gulp.task('build', sequence(
  ['clean:dest', 'clean:tmp'],
  'copy',
  'clean:tmp'
));
