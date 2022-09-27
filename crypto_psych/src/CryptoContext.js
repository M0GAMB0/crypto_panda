import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "./config/api";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "./utils/constants";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const { ethereum } = window;
const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);
	return transactionContract;
};

const CryptoContext = ({ children }) => {
	const [currency, setcurrency] = useState("INR");
	const [symbol, setsymbol] = useState("₹");
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [isloading, setIsLoading] = useState(false);
	const [transactionCount, setTransactionCount] = useState(
		localStorage.getItem("transactionCount")
	);
	const [currentAccount, setCurrentAccount] = useState("");
	const [formData, setFormData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	});
	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};
	const [alert, setAlert] = useState({
		open: false,
		message: "",
		type: "success",
	});
	const [watchlist, setWatchlist] = useState([]);

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask");
			const accounts = await ethereum.request({ method: "eth_accounts" });
			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log("No accounts found");
			}
			// console.log(accounts);
		} catch (error) {
			console.log(error);
			throw new Error("No Ethereum Object");
		}
	};
	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask");
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error("No Ethereum Object");
		}
	};
	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask");
			const { addressTo, amount, keyword, message } = formData;
			const transactionContract = getEthereumContract();
			const parsedAmount = ethers.utils.parseEther(amount);
			await ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: currentAccount,
						to: addressTo,
						gas: "0x5208", //21000 GWEI
						value: parsedAmount._hex,
					},
				],
			});
			const transactionHash = transactionContract.addToBlockchain(
				addressTo,
				parsedAmount,
				message,
				keyword
			);
			setIsLoading(true);
			console.log(`Loading - ${transactionHash.hash}`);
			await transactionHash.wait();
			setIsLoading(false);
			console.log(`Success-${transactionHash.hash}`);
			const transactionCount = await transactionContract.getTransactionCount();
			setTransactionCount(transactionCount.toNumber());
		} catch (error) {
			console.log(error);
			throw new Error("No Ethereum Object");
		}
	};
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);
	useEffect(() => {
		if (user) {
			const coinRef = doc(db, "watchlist", user.uid);

			var unSubscribe = onSnapshot(coinRef, (coin) => {
				if (coin.exists()) {
					setWatchlist(coin.data().coins);
				} else {
					console.log("No Itens in WL");
				}
			});
			return () => {
				unSubscribe();
			};
		}
	}, [user]);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) setUser(user);
			else setUser(null);
		});
	}, []);

	const fetchCoins = async () => {
		setLoading(true);
		const { data } = await axios.get(CoinList(currency));
		setCoins(data);
		setLoading(false);
	};
	useEffect(() => {
		if (currency === "INR") {
			setsymbol("₹");
		} else if (currency === "USD") {
			setsymbol("$");
		}
	}, [currency]);
	return (
		<Crypto.Provider
			value={{
				currency,
				symbol,
				setcurrency,
				coins,
				loading,
				fetchCoins,
				user,
				alert,
				setAlert,
				watchlist,
				setWatchlist,
				connectWallet,
				currentAccount,
				formData,
				setFormData,
				handleChange,
				sendTransaction,
			}}
		>
			{children}
		</Crypto.Provider>
	);
};
export default CryptoContext;
export const CryptoState = () => {
	return useContext(Crypto);
};
