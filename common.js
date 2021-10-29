import { booleanConverter, Property, View } from '@nativescript/core';
export class CreditCardViewBase extends View {
}
CreditCardViewBase.numberChangedEvent = 'numberChanged';
CreditCardViewBase.expMonthChangedEvent = 'expMonthChanged';
CreditCardViewBase.expYearChangedEvent = 'expYearChanged';
CreditCardViewBase.cvcChangedEvent = 'cvcChanged';
CreditCardViewBase.postalCodeChangedEvent = 'postalCodeChanged';
export const showPostalCodeProperty = new Property({
    name: 'showPostalCode',
    defaultValue: true,
    valueConverter: booleanConverter,
});
showPostalCodeProperty.register(CreditCardViewBase);
export const isUSZipRequiredProperty = new Property({
    name: 'isUSZipRequired',
    defaultValue: false,
    valueConverter: booleanConverter,
});
isUSZipRequiredProperty.register(CreditCardViewBase);
export class CardMultilineWidgetBase extends CreditCardViewBase {
}
export function toPaymentMethodCardChecks(check) {
    if (global.isIOS) {
        switch (check) {
            case STPPaymentMethodCardCheckResult.Pass:
                return PaymentMethodCardCheckResult.Pass;
            case STPPaymentMethodCardCheckResult.Failed:
                return PaymentMethodCardCheckResult.Failed;
            case STPPaymentMethodCardCheckResult.Unavailable:
                return PaymentMethodCardCheckResult.Unavailable;
            case STPPaymentMethodCardCheckResult.Unchecked:
                return PaymentMethodCardCheckResult.Unchecked;
            default:
                return PaymentMethodCardCheckResult.Unknown;
        }
    }
    /* https://stripe.com/docs/api/payment_methods/object#payment_method_object-card-checks */
    if (global.isAndroid) {
        switch (check) {
            case 'pass':
                return PaymentMethodCardCheckResult.Pass;
            case 'failed':
                return PaymentMethodCardCheckResult.Failed;
            case 'unavailable':
                return PaymentMethodCardCheckResult.Unavailable;
            case 'unchecked':
                return PaymentMethodCardCheckResult.Unchecked;
            default:
                return PaymentMethodCardCheckResult.Unknown;
        }
    }
}
export function toPaymentMethodCardWalletType(type) {
    if (global.isIOS) {
        switch (type) {
            case STPPaymentMethodCardWalletType.AmexExpressCheckout:
                return PaymentMethodCardWalletType.AmexExpressCheckout;
            case STPPaymentMethodCardWalletType.ApplePay:
                return PaymentMethodCardWalletType.ApplePay;
            case STPPaymentMethodCardWalletType.GooglePay:
                return PaymentMethodCardWalletType.GooglePay;
            case STPPaymentMethodCardWalletType.Masterpass:
                return PaymentMethodCardWalletType.Masterpass;
            case STPPaymentMethodCardWalletType.SamsungPay:
                return PaymentMethodCardWalletType.SamsungPay;
            case STPPaymentMethodCardWalletType.VisaCheckout:
                return PaymentMethodCardWalletType.VisaCheckout;
            default:
                return PaymentMethodCardWalletType.Unknown;
        }
    }
}
export function toCardFundingType(type) {
    if (global.isIOS) {
        switch (type) {
            case STPCardFundingType.Credit:
                return CardFundingType.Credit;
            case STPCardFundingType.Debit:
                return CardFundingType.Debit;
            case STPCardFundingType.Prepaid:
                return CardFundingType.Prepaid;
            case STPCardFundingType.Other:
                return CardFundingType.Other;
        }
    }
    if (global.isAndroid) {
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
}
export function toSourceCard3DSecureStatus(status) {
    if (global.isIOS) {
        switch (status) {
            case STPSourceCard3DSecureStatus.NotSupported:
                return SourceCard3DSecureStatus.NotSupported;
            case STPSourceCard3DSecureStatus.Optional:
                return SourceCard3DSecureStatus.Optional;
            case STPSourceCard3DSecureStatus.Recommended:
                return SourceCard3DSecureStatus.Recommended;
            case STPSourceCard3DSecureStatus.Required:
                return SourceCard3DSecureStatus.Required;
            case STPSourceCard3DSecureStatus.Unknown:
                return SourceCard3DSecureStatus.Unknown;
        }
    }
    if (global.isAndroid) {
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
}
export function toSourceVerificationStatus(status) {
    if (global.isIOS) {
        switch (status) {
            case STPSourceVerificationStatus.Failed:
                return SourceVerificationStatus.Failed;
            case STPSourceVerificationStatus.Pending:
                return SourceVerificationStatus.Pending;
            case STPSourceVerificationStatus.Succeeded:
                return SourceVerificationStatus.Succeeded;
            case STPSourceVerificationStatus.Unknown:
                return SourceVerificationStatus.Unknown;
        }
    }
    if (global.isAndroid) {
        switch (status) {
            case com.stripe.android.model.Source.CodeVerification.Status.Failed:
                return SourceVerificationStatus.Failed;
            case com.stripe.android.model.Source.CodeVerification.Status.Pending:
                return SourceVerificationStatus.Pending;
            case com.stripe.android.model.Source.CodeVerification.Status.Succeeded:
                return SourceVerificationStatus.Succeeded;
            default:
                return SourceVerificationStatus.Unknown;
        }
    }
}
export function toSourceRedirectStatus(redirectStatus) {
    if (global.isIOS) {
        switch (redirectStatus) {
            case STPSourceRedirectStatus.Failed:
                return SourceRedirectStatus.Failed;
            case STPSourceRedirectStatus.NotRequired:
                return SourceRedirectStatus.NotRequired;
            case STPSourceRedirectStatus.Pending:
                return SourceRedirectStatus.Pending;
            case STPSourceRedirectStatus.Succeeded:
                return SourceRedirectStatus.Succeeded;
            case STPSourceRedirectStatus.Unknown:
                return SourceRedirectStatus.Unknown;
        }
    }
    if (global.isAndroid) {
        switch (redirectStatus) {
            case com.stripe.android.model.Source.Redirect.Status.Failed:
                return SourceRedirectStatus.Failed;
            case com.stripe.android.model.Source.Redirect.Status.NotRequired:
                return SourceRedirectStatus.NotRequired;
            case com.stripe.android.model.Source.Redirect.Status.Pending:
                return SourceRedirectStatus.Pending;
            case com.stripe.android.model.Source.Redirect.Status.Succeeded:
                return SourceRedirectStatus.Succeeded;
            default:
                return SourceRedirectStatus.Unknown;
        }
    }
}
export function toSourceType(type) {
    if (global.isIOS) {
        switch (type) {
            case STPSourceType.Alipay:
                return SourceType.Alipay;
            case STPSourceType.Bancontact:
                return SourceType.Bancontact;
            case STPSourceType.Card:
                return SourceType.Card;
            case STPSourceType.EPS:
                return SourceType.EPS;
            case STPSourceType.Giropay:
                return SourceType.Giropay;
            case STPSourceType.IDEAL:
                return SourceType.IDEAL;
            case STPSourceType.Klarna:
                return SourceType.Klarna;
            case STPSourceType.Multibanco:
                return SourceType.Multibanco;
            case STPSourceType.P24:
                return SourceType.P24;
            case STPSourceType.SEPADebit:
                return SourceType.SEPADebit;
            case STPSourceType.Sofort:
                return SourceType.Sofort;
            case STPSourceType.ThreeDSecure:
                return SourceType.ThreeDSecure;
            case STPSourceType.Unknown:
                return SourceType.Unknown;
            case STPSourceType.WeChatPay:
                return SourceType.WeChatPay;
        }
    }
    if (global.isAndroid) {
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
}
export function toSourceUsage(usage) {
    if (global.isIOS) {
        switch (usage) {
            case STPSourceUsage.Reusable:
                return SourceUsage.Reusable;
            case STPSourceUsage.SingleUse:
                return SourceUsage.SingleUse;
            case STPSourceUsage.Unknown:
                return SourceUsage.Unknown;
        }
    }
    if (global.isAndroid) {
        switch (usage) {
            case com.stripe.android.model.Source.Usage.Reusable:
                return SourceUsage.Reusable;
            case com.stripe.android.model.Source.Usage.SingleUse:
                return SourceUsage.SingleUse;
            default:
                return SourceUsage.Unknown;
        }
    }
}
export function toSourceFlow(flow) {
    if (global.isIOS) {
        switch (flow) {
            case STPSourceFlow.None:
                return SourceFlow.None;
            case STPSourceFlow.CodeVerification:
                return SourceFlow.CodeVerification;
            case STPSourceFlow.Receiver:
                return SourceFlow.Receiver;
            case STPSourceFlow.Redirect:
                return SourceFlow.Redirect;
        }
    }
    if (global.isAndroid) {
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
}
export function toSourceStatus(status) {
    if (global.isIOS) {
        switch (status) {
            case STPSourceStatus.Canceled:
                return SourceStatus.Canceled;
            case STPSourceStatus.Chargeable:
                return SourceStatus.Chargeable;
            case STPSourceStatus.Consumed:
                return SourceStatus.Consumed;
            case STPSourceStatus.Failed:
                return SourceStatus.Failed;
            case STPSourceStatus.Pending:
                return SourceStatus.Pending;
        }
    }
    if (global.isAndroid) {
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
}
export var PaymentMethodCardCheckResult;
(function (PaymentMethodCardCheckResult) {
    PaymentMethodCardCheckResult["Pass"] = "pass";
    PaymentMethodCardCheckResult["Failed"] = "failed";
    PaymentMethodCardCheckResult["Unavailable"] = "unavailable";
    PaymentMethodCardCheckResult["Unchecked"] = "unchecked";
    PaymentMethodCardCheckResult["Unknown"] = "unknown";
})(PaymentMethodCardCheckResult || (PaymentMethodCardCheckResult = {}));
export var PaymentMethodCardWalletType;
(function (PaymentMethodCardWalletType) {
    PaymentMethodCardWalletType["AmexExpressCheckout"] = "amexExpressCheckout";
    PaymentMethodCardWalletType["ApplePay"] = "applePay";
    PaymentMethodCardWalletType["GooglePay"] = "googlePay";
    PaymentMethodCardWalletType["Masterpass"] = "masterpass";
    PaymentMethodCardWalletType["SamsungPay"] = "samsungPay";
    PaymentMethodCardWalletType["VisaCheckout"] = "visaCheckout";
    PaymentMethodCardWalletType["Unknown"] = "unknown";
})(PaymentMethodCardWalletType || (PaymentMethodCardWalletType = {}));
export function GetBrand(brand) {
    if (global.isAndroid) {
        switch (brand) {
            case com.stripe.android.model.CardBrand.AmericanExpress:
                return CardBrand.AmericanExpress;
            case com.stripe.android.model.CardBrand.Discover:
                return CardBrand.Discover;
            case com.stripe.android.model.CardBrand.JCB:
                return CardBrand.JCB;
            case com.stripe.android.model.CardBrand.DinersClub:
                return CardBrand.DinersClub;
            case com.stripe.android.model.CardBrand.Visa:
                return CardBrand.Visa;
            case com.stripe.android.model.CardBrand.MasterCard:
                return CardBrand.MasterCard;
            case com.stripe.android.model.CardBrand.UnionPay:
                return CardBrand.UnionPay;
            default:
                return CardBrand.Unknown;
        }
    }
    if (global.isIOS) {
        switch (brand) {
            case STPCardBrand.Amex:
                return CardBrand.AmericanExpress;
            case STPCardBrand.Discover:
                return CardBrand.Discover;
            case STPCardBrand.JCB:
                return CardBrand.JCB;
            case STPCardBrand.DinersClub:
                return CardBrand.DinersClub;
            case STPCardBrand.Visa:
                return CardBrand.Visa;
            case STPCardBrand.MasterCard:
                return CardBrand.MasterCard;
            case STPCardBrand.UnionPay:
                return CardBrand.UnionPay;
            default:
                return CardBrand.Unknown;
        }
    }
}
export var CardBrand;
(function (CardBrand) {
    CardBrand["AmericanExpress"] = "amex";
    CardBrand["Discover"] = "discover";
    CardBrand["JCB"] = "jcb";
    CardBrand["DinersClub"] = "diners";
    CardBrand["Visa"] = "visa";
    CardBrand["MasterCard"] = "mastercard";
    CardBrand["UnionPay"] = "unionpay";
    CardBrand["Unknown"] = "unknown";
})(CardBrand || (CardBrand = {}));
export var CardFunding;
(function (CardFunding) {
    CardFunding["Credit"] = "credit";
    CardFunding["Debit"] = "debit";
    CardFunding["Prepaid"] = "prepaid";
    CardFunding["Unknown"] = "unknown";
})(CardFunding || (CardFunding = {}));
export var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["Card"] = "card";
    PaymentMethodType["CardPresent"] = "cardPresent";
    PaymentMethodType["Fpx"] = "fpx";
    PaymentMethodType["Ideal"] = "ideal";
    PaymentMethodType["SepaDebit"] = "sepaDebit";
    PaymentMethodType["AuBecsDebit"] = "auBecsDebit";
    PaymentMethodType["BacsDebit"] = "bacsDebit";
    PaymentMethodType["Sofort"] = "sofort";
    PaymentMethodType["P24"] = "p24";
    PaymentMethodType["Bancontact"] = "bancontact";
    PaymentMethodType["Giropay"] = "giropay";
    PaymentMethodType["Eps"] = "eps";
    PaymentMethodType["Oxxo"] = "oxxo";
    PaymentMethodType["Alipay"] = "alipay";
    PaymentMethodType["GrabPay"] = "grabPay";
    PaymentMethodType["PayPal"] = "payPal";
    PaymentMethodType["Unknown"] = "unknown";
})(PaymentMethodType || (PaymentMethodType = {}));
export var CaptureMethod;
(function (CaptureMethod) {
    CaptureMethod["Automatic"] = "automatic";
    CaptureMethod["Manual"] = "manual";
})(CaptureMethod || (CaptureMethod = {}));
export var SourceFlow;
(function (SourceFlow) {
    SourceFlow["Redirect"] = "redirect";
    SourceFlow["Receiver"] = "receiver";
    SourceFlow["CodeVerification"] = "codeVerification";
    SourceFlow["None"] = "none";
})(SourceFlow || (SourceFlow = {}));
export var SourceStatus;
(function (SourceStatus) {
    SourceStatus["Canceled"] = "canceled";
    SourceStatus["Chargeable"] = "chargeable";
    SourceStatus["Consumed"] = "consumed";
    SourceStatus["Failed"] = "failed";
    SourceStatus["Pending"] = "pending";
})(SourceStatus || (SourceStatus = {}));
export var CardFundingType;
(function (CardFundingType) {
    CardFundingType["Debit"] = "debit";
    CardFundingType["Credit"] = "credit";
    CardFundingType["Prepaid"] = "prepaid";
    CardFundingType["Other"] = "other";
})(CardFundingType || (CardFundingType = {}));
export var SourceCard3DSecureStatus;
(function (SourceCard3DSecureStatus) {
    SourceCard3DSecureStatus["Required"] = "required";
    SourceCard3DSecureStatus["Optional"] = "optional";
    SourceCard3DSecureStatus["NotSupported"] = "notSupported";
    SourceCard3DSecureStatus["Recommended"] = "recommended";
    SourceCard3DSecureStatus["Unknown"] = "unknown";
})(SourceCard3DSecureStatus || (SourceCard3DSecureStatus = {}));
export var SourceRedirectStatus;
(function (SourceRedirectStatus) {
    SourceRedirectStatus["Pending"] = "pending";
    SourceRedirectStatus["Succeeded"] = "succeeded";
    SourceRedirectStatus["Failed"] = "failed";
    SourceRedirectStatus["NotRequired"] = "notRequired";
    SourceRedirectStatus["Unknown"] = "unknown";
})(SourceRedirectStatus || (SourceRedirectStatus = {}));
export var SourceType;
(function (SourceType) {
    SourceType["Bancontact"] = "bancontact";
    SourceType["Card"] = "card";
    SourceType["Giropay"] = "giropay";
    SourceType["IDEAL"] = "ideal";
    SourceType["SEPADebit"] = "sepaDebit";
    SourceType["Sofort"] = "sofor";
    SourceType["ThreeDSecure"] = "threeDSecure";
    SourceType["Alipay"] = "alipay";
    SourceType["P24"] = "p24";
    SourceType["EPS"] = "eps";
    SourceType["Multibanco"] = "multibanco";
    SourceType["WeChatPay"] = "wechatPay";
    SourceType["Klarna"] = "klarna";
    SourceType["Unknown"] = "unknown";
})(SourceType || (SourceType = {}));
export var SourceUsage;
(function (SourceUsage) {
    SourceUsage["Reusable"] = "reusable";
    SourceUsage["SingleUse"] = "singleUser";
    SourceUsage["Unknown"] = "unknown";
})(SourceUsage || (SourceUsage = {}));
export var SourceVerificationStatus;
(function (SourceVerificationStatus) {
    SourceVerificationStatus["Pending"] = "pending";
    SourceVerificationStatus["Succeeded"] = "succeeded";
    SourceVerificationStatus["Failed"] = "failed";
    SourceVerificationStatus["Unknown"] = "unknown";
})(SourceVerificationStatus || (SourceVerificationStatus = {}));
export var BankAccountHolderType;
(function (BankAccountHolderType) {
    BankAccountHolderType["Individual"] = "individual";
    BankAccountHolderType["Company"] = "company";
})(BankAccountHolderType || (BankAccountHolderType = {}));
export var BankAccountStatus;
(function (BankAccountStatus) {
    BankAccountStatus["New"] = "new";
    BankAccountStatus["Validated"] = "validated";
    BankAccountStatus["Verified"] = "verified";
    BankAccountStatus["VerificationFailed"] = "verificationFailed";
    BankAccountStatus["Errored"] = "errored";
})(BankAccountStatus || (BankAccountStatus = {}));
//# sourceMappingURL=common.js.map