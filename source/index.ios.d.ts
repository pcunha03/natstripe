import { CardBrand, CardFundingType, ISource, ISourceCardDetails, ISourceKlarnaDetails, ISourceOwner, ISourceReceiver, ISourceRedirect, ISourceSEPADebitDetails, ISourceVerification, ISourceWeChatPayDetails, SourceCard3DSecureStatus, SourceFlow, SourceRedirectStatus, SourceStatus, SourceType, SourceUsage, SourceVerificationStatus } from '../common';
import { Address } from '../';
export declare class SourceCardDetails implements ISourceCardDetails {
    readonly brand: CardBrand;
    readonly country: string;
    readonly expMonth: number;
    readonly expYear: number;
    readonly funding: CardFundingType;
    readonly isApplePayCard: boolean;
    readonly last4: string;
    readonly threeDSecureUsage: SourceCard3DSecureStatus;
    readonly ios: any;
    readonly android: any;
    readonly dynamicLast4: string;
    private constructor();
    static fromNative(source: STPSourceCardDetails): SourceCardDetails;
}
export declare class SourceKlarnaDetails implements ISourceKlarnaDetails {
    readonly clientToken: string;
    readonly purchaseCountry: string;
    private constructor();
    static fromNative(source: STPSourceKlarnaDetails): SourceKlarnaDetails;
}
export declare class SourceOwner implements ISourceOwner {
    readonly address: Address;
    readonly email: string;
    readonly name: string;
    readonly phone: string;
    readonly verifiedAddress: Address;
    readonly verifiedEmail: string;
    readonly verifiedName: string;
    readonly verifiedPhone: string;
    private constructor();
    static fromNative(owner: STPSourceOwner): SourceOwner;
}
export declare class SourceReceiver implements ISourceReceiver {
    readonly address: string;
    readonly amountCharged: number;
    readonly amountReceived: number;
    readonly amountReturned: number;
    readonly apiResponse: Readonly<{}>;
    private constructor();
    static fromNative(receiver: STPSourceReceiver): SourceReceiver;
}
export declare class SourceRedirect implements ISourceRedirect {
    readonly apiResponse: Readonly<{}>;
    readonly returnURL: string;
    readonly status: SourceRedirectStatus;
    readonly url: string;
    readonly ios: any;
    readonly android: any;
    private constructor();
    static fromNative(redirect: STPSourceRedirect): SourceRedirect;
}
export declare class SourceSEPADebitDetails implements ISourceSEPADebitDetails {
    readonly apiResponse: Readonly<{}>;
    readonly bankCode: string;
    readonly country: string;
    readonly fingerprint: string;
    readonly last4: string;
    readonly mandateReference: string;
    readonly mandateURL: string;
    readonly android: any;
    readonly ios: any;
    private constructor();
    static fromNative(debitDetails: STPSourceSEPADebitDetails): SourceSEPADebitDetails;
}
export declare class SourceVerification implements ISourceVerification {
    readonly apiResponse: Readonly<{}>;
    readonly attemptsRemaining: number;
    readonly status: SourceVerificationStatus;
    private constructor();
    static fromNative(verification: STPSourceVerification): SourceVerification;
}
export declare class SourceWeChatPayDetails implements ISourceWeChatPayDetails {
    readonly apiResponse: Readonly<{}>;
    readonly weChatAppURL: string;
    private constructor();
    static fromNative(details: STPSourceWeChatPayDetails): SourceWeChatPayDetails;
}
export declare class Source implements ISource {
    readonly amount: number;
    readonly clientSecret: string;
    readonly created: Date;
    readonly currency: string;
    readonly flow: SourceFlow;
    readonly id: string;
    readonly liveMode: boolean;
    readonly status: SourceStatus;
    readonly android: any;
    readonly ios: any;
    readonly cardDetails: SourceCardDetails;
    readonly details: Readonly<{}>;
    readonly klarnaDetails: SourceKlarnaDetails;
    readonly metaData: Readonly<{}>;
    readonly owner: SourceOwner;
    readonly receiver: SourceReceiver;
    readonly redirect: SourceRedirect;
    readonly sepaDebitDetails: SourceSEPADebitDetails;
    readonly type: SourceType;
    readonly usage: SourceUsage;
    readonly verification: SourceVerification;
    readonly weChatPayDetails: SourceWeChatPayDetails;
    readonly apiResponse: Readonly<{}>;
    private constructor();
    static fromNative(source: STPSource): Source;
}
