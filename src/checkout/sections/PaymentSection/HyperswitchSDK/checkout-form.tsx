/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { type FormEvent, useEffect, useState } from "react";
import "./styles/checkout.modules.css";
import { useHyper, useWidgets, UnifiedCheckout } from "@juspay-tech/react-hyper-js";
import { useCheckoutComplete } from "@/checkout/hooks/useCheckoutComplete";

const CheckoutForm: React.FC = ({}) => {
	const hyper = useHyper();
	const widgets = useWidgets();
	const [isLoading, setIsLoading] = useState(false);
	const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
	const [message, setMessage] = useState("");
	const { onCheckoutComplete } = useCheckoutComplete();

	const unifiedCheckoutOptions = {
		wallets: {
			type: "tabs",
			walletReturnUrl: `http://localhost:3000/pages/payment`,
		},
	};

	const handlePaymentStatus = (status: string) => {
		switch (status) {
			case "succeeded":
				setMessage("Successful");
				break;
			case "processing":
				setMessage("Your payment is processing.");
				break;
			case "requires_payment_method":
				setMessage("Your payment was not successful, please try again.");
				break;
			case "":
				break;
			default:
				setMessage("Something went wrong.");
				break;
		}
	};

	useEffect(() => {
		if (!hyper) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

		if (!clientSecret) {
			return;
		}

		hyper.retrievePaymentIntent(clientSecret).then((resp: any) => {
			const status = resp?.paymentIntent?.status;
			if (status) {
				void onCheckoutComplete();
				handlePaymentStatus(resp?.paymentIntent?.status);
			}
		});
	}, []);

	useEffect(() => {
		if (!hyper) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

		if (!clientSecret) {
			return;
		}

		hyper.retrievePaymentIntent(clientSecret).then((resp: any) => {
			const status = resp?.paymentIntent?.status;
			if (status) {
				handlePaymentStatus(resp?.paymentIntent?.status);
			}
		});
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

		const response = await hyper.confirmPayment({
			widgets,
			confirmParams: {
				email: "fojhfj@hfb.com",
				// Make sure to change this to your payment completion page
				return_url: `http://localhost:3000/pages/payment`,
				redirect: "always",
			},
		});

		if (response) {
			if (response.status === "succeeded") {
				setMessage("Payment Successful");
			} else if (response.error) {
				setMessage(response.error.message);
			} else {
				setMessage("An unexpected error occurred.");
			}
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
		setIsPaymentCompleted(true);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div hidden={message == "Payment Successful"}>
				<UnifiedCheckout id="unified-checkout" options={unifiedCheckoutOptions} />
				<button className="button" disabled={!hyper || !widgets || isPaymentCompleted}>
					{isLoading ? <div id="spinner" className="spinner"></div> : <button>Pay Now</button>}
				</button>
			</div>
			{/* Show any error or success messages */}
			{message && (
				<div id="payment-message" className="paymentMessage">
					{message}
				</div>
			)}
		</form>
	);
};

export default CheckoutForm;
