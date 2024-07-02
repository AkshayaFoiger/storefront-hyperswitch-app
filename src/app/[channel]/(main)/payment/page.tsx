"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import "./checkout.modules.css";

export default function Page({
	_params,
}: {
	_params: { payment_intent_client_secret: string; status: string };
}) {
	const router = useRouter();

	useEffect(() => {
		// Set timeout for 5 seconds (5000 milliseconds)
		const timeout = setTimeout(() => {
			console.log("I am here");
			// Redirect to the home page
			router.push("../default-channel");
		}, 2000); // Change the time as needed (in milliseconds)

		// Clear timeout when component unmounts to avoid memory leaks
		return () => clearTimeout(timeout);
	}, []); //

	// Extract specific query parameters
	const searchParams = useSearchParams();

	// Extract specific query parameters
	const status = searchParams.get("status");
	console.log(status);

	if (status == "succeeded") {
		return (
			<div className="full-page">
				<div className="success">
					<section className="mx-auto max-w-7xl p-8">
						<h1 className="text">Payment Successful!</h1>

						<LinkWithChannel
							href="../default-channel"
							className="mx-20 inline-block rounded border border-transparent bg-neutral-900 px-10 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500"
						>
							<div className="goback">Home</div>
						</LinkWithChannel>
					</section>
				</div>
			</div>
		);
	} else if (status == "failed") {
		return (
			<div className="full-page">
				<div className="failed">
					<section className="mx-auto max-w-7xl ">
						<h1 className="text">Payment Failed!</h1>
						<LinkWithChannel
							href="../default-channel"
							className="mx-10 inline-block rounded border border-transparent bg-neutral-900 px-10 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500"
						>
							<div className="goback">Home</div>
						</LinkWithChannel>
					</section>
				</div>
			</div>
		);
	} else if (status == "requires_customer_action") {
		return (
			<div className="full-page">
				<div className="failed">
					<section className="mx-auto max-w-7xl p-8">
						<h1 className="text">Requires Customer Action</h1>

						<LinkWithChannel
							href="../default-channel"
							className="mx-20 inline-block rounded border border-transparent bg-neutral-900 px-10 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500"
						>
							<div className="goback">Home</div>
						</LinkWithChannel>
					</section>
				</div>
			</div>
		);
	} else {
		return <div>Unknown Status</div>;
	}
}
