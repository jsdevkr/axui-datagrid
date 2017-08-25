'use strict';

// 필요한 모듈선언
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const exec = require('gulp-exec');

// 전역 오브젝트 모음
const fnObj = {
  paths: {
    src: 'src/',
    dist_es: 'dist/',
  }
};

// 걸프 기본 타스크
gulp.task('default', ['js-ES', 'scss-ES'], function () {
  return true;
});

// task of ES
gulp.task('js-ES', function () {
  return gulp.src([fnObj.paths.src + '/**/*.js'])
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest(fnObj.paths.dist_es));
});

gulp.task('scss-ES', function () {
  return gulp.src([
      fnObj.paths.src + '/**/*.scss',
    ], {base: fnObj.paths.src})
    .pipe(gulp.dest(fnObj.paths.dist_es));
});

/**
 * npm publish
 */
gulp.task('npm publish patch', ['js-ES', 'scss-ES'], shell.task([
  'cd dist && npm version patch -m "version patch" && npm publish'
]));
gulp.task('npm publish minor', ['js-ES', 'scss-ES'], shell.task([
  'cd dist && npm version minor -m "version minor" && npm publish'
]));

gulp.task('jsdoc build', function () {
  let options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to gutil.template()
  };
  let reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  return gulp.src('./md.sh')
    .pipe(exec('./md.sh', options))
    .pipe(exec.reporter(reportOptions));
});

gulp.task('dev run!', shell.task([
  'webpack-dev-server --env=d',
]));

gulp.task('deploy to docs', shell.task([
  'webpack -p --env=p --progress --profile --colors',
]));