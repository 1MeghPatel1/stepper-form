import { Container, ThemeProvider } from "@mui/material";
import HorizontalLinearStepper from "./components/stepper/HorizontalLinearStepper";
import { StyleSheetManager } from "styled-components";
import { styled } from "@mui/system";
import { pxToRem } from "./utils/helper";
import theme from "./theme";

const StyledContainer = styled(Container)({
	minHeight: "100dvh",
	minWidth: "100dvw",
	padding: `${pxToRem(35)}rem`,
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
				<StyledContainer sx={{ bgcolor: "secondary.main" }}>
					<HorizontalLinearStepper />
				</StyledContainer>
			</StyleSheetManager>
		</ThemeProvider>
	);
};

export default App;
