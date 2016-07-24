# ListR application

A Asp.net core web application for storing a grocery shopping list

## Prerequisities

### Install asp.net core and IDE
I am using Visual Studio 2015 Community edition. Download it from https://www.visualstudio.com/products/free-developer-offers-vs
The visual studio code is another excellent choice. 

### Check your npm version and update if needed
Checking if you have the lastest version of npm as well  as upgrading could be done in several ways. The best way for now seems to a script from [Felix Rieseberg](https://github.com/felixrieseberg/npm-windows-upgrade) by opening a powershell window as administrator). To run PowerShell as Administrator, click Start, search for PowerShell, right-click PowerShell and select Run as Administrator.

Then run these lines in the powershell window: 
```
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm install --global --production npm-windows-upgrade
npm-windows-upgrade
```

## Add a new project from template
Make a new project in visual studio. Use the top right bar to search for "ASP.NET Core Web Application (.NET Core)". Remember to change User Authentication in the next window, and make sure to choose "Individual accounts" if you want user management.

## Add NPM and packages
Right click on your project, choose "Add" --> "New item...". Search in the search bar top right for "npm Configuration File", and make a new file to the root with the suggested file name "package.json"

Use the package.json from [angular.io - quickstart](https://angular.io/docs/ts/latest/quickstart.html#!#create-and-configure), just edit your project name
```
{
  "name": "losol-listr",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" ",
    "lite": "lite-server",
    "postinstall": "typings install",
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "typings": "typings"
  },
  "license": "ISC",
  "dependencies": {
    "@angular/common": "2.0.0-rc.4",
    "@angular/compiler": "2.0.0-rc.4",
    "@angular/core": "2.0.0-rc.4",
    "@angular/forms": "0.2.0",
    "@angular/http": "2.0.0-rc.4",
    "@angular/platform-browser": "2.0.0-rc.4",
    "@angular/platform-browser-dynamic": "2.0.0-rc.4",
    "@angular/router": "3.0.0-beta.1",
    "@angular/router-deprecated": "2.0.0-rc.2",
    "@angular/upgrade": "2.0.0-rc.4",
    "systemjs": "0.19.27",
    "core-js": "^2.4.0",
    "reflect-metadata": "^0.1.3",
    "rxjs": "5.0.0-beta.6",
    "zone.js": "^0.6.12",
    "angular2-in-memory-web-api": "0.0.14",
    "bootstrap": "^3.3.6"
  },
  "devDependencies": {
    "concurrently": "^2.0.0",
    "lite-server": "^2.2.0",
    "typescript": "^1.8.10",
    "typings":"^1.0.4"
  }
}
```
## Prepare for angular 2 and typescript
### Add the SystemJS configuration file, tsconfig.js
tsconfig.json is the TypeScript compiler configuration file. Right click on your project and choose add new item. Search for "TypeScript JSON Configuration File" and choose the suggested filename tsconfig.js

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  }
}
```


### Add typings / TypeScript definition files
typings.json identifies TypeScript definition files. Add the file typings.json to the root folder (Add --> new item --> json file).

```json
{
  "globalDependencies": {
    "core-js": "registry:dt/core-js#0.0.0+20160602141332",
    "jasmine": "registry:dt/jasmine#2.2.0+20160621224255",
    "node": "registry:dt/node#6.0.0+20160621231320"
  }
}
```
### Add systemjs.config.js, the SystemJS configuration file.
systemjs.config.js is the SystemJS configuration file. Add it to the wwwroot folder. 

```
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
```

### Add a scripts folder
We need a scripts folder to write our uncompiled scripts. Add it to the root of your project.

### Add a gulpfile
In the menu: Add --> New Item --> Gulp Configuration File. Use the suggested name _gulpfile.js_

```
/// <binding AfterBuild='ts' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    ts = require('gulp-typescript'),
    gulp = require('gulp'),
    clean = require('gulp-clean');

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
    lib: webroot + "lib/"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
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

//Copys scripts to wwwroot/lib folder
// Thanks MITHUN PATTANKAR for idea for the two tasks below http://www.mithunvp.com/angular-2-in-asp-net-5-typescript-visual-studio-2015/
gulp.task("CopyScripts", () => {
    gulp.src([
            'core-js/client/shim.min.js',
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/jquery.*js',
            'bootstrap/dist/js/bootstrap*.js'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/lib"));
});


// Compile typescript
var tsProject = ts.createProject('scripts/tsconfig.json');
gulp.task('ts', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
            "scripts/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
});
```

## Set user secrets
Install SecretManager tool by running this command in app folder: dnu commands install Microsoft.Extensions.SecretManager
Run commands to store AppId and AppSecret:
* user-secret set Authentication:Facebook:AppId 123123   
* user-secret set Authentication:Facebook:AppSecret 456456
* user-secret set Authentication:Google:ClientId 123123.apps.googleusercontent.com
* user-secret set Authentication:Google:ClientSecret 4gwb4b242546


## Make self signed certificate
The makecert tool is available from windows SDK. https://www.microsoft.com/en-us/download/details.aspx?id=8279


## After updating project.json
dnu restore

## After model changes
dotnet ef database update


## Going live on Azure
For some reason I had trouble configuring the connectionstring to the azure sql database. However after adding the connectionstring both as DefaultConnection as well as Data:DefaultConnection:ConnectionString I managed to get the application to talk with the database.

Also I couldnt figure out how to run migrations on the azure sql server, but i used the production ConnectionString on my local IIS (after whitelisting my ip in the SQL server firewall), and then the migrations ran just fine. 

## Trouble? 
* Disable Custom errors: http://docs.asp.net/en/latest/fundamentals/diagnostics.html#http-500-errors-on-azure
* Enable remote debugging in Azure from Visual Studio: Trouble? Enable remote debugging https://azure.microsoft.com/en-us/documentation/articles/web-sites-dotnet-troubleshoot-visual-studio/