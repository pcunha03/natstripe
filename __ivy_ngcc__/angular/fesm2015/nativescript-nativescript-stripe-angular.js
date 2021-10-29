import { Directive, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerElement } from '@nativescript/angular';

// @ts-ignore
import * as ɵngcc0 from '@angular/core';
class CreditCardViewDirective {
}
CreditCardViewDirective.ɵfac = function CreditCardViewDirective_Factory(t) { return new (t || CreditCardViewDirective)(); };
CreditCardViewDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: CreditCardViewDirective, selectors: [["CreditCardView"]] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CreditCardViewDirective, [{
        type: Directive,
        args: [{
                selector: "CreditCardView"
            }]
    }], null, null); })();
const DIRECTIVES = CreditCardViewDirective;

registerElement("CreditCardView", () => require("@triniwiz/nativescript-stripe").CreditCardView);
// @ts-ignore
class CreditCardViewModule {
}
CreditCardViewModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: CreditCardViewModule });
CreditCardViewModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function CreditCardViewModule_Factory(t) { return new (t || CreditCardViewModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(CreditCardViewModule, { declarations: [CreditCardViewDirective], exports: [CreditCardViewDirective] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CreditCardViewModule, [{
        type: NgModule,
        args: [{
                declarations: [DIRECTIVES],
                exports: [DIRECTIVES],
                schemas: [NO_ERRORS_SCHEMA]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { CreditCardViewModule, CreditCardViewDirective as ɵa, DIRECTIVES as ɵb };

//# sourceMappingURL=nativescript-nativescript-stripe-angular.js.map