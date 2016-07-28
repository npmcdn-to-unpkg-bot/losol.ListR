import {Component} from '@angular/core';
import {ListitemsService} from './services/listitems.service'

@Component({
    moduleId: module.id,
    selector: 'list-items',
    templateUrl: 'listitems.html',
    providers: [ListitemsService]
})
export class ListitemsComponent {
    constructor(private _listitemsService: ListitemsService) {
        this._listitemsService = _listitemsService;
    }

    getListitems() {
        this.error = "";
        this.listitems = [];
        this._listitemsService.getListitems(this.listId)
            .subscribe(
            data => this.listitems = data,
            error => this.error = "List id " + this.listId + " is invalid."
            );
    }
}