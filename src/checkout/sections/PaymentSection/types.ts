import { type StripeGatewayId } from "./StripeElements/types";
import { type HyperswitchGatewayId } from "./HyperswitchSDK/hyperswitchSDK";
import { type PaymentGatewayConfig } from "@/checkout/graphql";
import {
	type AdyenGatewayId,
	type AdyenGatewayInitializePayload,
} from "@/checkout/sections/PaymentSection/AdyenDropIn/types";

export type PaymentGatewayId = AdyenGatewayId | StripeGatewayId | HyperswitchGatewayId;

export type ParsedAdyenGateway = ParsedPaymentGateway<AdyenGatewayId, AdyenGatewayInitializePayload>;
export type ParsedStripeGateway = ParsedPaymentGateway<StripeGatewayId, {}>;
export type ParsedHyperswitchGateway = ParsedPaymentGateway<HyperswitchGatewayId, {}>;

export type ParsedPaymentGateways = ReadonlyArray<
	ParsedAdyenGateway | ParsedStripeGateway | ParsedHyperswitchGateway
>;

export interface ParsedPaymentGateway<ID extends string, TData extends Record<string, any>>
	extends Omit<PaymentGatewayConfig, "data" | "id"> {
	data: TData;
	id: ID;
}

export type PaymentStatus = "paidInFull" | "overpaid" | "none" | "authorized";
