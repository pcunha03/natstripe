import { AndroidApplication, Application, Utils } from '@nativescript/core';
import { BankAccountHolderType, BankAccountStatus, CaptureMethod, CardBrand, CardFunding, CardFundingType, CreditCardViewBase, GetBrand, PaymentMethodCardCheckResult, PaymentMethodType, SourceCard3DSecureStatus, SourceFlow, SourceRedirectStatus, SourceStatus, SourceType, SourceUsage, SourceVerificationStatus, showPostalCodeProperty, isUSZipRequiredProperty } from './common';
import { PaymentMethodCard } from './paymentMethod';
import { Source } from './source';
export { init } from './utils';
export class Address {
    constructor(address) {
        if (address instanceof com.stripe.android.model.Card) {
            this.card = address;
        }
        else if (address instanceof com.stripe.android.model.Address.Builder) {
            this.addressBuilder = address;
        }
        else if (address instanceof com.stripe.android.model.Address) {
            this.address = address;
        }
        else {
            this.addressBuilder = new com.stripe.android.model.Address.Builder();
        }
    }
    static fromNative(native) {
        return new Address(native);
    }
    static fromNativeBuilder(native) {
        return new Address(native);
    }
    static fromNativeCard(address) {
        return new Address(native);
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get name() {
        if (this.card) {
            return this.name;
        }
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    set phone(value) {
        this._phone = value;
    }
    get phone() {
        return this._phone;
    }
    set country(value) {
        if (this.addressBuilder) {
            this.addressBuilder.setCountry(value);
            this._country = value;
        }
    }
    get country() {
        if (this.card) {
            return this.card.getAddressCountry();
        }
        if (this.address) {
            return this.address.getCountry();
        }
        if (this.addressBuilder) {
            return this._country;
        }
        return null;
    }
    set postalCode(value) {
        if (this.addressBuilder) {
            this.addressBuilder.setPostalCode(value);
            this._postalCode = value;
        }
    }
    get postalCode() {
        if (this.card) {
            return this.card.getAddressZip();
        }
        if (this.address) {
            return this.address.getPostalCode();
        }
        if (this.addressBuilder) {
            return this._postalCode;
        }
        return null;
    }
    set state(value) {
        if (this.addressBuilder) {
            this.addressBuilder.setState(value);
            this._state = value;
        }
    }
    get state() {
        if (this.card) {
            return this.card.getAddressState();
        }
        if (this.address) {
            return this.card.getAddressState();
        }
        if (this.addressBuilder) {
            return this._state;
        }
        return null;
    }
    set line1(value) {
        if (this.addressBuilder) {
            this.addressBuilder.setLine1(value);
            this._line1 = value;
        }
    }
    get line1() {
        if (this.card) {
            return this.card.getAddressLine1();
        }
        if (this.address) {
            return this.address.getLine1();
        }
        if (this.addressBuilder) {
            return this._line1;
        }
        return null;
    }
    set line2(value) {
        if (this.addressBuilder) {
            this.addressBuilder.setLine2(value);
            this._line2 = value;
        }
    }
    get line2() {
        if (this.card) {
            return this.card.getAddressLine2();
        }
        if (this.address) {
            return this.address.getLine2();
        }
        if (this.addressBuilder) {
            return this._line2;
        }
        return null;
    }
    set city(value) {
        if (this.addressBuilder) {
            this.addressBuilder.setCity(value);
            this._city = value;
        }
    }
    get city() {
        if (this.card) {
            return this.card.getAddressCity();
        }
        if (this.address) {
            return this.address.getCity();
        }
        if (this.addressBuilder) {
            return this._city;
        }
        return null;
    }
}
function toCardFunding(funding) {
    switch (funding) {
        case com.stripe.android.model.CardFunding.Credit:
            return CardFunding.Credit;
        case com.stripe.android.model.CardFunding.Debit:
            return CardFunding.Debit;
        case com.stripe.android.model.CardFunding.Prepaid:
            return CardFunding.Prepaid;
        case com.stripe.android.model.CardFunding.Unknown:
            return CardFunding.Unknown;
    }
}
function toBankHolderType(account) {
    switch (account) {
        case com.stripe.android.model.BankAccount.Type.Company:
            return BankAccountHolderType.Company;
        case com.stripe.android.model.BankAccount.Type.Individual:
            return BankAccountHolderType.Individual;
    }
}
function toBankStatus(status) {
    switch (status) {
        case com.stripe.android.model.BankAccount.Status.Errored:
            return BankAccountStatus.Errored;
        case com.stripe.android.model.BankAccount.Status.New:
            return BankAccountStatus.New;
        case com.stripe.android.model.BankAccount.Status.Validated:
            return BankAccountStatus.Validated;
        case com.stripe.android.model.BankAccount.Status.VerificationFailed:
            return BankAccountStatus.VerificationFailed;
        case com.stripe.android.model.BankAccount.Status.Verified:
            return BankAccountStatus.Verified;
    }
}
function toCardBrand(brand) {
    switch (brand) {
        case com.stripe.android.model.CardBrand.Visa:
            return CardBrand.Visa;
        case com.stripe.android.model.CardBrand.AmericanExpress:
            return CardBrand.AmericanExpress;
        case com.stripe.android.model.CardBrand.MasterCard:
            return CardBrand.MasterCard;
        case com.stripe.android.model.CardBrand.Discover:
            return CardBrand.Discover;
        case com.stripe.android.model.CardBrand.JCB:
            return CardBrand.JCB;
        case com.stripe.android.model.CardBrand.DinersClub:
            return CardBrand.DinersClub;
        case com.stripe.android.model.CardBrand.UnionPay:
            return CardBrand.UnionPay;
    }
    return CardBrand.Unknown;
}
function toCardFundingType(type) {
    switch (type) {
        case com.stripe.android.model.CardFunding.Credit:
            return CardFundingType.Credit;
        case com.stripe.android.model.CardFunding.Debit:
            return CardFundingType.Debit;
        case com.stripe.android.model.CardFunding.Prepaid:
            return CardFundingType.Prepaid;
        case com.stripe.android.model.CardFunding.Unknown:
            return CardFundingType.Other;
    }
}
function toSourceCard3DSecureStatus(status) {
    switch (status) {
        case com.stripe.android.model.SourceTypeModel.Card.ThreeDSecureStatus.NotSupported:
            return SourceCard3DSecureStatus.NotSupported;
        case com.stripe.android.model.SourceTypeModel.Card.ThreeDSecureStatus.Optional:
            return SourceCard3DSecureStatus.Optional;
        case com.stripe.android.model.SourceTypeModel.Card.ThreeDSecureStatus.Recommended:
            return SourceCard3DSecureStatus.Recommended;
        case com.stripe.android.model.SourceTypeModel.Card.ThreeDSecureStatus.Required:
            return SourceCard3DSecureStatus.Required;
        case com.stripe.android.model.SourceTypeModel.Card.ThreeDSecureStatus.Unknown:
            return SourceCard3DSecureStatus.Unknown;
    }
}
function toSourceFlow(flow) {
    switch (flow) {
        case com.stripe.android.model.Source.Flow.None:
            return SourceFlow.None;
        case com.stripe.android.model.Source.Flow.CodeVerification:
            return SourceFlow.CodeVerification;
        case com.stripe.android.model.Source.Flow.Receiver:
            return SourceFlow.Receiver;
        case com.stripe.android.model.Source.Flow.Redirect:
            return SourceFlow.Redirect;
    }
}
function toSourceStatus(status) {
    switch (status) {
        case com.stripe.android.model.Source.Status.Canceled:
            return SourceStatus.Canceled;
        case com.stripe.android.model.Source.Status.Chargeable:
            return SourceStatus.Chargeable;
        case com.stripe.android.model.Source.Status.Consumed:
            return SourceStatus.Consumed;
        case com.stripe.android.model.Source.Status.Failed:
            return SourceStatus.Failed;
        case com.stripe.android.model.Source.Status.Pending:
            return SourceStatus.Pending;
    }
}
function toSourceRedirectStatus(redirectStatus) {
    switch (redirectStatus) {
        case com.stripe.android.model.Source.Redirect.Status.Failed:
            return SourceRedirectStatus.Failed;
        case com.stripe.android.model.Source.Redirect.Status.NotRequired:
            return SourceRedirectStatus.NotRequired;
        case com.stripe.android.model.Source.Redirect.Status.Pending:
            return SourceRedirectStatus.Pending;
        case com.stripe.android.model.Source.Redirect.Status.Succeeded:
            return SourceRedirectStatus.Succeeded;
    }
}
function toSourceType(type) {
    switch (type) {
        case com.stripe.android.model.Source.SourceType.ALIPAY:
            return SourceType.Alipay;
        case com.stripe.android.model.Source.SourceType.BANCONTACT:
            return SourceType.Bancontact;
        case com.stripe.android.model.Source.SourceType.CARD:
            return SourceType.Card;
        case com.stripe.android.model.Source.SourceType.EPS:
            return SourceType.EPS;
        case com.stripe.android.model.Source.SourceType.GIROPAY:
            return SourceType.Giropay;
        case com.stripe.android.model.Source.SourceType.IDEAL:
            return SourceType.IDEAL;
        case com.stripe.android.model.Source.SourceType.KLARNA:
            return SourceType.Klarna;
        case com.stripe.android.model.Source.SourceType.MULTIBANCO:
            return SourceType.Multibanco;
        case com.stripe.android.model.Source.SourceType.P24:
            return SourceType.P24;
        case com.stripe.android.model.Source.SourceType.SEPA_DEBIT:
            return SourceType.SEPADebit;
        case com.stripe.android.model.Source.SourceType.SOFORT:
            return SourceType.Sofort;
        case com.stripe.android.model.Source.SourceType.THREE_D_SECURE:
            return SourceType.ThreeDSecure;
        case com.stripe.android.model.Source.SourceType.UNKNOWN:
            return SourceType.Unknown;
        case com.stripe.android.model.Source.SourceType.WECHAT:
            return SourceType.WeChatPay;
    }
}
function toSourceUsage(usage) {
    switch (usage) {
        case com.stripe.android.model.Source.Usage.Reusable:
            return SourceUsage.Reusable;
        case com.stripe.android.model.Source.Usage.SingleUse:
            return SourceUsage.SingleUse;
    }
}
function toSourceVerificationStatus(status) {
    switch (status) {
        case com.stripe.android.model.Source.CodeVerification.Status.Failed:
            return SourceVerificationStatus.Failed;
        case com.stripe.android.model.Source.CodeVerification.Status.Pending:
            return SourceVerificationStatus.Pending;
        case com.stripe.android.model.Source.CodeVerification.Status.Succeeded:
            return SourceVerificationStatus.Succeeded;
    }
}
function toPaymentMethodCardChecks(check) {
    switch (check) {
        case 'pass':
            return PaymentMethodCardCheckResult.Pass;
        case 'fail':
            return PaymentMethodCardCheckResult.Failed;
        case 'unavailable':
            return PaymentMethodCardCheckResult.Unavailable;
        case 'unchecked':
            return PaymentMethodCardCheckResult.Unchecked;
    }
}
export class Card {
    constructor(card) {
        this.android = card;
        this.name = card.getName();
        this.currency = card.getCurrency();
        this.last4 = card.getLast4();
        this.brand = GetBrand(card.getBrand());
        this.fingerprint = card.getFingerprint();
        this.funding = toCardFunding(card.getFunding());
        this.country = this.native.getCountry();
    }
    static fromNative(card) {
        if (!card) {
            return null;
        }
        return new Card(card);
    }
    get native() {
        return this.android;
    }
    get address() {
        return Address.fromNativeCard(this.android);
    }
    /**
     * Returns an image for a card given its brand.
     * The returned value can be used as [src] in an Image tag.
     */
    static cardImage(brand) {
        switch (brand) {
            case CardBrand.AmericanExpress:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.AmericanExpress.getIcon());
            case CardBrand.Discover:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.Discover.getIcon());
            case CardBrand.JCB:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.JCB.getIcon());
            case CardBrand.DinersClub:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.DinersClub.getIcon());
            case CardBrand.Visa:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.Visa.getIcon());
            case CardBrand.MasterCard:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.MasterCard.getIcon());
            case CardBrand.UnionPay:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.UnionPay.getIcon());
            default:
                return getBitmapFromResource(com.stripe.android.model.CardBrand.Unknown.getIcon());
        }
    }
}
export class BankAccount {
    constructor(bank) {
        this.accountHolderName = bank.getAccountHolderName();
        this.accountHolderType = toBankHolderType(bank.getAccountHolderType());
        this.bankName = bank.getBankName();
        this.country = bank.getCountryCode();
        this.currency = bank.getCurrency();
        this.fingerprint = bank.getFingerprint();
        this.last4 = bank.getLast4();
        this.metadata = {};
        this.routingNumber = bank.getRoutingNumber();
        this.status = toBankStatus(bank.getStatus());
    }
    static fromNative(bank) {
        if (!bank) {
            return null;
        }
        return new BankAccount(bank);
    }
}
export class Token {
    constructor(token) {
        this.android = token;
        this.bankAccount = BankAccount.fromNative(token.getBankAccount());
        this.card = Card.fromNative(token.getCard());
        this.created = new Date(token.getCreated().toString());
        this.id = token.getId();
        this.liveMode = token.getLivemode();
    }
    static fromNative(token) {
        return new Token(token);
    }
}
export function handleOpenURL(url) {
    return false;
}
export function handleContinueUserActivity(userActivity) {
    return false;
}
export class StripeThreeDSUICustomization {
    static init() {
        const uiCustomizationBuilder = new com.stripe.android.PaymentAuthConfig.Stripe3ds2UiCustomization.Builder();
        const uiCustomization = uiCustomizationBuilder.build();
        com.stripe.android.PaymentAuthConfig.init(new com.stripe.android.PaymentAuthConfig.Builder().set3ds2Config(new com.stripe.android.PaymentAuthConfig.Stripe3ds2Config.Builder().setTimeout(5).setUiCustomization(uiCustomization).build()).build());
    }
}
export class Stripe {
    constructor(apiKey, stripeAccountId) {
        this._apiKey = apiKey;
        this._stripeAccountId = stripeAccountId;
    }
    setStripeAccount(accountId) {
        this._stripeAccountId = accountId;
    }
    get stripe() {
        if (!this._stripe) {
            this._stripe = new com.stripe.android.Stripe(Utils.android.getApplicationContext(), this._apiKey, this._stripeAccountId);
        }
        return this._stripe;
    }
    createCardToken(card, cb) {
        if (!card) {
            if (typeof cb === 'function') {
                cb(new Error('Invalid card'), null);
            }
            return;
        }
        this.stripe.createCardToken(card.native, new com.stripe.android.ApiResultCallback({
            onSuccess: function (token) {
                if (typeof cb === 'function') {
                    cb(null, Token.fromNative(token));
                }
            },
            onError: function (error) {
                if (typeof cb === 'function') {
                    cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
                }
            },
        }));
    }
    createSource(card, cb) {
        if (!card) {
            if (typeof cb === 'function') {
                cb(new Error('Invalid card'), null);
            }
            return;
        }
        com.github.triniwiz.stripe.Stripe.createCardParams(card.native, this.stripe, new com.github.triniwiz.stripe.Stripe.Callback({
            onSuccess(source) {
                if (typeof cb === 'function') {
                    cb(null, Source.fromNative(source));
                }
            },
            onError(error) {
                if (typeof cb === 'function') {
                    cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
                }
            },
        }));
        /*
 try {
   const SourceParamsClazz = java.lang.Class.forName('com.stripe.android.model.SourceParams');
   const methods = SourceParamsClazz.getDeclaredMethods();
   for (let i = 0; i < methods.length; i++) {
     const method = methods[i];
     const name = method.getName();
     if (name === 'createCardParams') {
       const types = method.getParameterTypes();
       const type = types[0];
       //@ts-ignore
       if (type.isInstance(card._card)) {
         const inputValues = new java.util.ArrayList();
         //@ts-ignore
         inputValues.add(card._card);
         const cardSourceParams = method.invoke(null, inputValues.toArray());
         this.stripe.createSource(
           cardSourceParams,
           new com.stripe.android.ApiResultCallback<com.stripe.android.model.Source>({
             onSuccess: function (source: com.stripe.android.model.Source) {
               if (typeof cb === 'function') {
                 cb(null, Source.fromNative(source));
               }
             },
             onError: function (error) {
               console.log('onError', error);
               cb(new Error(error.getLocalizedMessage()), null);
             }
           })
         );
         break;
       }
     }
   }
 } catch
 (error) {
   console.log('eee', error);
   if (typeof cb === 'function') {
     cb(new Error(error.localizedDescription), null);
   }
 }
 */
    }
    createPaymentMethod(card, cb) {
        if (!card) {
            if (typeof cb === 'function') {
                cb(new Error('Invalid card'), null);
            }
            return;
        }
        const params = com.stripe.android.model.PaymentMethodCreateParams.createCard(card.native);
        try {
            const apiResultCallback = new com.stripe.android.ApiResultCallback({
                onSuccess: (result) => {
                    cb(null, PaymentMethod.fromNative(result));
                },
                onError: (error) => {
                    cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
                },
            });
            this.stripe.createPaymentMethod(params, apiResultCallback);
        }
        catch (error) {
            if (typeof cb === 'function') {
                cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
            }
        }
    }
    retrievePaymentIntent(clientSecret, cb) {
        try {
            this.stripe.retrievePaymentIntent(clientSecret, new com.stripe.android.ApiResultCallback({
                onSuccess: (result) => {
                    cb(null, StripePaymentIntent.fromNative(pi));
                },
                onError: (error) => {
                    cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
                },
            }));
            const pi = this.stripe.retrievePaymentIntentSynchronous(clientSecret);
            cb(null, StripePaymentIntent.fromNative(pi));
        }
        catch (error) {
            cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
        }
    }
    confirmSetupIntent(paymentMethodId, clientSecret, cb) {
        try {
            const activity = Application.android.foregroundActivity;
            const resultCb = new com.stripe.android.ApiResultCallback({
                onSuccess: (result) => {
                    cb(null, StripeSetupIntent.fromNative(result.getIntent()));
                },
                onError: (error) => {
                    cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
                },
            });
            const activityCallback = (args) => {
                this.stripe.onSetupResult(args.requestCode, args.intent, resultCb);
                Application.android.off(AndroidApplication.activityResultEvent, activityCallback);
            };
            Application.android.on(AndroidApplication.activityResultEvent, activityCallback);
            this.stripe.confirmSetupIntent(activity, new StripeSetupIntentParams(paymentMethodId, clientSecret).native);
        }
        catch (error) {
            cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
        }
    }
    authenticateSetupIntent(clientSecret, returnUrl, cb) {
        const activity = Application.android.foregroundActivity;
        const resultCb = new com.stripe.android.ApiResultCallback({
            onSuccess: (result) => {
                cb(null, StripeSetupIntent.fromNative(result.getIntent()));
            },
            onError: (error) => {
                cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
            },
        });
        const activityCallback = (args) => {
            this.stripe.onSetupResult(args.requestCode, args.intent, resultCb);
            Application.android.off(AndroidApplication.activityResultEvent, activityCallback);
        };
        Application.android.on(AndroidApplication.activityResultEvent, activityCallback);
        this.stripe.authenticateSetup(activity, clientSecret);
    }
    confirmPaymentIntent(piParams, cb) {
        try {
            const activity = Application.android.foregroundActivity;
            const resultCb = new com.stripe.android.ApiResultCallback({
                onSuccess: (result) => {
                    cb(null, StripePaymentIntent.fromNative(result.getIntent()));
                },
                onError: (error) => {
                    cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
                },
            });
            const activityCallback = (args) => {
                this.stripe.onPaymentResult(args.requestCode, args.intent, resultCb);
                Application.android.off(AndroidApplication.activityResultEvent, activityCallback);
            };
            Application.android.on(AndroidApplication.activityResultEvent, activityCallback);
            this.stripe.confirmPayment(activity, piParams.native);
        }
        catch (error) {
            cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
        }
    }
    // Manual confirmation flow https://stripe.com/docs/payments/payment-intents/ios#manual-confirmation-ios
    authenticatePaymentIntent(clientSecret, returnUrl, cb) {
        const activity = Application.android.foregroundActivity;
        const resultCb = new com.stripe.android.ApiResultCallback({
            onSuccess: (result) => {
                cb(null, StripePaymentIntent.fromNative(result.getIntent()));
            },
            onError: (error) => {
                cb(new Error(error.getMessage() || error.getLocalizedMessage()), null);
            },
        });
        activity.onActivityResult = (requestCode, resultCode, data) => {
            this.stripe.onPaymentResult(requestCode, data, resultCb);
        };
        this.stripe.authenticatePayment(activity, clientSecret);
    }
}
export class CardParams {
    constructor(...args) {
        this._address = new com.stripe.android.model.Address.Builder();
        if (args[0] instanceof com.stripe.android.model.CardParams) {
            this._cardParams = args[0];
            this._address = new com.stripe.android.model.Address.Builder();
            const address = this._cardParams.getAddress();
            if (address) {
                this._address.setCity(address.getCity());
                this._address.setState(address.getState());
                this._address.setLine1(address.getLine1());
                this._address.setLine2(address.getLine2());
                this._address.setPostalCode(address.getPostalCode());
                this._address.setCountry(address.getCountry());
            }
        }
        else if (args.length === 4) {
            this._cardParams = new com.stripe.android.model.CardParams(args[0], args[1], args[2], args[3]);
            this._address = new com.stripe.android.model.Address.Builder();
        }
        else {
            this._number = '';
            this._expMonth = 0;
            this._expYear = 0;
            this._cvc = '';
            this._cardParams = new com.stripe.android.model.CardParams('', 0, 0);
            this._address = new com.stripe.android.model.Address.Builder();
        }
    }
    _copyAddress(oldParams, newParams) {
        this._address = new com.stripe.android.model.Address.Builder();
        const address = oldParams.getAddress();
        if (address) {
            this._address.setCity(address.getCity());
            this._address.setState(address.getState());
            this._address.setLine1(address.getLine1());
            this._address.setLine2(address.getLine2());
            this._address.setPostalCode(address.getPostalCode());
            this._address.setCountry(address.getCountry());
            this._cardParams.setAddress(newParams.getAddress());
        }
    }
    static fromNative(card) {
        if (!card) {
            return undefined;
        }
        return new CardParams(card);
    }
    get number() {
        return this._number;
    }
    set number(number) {
        this._number = number;
        const newParams = new com.stripe.android.model.CardParams(number, this.expMonth, this.expYear, this.cvc);
        this._copyAddress(this._cardParams, newParams);
        this._cardParams = newParams;
    }
    get expMonth() {
        return this._expMonth;
    }
    set expMonth(month) {
        this._expMonth = month;
        const newParams = new com.stripe.android.model.CardParams(this.number, month, this.expYear, this.cvc);
        this._copyAddress(this._cardParams, newParams);
        this._cardParams = newParams;
    }
    get expYear() {
        return this._expYear;
    }
    set expYear(year) {
        this._expMonth = year;
        const newParams = new com.stripe.android.model.CardParams(this.number, this.expMonth, year, this.cvc);
        this._copyAddress(this._cardParams, newParams);
        this._cardParams = newParams;
    }
    get cvc() {
        return this._cvc;
    }
    set cvc(cvc) {
        this._cvc = cvc;
        const newParams = new com.stripe.android.model.CardParams(this.number, this.expMonth, this.expYear, cvc);
        this._copyAddress(this._cardParams, newParams);
        this._cardParams = newParams;
    }
    get address() {
        return Address.fromNativeBuilder(this._address);
    }
    set address(address) {
        if (!address.isReadOnly && address.address instanceof com.stripe.android.model.Address.Builder) {
            this._cardParams.setAddress(address.address.build());
        }
    }
    get native() {
        return this._cardParams;
    }
    get name() {
        return this._cardParams.getName();
    }
    set name(value) {
        this._cardParams.setName(value);
    }
    get currency() {
        return this._cardParams.getCurrency();
    }
    set currency(value) {
        this._cardParams.setCurrency(value);
    }
}
function getBitmapFromResource(resID) {
    let image = Application.android.foregroundActivity.getResources().getDrawable(resID, null);
    if (image instanceof android.graphics.Bitmap) {
        return image;
    }
    let bitmap = android.graphics.Bitmap.createBitmap(image.getIntrinsicWidth(), image.getIntrinsicHeight(), android.graphics.Bitmap.Config.ARGB_8888);
    let canvas = new android.graphics.Canvas(bitmap);
    image.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
    image.draw(canvas);
    return bitmap;
}
export class CreditCardView extends CreditCardViewBase {
    // @ts-ignore
    get android() {
        return this._widget;
    }
    createNativeView() {
        if (android.os.Build.VERSION.SDK_INT < 21) {
            this._widget = new com.stripe.android.view.CardInputWidget(this._context);
        }
        else {
            this._widget = new com.stripe.android.view.CardMultilineWidget(this._context);
        }
        return this._widget;
    }
    initNativeView() {
        var _a, _b, _c, _d;
        super.initNativeView();
        const ref = new WeakRef(this);
        (_a = this._widget) === null || _a === void 0 ? void 0 : _a.setCardNumberTextWatcher(new android.text.TextWatcher({
            afterTextChanged(param0) { },
            beforeTextChanged(param0, param1, param2, param3) { },
            onTextChanged(param0, param1, param2, param3) {
                var _a;
                (_a = ref.get()) === null || _a === void 0 ? void 0 : _a.notify({
                    eventName: CreditCardView.numberChangedEvent,
                    object: ref.get(),
                    number: typeof param0 === 'object' ? param0 === null || param0 === void 0 ? void 0 : param0.toString() : param0,
                });
            },
        }));
        (_b = this._widget) === null || _b === void 0 ? void 0 : _b.setExpiryDateTextWatcher(new android.text.TextWatcher({
            afterTextChanged(param0) { },
            beforeTextChanged(param0, param1, param2, param3) { },
            onTextChanged(param0, param1, param2, param3) {
                var _a, _b, _c, _d, _e, _f, _g;
                if (param0) {
                    const str = typeof param0 === 'object' ? (_a = param0.toString()) !== null && _a !== void 0 ? _a : '' : param0;
                    const values = (_c = (_b = str === null || str === void 0 ? void 0 : str.split) === null || _b === void 0 ? void 0 : _b.call(str, '/')) !== null && _c !== void 0 ? _c : '';
                    (_d = ref.get()) === null || _d === void 0 ? void 0 : _d.notify({
                        eventName: CreditCardView.expMonthChangedEvent,
                        object: ref.get(),
                        expMonth: ((_e = values === null || values === void 0 ? void 0 : values.length) !== null && _e !== void 0 ? _e : 0) > 0 ? values[0] : 0,
                    });
                    (_f = ref.get()) === null || _f === void 0 ? void 0 : _f.notify({
                        eventName: CreditCardView.expYearChangedEvent,
                        object: ref.get(),
                        expYear: ((_g = values === null || values === void 0 ? void 0 : values.length) !== null && _g !== void 0 ? _g : 0) === 2 ? values[1] : 0,
                    });
                }
            },
        }));
        (_c = this._widget) === null || _c === void 0 ? void 0 : _c.setCvcNumberTextWatcher(new android.text.TextWatcher({
            afterTextChanged(param0) { },
            beforeTextChanged(param0, param1, param2, param3) { },
            onTextChanged(param0, param1, param2, param3) {
                var _a;
                (_a = ref.get()) === null || _a === void 0 ? void 0 : _a.notify({
                    eventName: CreditCardView.cvcChangedEvent,
                    object: ref.get(),
                    cvc: typeof param0 === 'object' ? param0 === null || param0 === void 0 ? void 0 : param0.toString() : param0,
                });
            },
        }));
        (_d = this._widget) === null || _d === void 0 ? void 0 : _d.setPostalCodeTextWatcher(new android.text.TextWatcher({
            afterTextChanged(param0) { },
            beforeTextChanged(param0, param1, param2, param3) { },
            onTextChanged(param0, param1, param2, param3) {
                var _a;
                (_a = ref.get()) === null || _a === void 0 ? void 0 : _a.notify({
                    eventName: CreditCardView.postalCodeChangedEvent,
                    object: ref.get(),
                    postalCode: typeof param0 === 'object' ? param0 === null || param0 === void 0 ? void 0 : param0.toString() : param0,
                });
            },
        }));
        if (this.isUSZipRequired) {
            this._widget.setUsZipCodeRequired(true);
        }
        if (!this.showPostalCode) {
            this._widget.setPostalCodeRequired(false);
            if (android.os.Build.VERSION.SDK_INT < 21) {
                this._widget.setPostalCodeEnabled(false);
            }
            else {
                this._widget.setShouldShowPostalCode(false);
            }
        }
    }
    [showPostalCodeProperty.setNative](value) {
        if (this._widget) {
            this._widget.setPostalCodeRequired(value);
            if (android.os.Build.VERSION.SDK_INT < 21) {
                this._widget.setPostalCodeEnabled(value);
            }
            else {
                this._widget.setShouldShowPostalCode(value);
            }
        }
    }
    [isUSZipRequiredProperty.setNative](value) {
        if (this._widget) {
            this._widget.setUsZipCodeRequired(value);
        }
    }
    get cardParams() {
        const params = this._widget.getCardParams();
        if (!params) {
            return null;
        }
        return CardParams.fromNative(this._widget.getCardParams());
    }
}
export class PaymentMethod {
    static fromNative(native) {
        const pm = new PaymentMethod();
        pm.native = native;
        return pm;
    }
    get id() {
        return this.native.component1();
    }
    get created() {
        return new Date(this.native.component2().longValue() * 1000);
    }
    get type() {
        switch (this.native.component4()) {
            case com.stripe.android.model.PaymentMethod.Type.Alipay:
                return PaymentMethodType.Alipay;
            case com.stripe.android.model.PaymentMethod.Type.AuBecsDebit:
                return PaymentMethodType.AuBecsDebit;
            case com.stripe.android.model.PaymentMethod.Type.BacsDebit:
                return PaymentMethodType.BacsDebit;
            case com.stripe.android.model.PaymentMethod.Type.Bancontact:
                return PaymentMethodType.Bancontact;
            case com.stripe.android.model.PaymentMethod.Type.Card:
                return PaymentMethodType.Card;
            case com.stripe.android.model.PaymentMethod.Type.CardPresent:
                return PaymentMethodType.CardPresent;
            case com.stripe.android.model.PaymentMethod.Type.Eps:
                return PaymentMethodType.Eps;
            case com.stripe.android.model.PaymentMethod.Type.Fpx:
                return PaymentMethodType.Fpx;
            case com.stripe.android.model.PaymentMethod.Type.Giropay:
                return PaymentMethodType.Giropay;
            case com.stripe.android.model.PaymentMethod.Type.GrabPay:
                return PaymentMethodType.GrabPay;
            case com.stripe.android.model.PaymentMethod.Type.Ideal:
                return PaymentMethodType.Ideal;
            case com.stripe.android.model.PaymentMethod.Type.Oxxo:
                return PaymentMethodType.Oxxo;
            case com.stripe.android.model.PaymentMethod.Type.P24:
                return PaymentMethodType.P24;
            case com.stripe.android.model.PaymentMethod.Type.PayPal:
                return PaymentMethodType.PayPal;
            case com.stripe.android.model.PaymentMethod.Type.SepaDebit:
                return PaymentMethodType.SepaDebit;
            case com.stripe.android.model.PaymentMethod.Type.Sofort:
                return PaymentMethodType.Sofort;
        }
    }
    get billingDetails() {
        return this.native.component5();
    }
    get card() {
        return PaymentMethodCard.fromNative(this.native.component8());
    }
    get customerId() {
        return this.native.component6();
    }
    get metadata() {
        return this.native.component7();
    }
}
class StripeIntent {
    get id() {
        return this.native.getId();
    }
    get clientSecret() {
        return this.native.getClientSecret();
    }
    get description() {
        return this.native.getDescription();
    }
    get status() {
        switch (this.native.getStatus()) {
            case com.stripe.android.model.StripeIntent.Status.Canceled:
                return "canceled" /* Canceled */;
            case com.stripe.android.model.StripeIntent.Status.Processing:
                return "processing" /* Processing */;
            case com.stripe.android.model.StripeIntent.Status.RequiresAction:
                return "requires_action" /* RequiresAction */;
            case com.stripe.android.model.StripeIntent.Status.RequiresCapture:
                return "requires_capture" /* RequiresCapture */;
            case com.stripe.android.model.StripeIntent.Status.RequiresConfirmation:
                return "requires_confirmation" /* RequiresConfirmation */;
            case com.stripe.android.model.StripeIntent.Status.RequiresPaymentMethod:
                return "requires_payment_method" /* RequiresPaymentMethod */;
            case com.stripe.android.model.StripeIntent.Status.Succeeded:
                return "succeeded" /* Succeeded */;
        }
        return null;
    }
    get requiresAction() {
        return this.status === "requires_action" /* RequiresAction */;
    }
    get isSuccess() {
        return this.status === "succeeded" /* Succeeded */;
    }
    get requiresConfirmation() {
        return this.status === "requires_confirmation" /* RequiresConfirmation */;
    }
    get requiresCapture() {
        return this.status === "requires_capture" /* RequiresCapture */;
    }
}
export class StripePaymentIntent extends StripeIntent {
    static fromNative(native) {
        const pi = new StripePaymentIntent();
        pi.native = native;
        return pi;
    }
    static fromApi(json) {
        let native;
        if (typeof json === 'object') {
            if (json instanceof org.json.JSONObject) {
                native = com.stripe.android.model.PaymentIntent.Companion.fromJson(json);
            }
            else {
                // https://github.com/NativeScript/android-runtime/issues/1500
                // magic 😁
                // @ts-ignore
                native = com.stripe.android.model.PaymentIntent.Companion.fromJson(org.json.JSONObject.from(json));
            }
        }
        return StripePaymentIntent.fromNative(native);
    }
    get amount() {
        return this.native.getAmount().longValue();
    }
    get created() {
        const created = this.native.getCreated();
        // @ts-ignore
        if (created.longValue) {
            // @ts-ignore
            return new Date(created.longValue());
        }
        return new Date(created);
    }
    get currency() {
        return this.native.getCurrency();
    }
    get captureMethod() {
        switch (this.native.getCaptureMethod()) {
            case com.stripe.android.model.PaymentIntent.CaptureMethod.Automatic:
                return CaptureMethod.Automatic;
            case com.stripe.android.model.PaymentIntent.CaptureMethod.Manual:
                return CaptureMethod.Manual;
        }
        return null;
    }
}
export class StripePaymentIntentParams {
    get native() {
        if (this.sourceId) {
            return com.stripe.android.model.ConfirmPaymentIntentParams.createWithSourceId(this.sourceId, this.clientSecret, this.returnURL);
        }
        else if (this.paymentMethodId) {
            return com.stripe.android.model.ConfirmPaymentIntentParams.createWithPaymentMethodId(this.paymentMethodId, this.clientSecret, this.returnURL);
        }
        else {
            return com.stripe.android.model.ConfirmPaymentIntentParams.create(this.clientSecret);
        }
    }
}
export class StripeSetupIntentParams {
    constructor(paymentMethodId, clientSecret) {
        this.native = com.stripe.android.model.ConfirmSetupIntentParams.create(paymentMethodId, clientSecret);
    }
}
export class StripeSetupIntent extends StripeIntent {
    static fromNative(native) {
        const si = new StripeSetupIntent();
        si.native = native;
        return si;
    }
    get paymentMethodId() {
        return this.native.getPaymentMethodId();
    }
}
//# sourceMappingURL=index.android.js.map