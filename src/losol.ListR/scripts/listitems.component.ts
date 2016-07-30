import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {Listitem} from './listitem';
import {ListitemService} from './listitem.service';
import {ListitemDetailComponent} from './listitem-detail.component';

@Component({
    selector: 'list-items',
    templateUrl: 'app/listitems.component.html',
    directives: [ListitemDetailComponent]
})

export class ListitemsComponent implements OnInit {
    listitems: Listitem[];
    selectedListitem: Listitem;
    addingListitem = false;
    error: any;

    constructor(
        // private router: Router,
        private listitemService: ListitemService) { }

    getListitems() {
        this.listitemService
            .getListitems()
            .then(listitems => this.listitems = listitems)
            .catch(error => this.error = error);
    }

    addListitem() {
        this.addingListitem = true;
        this.selectedListitem = null;
    }

    close(savedListitem: Listitem) {
        this.addingListitem = false;
        if (savedListitem) { this.getListitems(); }
    }

    deleteListitem(listitem: Listitem, event: any) {
        event.stopPropagation();
        this.listitemService
            .delete(listitem)
            .then(res => {
                this.listitems = this.listitems.filter(h => h !== listitem);
                if (this.selectedListitem === listitem) { this.selectedListitem = null; }
            })
            .catch(error => this.error = error);
    }

    ngOnInit() {
        this.getListitems();
    }

    onSelect(listitem: Listitem) {
        this.selectedListitem = listitem;
        this.addingListitem = false;
    }

   // gotoDetail() {
     //   this.router.navigate(['/detail', this.selectedListitem.id]);
    //}
}