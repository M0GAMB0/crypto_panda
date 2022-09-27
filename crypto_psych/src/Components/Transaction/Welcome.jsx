import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import "./style/conbutton.css";
import { BsInfoCircle } from "react-icons/bs";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
const useStyles = makeStyles((theme) => ({
	div1: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	div2: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		padding: "5rem",
		width: "80%",
		// border: "2px solid red",

		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			padding: "3rem 1rem",
		},
	},
	div3: {
		display: "flex",
		flex: "1 1 0%",
		justifyContent: "flex-start",
		flexDirection: "column",
		[theme.breakpoints.down("md")]: {
			marginRight: "2.5rem",
		},
	},
	heading: {
		fontSize: "2.975rem",
		lineHeight: "2.25rem",
		color: "white",
		fontFamily: "Montserrat",
		paddingTop: "0.25rem",
		paddingBottom: "0.25rem",
		[theme.breakpoints.down("sm")]: {
			fontSize: "3rem",
			lineHeight: 1,
		},
	},
	subtitle: {
		// textAlign: "right",
		marginTop: "1.25rem",
		fontWeight: 300,
		fontFamily: "Montserrat",
		width: "91.666667%",
		fontSize: "1rem",
		lineHeight: "1.5rem",
		color: "darkgrey",
		[theme.breakpoints.down("sm")]: {
			width: "75%",
		},
	},
	connectButton: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "1.25rem",
		marginBottom: "1.25rem",
		backgroundColor: "gold",
		padding: "0.75rem",
		borderRadius: 9999,
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "rgb(246, 190, 7)",
		},
	},
	wall: {
		// color: "white",
		fontSize: "1rem",
		lineHeight: "1.5rem",
		fontWeight: 600,
	},
	table: {
		display: "grid",
		gridTemplateColumns: "repeat(3,minmax(0,1fr))",
		width: "100%",
		marginTop: "2.5rem",
		[theme.breakpoints.down("sm")]: {
			gridTemplateColumns: "repeat(2,minmax(0,1fr))",
		},
	},
	common: {
		minHeight: 70,
		paddingLeft: "0.5rem",
		paddingRight: "0.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 0.5,
		fontSize: "1.125rem",
		lineHeight: "1.25rem",
		fontWeight: 300,
		border: "0.5px solid gold",
		fontFamily: "Montserrat",
		// color: "gold",
		[theme.breakpoints.down("sm")]: {
			paddingLeft: "0.5rem",
			paddingRight: "0.5rem",
			minWidth: 120,
		},
	},
	banner: {
		display: "flex",
		flexDirection: "column",
		flex: "1 1 0%",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "85%",
		marginTop: 0,
		// border: "2px solid red",
		marginLeft: 25,
	},
	board: {
		padding: "0.75rem",
		justifyContent: "flex-end",
		alignItems: "flex-start",
		flexDirection: "column",
		borderRadius: "0.75rem",
		height: "10rem",
		width: "85%",
		marginTop: "1rem",
		marginBottom: "1.25rem",
		border: "2px solid gold",
		backgroundColor: "gold",
		[theme.breakpoints.down("sm")]: {
			width: "18rem",
			marginTop: "2.5rem",
		},
	},
	partition: {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "column",
		width: "100%",
		height: "100%",
	},
	partition1: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	wrapper: {
		width: "2.5rem",
		height: "2.5rem",
		borderRadius: 9999,
		border: "2px solid black",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	form: {
		padding: "1.25rem",
		width: "85%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "rgb(255, 215, 0, 0.4)",
		borderRadius: 10,
		[theme.breakpoints.down("sm")]: {
			width: "24rem",
		},
	},
	input: {
		marginTop: "0.5rem",
		marginBottom: "0.5rem",
		width: "100%",
		// borderRadius: "0.125rem",
		padding: "0.5rem",
		outline: "2px solid transparent",
		outlineOffset: 2,
		// backgroundColor: "transparent",
		color: "#fff",
		// border: "none",
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		borderRadius: 16,
		backdropFilter: "blur(5px)",
		border: "1px solid rgba(255, 255, 255, 0.3)",
		"&::placeholder": {
			color: "#fff",
			opacity: 0.6,
		},
	},
	submit: {
		color: "#000",
		width: "100%",
		marginTop: "0.5rem",
		border: "1px solid gold",
		padding: "0.5rem",
		fontFamily: "Montserrat",
		borderRadius: 9999,
		cursor: "pointer",
		backgroundColor: "gold",
		fontWeight: 999,
		fontSize: 15,
		"&:hover": {
			backgroundColor: "rgb(246, 190, 7)",
		},
	},
}));
const Welcome = () => {
	const classes = useStyles();
	const {
		connectWallet,
		currentAccount,
		formData,
		sendTransaction,
		handleChange,
	} = CryptoState();
	const Input = ({ placeholder, name, type, value, handleChange }) => (
		<input
			placeholder={placeholder}
			name={name}
			type={type}
			step="0.0001"
			value={value}
			// value="Saikumar"
			onChange={(e) => handleChange(e, name)}
			className={classes.input}
		/>
	);

	const handleSubmit = (e) => {
		const { addressTo, amount, keyword, message } = formData;
		console.log(`addressTo : ${addressTo} amount:${amount} message:${message}`);
		e.preventDefault();
		if (!amount || !addressTo || !keyword || !message) return;
		sendTransaction();
	};

	return (
		<div className={classes.div1}>
			<div className={classes.div2}>
				<div className={classes.div3}>
					<h1 className={classes.heading}>
						Send Crypto
						<br /> across the world
					</h1>
					<p className={classes.subtitle}>
						Explore the crypto world. Buy and sell cryptocurrencies easily on{" "}
						<span
							style={{
								color: "gold",
								fontSize: "1rem",
								lineHeight: "1.5rem",
								fontWeight: 600,
							}}
						>
							Crypto Panda
						</span>
						.
					</p>
					{/* <Button
						variant="contained"
						className={classes.connectButton}
						onClick={connectWallet}
					>
						<p className={classes.wall}>Connect Wallet</p>
					</Button> */}
					<br />
					{!currentAccount && (
						<button className="cssbuttons-io-button" onClick={connectWallet}>
							{" "}
							Connect Wallet
							<div className="icon">
								<svg
									height="24"
									width="24"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
										fill="currentColor"
									></path>
								</svg>
							</div>
						</button>
					)}

					<div className={classes.table}>
						<div
							className={classes.common}
							style={{ borderTopLeftRadius: "1rem" }}
						>
							Reliability
						</div>
						<div className={classes.common}>Security</div>
						<div
							className={classes.common}
							style={{ borderTopRightRadius: "1rem" }}
						>
							Web 3.0
						</div>
						<div
							className={classes.common}
							style={{ borderBottomLeftRadius: "1rem" }}
						>
							Low Fees
						</div>
						<div className={classes.common}>Ethereum</div>
						<div
							className={classes.common}
							style={{ borderBottomRightRadius: "1rem" }}
						>
							Blockchain
						</div>
					</div>
				</div>
				<div className={classes.banner}>
					<div className={classes.board}>
						<div className={classes.partition}>
							<div className={classes.partition1}>
								<div className={classes.wrapper}>
									<SiEthereum fontSize={21} color="#000" />
								</div>
								<BsInfoCircle fontSize={17} color="#000" />
							</div>
							<div>
								{!currentAccount && (
									<p
										style={{
											fontSize: "0.875rem",
											lineHeight: "1.25rem",
											fontWeight: 450,
											color: "#000",
											fontFamily: "PT Mono",
										}}
									>
										{currentAccount}
									</p>
								)}
								<p
									style={{
										fontSize: "1.125rem",
										lineHeight: "1.75rem",
										fontWeight: 600,
										color: "#000",
										marginTop: "0.25rem",
										fontFamily: "Montserrat",
									}}
								>
									Ethereum
								</p>
							</div>
						</div>
					</div>
					<div className={classes.form}>
						<input
							placeholder="Address To"
							name="addressTo"
							type="Text"
							step="0.0001"
							className={classes.input}
							onChange={(e) => handleChange(e, "addressTo")}
						/>
						<input
							className={classes.input}
							placeholder="Amount (ETH)"
							name="amount"
							type="number"
							step="0.0001"
							onChange={(e) => handleChange(e, "amount")}
						/>
						<input
							className={classes.input}
							placeholder="Keyword (GIF)"
							name="keyword"
							step="0.0001"
							type="Text"
							onChange={(e) => handleChange(e, "keyword")}
						/>
						<input
							className={classes.input}
							placeholder="Message"
							name="message"
							type="Text"
							onChange={(e) => handleChange(e, "message")}
						/>

						<div
							style={{
								height: 1,
								width: "100%",
								backgroundColor: "darkgrey",
								marginTop: "0.5rem",
								marginBottom: "0.5rem",
							}}
						/>
						{false ? (
							<div style={{ paddingTop: " 0.75rem", paddingBottom: "0.75rem" }}>
								<CircularProgress
									style={{ color: "gold" }}
									size={80}
									thickness={1}
								/>
							</div>
						) : (
							/* <Button
								variant="contained"
								onClick={handleSubmit}
								className={classes.submit}
							>
								Submit
							</Button> */
							<button className="sai" onClick={handleSubmit}>
								<div className="svg-wrapper-1">
									<div className="svg-wrapper">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="24"
											height="24"
										>
											<path fill="none" d="M0 0h24v24H0z"></path>
											<path
												fill="currentColor"
												d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
											></path>
										</svg>
									</div>
								</div>
								<span>Send</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
