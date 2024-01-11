import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#CD6688",
		},
		secondary: {
			main: "#EEEDED",
		},
	},
	typography: {
		fontFamily: [
			"Nunito",
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});
export default responsiveFontSizes(theme);
