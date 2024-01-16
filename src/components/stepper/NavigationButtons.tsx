import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type propsType = {
	handleBack: () => void;
	handleNext?: () => void;
	activeStep: number;
	steps: string[];
};

const NavigationButtons = ({
	handleBack,
	activeStep,
	steps,
	handleNext,
}: propsType) => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "row",
				pt: 5,
			}}
		>
			<Button
				color="inherit"
				disabled={activeStep === 0}
				onClick={handleBack}
				sx={{ mr: 1 }}
			>
				Back
			</Button>
			<Button color="inherit" variant="contained" onClick={() => navigate("/")}>
				Back to List
			</Button>
			<Box sx={{ flex: "1 1 auto" }} />

			{!handleNext && (
				<Button type="submit" color="primary" variant="contained">
					{activeStep === steps.length - 1 ? "Submit" : "Next"}
				</Button>
			)}
			{handleNext && (
				<Button
					type="submit"
					color="primary"
					variant="contained"
					onClick={handleNext}
				>
					{activeStep === steps.length - 1 ? "Submit" : "Next"}
				</Button>
			)}
		</Box>
	);
};

export default NavigationButtons;
