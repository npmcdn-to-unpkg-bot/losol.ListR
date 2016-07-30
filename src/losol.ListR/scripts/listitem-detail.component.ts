import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Listitem }        from './listitem';
import { ListitemService } from './listitem.service';

@Component({
    selector: 'listitem-detail',
    templateUrl: 'app/listitem-detail.component.html'
})
export class ListitemDetailComponent implements OnInit, OnDestroy {
    @Input() listitem: Listitem;
    @Output() close = new EventEmitter();
    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(
        private listitemService: ListitemService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = params['id'];
                this.navigated = true;
                this.listitemService.getListitem(id)
                    .then(listitem => this.listitem = listitem);
            } else {
                this.navigated = false;
                this.listitem = new Listitem();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save() {
        this.listitemService
            .save(this.listitem)
            .then(listitem => {
                this.listitem = listitem; 
                this.goBack(listitem);
            })
            .catch(error => this.error = error); 
    }
    goBack(savedListitem: Listitem = null) {
        this.close.emit(savedListitem);
        if (this.navigated) { window.history.back(); }
    }
}