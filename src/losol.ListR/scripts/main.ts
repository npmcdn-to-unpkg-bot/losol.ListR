import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
// import {enableProdMode} from '@angular/core';

// Components
import {Navbar} from './components/navbar';
import {AppComponent} from './app.component';
import {FriendComponent} from './friend.component';

// enableProdMode();

bootstrap(Navbar);
bootstrap(AppComponent, [disableDeprecatedForms(), provideForms()]);
bootstrap(FriendComponent, [disableDeprecatedForms(), provideForms()]);
