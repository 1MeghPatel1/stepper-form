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
import { Stack, styled } from "@mui/material";
import { initialSatateType } from "../forms/types/types";
import { initialState } from "../forms/types/initialState";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFormEntry } from "../../services/apiServices";

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
	const [activeStep, setActiveStep] = React.useState(2);
	const [data, setData] = React.useState<initialSatateType>(initialState);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	console.log(data);

	const mutation = useMutation({
		mutationFn: postFormEntry,
		onSuccess: () => {
			// Invalidate and refetch
			console.log("successfull");
			queryClient.invalidateQueries({ queryKey: ["formEntries"] });
			setActiveStep(0);
			navigate("/");
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const handleSubmit = async () => {
		// const formData = new FormData();

		// type keyType = keyof initialSatateType;
		// let key: keyType;
		// for (key in data) {
		// 	formData.append(key, data[key]);
		// }

		mutation.mutate(data);
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
				<Stack justifyContent="center" alignItems="center" minHeight="30rem">
					<Stack
						bgcolor="rgb(220, 220, 220)"
						width="40%"
						justifyContent="center"
						alignItems="center"
						p={5}
						borderRadius={5}
						spacing={3}
					>
						<Typography>
							All Steps Completed - Navigate Back to Home Page
						</Typography>
						<Button
							variant="contained"
							onClick={() => {
								navigate("/");
							}}
						>
							Back To Home
						</Button>
					</Stack>
				</Stack>
			) : (
				<React.Fragment>
					<Box>
						{activeStep === 0 && (
							<PersonalDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
								setData={setData}
								data={data}
							/>
						)}
						{activeStep === 1 && (
							<BankDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
								setData={setData}
								data={data}
							/>
						)}
						{activeStep === 2 && (
							<ProfessionalDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
								setData={setData}
								data={data}
							/>
						)}
						{activeStep === 3 && (
							<EducationDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
								setData={setData}
								data={data}
							/>
						)}
						{activeStep === 4 && (
							<ExperienceDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
								setData={setData}
								data={data}
							/>
						)}
						{activeStep === 5 && (
							<CurrentOrganizationDetails
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								steps={steps}
								setData={setData}
								data={data}
								handleDataSubmit={handleSubmit}
							/>
						)}
					</Box>
				</React.Fragment>
			)}
		</Box>
	);
}
