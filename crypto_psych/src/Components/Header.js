import {
	AppBar,
	Container,
	makeStyles,
	MenuItem,
	Select,
	Toolbar,
	Typography,
	createTheme,
	ThemeProvider,
	Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles(() => ({
	title: {
		flex: 1,
		color: "gold",
		fontFamily: "Montserrat",
		fontWeight: "bold",
		cursor: "pointer",
	},
}));
const Header = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { currency, setcurrency, user } = CryptoState();
	// console.log(currency);
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});
	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color="transparent" position="static">
				<Container>
					<Toolbar>
						<Typography
							onClick={() => navigate("/Cryptocurrency-Exchange-using-Blockchain")}
							className={classes.title}
							variant="h5"
						>
							Crypto Panda
						</Typography>
						<Select
							variant="outlined"
							style={{
								width: 100,
								height: 40,
								marginRight: 15,
							}}
							value={currency}
							onChange={(e) => setcurrency(e.target.value)}
						>
							<MenuItem value={"USD"}>USD</MenuItem>
							<MenuItem value={"INR"}>INR</MenuItem>
						</Select>
						{user ? (
							<>
								<Button
									variant="contained"
									style={{
										width: 100,
										height: 40,
										backgroundColor: "#EEBC1D",
										fontSize: 12,
										marginRight: 24,
										marginLeft: 20,
										fontWeight: "bolder",
									}}
									onClick={() => navigate(`/transaction`)}
								>
									Transaction
								</Button>
								{"   "}
								<UserSidebar style={{ marginRight: 0 }} />{" "}
							</>
						) : (
							<AuthModal />
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};
export default Header;
