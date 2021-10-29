import { Frame, Utils } from '@nativescript/core';
import { BankAccountHolderType, BankAccountStatus, CardBrand, CardFunding, CreditCardViewBase, GetBrand, isUSZipRequiredProperty, PaymentMethodType, showPostalCodeProperty } from './common';
import { PaymentMethodCard } from './paymentMethod';
import { Source } from './source';
export { init } from './utils';
export class Address {
    constructor(card) {
        this.ios = card;
    }
    static fromNative(card) {
        return new Address(card);
    }
    set country(value) {
        this.ios.country = value;
    }
    get country() {
        return this.ios.country;
    }
    set postalCode(value) {
        this.ios.postalCode = value;
    }
    get postalCode() {
        return this.ios.postalCode;
    }
    set state(value) {
        this.ios.state = value;
    }
    get state() {
        return this.ios.state;
    }
    set line1(value) {
        this.ios.line1 = value;
    }
    get line1() {
        return this.ios.line1;
    }
    set line2(value) {
        this.ios.line2 = value;
    }
    get line2() {
        return this.ios.line2;
    }
    set city(value) {
        this.ios.city = value;
    }
    get city() {
        return this.ios.city;
    }
    get email() {
        return this.ios.email;
    }
    set email(value) {
        this.ios.email = value;
    }
    get name() {
        return this.ios.name;
    }
    set name(value) {
        this.ios.name = value;
    }
    get phone() {
        return this.ios.phone;
    }
    set phone(value) {
        this.ios.phone = value;
    }
}
function toBankHolderType(account) {
    switch (account) {
        case 1 /* Company */:
            return BankAccountHolderType.Company;
        case 0 /* Individual */:
            return BankAccountHolderType.Individual;
    }
}
function toBankStatus(status) {
    switch (status) {
        case 4 /* Errored */:
            return BankAccountStatus.Errored;
        case 0 /* New */:
            return BankAccountStatus.New;
        case 1 /* Validated */:
            return BankAccountStatus.Validated;
        case 3 /* VerificationFailed */:
            return BankAccountStatus.VerificationFailed;
        case 2 /* Verified */:
            return BankAccountStatus.Verified;
    }
}
export class BankAccount {
    constructor(bankAccount) {
        this.accountHolderName = bankAccount.accountHolderName;
        this.accountHolderType = toBankHolderType(bankAccount.accountHolderType);
        this.bankName = bankAccount.bankName;
        this.country = bankAccount.country;
        this.fingerprint = bankAccount.fingerprint;
        this.last4 = bankAccount.last4;
        this.routingNumber = bankAccount.routingNumber;
        this.status = toBankStatus(bankAccount.status);
    }
    static fromNative(bankAccount) {
        if (bankAccount) {
            return new BankAccount(bankAccount);
        }
        return null;
    }
}
export class Token {
    constructor(token) {
        this.id = token.tokenId;
        this.bankAccount = BankAccount.fromNative(token.bankAccount);
        this.card = Card.fromNative(token.card);
        this.created = new Date(token.created);
        this.liveMode = token.livemode;
        this.ios = token;
    }
    static fromNative(token) {
        return new Token(token);
    }
}
export function handleOpenURL(url) {
    return StripeAPI.handleStripeURLCallbackWithURL(url);
}
export function handleContinueUserActivity(userActivity) {
    if (userActivity.activityType === NSUserActivityTypeBrowsingWeb) {
        if (userActivity.webpageURL) {
            return StripeAPI.handleStripeURLCallbackWithURL(userActivity.webpageURL);
        }
    }
    return false;
}
export class StripeThreeDSUICustomization {
    static init() { }
}
export class Stripe {
    constructor(apiKey) {
        STPPaymentConfiguration.sharedConfiguration.publishableKey = apiKey;
    }
    setStripeAccount(accountId) {
        STPAPIClient.sharedClient.stripeAccount = accountId;
        STPPaymentConfiguration.sharedConfiguration.stripeAccount = accountId;
    }
    createCardToken(card, cb) {
        if (!card) {
            if (typeof cb === 'function') {
                cb(new Error('Invalid card'), null);
            }
            return;
        }
        const apiClient = STPAPIClient.sharedClient;
        apiClient.createTokenWithCardCompletion(card.native, callback(cb, (token) => Token.fromNative(token)));
    }
    createSource(card, cb) {
        if (!card) {
            if (typeof cb === 'function') {
                cb(new Error('Invalid card'), null);
            }
            return;
        }
        const sourceParams = STPSourceParams.cardParamsWithCard(card.native);
        const apiClient = STPAPIClient.sharedClient;
        apiClient.createSourceWithParamsCompletion(sourceParams, callback(cb, (source) => Source.fromNative(source)));
    }
    createPaymentMethod(card, cb) {
        if (!card) {
            if (typeof cb === 'function') {
                cb(new Error('Invalid card'), null);
            }
            return;
        }
        try {
            const apiClient = STPAPIClient.sharedClient;
            const cardParams = STPPaymentMethodCardParams.alloc().initWithCardSourceParams(card.native);
            const billing = STPPaymentMethodBillingDetails.alloc().init();
            billing.address = STPPaymentMethodAddress.alloc().initWithAddress(card.address.ios);
            const params = STPPaymentMethodParams.paramsWithCardBillingDetailsMetadata(cardParams, billing, null);
            apiClient.createPaymentMethodWithParamsCompletion(params, callback(cb, (pm) => PaymentMethod.fromNative(pm)));
        }
        catch (e) {
            if (typeof cb === 'function') {
                cb(new Error(e.localizedDescription), null);
            }
        }
    }
    retrievePaymentIntent(clientSecret, cb) {
        const apiClient = STPAPIClient.sharedClient;
        apiClient.retrievePaymentIntentWithClientSecretCompletion(clientSecret, callback(cb, (pi) => StripePaymentIntent.fromNative(pi)));
    }
    confirmSetupIntent(paymentMethodId, clientSecret, cb) {
        STPPaymentHandler.sharedHandler.confirmSetupIntentWithAuthenticationContextCompletion(new StripeSetupIntentParams(paymentMethodId, clientSecret).native, this._getAuthentificationContext(), (status, si, error) => {
            if (error) {
                cb(new Error(error.localizedDescription), null);
            }
            else {
                cb(null, StripeSetupIntent.fromNative(si));
            }
        });
    }
    authenticateSetupIntent(clientSecret, returnUrl, cb) {
        STPPaymentHandler.sharedHandler.handleNextActionForSetupIntentWithAuthenticationContextReturnURLCompletion(clientSecret, this._getAuthentificationContext(), returnUrl, (status, pi, error) => {
            if (error) {
                cb(new Error(error.localizedDescription), null);
            }
            else {
                cb(null, StripeSetupIntent.fromNative(pi));
            }
        });
    }
    confirmPaymentIntent(params, cb) {
        STPPaymentHandler.sharedHandler.confirmPaymentWithAuthenticationContextCompletion(params.native, this._getAuthentificationContext(), (status, pi, error) => {
            if (error) {
                cb(new Error(error.localizedDescription), null);
            }
            else {
                cb(null, StripePaymentIntent.fromNative(pi));
            }
        });
    }
    authenticatePaymentIntent(clientSecret, returnUrl, cb) {
        STPPaymentHandler.sharedHandler.handleNextActionForPaymentWithAuthenticationContextReturnURLCompletion(clientSecret, this._getAuthentificationContext(), returnUrl, (status, pi, error) => {
            if (error) {
                cb(new Error(error.localizedDescription), null);
            }
            else {
                cb(null, StripePaymentIntent.fromNative(pi));
            }
        });
    }
    get _rootViewController() {
        const keyWindow = UIApplication.sharedApplication.keyWindow;
        return keyWindow != null ? keyWindow.rootViewController : undefined;
    }
    findTopViewController(root) {
        const presented = root.presentedViewController;
        if (presented != null) {
            return this.findTopViewController(presented);
        }
        if (root instanceof UISplitViewController) {
            const last = root.viewControllers.lastObject;
            if (last == null) {
                return root;
            }
            return this.findTopViewController(last);
        }
        else if (root instanceof UINavigationController) {
            const top = root.topViewController;
            if (top == null) {
                return root;
            }
            return this.findTopViewController(top);
        }
        else if (root instanceof UITabBarController) {
            const selected = root.selectedViewController;
            if (selected == null) {
                return root;
            }
            return this.findTopViewController(selected);
        }
        else {
            return root;
        }
    }
    _getAuthentificationContext() {
        const rootVC = this.findTopViewController(Frame.topmost().currentPage.ios) || this._rootViewController;
        if (!this._ctxImpl) {
            this._ctxImpl = STPAuthenticationContextImp.initWithViewController(rootVC);
            this._lastRoot = rootVC;
        }
        if (this._lastRoot !== rootVC) {
            this._ctxImpl._vc = rootVC;
        }
        return this._ctxImpl;
    }
}
var STPAuthenticationContextImp = /** @class */ (function (_super) {
    __extends(STPAuthenticationContextImp, _super);
    function STPAuthenticationContextImp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    STPAuthenticationContextImp_1 = STPAuthenticationContextImp;
    STPAuthenticationContextImp.initWithViewController = function (vc) {
        var delegate = STPAuthenticationContextImp_1.new();
        delegate._vc = vc;
        return delegate;
    };
    STPAuthenticationContextImp.prototype.authenticationPresentingViewController = function () {
        return this._vc;
    };
    var STPAuthenticationContextImp_1;
    STPAuthenticationContextImp = STPAuthenticationContextImp_1 = __decorate([
        ObjCClass(STPAuthenticationContext)
    ], STPAuthenticationContextImp);
    return STPAuthenticationContextImp;
}(NSObject));
function callback(cb, cvt) {
    return (value, error) => {
        if (!error) {
            if (typeof cb === 'function') {
                cb(null, cvt(value));
            }
        }
        else {
            if (typeof cb === 'function') {
                cb(new Error(error.localizedDescription), null);
            }
        }
    };
}
export class Card {
    constructor(card) {
        this.native = card;
        this.brand = GetBrand(card.brand);
        this.name = card.name;
        this.address = Address.fromNative(card.address);
        this.currency = card.currency;
        this.last4 = card.last4;
        this.dynamicLast4 = card.dynamicLast4;
        this.funding = CardFunding.Unknown;
        this.country = this.native.country;
    }
    static fromNative(card) {
        return new Card(card);
    }
    /**
     * Returns an image for a card given its brand.
     * The returned value can be used as [src] in an Image tag.
     */
    static cardImage(brand) {
        let nativeBrand;
        switch (brand) {
            case CardBrand.AmericanExpress:
                nativeBrand = 1 /* Amex */;
                break;
            case CardBrand.DinersClub:
                nativeBrand = 5 /* DinersClub */;
                break;
            case CardBrand.Discover:
                nativeBrand = 3 /* Discover */;
                break;
            case CardBrand.JCB:
                nativeBrand = 4 /* JCB */;
                break;
            case CardBrand.MasterCard:
                nativeBrand = 2 /* Mastercard */;
                break;
            case CardBrand.UnionPay:
                nativeBrand = 1 /* Amex */;
                break;
            case CardBrand.Visa:
                nativeBrand = 0 /* Visa */;
                break;
            default:
                nativeBrand = 7 /* Unknown */;
                break;
        }
        return STPImageLibrary.brandImageForCardBrand(nativeBrand);
    }
}
export class CardParams {
    constructor(...args) {
        if (args[0] instanceof STPCardParams) {
            this._cardParams = args[0];
        }
        else if (args.length === 4) {
            this._cardParams = STPCardParams.alloc().init();
            this._cardParams.number = args[0];
            this._cardParams.expMonth = args[1];
            this._cardParams.expYear = args[2];
            this._cardParams.cvc = args[3];
        }
        else {
            this._cardParams = STPCardParams.alloc().init();
        }
    }
    static fromNative(card) {
        return new CardParams(card);
    }
    get number() {
        return this._cardParams.number;
    }
    set number(number) {
        this._cardParams.number = number;
    }
    get expMonth() {
        return this._cardParams.expMonth;
    }
    set expMonth(month) {
        this._cardParams.expMonth = month;
    }
    get expYear() {
        return this._cardParams.expYear;
    }
    set expYear(year) {
        this._cardParams.expYear = year;
    }
    get cvc() {
        return this._cardParams.cvc;
    }
    set cvc(cvc) {
        this._cardParams.cvc = cvc;
    }
    get address() {
        return Address.fromNative(this._cardParams.address);
    }
    set address(address) {
        this._cardParams.address = address.ios;
    }
    get native() {
        return this._cardParams;
    }
    get name() {
        return this.native.name;
    }
    set name(value) {
        this._cardParams.name = value;
    }
    get currency() {
        return this.native.currency;
    }
    set currency(value) {
        this._cardParams.currency = value;
    }
    get last4() {
        return this._cardParams.last4();
    }
}
var STPPaymentCardTextFieldDelegateImpl = /** @class */ (function (_super) {
    __extends(STPPaymentCardTextFieldDelegateImpl, _super);
    function STPPaymentCardTextFieldDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    STPPaymentCardTextFieldDelegateImpl.initWithOwner = function (owner) {
        var delegate = STPPaymentCardTextFieldDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    STPPaymentCardTextFieldDelegateImpl.prototype.paymentCardTextFieldDidChange = function (textField) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        if (((_a = textField.cardParams) === null || _a === void 0 ? void 0 : _a.number) !== this.lastNumber) {
            (_c = (_b = this === null || this === void 0 ? void 0 : this._owner) === null || _b === void 0 ? void 0 : _b.get()) === null || _c === void 0 ? void 0 : _c.notify({
                eventName: CreditCardView.numberChangedEvent,
                object: (_d = this === null || this === void 0 ? void 0 : this._owner) === null || _d === void 0 ? void 0 : _d.get(),
                number: (_e = textField.cardParams) === null || _e === void 0 ? void 0 : _e.number,
            });
            this.lastNumber = (_f = textField.cardParams) === null || _f === void 0 ? void 0 : _f.number;
        }
        if (((_g = textField.cardParams) === null || _g === void 0 ? void 0 : _g.expMonth) !== this.lastExpMonth) {
            (_j = (_h = this === null || this === void 0 ? void 0 : this._owner) === null || _h === void 0 ? void 0 : _h.get()) === null || _j === void 0 ? void 0 : _j.notify({
                eventName: CreditCardView.expMonthChangedEvent,
                object: (_k = this === null || this === void 0 ? void 0 : this._owner) === null || _k === void 0 ? void 0 : _k.get(),
                expMonth: (_l = textField.cardParams) === null || _l === void 0 ? void 0 : _l.expMonth,
            });
            this.lastExpMonth = (_m = textField.cardParams) === null || _m === void 0 ? void 0 : _m.expMonth;
        }
        if (((_o = textField.cardParams) === null || _o === void 0 ? void 0 : _o.expYear) !== this.lastExpYear) {
            (_q = (_p = this === null || this === void 0 ? void 0 : this._owner) === null || _p === void 0 ? void 0 : _p.get()) === null || _q === void 0 ? void 0 : _q.notify({
                eventName: CreditCardView.expYearChangedEvent,
                object: (_r = this === null || this === void 0 ? void 0 : this._owner) === null || _r === void 0 ? void 0 : _r.get(),
                expYear: (_s = textField.cardParams) === null || _s === void 0 ? void 0 : _s.expYear,
            });
            this.lastExpYear = (_t = textField.cardParams) === null || _t === void 0 ? void 0 : _t.expYear;
        }
        if (((_u = textField.cardParams) === null || _u === void 0 ? void 0 : _u.cvc) !== this.lastCVC) {
            (_w = (_v = this === null || this === void 0 ? void 0 : this._owner) === null || _v === void 0 ? void 0 : _v.get()) === null || _w === void 0 ? void 0 : _w.notify({
                eventName: CreditCardView.cvcChangedEvent,
                object: (_x = this === null || this === void 0 ? void 0 : this._owner) === null || _x === void 0 ? void 0 : _x.get(),
                cvc: (_y = textField.cardParams) === null || _y === void 0 ? void 0 : _y.cvc,
            });
            this.lastCVC = (_z = textField.cardParams) === null || _z === void 0 ? void 0 : _z.cvc;
        }
        if (textField.postalCode !== this.lastPostal) {
            (_1 = (_0 = this === null || this === void 0 ? void 0 : this._owner) === null || _0 === void 0 ? void 0 : _0.get()) === null || _1 === void 0 ? void 0 : _1.notify({
                eventName: CreditCardView.postalCodeChangedEvent,
                object: (_2 = this === null || this === void 0 ? void 0 : this._owner) === null || _2 === void 0 ? void 0 : _2.get(),
                postalCode: textField.postalCode,
            });
            this.lastPostal = textField.postalCode;
        }
    };
    STPPaymentCardTextFieldDelegateImpl.ObjCProtocols = [STPPaymentCardTextFieldDelegate];
    return STPPaymentCardTextFieldDelegateImpl;
}(NSObject));
export class CreditCardView extends CreditCardViewBase {
    createNativeView() {
        this.delegate = STPPaymentCardTextFieldDelegateImpl.initWithOwner(new WeakRef(this));
        return STPPaymentCardTextField.alloc().initWithFrame(CGRectMake(10, 10, 150, 44));
    }
    onMeasure(widthMeasureSpec, heightMeasureSpec) {
        const nativeView = this.nativeView;
        if (nativeView) {
            const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
            const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
            this.setMeasuredDimension(width, height);
        }
    }
    /**
     * Initializes properties/listeners of the native view.
     */
    initNativeView() {
        // When nativeView is tapped we get the owning JS object through this field.
        this.nativeView.owner = this;
        super.initNativeView();
        this.nativeView.delegate = this.delegate;
        if (this.isUSZipRequired) {
            this.nativeView.countryCode = 'US';
        }
        if (!this.showPostalCode) {
            this.nativeView.postalCodeEntryEnabled = this.showPostalCode;
        }
    }
    [showPostalCodeProperty.setNative](value) {
        if (this.nativeView) {
            this.nativeView.postalCodeEntryEnabled = value;
        }
    }
    [isUSZipRequiredProperty.setNative](value) {
        if (this.nativeView) {
            if (value) {
                this.nativeView.countryCode = 'US';
            }
            else {
                this.nativeView.countryCode = null;
            }
        }
    }
    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state
     * so that it could be reused later.
     */
    disposeNativeView() {
        this.nativeView.owner = null;
        super.disposeNativeView();
    }
    get cardParams() {
        const cardParams = STPCardParams.alloc().init();
        cardParams.number = this.nativeView.cardParams.number;
        cardParams.expMonth = this.nativeView.cardParams.expMonth;
        cardParams.expYear = this.nativeView.cardParams.expYear;
        cardParams.cvc = this.nativeView.cardParams.cvc;
        return CardParams.fromNative(cardParams);
    }
}
export class PaymentMethod {
    static fromNative(native) {
        const pm = new PaymentMethod();
        pm.native = native;
        return pm;
    }
    get id() {
        return this.native.stripeId;
    }
    get created() {
        return new Date(this.native.created);
    }
    get type() {
        switch (this.native.type) {
            case 1 /* Alipay */:
                return PaymentMethodType.Alipay;
            case 7 /* AUBECSDebit */:
                return PaymentMethodType.AuBecsDebit;
            case 8 /* BacsDebit */:
                return PaymentMethodType.BacsDebit;
            case 12 /* Bancontact */:
                return PaymentMethodType.Bancontact;
            case 0 /* Card */:
                return PaymentMethodType.Card;
            case 5 /* CardPresent */:
                return PaymentMethodType.CardPresent;
            case 11 /* EPS */:
                return PaymentMethodType.Eps;
            case 4 /* FPX */:
                return PaymentMethodType.Fpx;
            case 9 /* Giropay */:
                return PaymentMethodType.Giropay;
            case 2 /* GrabPay */:
                return PaymentMethodType.GrabPay;
            case 3 /* iDEAL */:
                return PaymentMethodType.Ideal;
            /*case STPPaymentMethodType.Oxxo:
        return PaymentMethodType.Oxxo;*/
            case 10 /* Przelewy24 */:
                return PaymentMethodType.P24;
            case 6 /* SEPADebit */:
                return PaymentMethodType.SepaDebit;
            case 15 /* Sofort */:
                return PaymentMethodType.Sofort;
            default:
                return PaymentMethodType.Unknown;
        }
    }
    get billingDetails() {
        return this.native.billingDetails;
    }
    get card() {
        return PaymentMethodCard.fromNative(this.native.card);
    }
    get customerId() {
        return this.native.customerId;
    }
}
class StripeIntent {
    get native() {
        return this._native;
    }
    set native(value) {
        if (this.native instanceof STPSetupIntent) {
            this._isSetupIntent = true;
        }
        this._native = value;
    }
    get created() {
        return new Date(this.native.created);
    }
    get clientSecret() {
        return this.native.clientSecret;
    }
    get status() {
        if (this._isSetupIntent) {
            switch (this.native.status) {
                case 6 /* Canceled */:
                    return "canceled" /* Canceled */;
                case 4 /* Processing */:
                    return "processing" /* Processing */;
                case 3 /* RequiresAction */:
                    return "requires_action" /* RequiresAction */;
                case 2 /* RequiresConfirmation */:
                    return "requires_confirmation" /* RequiresConfirmation */;
                case 1 /* RequiresPaymentMethod */:
                    return "requires_payment_method" /* RequiresPaymentMethod */;
                case 5 /* Succeeded */:
                    return "succeeded" /* Succeeded */;
                default:
                    return null;
            }
        }
        else {
            switch (this.native.status) {
                case 9 /* Canceled */:
                    return "canceled" /* Canceled */;
                case 6 /* Processing */:
                    return "processing" /* Processing */;
                case 4 /* RequiresAction */:
                    return "requires_action" /* RequiresAction */;
                case 8 /* RequiresCapture */:
                    return "requires_capture" /* RequiresCapture */;
                case 3 /* RequiresConfirmation */:
                    return "requires_confirmation" /* RequiresConfirmation */;
                case 1 /* RequiresPaymentMethod */:
                    return "requires_payment_method" /* RequiresPaymentMethod */;
                case 7 /* Succeeded */:
                    return "succeeded" /* Succeeded */;
                default:
                    return null;
            }
        }
    }
    get requiresAction() {
        return this.native.status === 4 /* RequiresAction */;
    }
    get isSuccess() {
        return this.status === "succeeded" /* Succeeded */;
    }
    get requiresConfirmation() {
        return this.status === "requires_confirmation" /* RequiresConfirmation */;
    }
    get requiresCapture() {
        if (this._isSetupIntent) {
            return false;
        }
        return this.status === "requires_capture" /* RequiresCapture */;
    }
    get description() {
        return this.native.description;
    }
}
export class StripePaymentIntent extends StripeIntent {
    static fromNative(native) {
        const pi = new StripePaymentIntent();
        pi.native = native;
        return pi;
    }
    static fromApi(json) {
        const native = STPPaymentIntent.decodedObjectFromAPIResponse(json);
        return StripePaymentIntent.fromNative(native);
    }
    get id() {
        return this.native.stripeId;
    }
    get amount() {
        return this.native.amount;
    }
    get currency() {
        return this.native.currency;
    }
    get captureMethod() {
        switch (this.native.captureMethod) {
            case 1 /* Automatic */:
                return 'automatic';
            case 2 /* Manual */:
                return 'manual';
        }
        return null;
    }
}
export class StripePaymentIntentParams {
    get native() {
        const n = STPPaymentIntentParams.alloc().initWithClientSecret(this.clientSecret);
        n.paymentMethodParams = this.paymentMethodParams;
        n.paymentMethodId = this.paymentMethodId;
        n.sourceParams = this.sourceParams;
        n.sourceId = this.sourceId;
        n.returnURL = this.returnURL;
        return n;
    }
}
export class StripeSetupIntent extends StripeIntent {
    static fromNative(native) {
        const si = new StripeSetupIntent();
        si.native = native;
        si._isSetupIntent = true;
        return si;
    }
    get id() {
        return this.native.stripeID;
    }
    get paymentMethodId() {
        return this.native.paymentMethodID;
    }
}
export class StripeSetupIntentParams {
    constructor(paymentMethodId, clientSecret) {
        this.native = STPSetupIntentConfirmParams.alloc().initWithClientSecret(clientSecret);
        this.native.paymentMethodID = paymentMethodId;
    }
}
export var StripeRedirectState;
(function (StripeRedirectState) {
    StripeRedirectState[StripeRedirectState["NotStarted"] = 0] = "NotStarted";
    StripeRedirectState[StripeRedirectState["InProgress"] = 1] = "InProgress";
    StripeRedirectState[StripeRedirectState["Cancelled"] = 2] = "Cancelled";
    StripeRedirectState[StripeRedirectState["Completed"] = 3] = "Completed";
})(StripeRedirectState || (StripeRedirectState = {}));
export class StripeRedirectSession {
    constructor(paymentIntent, cb) {
        this.native = STPRedirectContext.alloc().initWithPaymentIntentCompletion(paymentIntent.native, (clientSecret, error) => {
            cb(new Error(error.localizedDescription), clientSecret);
            //callback(cb, (clientSecret) => clientSecret)
        });
    }
    startRedirectFlow(view = null) {
        var _a;
        const vc = (_a = view === null || view === void 0 ? void 0 : view.viewController) !== null && _a !== void 0 ? _a : (Frame.topmost().currentPage.ios || this._rootViewController);
        this.native.startRedirectFlowFromViewController(vc);
    }
    cancel() {
        this.native.cancel();
    }
    get _rootViewController() {
        const keyWindow = UIApplication.sharedApplication.keyWindow;
        return keyWindow != null ? keyWindow.rootViewController : undefined;
    }
}
//# sourceMappingURL=index.ios.js.map