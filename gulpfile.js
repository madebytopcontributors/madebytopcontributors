var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var cnfg = {
  fileId: '1c1u_bCL_s7Nt0joe7hRCDIr9UIci8HEPd0DMenpK1hds6AkQz4qNCfPa'
};

gulp.task('default', ['src'], function (cb) {
  exec('gapps push', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('app', ['get-from-server', 'clean-app'], function () {

  return gulp.src(['src/**/*'])
    .pipe(gulp.dest('app'));

});

gulp.task('clean-app', function () {
  del([
    'app/*'
  ]);
});

gulp.task('clean', function () {
  del([
    'src/*'
  ]);
});

gulp.task('del-config', function () {
  del([
    'gapps.config.json'
  ]);
});

gulp.task('src', ['clean'], function () {
  return gulp.src(['app/**/*'])
    .pipe(gulp.dest('src'));
});

gulp.task('cleanbup', function () {
  del([
    '.backups'
  ]);
});

gulp.task('get-from-server', ['clean', 'del-config'], function (cb) {
  exec(`gapps init ${cnfg.fileId}`, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
});

gulp.task('addmodules', function () {

});