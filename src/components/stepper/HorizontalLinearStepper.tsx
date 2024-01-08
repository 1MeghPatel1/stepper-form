import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { pxToRem } from "../../utils/helper";
import PersonalDetails from "../forms/PersonalDetails";
import BankDetails from "../forms/BankDetails";
import EducationDetails from "../forms/EducationDetails";
import ProfessionalDetails from "../forms/ProfessionalDetails";
import ExperienceDetails from "../forms/ExperienceDetails";
import CurrentOrganizationDetails from "../forms/CurrentOrganizationDetails";
import { styled } from "@mui/material";

const steps = [
	"Personal Details",
	"Bank Details",
	"Professional Details",
	"Education Details",
	"Experience Details",
	"Current Organization Details",
];

const StyledLabel = styled(StepLabel)({
	fontSize: `${pxToRem(20)}rem`,
	textTransform: "uppercase",
});

export default function HorizontalLinearStepper() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [data, setData] = React.useState<object[]>([]);

	console.log(data);

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Box>
			<Stepper activeStep={activeStep}>
				{steps.map((label) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: React.ReactNode;
					} = {};
					return (
						<Step key={label} {...stepProps}>
							<StyledLabel {...labelProps}>{label}</StyledLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				<React.Fragment>
					<Typography sx={{ mt: 2, mb: 1 }}>
						All steps completed - you&apos;re finished
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={handleReset}>Reset</Button>
					</Box>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Box>
						{activeStep === 0 && (
							<PersonalDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
								setData={setData}
							/>
						)}
						{activeStep === 1 && (
							<BankDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
							/>
						)}
						{activeStep === 2 && <ProfessionalDetails />}
						{activeStep === 3 && <EducationDetails />}
						{activeStep === 4 && <ExperienceDetails />}
						{activeStep === 5 && <CurrentOrganizationDetails />}
					</Box>
				</React.Fragment>
			)}
		</Box>
	);
}
