"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
require('rxjs/Rx');
// import {enableProdMode} from '@angular/core';
// Components
var navbar_1 = require('./navbar');
var listitems_component_1 = require('./listitems.component');
var app_routes_1 = require('./app.routes');
// enableProdMode();
platform_browser_dynamic_1.bootstrap(navbar_1.Navbar);
platform_browser_dynamic_1.bootstrap(listitems_component_1.ListitemsComponent, [app_routes_1.appRouterProviders, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=main.js.map