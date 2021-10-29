import { Utils } from "@nativescript/core";
export const init = (apiKey) => {
    if (global.isIOS) {
        Stripe.setDefaultPublishableKey(apiKey);
    }
    if (global.isAndroid) {
        com.stripe.android.PaymentConfiguration.init(Utils.ad.getApplicationContext(), apiKey);
    }
};
export function toJSON(meta, readonly = true) {
    if (global.isIOS) {
        if (meta instanceof NSDictionary) {
            const keys = meta.allKeys;
            const count = keys.count;
            const json = {};
            for (let i = 0; i < count; i++) {
                const key = keys.objectAtIndex(i);
                json[key] = meta.objectForKey(key);
            }
            return Object.freeze(json);
        }
    }
    if (readonly) {
        return Object.freeze({});
    }
    return {};
}
//# sourceMappingURL=utils.js.map