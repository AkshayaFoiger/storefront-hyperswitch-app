import { AdyenDropIn } from "./AdyenDropIn/AdyenDropIn";
import { adyenGatewayId } from "./AdyenDropIn/types";
import { hyperswitchGatewayId, HyperswitchSDK } from "./HyperswitchSDK/hyperswitchSDK";
import { StripeComponent } from "./StripeElements/stripeComponent";
import { stripeGatewayId } from "./StripeElements/types";

export const paymentMethodToComponent = {
	[adyenGatewayId]: AdyenDropIn,
	[stripeGatewayId]: StripeComponent,
	[hyperswitchGatewayId]: HyperswitchSDK,
};
