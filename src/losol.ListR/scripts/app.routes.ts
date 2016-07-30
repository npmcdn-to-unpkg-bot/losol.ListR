import { provideRouter, RouterConfig }  from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListitemsComponent } from './listitems.component';
import { ListitemDetailComponent } from './listitem-detail.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'detail/:id',
        component: ListitemDetailComponent
    },
    {
        path: 'listitems',
        component: ListitemsComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];
