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

    getCountriesByRegion() {
        this.error = "";
        this.countries = [];
        this._listitemsService.getCountriesByRegion(this.region)
            .subscribe(
            data => this.countries = data,
            error => this.error = "Region " + this.region + " is invalid."
            );
    }
}