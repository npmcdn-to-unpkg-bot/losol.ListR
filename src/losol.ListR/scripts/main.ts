import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx'; 
// import {enableProdMode} from '@angular/core';

// Components
import {Navbar} from './components/navbar';
import {ListitemsComponent} from './listitems';
// enableProdMode();

bootstrap(Navbar);
bootstrap(ListitemsComponent, [HTTP_PROVIDERS, disableDeprecatedForms(), provideForms()]);
