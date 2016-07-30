"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./dashboard.component');
var listitems_component_1 = require('./listitems.component');
var listitem_detail_component_1 = require('./listitem-detail.component');
var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'detail/:id',
        component: listitem_detail_component_1.ListitemDetailComponent
    },
    {
        path: 'listitems',
        component: listitems_component_1.ListitemsComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map