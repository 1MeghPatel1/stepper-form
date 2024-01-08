import { Stack, Typography } from "@mui/material";
import { pxToRem } from "../../utils/helper";
import { Dispatch, SetStateAction } from "react";
import NavigationButtons from "../stepper/NavigationButtons";

type propsType = {
	setActiveStep: Dispatch<SetStateAction<number>>;
	activeStep: number;
	steps: string[];
};

const BankDetails = ({ setActiveStep, activeStep, steps }: propsType) => {
	// const handleNext = (values: FormikValues) => {
	// 	console.log(values);
	// 	console.log(values.dateOfBirth.toDate());
	// 	setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// };

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			mt={`${pxToRem(20)}rem`}
		>
			<Typography variant="h6" component="h1">
				Bank Details
			</Typography>
			<NavigationButtons
				handleBack={handleBack}
				activeStep={activeStep}
				steps={steps}
			/>
		</Stack>
	);
};

export default BankDetails;
