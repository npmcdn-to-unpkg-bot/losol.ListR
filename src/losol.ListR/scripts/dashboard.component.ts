import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';

import {Listitem} from './listitem';
import {ListitemService} from './listitem.service';
import {ListitemDetailComponent} from './listitem-detail.component';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    //styleUrls: ['app/dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

    listitems: Listitem[] = [];

    constructor(
        private router: Router,
        private listitemService: ListitemService) {
    }

    ngOnInit() {
        this.listitemService.getListitems()
            .then(listitems => this.listitems = listitems.slice(1, 5));
    }

    gotoDetail(listitem: Listitem) {
        let link = ['/detail', listitem.id];
        this.router.navigate(link);
    }
}
