# ListR application

A Asp.net core web application for storing a grocery shopping list

## Prerequisities

### Install asp.net core and IDE
I am using Visual Studio 2015 Community edition. Download it from https://www.visualstudio.com/products/free-developer-offers-vs

### Check your npm version and update if needed

Updating npm could be done in several ways, but the best way seems to be opening a powershell window (remember to run as administrator). To run PowerShell as Administrator, click Start, search for PowerShell, right-click PowerShell and select Run as Administrator.

Then run these lines in the powershell window: 
```
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm install --global --production npm-windows-upgrade
npm-windows-upgrade
```

# Making this application

## Installing the asp.net core template
Make a new project in visual studio. Use the top right bar to search for "ASP.NET Core Web Application (.NET Core)". Remember to change User Authentication in the next window, and make sure to choose "Individual accounts" if you want user management.

## Add NPM
Right click on your project, choose "Add" --> "New item...". Search in the search bar top right for "npm Configuration File", and make a new file to the root with the suggested file name "package.json"

Use the package.json from angular.io
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