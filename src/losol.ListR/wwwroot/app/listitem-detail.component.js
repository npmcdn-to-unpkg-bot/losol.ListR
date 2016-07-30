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
var router_1 = require('@angular/router');
var listitem_1 = require('./listitem');
var listitem_service_1 = require('./listitem.service');
var ListitemDetailComponent = (function () {
    function ListitemDetailComponent(listitemService, route) {
        this.listitemService = listitemService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    ListitemDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = params['id'];
                _this.navigated = true;
                _this.listitemService.getListitem(id)
                    .then(function (listitem) { return _this.listitem = listitem; });
            }
            else {
                _this.navigated = false;
                _this.listitem = new listitem_1.Listitem();
            }
        });
    };
    ListitemDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ListitemDetailComponent.prototype.save = function () {
        var _this = this;
        this.listitemService
            .save(this.listitem)
            .then(function (listitem) {
            _this.listitem = listitem;
            _this.goBack(listitem);
        })
            .catch(function (error) { return _this.error = error; });
    };
    ListitemDetailComponent.prototype.goBack = function (savedListitem) {
        if (savedListitem === void 0) { savedListitem = null; }
        this.close.emit(savedListitem);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', listitem_1.Listitem)
    ], ListitemDetailComponent.prototype, "listitem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListitemDetailComponent.prototype, "close", void 0);
    ListitemDetailComponent = __decorate([
        core_1.Component({
            selector: 'listitem-detail',
            templateUrl: 'app/listitem-detail.component.html'
        }), 
        __metadata('design:paramtypes', [listitem_service_1.ListitemService, router_1.ActivatedRoute])
    ], ListitemDetailComponent);
    return ListitemDetailComponent;
}());
exports.ListitemDetailComponent = ListitemDetailComponent;
