import { GetBrand, SourceType, toCardFundingType, toSourceCard3DSecureStatus, toSourceFlow, toSourceRedirectStatus, toSourceStatus, toSourceType, toSourceUsage, toSourceVerificationStatus } from '../common';
import { Address } from '../';
export class SourceCardDetails {
    constructor(details) {
        this.android = details;
        this.brand = GetBrand(details.getBrand());
        this.country = details.getCountry();
        this.expMonth = details.getExpiryMonth().intValue();
        this.expYear = details.getExpiryYear().intValue();
        this.funding = toCardFundingType(details.getFunding());
        this.last4 = details.getLast4();
        this.dynamicLast4 = details.getDynamicLast4();
        this.threeDSecureUsage = toSourceCard3DSecureStatus(details.getThreeDSecureStatus());
    }
    static fromNative(details) {
        if (!details) {
            return undefined;
        }
        return new SourceCardDetails(details);
    }
}
export class SourceKlarnaDetails {
    constructor(source) {
        this.clientToken = source.getClientToken();
        this.purchaseCountry = source.getPurchaseCountry();
    }
    static fromNative(source) {
        if (!source) {
            return undefined;
        }
        return new SourceKlarnaDetails(source);
    }
}
export class SourceOwner {
    constructor(owner) {
        // @ts-ignore
        this.address = Address.fromNative(owner.getAddress());
        this.email = owner.getEmail();
        this.name = owner.getName();
        this.phone = owner.getPhone();
        // @ts-ignore
        this.verifiedAddress = Address.fromNative(owner.getVerifiedAddress());
        this.verifiedEmail = owner.getVerifiedEmail();
        this.verifiedName = owner.getVerifiedName();
        this.verifiedPhone = owner.getVerifiedPhone();
    }
    static fromNative(owner) {
        if (!owner) {
            return undefined;
        }
        return new SourceOwner(owner);
    }
}
export class SourceReceiver {
    constructor(receiver) {
        this.address = receiver.getAddress();
        this.amountCharged = receiver.getAmountCharged();
        this.amountReceived = receiver.getAmountReceived();
        this.amountReturned = receiver.getAmountReturned();
    }
    static fromNative(receiver) {
        if (!receiver) {
            return undefined;
        }
        return new SourceReceiver(receiver);
    }
}
export class SourceRedirect {
    constructor(redirect) {
        this.android = redirect;
        this.url = redirect.getUrl();
        this.returnURL = redirect.getReturnUrl();
        this.status = toSourceRedirectStatus(redirect.getStatus());
    }
    static fromNative(redirect) {
        if (!redirect) {
            return undefined;
        }
        return new SourceRedirect(redirect);
    }
}
export class SourceSEPADebitDetails {
    constructor(details) {
        this.android = details;
        this.bankCode = details.getBankCode();
        this.country = details.getCountry();
        this.fingerprint = details.getFingerPrint();
        this.last4 = details.getLast4();
        this.mandateReference = details.getMandateReference();
        this.mandateURL = details.getMandateUrl();
    }
    static fromNative(details) {
        if (!details) {
            return undefined;
        }
        return new SourceSEPADebitDetails(details);
    }
}
export class SourceVerification {
    constructor(verification) {
        this.attemptsRemaining = verification.getAttemptsRemaining();
        this.status = toSourceVerificationStatus(verification.getStatus());
    }
    static fromNative(verification) {
        if (!verification) {
            return undefined;
        }
        return new SourceVerification(verification);
    }
}
export class SourceWeChatPayDetails {
    constructor(details) {
        this.weChatAppURL = details.getQrCodeUrl();
    }
    static fromNative(details) {
        if (!details) {
            return undefined;
        }
        return new SourceWeChatPayDetails(details);
    }
}
export class Source {
    constructor(source) {
        var _a;
        this.android = source;
        const amount = source.getAmount();
        this.amount = (_a = amount === null || amount === void 0 ? void 0 : amount.longValue()) !== null && _a !== void 0 ? _a : Number(amount);
        const type = source.getSourceTypeModel();
        if (type instanceof com.stripe.android.model.SourceTypeModel.Card) {
            this.cardDetails = SourceCardDetails.fromNative(type);
        }
        else if (type instanceof com.stripe.android.model.SourceTypeModel.SepaDebit) {
            this.sepaDebitDetails = SourceSEPADebitDetails.fromNative(type);
        }
        this.clientSecret = source.getClientSecret();
        this.created = new Date(source.getCreated().longValue());
        this.currency = source.getCurrency();
        this.flow = toSourceFlow(source.getFlow());
        this.ios = source.getId();
        this.type = toSourceType(source.getType());
        if (this.type === SourceType.Klarna) {
            this.klarnaDetails = SourceKlarnaDetails.fromNative(source.getKlarna());
        }
        this.liveMode = source.isLiveMode().booleanValue();
        this.owner = SourceOwner.fromNative(source.getOwner());
        this.receiver = SourceReceiver.fromNative(source.getReceiver());
        this.redirect = SourceRedirect.fromNative(source.getRedirect());
        this.status = toSourceStatus(source.getStatus());
        this.usage = toSourceUsage(source.getUsage());
        this.verification = SourceVerification.fromNative(source.getCodeVerification());
        if (this.type === SourceType.WeChatPay) {
            this.weChatPayDetails = SourceWeChatPayDetails.fromNative(source.getWeChat());
        }
    }
    static fromNative(source) {
        return new Source(source);
    }
}
//# sourceMappingURL=index.android.js.map