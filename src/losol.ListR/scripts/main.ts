import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx'; 
// import {enableProdMode} from '@angular/core';

// Components
import {Navbar} from './components/navbar';
import {AppComponent} from './app.component';
import {FriendComponent} from './friend.component';
import {ListitemsComponent} from './listitems';
// enableProdMode();

bootstrap(Navbar);
bootstrap(AppComponent, [disableDeprecatedForms(), provideForms()]);
bootstrap(FriendComponent, [disableDeprecatedForms(), provideForms()]);
bootstrap(ListitemsComponent, [HTTP_PROVIDERS]);
