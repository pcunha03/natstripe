import { CardBrand, GetBrand } from '../common';
import { StripeStandardPaymentMethodType } from './common';
export { StripeStandardPaymentMethodType };
export class StripeStandardConfig {
    constructor() {
        this.enableCardScanning = false;
        this.allowedPaymentMethodTypes = [StripeStandardPaymentMethodType.Card, StripeStandardPaymentMethodType.ApplePay];
    }
    get native() {
        // getter gives client a chance to set properties before using.
        if (!this.publishableKey)
            throw new Error('publishableKey must be set');
        let config = STPPaymentConfiguration.sharedConfiguration;
        STPAPIClient.sharedClient.publishableKey = this.publishableKey;
        config.appleMerchantIdentifier = this.appleMerchantID;
        config.requiredBillingAddressFields = this.requiredBillingAddressFields;
        config.cardScanningEnabled = this.enableCardScanning;
        if (this.stripeAccountId) {
            STPAPIClient.sharedClient.stripeAccount = this.stripeAccountId;
        }
        if (this.requiredShippingAddressFields && this.requiredShippingAddressFields.length > 0) {
            let fields = new NSMutableSet({ capacity: 4 });
            this.requiredShippingAddressFields.forEach((f) => {
                switch (f) {
                    case "name" /* Name */:
                        fields.addObject(STPContactField.name);
                        break;
                    case "address" /* PostalAddress */:
                        fields.addObject(STPContactField.postalAddress);
                        break;
                    case "phone" /* Phone */:
                        fields.addObject(STPContactField.phoneNumber);
                        break;
                    case "email" /* Email */:
                        fields.addObject(STPContactField.emailAddress);
                        break;
                }
            });
            config.requiredShippingAddressFields = fields;
        }
        else {
            config.requiredShippingAddressFields = undefined;
        }
        config.companyName = this.companyName;
        return config;
    }
    static get shared() {
        if (!this._instance) {
            this._instance = new StripeStandardConfig();
        }
        return this._instance;
    }
}
export class StripeStandardCustomerSession {
    constructor() {
        this.native = STPCustomerContext.alloc().initWithKeyProvider(StripeKeyProvider.new());
    }
}
var StripeKeyProvider = /** @class */ (function (_super) {
    __extends(StripeKeyProvider, _super);
    function StripeKeyProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripeKeyProvider.new = function () {
        return _super.new.call(this);
    };
    StripeKeyProvider.prototype.createCustomerKeyWithAPIVersionCompletion = function (apiVersion, completion) {
        StripeStandardConfig.shared.backendAPI
            .createCustomerKey(apiVersion)
            .then(function (key) {
            completion(key, null);
        })
            .catch(function (e) {
            completion(null, createError('CustomerKey', 500, e));
        });
    };
    StripeKeyProvider = __decorate([
        ObjCClass(STPCustomerEphemeralKeyProvider)
    ], StripeKeyProvider);
    return StripeKeyProvider;
}(NSObject));
export class StripeStandardPaymentSession {
    constructor(page, customerSession, amount, currency, listener, prefilledAddress) {
        this.page = page;
        StripeStandardConfig.shared.allowedPaymentMethodTypes.forEach((type) => {
            switch (type) {
                case StripeStandardPaymentMethodType.ApplePay:
                    StripeStandardConfig.shared.native.applePayEnabled = true;
                    break;
                case StripeStandardPaymentMethodType.Fpx:
                    StripeStandardConfig.shared.native.fpxEnabled = true;
                    break;
            }
        });
        this.native = STPPaymentContext.alloc().initWithCustomerContextConfigurationTheme(customerSession.native, StripeStandardConfig.shared.native, STPTheme.defaultTheme);
        this.native.prefilledInformation = STPUserInformation.alloc().init();
        if (prefilledAddress) {
            const addr = STPAddress.alloc().init();
            addr.name = prefilledAddress.name;
            addr.line1 = prefilledAddress.line1;
            addr.line2 = prefilledAddress.line2;
            addr.city = prefilledAddress.city;
            addr.state = prefilledAddress.state;
            addr.country = prefilledAddress.country;
            addr.postalCode = prefilledAddress.postalCode;
            addr.phone = prefilledAddress.phone;
            addr.email = prefilledAddress.email;
            this.native.prefilledInformation.shippingAddress = addr;
        }
        this.native.paymentAmount = amount;
        this.native.paymentCurrency = currency;
        if (listener) {
            this.delegate = StripePaymentDelegate.create(this, listener);
            this.native.delegate = this.delegate;
        }
    }
    /** Is the Stripe native component loading? */
    get loading() {
        return this.native.loading;
    }
    get isPaymentReady() {
        return this.native.selectedPaymentOption != null;
    }
    get paymentInProgress() {
        return this._paymentInProgress;
    }
    /** Total amount (including shipping) in pennies. */
    get amount() {
        return this.native.paymentAmount;
    }
    get selectedPaymentMethod() {
        return createPaymentMethod(this.native);
    }
    get selectedShippingMethod() {
        return createShippingMethod(this.native);
    }
    get shippingAddress() {
        return createAddress(this.native.shippingAddress);
    }
    /**
     * Makes sure the hostViewController is set.
     * For reasons TBD, setting hostViewController in an ngOnInit() results
     * in infinite recursion. So to make life easier for clients, set the controller here.
     */
    ensureHostViewController() {
        if (!this.native.hostViewController)
            this.native.hostViewController = this.page.ios;
    }
    requestPayment() {
        this.ensureHostViewController();
        this._paymentInProgress = true;
        this.native.requestPayment();
    }
    presentPaymentMethods() {
        this.ensureHostViewController();
        this.native.presentPaymentOptionsViewController();
    }
    presentShipping() {
        this.ensureHostViewController();
        this.native.presentShippingViewController();
    }
}
var StripePaymentDelegate = /** @class */ (function (_super) {
    __extends(StripePaymentDelegate, _super);
    function StripePaymentDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripePaymentDelegate.create = function (parent, listener) {
        var self = _super.new.call(this);
        self.parent = parent;
        self.listener = listener;
        return self;
    };
    StripePaymentDelegate.prototype.paymentContextDidChange = function (paymentContext) {
        var data = {
            isReadyToCharge: paymentContext.selectedPaymentOption != null,
            paymentMethod: createPaymentMethod(paymentContext),
            shippingInfo: createShippingMethod(paymentContext),
            shippingAddress: createAddress(paymentContext.shippingAddress),
        };
        this.listener.onPaymentDataChanged(data);
    };
    StripePaymentDelegate.prototype.paymentContextDidCreatePaymentResultCompletion = function (paymentContext, paymentResult, completion) {
        StripeStandardConfig.shared.backendAPI
            .capturePayment(paymentResult.paymentMethod.stripeId, paymentContext.paymentAmount, createShippingMethod(paymentContext), createAddress(paymentContext.shippingAddress))
            .then(function (value) {
            completion(STPPaymentStatus.Success, null);
        })
            .catch(function (e) {
            completion(null, createError('PaymentError', 100, e));
        });
    };
    StripePaymentDelegate.prototype.paymentContextDidFailToLoadWithError = function (paymentContext, error) {
        this.listener.onError(error.code, error.localizedDescription);
    };
    StripePaymentDelegate.prototype.paymentContextDidFinishWithError = function (paymentContext, status, error) {
        this.parent._paymentInProgress = false;
        switch (status) {
            case STPPaymentStatus.Error:
                if (this.listener.onError)
                    this.listener.onError(error.code, error.localizedDescription);
                break;
            case STPPaymentStatus.Success:
                if (this.listener.onPaymentSuccess)
                    this.listener.onPaymentSuccess();
                break;
            case STPPaymentStatus.UserCancellation:
                if (this.listener.onUserCancelled)
                    this.listener.onUserCancelled();
                break;
        }
    };
    StripePaymentDelegate.prototype.paymentContextDidUpdateShippingAddressCompletion = function (_paymentContext, address, completion) {
        var jsAddress = createAddress(address);
        var methods = this.listener.provideShippingMethods(jsAddress);
        var isValid = this.listener.provideShippingInformationValidation(jsAddress);
        var errorMessage = this.listener.provideShippingInformationValidationErrorMessage(jsAddress);
        if (!methods) {
            completion(STPShippingStatus.Invalid, createError('ShippingError', 120, 'No shipping methods'), null, null);
        }
        else if (!isValid) {
            completion(STPShippingStatus.Invalid, createError('ShippingError', 123, errorMessage), null, null);
        }
        else {
            var sh_1 = NSMutableArray.alloc().init();
            methods.shippingMethods.forEach(function (m) { return sh_1.addObject(createPKShippingMethod(m)); });
            completion(STPShippingStatus.Valid, null, sh_1, createPKShippingMethod(methods.selectedShippingMethod));
        }
    };
    StripePaymentDelegate = __decorate([
        ObjCClass(STPPaymentContextDelegate)
    ], StripePaymentDelegate);
    return StripePaymentDelegate;
}(NSObject));
function createError(domain, code, error) {
    let userInfo = NSMutableDictionary.alloc().init();
    userInfo.setValueForKey(error, NSLocalizedDescriptionKey);
    return new NSError({
        domain: domain,
        code: code,
        userInfo: userInfo,
    });
}
function createPaymentMethod(paymentContext) {
    if (!paymentContext.selectedPaymentOption)
        return undefined;
    const pmt = paymentContext.selectedPaymentOption;
    if (pmt.isKindOfClass(STPApplePayPaymentOption)) {
        return createPaymentMethodFromApplePay(pmt);
    }
    else if (pmt) {
        const pm = pmt;
        if (pm.type === 0 /* Card */) {
            return createPaymentMethodFromCard(pm);
        }
        else if (pm.type === 4 /* FPX */) {
            return createPaymentMethodFromFpx(pm);
        }
    }
    return { label: 'Error (103)', image: undefined, templateImage: undefined };
}
function createPaymentMethodFromApplePay(applePay) {
    return {
        label: applePay.label,
        image: applePay.image,
        templateImage: applePay.templateImage,
        type: StripeStandardPaymentMethodType.ApplePay,
        stripeID: undefined,
        brand: undefined,
    };
}
function createPaymentMethodFromFpx(method) {
    const brand = method.fpx.bank;
    const name = STPFPXBank.stringFrom(brand);
    const code = STPFPXBank.bankCodeFrom(brand, false);
    return {
        label: method.label,
        image: STPImageLibrary.brandImageForFPXBankBrand(brand),
        templateImage: undefined,
        type: StripeStandardPaymentMethodType.Fpx,
        stripeID: undefined,
        brand: code,
    };
}
function createPaymentMethodFromCard(pmt) {
    let image = null;
    switch (GetBrand(pmt.card.brand)) {
        case CardBrand.AmericanExpress:
            image = STPImageLibrary.amexCardImage();
            break;
        case CardBrand.DinersClub:
            image = STPImageLibrary.dinersClubCardImage();
            break;
        case CardBrand.Discover:
            image = STPImageLibrary.discoverCardImage();
            break;
        case CardBrand.JCB:
            image = STPImageLibrary.jcbCardImage();
            break;
        case CardBrand.MasterCard:
            image = STPImageLibrary.mastercardCardImage();
            break;
        case CardBrand.UnionPay:
            image = STPImageLibrary.unionPayCardImage();
            break;
        case CardBrand.Visa:
            image = STPImageLibrary.visaCardImage();
            break;
        default:
            image = STPImageLibrary.unknownCardCardImage();
            break;
    }
    return {
        label: pmt.label,
        image,
        templateImage: pmt.templateImage,
        type: StripeStandardPaymentMethodType.Card,
        stripeID: pmt.stripeId,
        brand: GetBrand(pmt.card.brand),
    };
}
function createShippingMethod(paymentContext) {
    if (!paymentContext.selectedShippingMethod)
        return undefined;
    return {
        currency: paymentContext.paymentCurrency,
        amount: paymentContext.selectedShippingMethod.amount.doubleValue * 100,
        detail: paymentContext.selectedShippingMethod.detail,
        label: paymentContext.selectedShippingMethod.label,
        identifier: paymentContext.selectedShippingMethod.identifier,
    };
}
function createPKShippingMethod(method) {
    let m = PKShippingMethod.alloc().init();
    m.amount = NSDecimalNumber.alloc().initWithDouble(method.amount / 100);
    m.detail = method.detail;
    m.label = method.label;
    m.identifier = method.identifier;
    return m;
}
function createAddress(address) {
    if (!address)
        return undefined;
    return {
        name: address.name,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        phone: address.phone,
        email: address.email,
    };
}
//# sourceMappingURL=index.ios.js.map