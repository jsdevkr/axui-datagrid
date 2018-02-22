'use strict';

// 필요한 모듈선언
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const shell = require( 'gulp-shell' );
const plumber = require( 'gulp-plumber' );
const notify = require( "gulp-notify" );

const ts = require( "gulp-typescript" );
const tsProject = ts.createProject('tsconfig.json');

function errorAlert( error ) {
  notify.onError( { title: "Gulp Error", message: "Check your terminal", sound: "Purr" } )( error ); //Error Notification
  console.log( error.toString() );//Prints Error to Console
  this.emit( "end" ); //End function
}

// 전역 오브젝트 모음
const fnObj = {
  paths: {
    src: 'src/',
    dist: 'dist/',
  }
};


/**
 * watch
 */
gulp.task( 'scss-watch', function () {
  gulp.watch( [ './dev/scss/**/*.scss' ], [ 'scss-dev' ] );
  gulp.watch( [ './src/scss/**/*.scss' ], [ 'scss-src' ] );
} );

/**
 * SASS
 */
gulp.task( 'scss-dev', function () {
  gulp.src( './dev/scss/index.scss' )
    .pipe( plumber( { errorHandler: errorAlert } ) )
    .pipe( sass( { outputStyle: 'compressed' } ) )
    .pipe( gulp.dest( './dev/scss' ) );
} );

gulp.task( 'scss-src', function () {
  gulp.src( './src/scss/index.scss' )
    .pipe( plumber( { errorHandler: errorAlert } ) )
    .pipe( sass( { outputStyle: 'compressed' } ) )
    .pipe( gulp.dest( './src/scss' ) );
} );


// 걸프 기본 타스크
gulp.task( 'default', [ 'scss-watch' ], function () {
  return true;
} );

gulp.task( 'dist-scss', [ 'scss-src' ], function () {
  return gulp.src( [
      fnObj.paths.src + '/**/*.scss',
      fnObj.paths.src + '/**/*.css',
    ], { base: fnObj.paths.src } )
    .pipe( gulp.dest( fnObj.paths.dist + '/ts' ) )
    .pipe( gulp.dest( fnObj.paths.dist + '/es' ) );
} );

// task for ES5
gulp.task( 'dist-ES', [ 'dist-scss' ], function () {
  return gulp.src( [ fnObj.paths.src + '/**/*.ts', fnObj.paths.src + '/**/*.tsx' ] )
    .pipe( tsProject() )
    .pipe( gulp.dest( fnObj.paths.dist + '/es' ) );
} );

gulp.task( 'dist-TS', [ 'dist-scss' ], function () {
  return gulp.src( [ fnObj.paths.src + '/**/*.ts', fnObj.paths.src + '/**/*.tsx' ] )
    .pipe( gulp.dest( fnObj.paths.dist + '/ts' ) );
} );

/**
 * npm publish
 */
gulp.task( 'ES npm publish patch', [ 'dist-ES' ], shell.task( [
  'cd dist/es && npm version patch -m "version patch" && npm publish'
] ) );

gulp.task( 'TS npm publish patch', [ 'dist-TS' ], shell.task( [
  'cd dist/ts && npm version patch -m "version patch" && npm publish'
] ) );

gulp.task( 'dev run!', [ 'scss-watch' ], shell.task( [
  'webpack-dev-server --hotOnly'
] ) );

gulp.task( 'deploy to docs', shell.task( [
  'webpack -p --env=production --progress --profile --colors && git add -A'
] ) );