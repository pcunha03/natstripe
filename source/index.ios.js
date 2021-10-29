import { GetBrand, toCardFundingType, toSourceCard3DSecureStatus, toSourceFlow, toSourceRedirectStatus, toSourceStatus, toSourceType, toSourceUsage, toSourceVerificationStatus } from '../common';
import { Address } from '../';
import { toJSON } from '../utils';
export class SourceCardDetails {
    constructor(source) {
        this.brand = GetBrand(source.brand);
        this.country = source.country;
        this.expMonth = source.expMonth;
        this.expYear = source.expYear;
        this.funding = toCardFundingType(source.funding);
        this.isApplePayCard = source.isApplePayCard;
        this.last4 = source.last4;
        this.threeDSecureUsage = toSourceCard3DSecureStatus(source.threeDSecure);
        this.ios = source;
    }
    static fromNative(source) {
        if (!source) {
            return undefined;
        }
        return new SourceCardDetails(source);
    }
}
export class SourceKlarnaDetails {
    constructor(source) {
        this.clientToken = source.clientToken;
        this.purchaseCountry = source.purchaseCountry;
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
        this.address = Address.fromNative(owner.address);
        this.email = owner.email;
        this.name = owner.name;
        this.phone = owner.phone;
        // @ts-ignore
        this.verifiedAddress = Address.fromNative(owner.verifiedAddress);
        this.verifiedEmail = owner.verifiedEmail;
        this.verifiedName = owner.verifiedName;
        this.verifiedPhone = owner.verifiedPhone;
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
        this.address = receiver.address;
        this.amountCharged = receiver.amountCharged;
        this.amountReceived = receiver.amountReceived;
        this.amountReturned = receiver.amountReturned;
        this.apiResponse = toJSON(receiver.allResponseFields);
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
        this.returnURL = redirect.returnURL.absoluteString;
        this.status = toSourceRedirectStatus(redirect.status);
        this.url = redirect.url.absoluteString;
        this.ios = redirect;
        this.apiResponse = toJSON(redirect.allResponseFields);
    }
    static fromNative(redirect) {
        if (!redirect) {
            return undefined;
        }
        return new SourceRedirect(redirect);
    }
}
export class SourceSEPADebitDetails {
    constructor(debitDetails) {
        this.bankCode = debitDetails.bankCode;
        this.country = debitDetails.country;
        this.fingerprint = debitDetails.fingerprint;
        this.last4 = debitDetails.last4;
        this.mandateReference = debitDetails.mandateReference;
        this.mandateURL = debitDetails.mandateURL.absoluteString;
        this.ios = debitDetails;
        this.apiResponse = toJSON(debitDetails.allResponseFields);
    }
    static fromNative(debitDetails) {
        if (!debitDetails) {
            return undefined;
        }
        return new SourceSEPADebitDetails(debitDetails);
    }
}
export class SourceVerification {
    constructor(verification) {
        this.attemptsRemaining = verification.attemptsRemaining;
        this.status = toSourceVerificationStatus(verification.status);
        this.apiResponse = toJSON(verification.allResponseFields);
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
        this.weChatAppURL = details.weChatAppURL;
        this.apiResponse = toJSON(details.allResponseFields);
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
        this.amount = source.amount;
        this.clientSecret = source.clientSecret;
        this.created = new Date(source.created);
        this.currency = source.currency;
        this.flow = toSourceFlow(source.flow);
        this.id = source.stripeID;
        this.liveMode = source.livemode;
        this.status = toSourceStatus(source.status);
        this.ios = source;
        this.cardDetails = SourceCardDetails.fromNative(source.cardDetails);
        this.details = toJSON(source.details);
        this.klarnaDetails = SourceKlarnaDetails.fromNative(source.klarnaDetails);
        this.metaData = toJSON(source.metadata);
        this.owner = SourceOwner.fromNative(source.owner);
        this.receiver = SourceReceiver.fromNative(source.receiver);
        this.redirect = SourceRedirect.fromNative(source.redirect);
        this.sepaDebitDetails = SourceSEPADebitDetails.fromNative(source.sepaDebitDetails);
        this.type = toSourceType(source.type);
        this.usage = toSourceUsage(source.usage);
        this.verification = SourceVerification.fromNative(source.verification);
        this.weChatPayDetails = SourceWeChatPayDetails.fromNative(source.weChatPayDetails);
        this.apiResponse = toJSON(source.allResponseFields);
    }
    static fromNative(source) {
        return new Source(source);
    }
}
//# sourceMappingURL=index.ios.js.map