'use strict';

// 필요한 모듈선언
const gulp = require('gulp');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function errorAlert(error) {
  notify.onError({
    title: 'Gulp Error',
    message: 'Check your terminal',
    sound: 'Purr',
  })(error); //Error Notification
  console.log(error.toString()); //Prints Error to Console
  this.emit('end'); //End function
}

// 전역 오브젝트 모음
const fnObj = {
  paths: {
    src: 'src/',
    dist: 'dist/',
  },
};

/**
 * watch
 */
gulp.task('scss-watch', function () {
  gulp.watch(['./dev/scss/**/*.scss'], ['scss-dev']);
  gulp.watch(['./src/scss/**/*.scss'], ['scss-src']);
});

/**
 * SASS
 */
gulp.task('scss-dev', function () {
  gulp
    .src('./dev/scss/index.scss')
    .pipe(plumber({ errorHandler: errorAlert }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./dev/scss'));
});

gulp.task('scss-src', function () {
  gulp
    .src('./src/scss/index.scss')
    .pipe(plumber({ errorHandler: errorAlert }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./src/scss'));
});

gulp.task('dist-redame', function () {
  return gulp
    .src(['./README.md'])
    .pipe(gulp.dest(fnObj.paths.dist));
});

// 걸프 기본 타스크
gulp.task('default', ['dev-run'], function () {
  return true;
});

gulp.task('dist-scss', ['scss-src'], function () {
  return gulp
    .src([fnObj.paths.src + '/**/*.scss', fnObj.paths.src + '/**/*.css'], {
      base: fnObj.paths.src,
    })
    .pipe(gulp.dest(fnObj.paths.dist));
});

// task for ES5
gulp.task('dist', ['dist-scss', 'dist-redame'], function () {
  return gulp
    .src([fnObj.paths.src + '/**/*.ts', fnObj.paths.src + '/**/*.tsx', '!' + fnObj.paths.src + '/__tests__/**'])
    .pipe(tsProject())
    .pipe(gulp.dest(fnObj.paths.dist));
});

/**
 * npm publish
 */
gulp.task(
  'npm publish patch',
  ['dist'],
  shell.task([
    'cd dist && npm version patch -m "version patch" && npm publish',
  ]),
);

gulp.task(
  'npm publish minor',
  ['dist'],
  shell.task([
    'cd dist && npm version minor -m "version minor" && npm publish',
  ]),
);

gulp.task(
  'dev-run',
  ['scss-watch'],
  shell.task(['webpack-dev-server --hotOnly']),
);

gulp.task(
  'deploy-docs',
  shell.task([
    'webpack -p --env=production --progress --profile --colors && sleep 1 && git add -A',
  ]),
);
