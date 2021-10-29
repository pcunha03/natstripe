(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@nativescript/angular')) :
    typeof define === 'function' && define.amd ? define('nativescript-nativescript-stripe-angular', ['exports', '@angular/core', '@nativescript/angular'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['nativescript-nativescript-stripe-angular'] = {}, global.ng.core, global['ns-angular']));
}(this, (function (exports, core, angular) { 'use strict';

    // @ts-ignore
    var CreditCardViewDirective = /** @class */ (function () {
        function CreditCardViewDirective() {
        }
        return CreditCardViewDirective;
    }());
    CreditCardViewDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: "CreditCardView"
                },] }
    ];
    var DIRECTIVES = CreditCardViewDirective;

    angular.registerElement("CreditCardView", function () { return require("@triniwiz/nativescript-stripe").CreditCardView; });
    // @ts-ignore
    var CreditCardViewModule = /** @class */ (function () {
        function CreditCardViewModule() {
        }
        return CreditCardViewModule;
    }());
    CreditCardViewModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    schemas: [core.NO_ERRORS_SCHEMA]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CreditCardViewModule = CreditCardViewModule;
    exports.ɵa = CreditCardViewDirective;
    exports.ɵb = DIRECTIVES;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nativescript-nativescript-stripe-angular.umd.js.map
