import { GetBrand, toPaymentMethodCardChecks, toPaymentMethodCardWalletType } from '../common';
export class PaymentMethodCardChecks {
    constructor(checks) {
        this.native = checks;
    }
    get addressLine1Check() {
        return toPaymentMethodCardChecks(this.native.addressLine1Check);
    }
    get addressPostalCodeCheck() {
        return toPaymentMethodCardChecks(this.native.addressPostalCodeCheck);
    }
    get cvcCheck() {
        return toPaymentMethodCardChecks(this.native.cvcCheck);
    }
    static fromNative(native) {
        if (!native) {
            return undefined;
        }
        return new PaymentMethodCardChecks(native);
    }
}
export class PaymentMethodCardNetworks {
    constructor(networks) {
        const count = networks.available.count;
        const available = [];
        for (let i = 0; i < count; i++) {
            available.push(networks.available.objectAtIndex(i));
        }
        this.available = available;
        this.preferred = networks.preferred;
    }
    static fromNative(native) {
        if (!native) {
            return undefined;
        }
        return new PaymentMethodCardNetworks(native);
    }
}
export class PaymentMethodThreeDSecureUsage {
    constructor(threeDSecureUsage) {
        this.native = threeDSecureUsage;
        this.supported = threeDSecureUsage.supported;
    }
    static fromNative(threeDSecureUsage) {
        if (!threeDSecureUsage) {
            return undefined;
        }
        return new PaymentMethodThreeDSecureUsage(threeDSecureUsage);
    }
}
export class PaymentMethodAddress {
    constructor(billingAddress) {
        this.native = billingAddress;
        this.city = billingAddress.city;
        this.country = billingAddress.country;
        this.line1 = billingAddress.line1;
        this.line2 = billingAddress.line2;
        this.postalCode = billingAddress.postalCode;
        this.state = billingAddress.state;
    }
}
export class PaymentMethodCardWalletMasterpass {
    constructor(masterpass) {
        this.native = masterpass;
        this.billingAddress = new PaymentMethodAddress(masterpass.billingAddress);
        this.email = masterpass.email;
        this.name = masterpass.name;
        this.shippingAddress = new PaymentMethodAddress(masterpass.shippingAddress);
    }
    static fromNative(native) {
        if (!native) {
            return undefined;
        }
        return new PaymentMethodCardWalletMasterpass(native);
    }
}
export class PaymentMethodCardWalletVisaCheckout {
    constructor(visaCheckout) {
        this.native = visaCheckout;
        this.billingAddress = new PaymentMethodAddress(visaCheckout.billingAddress);
        this.email = visaCheckout.email;
        this.name = visaCheckout.name;
        this.shippingAddress = new PaymentMethodAddress(visaCheckout.shippingAddress);
    }
    static fromNative(native) {
        if (!native) {
            return undefined;
        }
        return new PaymentMethodCardWalletVisaCheckout(native);
    }
}
export class PaymentMethodCardWallet {
    constructor(wallet) {
        this.native = wallet;
        this.masterpass = new PaymentMethodCardWalletMasterpass(wallet.masterpass);
        this.type = toPaymentMethodCardWalletType(wallet.type);
        this.visaCheckout = new PaymentMethodCardWalletVisaCheckout(wallet.visaCheckout);
    }
    static fromNative(native) {
        if (!native) {
            return undefined;
        }
        return new PaymentMethodCardWallet(native);
    }
}
export class PaymentMethodCard {
    constructor(card) {
        this.native = card;
        this.brand = GetBrand(this.native.brand);
        this.checks = PaymentMethodCardChecks.fromNative(this.native.checks);
        this.country = this.native.country;
        this.expMonth = this.native.expMonth;
        this.expYear = this.native.expYear;
        this.fingerprint = this.native.fingerprint;
        this.funding = this.native.funding;
        this.last4 = this.native.last4;
        this.networks = PaymentMethodCardNetworks.fromNative(this.native.networks);
        this.threeDSecureUsage = PaymentMethodThreeDSecureUsage.fromNative(this.native.threeDSecureUsage);
        this.wallet = PaymentMethodCardWallet.fromNative(this.native.wallet);
    }
    static fromNative(native) {
        if (!native) {
            return undefined;
        }
        return new PaymentMethodCard(native);
    }
}
//# sourceMappingURL=index.ios.js.map