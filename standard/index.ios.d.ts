import { Page } from '@nativescript/core';
import { IStripeStandardConfig, StripeStandardAddress, StripeStandardPaymentListener, StripeStandardPaymentMethod, StripeStandardShippingAddressField, StripeStandardShippingMethod, StripeStandardShippingMethods, StripeStandardBillingAddressFields, IStripeStandardBackendAPI, StripeStandardPaymentData, StripeStandardPaymentMethodType } from './common';
export { IStripeStandardBackendAPI, StripeStandardAddress, StripeStandardBillingAddressFields, StripeStandardPaymentListener, StripeStandardPaymentMethod, StripeStandardShippingAddressField, StripeStandardShippingMethod, StripeStandardShippingMethods, StripeStandardPaymentData, StripeStandardPaymentMethodType };
export declare class StripeStandardConfig implements IStripeStandardConfig {
    enableCardScanning: boolean;
    appleMerchantID: string;
    backendAPI: IStripeStandardBackendAPI;
    companyName: string;
    createCardSources: any;
    publishableKey: string;
    requiredBillingAddressFields: StripeStandardBillingAddressFields;
    requiredShippingAddressFields: StripeStandardShippingAddressField[];
    allowedPaymentMethodTypes: StripeStandardPaymentMethodType[];
    stripeAccountId: string;
    private static _instance;
    get native(): STPPaymentConfiguration;
    static get shared(): StripeStandardConfig;
}
export declare class StripeStandardCustomerSession {
    native: STPCustomerContext;
    constructor();
}
export declare class StripeStandardPaymentSession {
    private page;
    native: STPPaymentContext;
    private delegate;
    _paymentInProgress: boolean;
    constructor(page: Page, customerSession: StripeStandardCustomerSession, amount: number, currency: string, listener?: StripeStandardPaymentListener, prefilledAddress?: StripeStandardAddress);
    /** Is the Stripe native component loading? */
    get loading(): boolean;
    get isPaymentReady(): boolean;
    get paymentInProgress(): boolean;
    /** Total amount (including shipping) in pennies. */
    get amount(): number;
    get selectedPaymentMethod(): StripeStandardPaymentMethod;
    get selectedShippingMethod(): StripeStandardShippingMethod;
    get shippingAddress(): StripeStandardAddress;
    /**
     * Makes sure the hostViewController is set.
     * For reasons TBD, setting hostViewController in an ngOnInit() results
     * in infinite recursion. So to make life easier for clients, set the controller here.
     */
    private ensureHostViewController;
    requestPayment(): void;
    presentPaymentMethods(): void;
    presentShipping(): void;
}
