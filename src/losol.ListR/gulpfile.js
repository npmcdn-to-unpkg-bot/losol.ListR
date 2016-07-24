/// <binding AfterBuild='ts' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    ts = require('gulp-typescript'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename')
;

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    cssDest: webroot + "css/",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
    libSrc: "node_modules",
    libDest: webroot + "lib/",
    bootstrapSassSrc: "node_modules/bootstrap/scss/bootstrap.scss"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:lib", function (cb) {
    rimraf(paths.libDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

// Copy libs to wwwroot/lib folder
gulp.task("CopyLibs", () => {
    gulp.src([
            'core-js/client/shim.min.js',
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js', 
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'ng2-bootstrap/bundles/ng2-bootstrap*.js',
            'moment/min/*.js'
    ], {
        cwd: paths.libSrc + "/**"
    })
        .pipe(gulp.dest(paths.libDest));
});


// Compile typescript
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function (done) {
    var tsResult = gulp.src([
            "scripts/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
});

// Compile bootstrap
gulp.task('CompileBootstrap', function () {
    gulp.src(paths.bootstrapSassSrc)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.cssDest))
      .pipe(cssmin())
      .pipe(rename('bootstrap.min.css'))
      .pipe(gulp.dest(paths.cssDest));
});