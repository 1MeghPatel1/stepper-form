import { Container, ThemeProvider } from "@mui/material";
import HorizontalLinearStepper from "./components/stepper/HorizontalLinearStepper";
import { StyleSheetManager } from "styled-components";
import { styled } from "@mui/system";
import { pxToRem } from "./utils/helper";
import theme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/home/Home";
import AnimateMouseMovement from "./components/ui/AnimateMouseMovement";

const queryClient = new QueryClient();

const StyledContainer = styled(Container)({
	minHeight: "100dvh",
	minWidth: "100dvw",
	padding: `${pxToRem(35)}rem`,
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/forms",
		element: <HorizontalLinearStepper />,
	},
	{
		path: "/forms/edit/:id",
		element: <HorizontalLinearStepper />,
	},
]);

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<StyleSheetManager
				shouldForwardProp={(prop) => prop !== "sortActive" && prop !== "center"}
			>
				<StyledContainer sx={{ bgcolor: "secondary.main" }}>
					<QueryClientProvider client={queryClient}>
						<AnimateMouseMovement>
							<RouterProvider router={router} />
						</AnimateMouseMovement>
					</QueryClientProvider>
				</StyledContainer>
			</StyleSheetManager>
		</ThemeProvider>
	);
};

export default App;
