import {
	Container,
	createTheme,
	LinearProgress,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	ThemeProvider,
	Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { numberWithCommas } from "./Banner/Carousel";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";

const CoinsTable = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const history = useNavigate();

	const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

	// console.log(coins);
	useEffect(() => {
		fetchCoins();
		// eslint-disable-next-line
	}, [currency]);
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});
	const handleSearch = () => {
		return coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
		);
	};
	const useStyles = makeStyles(() => ({
		row: {
			backgroundColor: "16171a",
			cursor: "pointer",
			"&:hover": {
				backgroundColor: "#131111",
			},
			fontFamily: "Montserrat",
		},
		pagination: {
			"& .MuiPaginationItem-root": {
				color: "gold",
			},
		},
	}));
	const classes = useStyles();
	return (
		<ThemeProvider theme={darkTheme}>
			<Container style={{ textAlign: "center" }}>
				<Typography
					variant="h4"
					style={{ margin: 18, fontFamily: "Montserrat" }}
				>
					Cryptocurrency Prices By Market Cap
				</Typography>
				<TextField
					label="Search For a Cryptocurrency..."
					variant="outlined"
					style={{ marginBottom: 20, width: "100%" }}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<TableContainer>
					{loading ? (
						<LinearProgress syle={{ backgroundColor: "gold" }} />
					) : (
						<Table>
							<TableHead style={{ backgroundColor: "#EEBC1D" }}>
								<TableRow>
									{["Coin", "Price", "24 Change", "Market Cap"].map((head) => (
										<TableCell
											style={{
												color: "#000",
												fontweight: 700,
												fontFamily: "Montserrat",
											}}
											key={head}
											align={head === "Coin" ? "" : "right"}
										>
											{head}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{handleSearch()
									.slice((page - 1) * 10, (page - 1) * 10 + 10)
									.map((row) => {
										const profit = row.price_change_percentage_24h > 0;
										return (
											<TableRow
												onClick={() => history(`/coins/${row.id}`)}
												className={classes.row}
												key={row.name}
											>
												<TableCell
													component="th"
													scope="row"
													style={{ display: "flex", gap: 15 }}
												>
													<img
														src={row.image}
														alt={row.name}
														height="50"
														styles={{ marginBottom: 10 }}
													/>
													<div
														style={{ display: "flex", flexDirection: "column" }}
													>
														<span
															style={{
																textTransform: "uppercase",
																fonstSize: 22,
															}}
														>
															{row.symbol}
														</span>
														<span style={{ color: "darkgrey" }}>
															{row.name}
														</span>
													</div>
												</TableCell>
												<TableCell align="right">
													{symbol}{" "}
													{numberWithCommas(row.current_price.toFixed(2))}
												</TableCell>
												<TableCell
													align="right"
													style={{
														color: profit > 0 ? "rgb(14,203,129" : "red",
														fontWeight: 500,
													}}
												>
													{profit && "+"}
													{row.price_change_percentage_24h.toFixed(2)}%
												</TableCell>
												<TableCell align="right">
													{symbol}{" "}
													{numberWithCommas(
														row.market_cap.toString().slice(0, -6)
													)}
													M
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					)}
				</TableContainer>
				<Pagination
					style={{
						padding: 20,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
					classes={{ ul: classes.pagination }}
					count={(handleSearch()?.length / 10).toFixed(0)}
					onChange={(_, value) => {
						setPage(value);
						window.scroll(0, 450);
					}}
				/>
			</Container>
		</ThemeProvider>
	);
};
export default CoinsTable;
