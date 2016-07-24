# ListR application

A Asp.net core web application for handling a grocery shopping list

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

## Make a new project from template
Make a new project in visual studio. Use the top right bar to search for "ASP.NET Core Web Application (.NET Core)". Remember to change User Authentication in the next window, and make sure to choose "Individual accounts" if you want user management.

## Adding Angular 2
### Add packages with npm | package.json
Right click on your project, choose "Add" --> "New item...". Search in the search bar top right for "npm Configuration File", and make a new file to the root with the suggested file name "package.json"

Use the package.json from [angular.io - quickstart](https://angular.io/docs/ts/latest/quickstart.html#!#create-and-configure), just edit your project name
```json
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
    "bootstrap": "4.0.0-alpha.2"
  },
  "devDependencies": {
    "concurrently": "^2.0.0",
    "lite-server": "^2.2.0",
    "typescript": "^1.8.10",
    "typings": "^1.0.4",
    "gulp": "^3.9.1",
    "gulp-concat": "^2.6.0",
    "gulp-cssmin": "0.1.7",
    "gulp-uglify": "1.2.0",
    "rimraf": "2.2.8",
    "path": "^0.12.7",
    "gulp-clean": "^0.3.2",
    "fs": "^0.0.2",
    "gulp-typescript": "^2.13.1"
	  }
}
```

### Add the TypeScript compiler configuration file | tsconfig.js
tsconfig.json is the TypeScript compiler configuration file. Right click on your project and choose add new item. Search for "TypeScript JSON Configuration File" and choose the suggested filename tsconfig.js

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false,
    "outDir": "../wwwroot/app/"
  },
  "exclude": [
    "node_modules",
    "wwwroot"
  ]
}

```

### Add typings / TypeScript definition files | typings.json
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
### Add the SystemJS configuration file | systemjs.config.js
systemjs.config.js is the SystemJS configuration file. Add it to the wwwroot folder. 

```
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'lib/@angular',
        'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
        'rxjs': 'lib/rxjs'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
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
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
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


### Add gulpfile.js and gulp
In the menu: Add --> New Item --> Gulp Configuration File. Use the suggested name _gulpfile.js_
After adding the file open package manager console (View --> Other windows --> Package manager console) and run
    npm install gulp



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
    libSrc: "node_modules",
    libDest: webroot + "lib/"
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
            'jquery/dist/jquery.*js',
            'bootstrap/dist/js/bootstrap*.js'
    ], {
        cwd: paths.libSrc + "/**"
    })
        .pipe(gulp.dest(paths.libDest));
});


// Compile typescript
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
            "scripts/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
});
```
### Run the CopyScripts to copy libs
Open the Task Runner Explorer again, and right click on CopyScripts, and choose Run.

### The Angular 2 Hello World test 
Sample modified from the one provided by [angular.io](https://angular.io)

scripts/app.component.ts
```
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<h1>`Hello World</h1>'
})
export class AppComponent { }
```

scripts/main.ts
```
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
bootstrap(AppComponent);
```

Views/Home/Index.cshtml
```
@{
    ViewData["Title"] = "Home Page";
}

<my-app>Loading...</my-app>
```

Views/Shared/_Layout.cshtml
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - losol.ListR</title>

    <!-- 1. Load libraries -->
    <!-- Polyfill(s) for older browsers -->
    <script src="lib/core-js/client/shim.min.js"></script>
    <script src="lib/zone.js/dist/zone.js"></script>
    <script src="lib/reflect-metadata/Reflect.js"></script>
    <script src="lib/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>

    <environment names="Development">
        <link rel="stylesheet" href="~/css/bootstrap.css" />
        <link rel="stylesheet" href="~/css/site.css" />
    </environment>
    <environment names="Staging,Production">
        <link rel="stylesheet" href="~/css/bootstrap.min.css" asp-append-version="true" />
        <link rel="stylesheet" href="~/css/site.min.css" asp-append-version="true" />
    </environment>

</head>
<body>
    @await Html.PartialAsync("_NavigationBar")
    <div class="container body-content">
        @RenderBody()
        @await Html.PartialAsync("_Footer")
    </div>

    <environment names="Development">
        <script src="~/js/site.js" asp-append-version="true"></script>
    </environment>
    <environment names="Staging,Production">
        <script src="~/js/site.min.js" asp-append-version="true"></script>
    </environment>

    @RenderSection("scripts", required: false)
</body>
</html>

```

## Adding Bootstrap 4
### Installing packages with npm
In package.json 
* Add to dependencies: "bootstrap": "4.0.0-alpha.2"
* Add to devDependencies: "gulp-sass": "^2.3.2"

### Adding task to gulpfile.js
````json
// Compile bootstrap
gulp.task('CompileBootstrap', function () {
    return gulp.src(paths.bootstrapSassSrc)
      .pipe(sass())
      .pipe(gulp.dest(paths.css))
});
```

### Installing ng2-Bootstrap
Since we are not using jquery we need an angular package for the bootstrap directives. 
* Add to package.json:  "ng2-bootstrap": "^1.0.24"

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