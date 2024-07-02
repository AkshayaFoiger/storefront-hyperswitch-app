import { loadHyper } from "@juspay-tech/hyper-js";
import { HyperElements } from "@juspay-tech/react-hyper-js";
import { useEffect, useState, useMemo } from "react";
import { apiErrorMessages } from "../errorMessages";
import CheckoutForm from "./checkout-form";
import styles from "./styles/page.modules.css";
import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useAlerts } from "@/checkout/hooks/useAlerts";
import { useTransactionInitializeMutation } from "@/checkout/graphql";
import { useCheckoutComplete } from "@/checkout/hooks/useCheckoutComplete";

export const hyperswitchGatewayId = "app.saleor.hyperswitch";
export type HyperswitchGatewayId = typeof hyperswitchGatewayId;

// const hyperPromise = loadHyper("pk_snd_1958a11b93524962881ec51b49c2615a");

export const HyperswitchSDK = () => {
	const [hyperPromise, setHyperPromise] = useState();
	const { checkout } = useCheckout();
	const [transactionInitializeResult, transactionInitialize] = useTransactionInitializeMutation();
	const hyperswitchData = transactionInitializeResult.data?.transactionInitialize?.data as
		| undefined
		| {
				clientSecret: string;
				publishableKey: string;
		  };

	console.log(JSON.stringify(hyperswitchData));

	const { showCustomErrors } = useAlerts();
	const { errorMessages: commonErrorMessages } = useErrorMessages(apiErrorMessages);

	const publishableKey = hyperswitchData?.publishableKey;
	const clientSecret = hyperswitchData?.clientSecret;

	useEffect(() => {
		transactionInitialize({
			checkoutId: checkout.id,
			paymentGateway: {
				id: hyperswitchGatewayId,
				data: {
					customerId: "uhdusc",
					capturMethod: "manual",
					email: "sdc@sdcj.com",
					billing: {
						address: {
							city: "San Francisco",
							country: "US",
							line1: "400",
							line2: "Harrison Street",
							line3: "Harrison Street",
							zip: "94122",
							state: "California",
						},
					},
				},
			},
		}).catch((err) => {
			console.error(err);
			showCustomErrors([{ message: commonErrorMessages.somethingWentWrong }]);
		});
	}, [checkout.id, commonErrorMessages.somethingWentWrong, showCustomErrors, transactionInitialize]);

	// useEffect(() => {
	// 	console.log("===> publishableKey", publishableKey);
	// 	// if (publishableKey !== "") {
	// 	// 	setLoadHyperValue(loadHyper(publishableKey));
	// 	// }
	// }, [publishableKey]);
	// setOptions({
	// 	clientSecret: clientSecret,
	// 	appearance: {
	// 		theme: "default",
	// 	},
	// });

	useEffect(() => {
		if (publishableKey != undefined && hyperPromise == undefined) {
			console.log("===> publishableKey", publishableKey, clientSecret);
			setHyperPromise(loadHyper(publishableKey));
		}
	}, [publishableKey]);

	// if (publishableKey != undefined && clientSecret != undefined) {
	// 	console.log("in here", clientSecret);
	// 	console.log("Hyper Promise", hyperPromise);
	// 	const options = {
	// 		clientSecret: clientSecret,
	// 		appearance: {
	// 			theme: "default",
	// 		},
	// 	};
	// 	return (
	// 		<div className={styles.main}>
	// 			{
	// 				<HyperElements options={options} hyper={hyperPromise}>
	// 					<CheckoutForm />
	// 				</HyperElements>
	// 			}
	// 		</div>
	// 	);
	// } else {
	// 	return <div>Hello</div>;
	// }

	console.log("===> clientSecret", clientSecret);

	if (publishableKey != undefined && clientSecret != undefined && hyperPromise != undefined) {
		const options = {
			clientSecret: clientSecret,
			appearance: {
				theme: "default",
			},
		};

		return (
			<div className={styles.main}>
				{
					<HyperElements options={options} hyper={hyperPromise}>
						<CheckoutForm />
					</HyperElements>
				}
			</div>
		);
	} else {
		return <div></div>;
	}
};
