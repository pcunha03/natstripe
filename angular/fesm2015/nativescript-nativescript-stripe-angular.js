import { Directive, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerElement } from '@nativescript/angular';

// @ts-ignore
class CreditCardViewDirective {
}
CreditCardViewDirective.decorators = [
    { type: Directive, args: [{
                selector: "CreditCardView"
            },] }
];
const DIRECTIVES = CreditCardViewDirective;

registerElement("CreditCardView", () => require("@triniwiz/nativescript-stripe").CreditCardView);
// @ts-ignore
class CreditCardViewModule {
}
CreditCardViewModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DIRECTIVES],
                exports: [DIRECTIVES],
                schemas: [NO_ERRORS_SCHEMA]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { CreditCardViewModule, CreditCardViewDirective as ɵa, DIRECTIVES as ɵb };
//# sourceMappingURL=nativescript-nativescript-stripe-angular.js.map
