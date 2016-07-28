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
var listitems_service_1 = require('./services/listitems.service');
var ListitemsComponent = (function () {
    function ListitemsComponent(_listitemsService) {
        this._listitemsService = _listitemsService;
        this._listitemsService = _listitemsService;
    }
    ListitemsComponent.prototype.getCountriesByRegion = function () {
        var _this = this;
        this.error = "";
        this.countries = [];
        this._listitemsService.getCountriesByRegion(this.region)
            .subscribe(function (data) { return _this.countries = data; }, function (error) { return _this.error = "Region " + _this.region + " is invalid."; });
    };
    ListitemsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'list-items',
            templateUrl: 'listitems.html',
            providers: [listitems_service_1.ListitemsService]
        }), 
        __metadata('design:paramtypes', [listitems_service_1.ListitemsService])
    ], ListitemsComponent);
    return ListitemsComponent;
}());
exports.ListitemsComponent = ListitemsComponent;
//# sourceMappingURL=listitems.js.map