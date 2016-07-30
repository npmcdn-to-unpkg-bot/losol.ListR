import { Injectable }     from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Listitem } from './listitem';

@Injectable()
export class ListitemService {
    
    private ListitemsApiUrl = "https://localhost:5001/api/ListItemsApi";

    constructor(private http: Http) {}

    //getListitems(listId: String) {
    //    return this.http.get(this.ListitemsApiUrl).map(res => res.json());
    //}

    getListitems() {
        return this.http.get(this.ListitemsApiUrl)
            .toPromise()
            .then(response => response.json().data as Listitem[])
            .catch(this.handleError);
    }

    getListitem(id: string) {
        return this.getListitems()
            .then(listitems => listitems.find(listitem => listitem.id === id));
    }

    save(listitem: Listitem): Promise<Listitem> {
        if (listitem.id) {
            return this.put(listitem);
        }
        return this.post(listitem);
    }

    delete(listitem: Listitem) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.ListitemsApiUrl}/${listitem.id}`;

        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }

    // Add new Listitem
    private post(listitem: Listitem): Promise<Listitem> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.ListitemsApiUrl, JSON.stringify(listitem), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Listitem
    private put(listitem: Listitem) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.ListitemsApiUrl}/${listitem.id}`;

        return this.http
            .put(url, JSON.stringify(listitem), { headers: headers })
            .toPromise()
            .then(() => listitem)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}