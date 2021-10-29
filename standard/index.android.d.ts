import { AndroidActivityResultEventData, Page } from '@nativescript/core';
import { IStripeStandardBackendAPI, IStripeStandardConfig, StripeStandardAddress, StripeStandardBillingAddressFields, StripeStandardPaymentListener, StripeStandardPaymentMethod, StripeStandardPaymentMethodType, StripeStandardShippingAddressField, StripeStandardShippingMethod } from './common';
import { Address } from '../';
export { IStripeStandardBackendAPI, StripeStandardAddress, StripeStandardBillingAddressFields, StripeStandardPaymentListener, StripeStandardPaymentMethod, StripeStandardShippingAddressField, StripeStandardShippingMethod, StripeStandardPaymentMethodType };
export declare class StripeStandardConfig implements IStripeStandardConfig {
    backendAPI: IStripeStandardBackendAPI;
    publishableKey: string;
    appleMerchantID: string;
    companyName: string;
    requiredBillingAddressFields: StripeStandardBillingAddressFields;
    requiredShippingAddressFields: StripeStandardShippingAddressField[];
    allowedPaymentMethodTypes: StripeStandardPaymentMethodType[];
    createCardSources: any;
    enableCardScanning: boolean;
    stripeAccountId: string;
    private static _instance;
    private _paymentConfigurationInitiated;
    get native(): com.stripe.android.PaymentSessionConfig;
    get nativeBuilder(): com.stripe.android.PaymentSessionConfig.Builder;
    initPaymentConfiguration(): void;
    static get shared(): StripeStandardConfig;
}
export declare class StripeStandardCustomerSession {
    readonly native: com.stripe.android.CustomerSession;
    constructor();
    private static get context();
}
export declare class StripeStandardPaymentSession {
    customerSession: StripeStandardCustomerSession;
    currency: string;
    listener: StripeStandardPaymentListener;
    native: com.stripe.android.PaymentSession;
    selectedPaymentMethod: StripeStandardPaymentMethod;
    selectedShippingMethod: StripeStandardShippingMethod;
    shippingAddress: StripeStandardAddress;
    loading: boolean;
    paymentInProgress: boolean;
    _data: com.stripe.android.PaymentSessionData;
    private _activityResultListener;
    private _callback;
    constructor(_page: Page, customerSession: StripeStandardCustomerSession, amount: number, currency: string, listener: StripeStandardPaymentListener, prefilledAddress?: Address);
    _resultListener(args: AndroidActivityResultEventData): void;
    get amount(): number;
    get isPaymentReady(): boolean;
    requestPayment(): void;
    presentPaymentMethods(): void;
    presentShipping(): void;
}
