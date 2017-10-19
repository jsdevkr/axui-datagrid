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
    dist: 'dist/',
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
    .pipe(gulp.dest(fnObj.paths.dist));
});

gulp.task('scss-ES', function () {
  return gulp.src([
      fnObj.paths.src + '/**/*.scss',
    ], {base: fnObj.paths.src})
    .pipe(gulp.dest(fnObj.paths.dist));
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

gulp.task('dev run!', shell.task([
  'webpack-dev-server --env=d',
]));

gulp.task('deploy to dev', shell.task([
  'webpack -p --env=p --progress --profile --colors',
]));