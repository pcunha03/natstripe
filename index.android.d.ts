import { BankAccountHolderType, BankAccountStatus, CaptureMethod, CardBrand, CardFunding, CreditCardViewBase, IAddress, IBankAccount, ICard, ICardParams, IToken, IPaymentMethod, PaymentMethodType, IStripePaymentIntent, StripePaymentIntentStatus } from './common';
import { PaymentMethodCard } from './paymentMethod';
import { Source } from './source';
export { init } from './utils';
export declare class Address implements IAddress {
    readonly address: com.stripe.android.model.Address;
    readonly addressBuilder: com.stripe.android.model.Address.Builder;
    readonly card: com.stripe.android.model.Card;
    readonly isReadOnly: boolean;
    private _country;
    private _postalCode;
    private _state;
    private _line1;
    private _line2;
    private _city;
    private _email;
    private _name;
    private _phone;
    ios: any;
    android: any;
    constructor(address?: any);
    static fromNative(native: com.stripe.android.model.Address): Address;
    static fromNativeBuilder(native: com.stripe.android.model.Address.Builder): Address;
    static fromNativeCard(address: com.stripe.android.model.Card): Address;
    get email(): string;
    set email(value: string);
    get name(): string;
    set name(value: string);
    set phone(value: string);
    get phone(): string;
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
}
export declare class Card implements ICard {
    readonly android: com.stripe.android.model.Card;
    readonly name: string;
    readonly currency: string;
    readonly last4: string;
    readonly brand: CardBrand;
    readonly fingerprint: string;
    readonly funding: CardFunding;
    readonly country: string;
    readonly dynamicLast4: string;
    private constructor();
    static fromNative(card: com.stripe.android.model.Card): Card;
    get native(): com.stripe.android.model.Card;
    get address(): Address;
    /**
     * Returns an image for a card given its brand.
     * The returned value can be used as [src] in an Image tag.
     */
    static cardImage(brand: CardBrand): any;
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
    static fromNative(bank: com.stripe.android.model.BankAccount): BankAccount;
}
export declare class Token implements IToken {
    bankAccount: BankAccount;
    card: Card;
    created: Date;
    id: string;
    ios: any;
    android: any;
    liveMode: boolean;
    private constructor();
    static fromNative(token: com.stripe.android.model.Token): Token;
}
export declare function handleOpenURL(url: any): boolean;
export declare function handleContinueUserActivity(userActivity: any): boolean;
export declare class StripeThreeDSUICustomization {
    static init(): void;
}
export declare class Stripe {
    private _stripe;
    private _apiKey;
    private _stripeAccountId;
    constructor(apiKey: string, stripeAccountId?: string);
    setStripeAccount(accountId: string): void;
    private get stripe();
    createCardToken(card: CardParams, cb: (error: Error, token: Token) => void): void;
    createSource(card: CardParams, cb: (error: Error, source: Source) => void): void;
    createPaymentMethod(card: CardParams, cb: (error: Error, pm: PaymentMethod) => void): void;
    retrievePaymentIntent(clientSecret: string, cb: (error: Error, pm: StripePaymentIntent) => void): void;
    confirmSetupIntent(paymentMethodId: string, clientSecret: string, cb: (error: Error, pm: StripeSetupIntent) => void): void;
    authenticateSetupIntent(clientSecret: string, returnUrl: string, cb: (error: Error, pm: StripeSetupIntent) => void): void;
    confirmPaymentIntent(piParams: StripePaymentIntentParams, cb: (error: Error, pm: StripePaymentIntent) => void): void;
    authenticatePaymentIntent(clientSecret: string, returnUrl: string, cb: (error: Error, pm: StripePaymentIntent) => void): void;
}
export declare class CardParams implements ICardParams {
    _cardParams: com.stripe.android.model.CardParams;
    _address: com.stripe.android.model.Address.Builder;
    constructor();
    constructor(params: com.stripe.android.model.CardParams);
    constructor(number: string, expMonth: number, expYear: number, cvc: string);
    private _copyAddress;
    static fromNative(card: com.stripe.android.model.CardParams): CardParams;
    private _number;
    get number(): string;
    set number(number: string);
    private _expMonth;
    get expMonth(): number;
    set expMonth(month: number);
    private _expYear;
    get expYear(): number;
    set expYear(year: number);
    private _cvc;
    get cvc(): string;
    set cvc(cvc: string);
    get address(): Address;
    set address(address: Address);
    get native(): com.stripe.android.model.CardParams;
    get name(): string;
    set name(value: string);
    get currency(): string;
    set currency(value: string);
}
export declare class CreditCardView extends CreditCardViewBase {
    private _widget;
    get android(): com.stripe.android.view.CardInputWidget | com.stripe.android.view.CardMultilineWidget;
    createNativeView(): com.stripe.android.view.CardInputWidget | com.stripe.android.view.CardMultilineWidget;
    initNativeView(): void;
    get cardParams(): CardParams;
}
export declare class PaymentMethod implements IPaymentMethod {
    native: com.stripe.android.model.PaymentMethod;
    static fromNative(native: com.stripe.android.model.PaymentMethod): PaymentMethod;
    get id(): string;
    get created(): Date;
    get type(): PaymentMethodType;
    get billingDetails(): object;
    get card(): PaymentMethodCard;
    get customerId(): string;
    get metadata(): object;
}
declare class StripeIntent {
    native: com.stripe.android.model.PaymentIntent | com.stripe.android.model.SetupIntent;
    get id(): string;
    get clientSecret(): string;
    get description(): string;
    get status(): StripePaymentIntentStatus;
    get requiresAction(): boolean;
    get isSuccess(): boolean;
    get requiresConfirmation(): boolean;
    get requiresCapture(): boolean;
}
export declare class StripePaymentIntent extends StripeIntent implements IStripePaymentIntent {
    native: com.stripe.android.model.PaymentIntent;
    static fromNative(native: com.stripe.android.model.PaymentIntent): StripePaymentIntent;
    static fromApi(json: any): StripePaymentIntent;
    get amount(): number;
    get created(): Date;
    get currency(): string;
    get captureMethod(): CaptureMethod;
}
export declare class StripePaymentIntentParams {
    clientSecret: any;
    paymentMethodId: string;
    sourceId: string;
    returnURL: string;
    get native(): com.stripe.android.model.ConfirmPaymentIntentParams;
}
export declare class StripeSetupIntentParams {
    native: com.stripe.android.model.ConfirmSetupIntentParams;
    constructor(paymentMethodId: string, clientSecret: string);
}
export declare class StripeSetupIntent extends StripeIntent {
    native: com.stripe.android.model.SetupIntent;
    static fromNative(native: com.stripe.android.model.SetupIntent): StripeSetupIntent;
    get paymentMethodId(): string;
}
