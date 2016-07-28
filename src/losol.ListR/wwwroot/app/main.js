"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
require('rxjs/Rx');
// import {enableProdMode} from '@angular/core';
// Components
var navbar_1 = require('./components/navbar');
var listitems_1 = require('./listitems');
// enableProdMode();
platform_browser_dynamic_1.bootstrap(navbar_1.Navbar);
platform_browser_dynamic_1.bootstrap(listitems_1.ListitemsComponent, [http_1.HTTP_PROVIDERS, forms_1.disableDeprecatedForms(), forms_1.provideForms()]);
