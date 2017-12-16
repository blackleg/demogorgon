/*
 * The MIT License
 *
 * Copyright 2017 hector.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var sassdoc = require('sassdoc');
var del = require('del');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');

var srcPath = 'src/**/*.scss';
var testPath = 'test/**/*.scss';
var distPath = 'dist/';

gulp.task('lint', function () {
  return gulp.src([srcPath, testPath])
          .pipe(sassLint())
          .pipe(sassLint.format())
          .pipe(sassLint.failOnError());
});

gulp.task('mocha', function () {
  return gulp.src('test/test.js').pipe(mocha());
});

gulp.task('test', function (callback) {
  runSequence('lint', 'mocha', callback);
});

gulp.task('doc:style', function () {
  return gulp.src('docs/styles/demogorgon_doc.scss')
          .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [distPath]})
                  .on('error', sass.logError))
          .pipe(gulp.dest('docs/styles'));
});

gulp.task('doc:sassdoc', function () {
  var options = {
    dest: 'docs/sassdoc'
  };
  return gulp.src(srcPath)
          .pipe(sassdoc(options));
});

gulp.task('doc', function (callback) {
  runSequence('doc:style', 'doc:sassdoc', callback);
});

gulp.task('copy', function () {
  return gulp.src(srcPath)
          .pipe(gulp.dest(distPath));
});

gulp.task('clean', function () {
  return del([
    distPath
  ]);
});

gulp.task('build', function (callback) {
  runSequence('clean', 'test', 'copy', callback);
});

gulp.task('dist', function (callback) {
  runSequence('build', 'doc', callback);
});

gulp.task('default', ['clean']);

