require("@nomiclabs/hardhat-waffle");

module.exports = {
	solidity: "0.8.0",
	networks: {
		ropsten: {
			url: "https://eth-ropsten.alchemyapi.io/v2/dLcy4R-UgEjghTZOrmYnYBrZmXSQwmC-",
			accounts: [
				"b90a8e0e2822e8e12922855840ab7983873802b43f00c5c64abffef9b25c7038",
			],
		},
	},
};
