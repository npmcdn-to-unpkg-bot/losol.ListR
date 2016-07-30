import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx'; 
// import {enableProdMode} from '@angular/core';

// Components
//import {Navbar} from './navbar';
import { AppComponent} from './app.component';
import { appRouterProviders }   from './app.routes';

// enableProdMode();

//bootstrap(Navbar);
bootstrap(AppComponent, [appRouterProviders, HTTP_PROVIDERS]);
