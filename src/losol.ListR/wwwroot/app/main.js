"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
require('rxjs/Rx');
// import {enableProdMode} from '@angular/core';
// Components
//import {Navbar} from './navbar';
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
// enableProdMode();
//bootstrap(Navbar);
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [app_routes_1.appRouterProviders, http_1.HTTP_PROVIDERS]);
