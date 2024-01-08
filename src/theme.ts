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
});
export default responsiveFontSizes(theme);
