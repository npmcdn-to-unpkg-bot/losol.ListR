import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { ListitemService }        from './listitem.service';
import 'rxjs/Rx'; 

@Component({
    selector: 'listr',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/listitems']" routerLinkActive="active">Listitems</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ListitemService,
    ]
})
export class AppComponent {
    title = 'Listr';
}