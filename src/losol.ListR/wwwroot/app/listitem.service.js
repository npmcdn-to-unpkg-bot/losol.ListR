"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ListitemService = (function () {
    function ListitemService(http) {
        this.http = http;
        this.ListitemsApiUrl = "https://localhost:5001/api/ListItemsApi";
    }
    //getListitems(listId: String) {
    //    return this.http.get(this.ListitemsApiUrl).map(res => res.json());
    //}
    ListitemService.prototype.getListitems = function () {
        return this.http.get(this.ListitemsApiUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ListitemService.prototype.getListitem = function (id) {
        return this.getListitems()
            .then(function (listitems) { return listitems.find(function (listitem) { return listitem.id === id; }); });
    };
    ListitemService.prototype.save = function (listitem) {
        if (listitem.id) {
            return this.put(listitem);
        }
        return this.post(listitem);
    };
    ListitemService.prototype.delete = function (listitem) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.ListitemsApiUrl + "/" + listitem.id;
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    };
    // Add new Listitem
    ListitemService.prototype.post = function (listitem) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(this.ListitemsApiUrl, JSON.stringify(listitem), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Listitem
    ListitemService.prototype.put = function (listitem) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.ListitemsApiUrl + "/" + listitem.id;
        return this.http
            .put(url, JSON.stringify(listitem), { headers: headers })
            .toPromise()
            .then(function () { return listitem; })
            .catch(this.handleError);
    };
    ListitemService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ListitemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListitemService);
    return ListitemService;
}());
exports.ListitemService = ListitemService;
