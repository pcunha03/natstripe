import { View } from '@nativescript/core';
import { BankAccountHolderType, BankAccountStatus, CardBrand, CardFunding, CreditCardViewBase, IAddress, IBankAccount, ICard, ICardParams, IPaymentMethod, IStripePaymentIntent, IToken, PaymentMethodType, StripePaymentIntentStatus } from './common';
import { PaymentMethodCard } from './paymentMethod';
import { Source } from './source';
export { init } from './utils';
export { StripePaymentIntentStatus } from './common';
export declare class Address implements IAddress {
    readonly ios: STPAddress;
    readonly android: any;
    private constructor();
    static fromNative(card: STPAddress): Address;
    set country(value: string);
    get country(): string;
    set postalCode(value: string);
    get postalCode(): string;
    set state(value: string);
    get state(): string;
    set line1(value: string);
    get line1(): string;
    set line2(value: string);
    get line2(): string;
    set city(value: string);
    get city(): string;
    get email(): string;
    set email(value: string);
    get name(): string;
    set name(value: string);
    get phone(): string;
    set phone(value: string);
}
export declare class BankAccount implements IBankAccount {
    readonly accountHolderName: string;
    readonly accountHolderType: BankAccountHolderType;
    readonly bankName: string;
    readonly country: string;
    readonly currency: string;
    readonly fingerprint: string;
    readonly last4: string;
    readonly metadata: Readonly<{}>;
    readonly routingNumber: string;
    readonly status: BankAccountStatus;
    private constructor();
    static fromNative(bankAccount: STPBankAccount): BankAccount;
}
export declare class Token implements IToken {
    readonly android: any;
    readonly bankAccount: BankAccount;
    readonly card: Card;
    readonly created: Date;
    readonly id: string;
    readonly ios: any;
    readonly liveMode: boolean;
    private constructor();
    static fromNative(token: STPToken): Token;
}
export declare function handleOpenURL(url: NSURL): boolean;
export declare function handleContinueUserActivity(userActivity: NSUserActivity): boolean;
export declare class StripeThreeDSUICustomization {
    static init(): void;
}
export declare class Stripe {
    constructor(apiKey: string);
    setStripeAccount(accountId: string): void;
    createCardToken(card: CardParams, cb: (error: Error, token: IToken) => void): void;
    createSource(card: CardParams, cb: (error: Error, source: Source) => void): void;
    createPaymentMethod(card: CardParams, cb: (error: Error, pm: PaymentMethod) => void): void;
    retrievePaymentIntent(clientSecret: string, cb: (error: Error, pm: StripePaymentIntent) => void): void;
    confirmSetupIntent(paymentMethodId: string, clientSecret: string, cb: (error: Error, pm: StripeSetupIntent) => void): void;
    authenticateSetupIntent(clientSecret: string, returnUrl: string, cb: (error: Error, pm: StripeSetupIntent) => void): void;
    confirmPaymentIntent(params: StripePaymentIntentParams, cb: (error: Error, pm: StripePaymentIntent) => void): void;
    authenticatePaymentIntent(clientSecret: string, returnUrl: string, cb: (error: Error, pm: StripePaymentIntent) => void): void;
    private get _rootViewController();
    private findTopViewController;
    _ctxImpl: STPAuthenticationContextImp;
    _lastRoot: any;
    private _getAuthentificationContext;
}
declare class STPAuthenticationContextImp extends NSObject implements STPAuthenticationContext {
    _vc: UIViewController;
    static initWithViewController(vc: UIViewController): STPAuthenticationContextImp;
    authenticationPresentingViewController(): UIViewController;
}
export declare class Card implements ICard {
    readonly native: STPCard;
    readonly brand: CardBrand;
    readonly name: string;
    readonly address: Address;
    readonly currency: string;
    readonly last4: string;
    readonly dynamicLast4: string;
    readonly fingerprint: string;
    readonly funding: CardFunding;
    readonly country: string;
    private constructor();
    static fromNative(card: STPCard): Card;
    /**
     * Returns an image for a card given its brand.
     * The returned value can be used as [src] in an Image tag.
     */
    static cardImage(brand: CardBrand): any;
}
export declare class CardParams implements ICardParams {
    private _cardParams;
    constructor();
    constructor(params: STPCardParams);
    constructor(number: string, expMonth: number, expYear: number, cvc: string);
    static fromNative(card: STPCardParams): CardParams;
    get number(): string;
    set number(number: string);
    get expMonth(): number;
    set expMonth(month: number);
    get expYear(): number;
    set expYear(year: number);
    get cvc(): string;
    set cvc(cvc: string);
    get address(): Address;
    set address(address: Address);
    get native(): STPCardParams;
    get name(): string;
    set name(value: string);
    get currency(): string;
    set currency(value: string);
    get last4(): string;
}
export declare class CreditCardView extends CreditCardViewBase {
    nativeView: STPPaymentCardTextField;
    private delegate;
    createNativeView(): STPPaymentCardTextField;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
    /**
     * Initializes properties/listeners of the native view.
     */
    initNativeView(): void;
    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state
     * so that it could be reused later.
     */
    disposeNativeView(): void;
    get cardParams(): CardParams;
}
export declare class PaymentMethod implements IPaymentMethod {
    metadata: object;
    native: STPPaymentMethod;
    static fromNative(native: STPPaymentMethod): PaymentMethod;
    get id(): string;
    get created(): Date;
    get type(): PaymentMethodType;
    get billingDetails(): object;
    get card(): PaymentMethodCard;
    get customerId(): string;
}
declare class StripeIntent {
    _isSetupIntent: boolean;
    private _native;
    get native(): STPPaymentIntent | STPSetupIntent;
    set native(value: STPPaymentIntent | STPSetupIntent);
    get created(): Date;
    get clientSecret(): string;
    get status(): StripePaymentIntentStatus;
    get requiresAction(): boolean;
    get isSuccess(): boolean;
    get requiresConfirmation(): boolean;
    get requiresCapture(): boolean;
    get description(): string;
}
export declare class StripePaymentIntent extends StripeIntent implements IStripePaymentIntent {
    native: STPPaymentIntent;
    static fromNative(native: STPPaymentIntent): StripePaymentIntent;
    static fromApi(json: any): StripePaymentIntent;
    get id(): string;
    get amount(): number;
    get currency(): string;
    get captureMethod(): 'manual' | 'automatic';
}
export declare class StripePaymentIntentParams {
    clientSecret: string;
    paymentMethodParams: any;
    paymentMethodId: string;
    sourceParams: any;
    sourceId: string;
    returnURL: string;
    get native(): STPPaymentIntentParams;
}
export declare class StripeSetupIntent extends StripeIntent {
    native: STPSetupIntent;
    static fromNative(native: STPSetupIntent): StripeSetupIntent;
    get id(): string;
    get paymentMethodId(): string;
}
export declare class StripeSetupIntentParams {
    native: STPSetupIntentConfirmParams;
    constructor(paymentMethodId: string, clientSecret: string);
}
export declare enum StripeRedirectState {
    NotStarted = 0,
    InProgress = 1,
    Cancelled = 2,
    Completed = 3
}
export declare class StripeRedirectSession {
    native: STPRedirectContext;
    readonly state: StripeRedirectState;
    constructor(paymentIntent: StripePaymentIntent, cb: (error: Error, clientSecret: string) => void);
    startRedirectFlow(view?: View): void;
    cancel(): void;
    private get _rootViewController();
}
