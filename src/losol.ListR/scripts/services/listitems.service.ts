import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx'; 
// should probably get to here: import { Observable }     from 'rxjs/Observable';  // https://angular.io/docs/ts/latest/guide/server-communication.html

@Injectable()
export class ListitemsService {

    endpoint_url: String = "https://restcountries.eu/rest/v1/region/";
    getitems_url: String = "http://localhost:5000/api/ListItemsApi";

    constructor(private http: Http) {}

    getCountriesByRegion(region: String) {
        return this.http.get(this.endpoint_url + region).map(res => res.json());
    }

    getListitems(listId: String) {
        return this.http.get(this.getitems_url).map(res => res.json());
    }
}