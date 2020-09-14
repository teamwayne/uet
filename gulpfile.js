/*
  Update the config object if needed, especially the fileName.
*/
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var template = require('gulp-template');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var args = require('yargs').argv;
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var fs = require('fs');
var wrap = require('gulp-wrap');
var prettify = require('gulp-js-prettify');

var validEnvironments = ['src', 'dev', 'qa', 'prod'];
var validOutputs = ['iagUet'];
var config;
var config = {
  date: new Date().toISOString(),
  pkg: JSON.parse(fs.readFileSync('package.json'))
};

gulp.task('js', (done) => {
  validOutputs.forEach(function(output) {
    validEnvironments.forEach((environment) => {
      config = { name: output, env: environment, pkg: JSON.parse(fs.readFileSync('package.json')), date: new Date().toISOString()};
      gulp.src(['./src/utils.js', './src/uetLoader.js', './src/uetEventsController.js'])
        .pipe(concat(output + '.js'))
        .pipe(template(config))
        .pipe(wrap({ src: './wrapper.js' }, config))
        .pipe(gulp.dest('./dist/' + environment + '/'));
    });
    done();
  });
});

var pretty = {
  'end_with_newline': false,
  'eol': '\n',
  'indent_level': 0,
  'indent_char': ' ',
  'indent_size': 2,
  'indent_with_tabs': false,
  'max_preserve_newlines': 2,
  'preserve_newlines': true,
  'wrap_line_length': 0,
  'brace_style': 'inline'
};

// Using js-beautify https://github.com/beautify-web/js-beautify
gulp.task('prettify', (done) => {
  validOutputs.forEach((output) => {
    ['dev'].forEach((environment) => {
      gulp.src('./dist/dev/' + output + '.js')
        .pipe(prettify(pretty))
        .pipe(gulp.dest('./dist/dev'))
    });
    done();
  });
});

gulp.task('lint', (done) => {
  gulp.src(['./dist/dev/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
});

gulp.task('minify', (done) => {
  validOutputs.forEach((output) => {
    ['prod', 'qa'].forEach((environment) => {
      gulp.src('./dist/' + environment + '/**/*.js')
        .pipe(uglify({ output: { comments: 'some' }, compress: {hoist_props: false} }))
        .pipe(gulp.dest('./dist/' + environment))
    });
    done();
  });
});
gulp.task('watch', function() {
  connect.server({ port: 8080 });
  gulp.watch(['./src/**/*'], ['build']);
});

gulp.task('build', gulp.series('js', 'prettify', 'lint', 'minify'));

gulp.task('default',gulp.series('watch'));
