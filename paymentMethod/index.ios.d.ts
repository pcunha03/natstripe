import { CardBrand, IPaymentMethodAddress, IPaymentMethodCard, IPaymentMethodCardChecks, IPaymentMethodCardNetworks, IPaymentMethodCardWallet, IPaymentMethodCardWalletMasterpass, IPaymentMethodCardWalletVisaCheckout, IPaymentMethodThreeDSecureUsage, PaymentMethodCardCheckResult, PaymentMethodCardWalletType } from '../common';
export declare class PaymentMethodCardChecks implements IPaymentMethodCardChecks {
    readonly native: STPPaymentMethodCardChecks;
    constructor(checks: STPPaymentMethodCardChecks);
    get addressLine1Check(): PaymentMethodCardCheckResult;
    get addressPostalCodeCheck(): PaymentMethodCardCheckResult;
    get cvcCheck(): PaymentMethodCardCheckResult;
    static fromNative(native: STPPaymentMethodCardChecks): PaymentMethodCardChecks;
}
export declare class PaymentMethodCardNetworks implements IPaymentMethodCardNetworks {
    readonly available: string[];
    readonly preferred: string;
    readonly networks: PaymentMethodCardNetworks;
    constructor(networks: STPPaymentMethodCardNetworks);
    static fromNative(native: STPPaymentMethodCardNetworks): PaymentMethodCardNetworks;
}
export declare class PaymentMethodThreeDSecureUsage implements IPaymentMethodThreeDSecureUsage {
    readonly native: STPPaymentMethodThreeDSecureUsage;
    readonly supported: boolean;
    private constructor();
    static fromNative(threeDSecureUsage: STPPaymentMethodThreeDSecureUsage): PaymentMethodThreeDSecureUsage;
}
export declare class PaymentMethodAddress implements IPaymentMethodAddress {
    readonly native: STPPaymentMethodAddress;
    readonly city: string;
    readonly country: string;
    readonly line1: string;
    readonly line2: string;
    readonly postalCode: string;
    readonly state: string;
    constructor(billingAddress: STPPaymentMethodAddress);
}
export declare class PaymentMethodCardWalletMasterpass implements IPaymentMethodCardWalletMasterpass {
    readonly native: STPPaymentMethodCardWalletMasterpass;
    readonly billingAddress: PaymentMethodAddress;
    readonly email: string;
    readonly name: string;
    readonly shippingAddress: PaymentMethodAddress;
    constructor(masterpass: STPPaymentMethodCardWalletMasterpass);
    static fromNative(native: STPPaymentMethodCardWalletMasterpass): PaymentMethodCardWalletMasterpass;
}
export declare class PaymentMethodCardWalletVisaCheckout implements IPaymentMethodCardWalletVisaCheckout {
    readonly native: STPPaymentMethodCardWalletVisaCheckout;
    readonly billingAddress: PaymentMethodAddress;
    readonly email: string;
    readonly name: string;
    readonly shippingAddress: PaymentMethodAddress;
    readonly dynamicLast4: string;
    constructor(visaCheckout: STPPaymentMethodCardWalletVisaCheckout);
    static fromNative(native: STPPaymentMethodCardWalletVisaCheckout): PaymentMethodCardWalletVisaCheckout;
}
export declare class PaymentMethodCardWallet implements IPaymentMethodCardWallet {
    readonly native: STPPaymentMethodCardWallet;
    readonly masterpass: PaymentMethodCardWalletMasterpass;
    readonly type: PaymentMethodCardWalletType;
    readonly visaCheckout: PaymentMethodCardWalletVisaCheckout;
    constructor(wallet: STPPaymentMethodCardWallet);
    static fromNative(native: STPPaymentMethodCardWallet): PaymentMethodCardWallet;
}
export declare class PaymentMethodCard implements IPaymentMethodCard {
    readonly native: STPPaymentMethodCard;
    readonly brand: CardBrand;
    readonly checks: PaymentMethodCardChecks;
    readonly country: string;
    readonly expMonth: number;
    readonly expYear: number;
    readonly fingerprint: string;
    readonly funding: string;
    readonly last4: string;
    readonly networks: PaymentMethodCardNetworks;
    readonly threeDSecureUsage: PaymentMethodThreeDSecureUsage;
    readonly wallet: PaymentMethodCardWallet;
    private constructor();
    static fromNative(native: STPPaymentMethodCard): PaymentMethodCard;
}
