import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx'; 

@Injectable()
export class ListitemsService {
    
    getitems_url: String = "http://localhost:5000/api/ListItemsApi";

    constructor(private http: Http) {}

    getListitems(listId: String) {
        return this.http.get(this.getitems_url).map(res => res.json());
    }
}