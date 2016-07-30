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
var listitem_service_1 = require('./listitem.service');
var listitem_detail_component_1 = require('./listitem-detail.component');
var ListitemsComponent = (function () {
    function ListitemsComponent(
        // private router: Router,
        listitemService) {
        this.listitemService = listitemService;
        this.addingListitem = false;
    }
    ListitemsComponent.prototype.getListitems = function () {
        var _this = this;
        this.listitemService
            .getListitems()
            .then(function (listitems) { return _this.listitems = listitems; })
            .catch(function (error) { return _this.error = error; });
    };
    ListitemsComponent.prototype.addListitem = function () {
        this.addingListitem = true;
        this.selectedListitem = null;
    };
    ListitemsComponent.prototype.close = function (savedListitem) {
        this.addingListitem = false;
        if (savedListitem) {
            this.getListitems();
        }
    };
    ListitemsComponent.prototype.deleteListitem = function (listitem, event) {
        var _this = this;
        event.stopPropagation();
        this.listitemService
            .delete(listitem)
            .then(function (res) {
            _this.listitems = _this.listitems.filter(function (h) { return h !== listitem; });
            if (_this.selectedListitem === listitem) {
                _this.selectedListitem = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ListitemsComponent.prototype.ngOnInit = function () {
        this.getListitems();
    };
    ListitemsComponent.prototype.onSelect = function (listitem) {
        this.selectedListitem = listitem;
        this.addingListitem = false;
    };
    ListitemsComponent = __decorate([
        core_1.Component({
            selector: 'list-items',
            templateUrl: 'app/listitems.component.html',
            directives: [listitem_detail_component_1.ListitemDetailComponent]
        }), 
        __metadata('design:paramtypes', [listitem_service_1.ListitemService])
    ], ListitemsComponent);
    return ListitemsComponent;
}());
exports.ListitemsComponent = ListitemsComponent;
