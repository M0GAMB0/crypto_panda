import React from "react";
import {
	Welcome,
	Footer,
	Services,
	Transaction,
} from "./../Components/Transaction";

const Transactionpage = () => {
	return (
		<div>
			<div>
				<Welcome />
			</div>
			<Services />
			<Transaction />
			<Footer />
		</div>
	);
};

export default Transactionpage;
