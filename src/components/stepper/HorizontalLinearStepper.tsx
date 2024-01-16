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
import { useNavigate, useParams } from "react-router-dom";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { postFormEntry } from "../../services/apiServices";
import { motion } from "framer-motion";
import { getFormEntry } from "../../services/localHostServices";

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
	const [isLoading, setIsLoading] = React.useState(true);
	const [data, setData] = React.useState<initialSatateType>(initialState);
	const [isForwardAnimation, setIsForwardAnimation] = React.useState(true);
	const navigate = useNavigate();
	const params = useParams();

	React.useEffect(() => {
		if (Number(params.id)) {
			const formData = getFormEntry(Number(params.id));
			setData(formData);
		}
		setIsLoading(false);
	}, [params]);

	// const queryClient = useQueryClient();

	// const mutation = useMutation({
	// 	mutationFn: postFormEntry,
	// 	onSuccess: () => {
	// 		// Invalidate and refetch
	// 		console.log("successfull");
	// 		queryClient.invalidateQueries({ queryKey: ["formEntries"] });
	// 		setActiveStep(0);
	// 		navigate("/");
	// 	},
	// 	onError: (err) => {
	// 		console.log(err);
	// 	},
	// });

	// const handleSubmit = () => {
	// 	const allFormEntries = getAllFormEntries();
	// 	console.log(data);

	// 	if (allFormEntries) {
	// 		allFormEntries.push({ id: allFormEntries.length + 1, formData: data });
	// 		localStorage.setItem("allFormEntries", JSON.stringify(allFormEntries));
	// 	} else {
	// 		localStorage.setItem(
	// 			"allFormEntries",
	// 			JSON.stringify([{ id: 1, formData: data }])
	// 		);
	// 	}

	// 	// const formData = new FormData();
	// 	// type keyType = keyof initialSatateType;
	// 	// let key: keyType;
	// 	// for (key in data) {
	// 	// 	formData.append(key, data[key]);
	// 	// }
	// 	// mutation.mutate(data);
	// };
	console.log(data);

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
				<AnimatedBox isForwardAnimation={isForwardAnimation}>
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
				</AnimatedBox>
			) : (
				<React.Fragment>
					{!isLoading && (
						<Box>
							{activeStep === 0 && (
								<motion.div
									className="container"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										type: "spring",
										stiffness: 50,
										damping: 10,
									}}
								>
									<PersonalDetails
										activeStep={activeStep}
										setActiveStep={setActiveStep}
										steps={steps}
										setData={setData}
										data={data}
										setIsForwardAnimation={setIsForwardAnimation}
									/>
								</motion.div>
							)}
							{activeStep === 1 && (
								<AnimatedBox isForwardAnimation={isForwardAnimation}>
									<BankDetails
										activeStep={activeStep}
										setActiveStep={setActiveStep}
										steps={steps}
										setData={setData}
										data={data}
										setIsForwardAnimation={setIsForwardAnimation}
									/>
								</AnimatedBox>
							)}
							{activeStep === 2 && (
								<AnimatedBox isForwardAnimation={isForwardAnimation}>
									<ProfessionalDetails
										activeStep={activeStep}
										setActiveStep={setActiveStep}
										steps={steps}
										setData={setData}
										data={data}
										setIsForwardAnimation={setIsForwardAnimation}
									/>
								</AnimatedBox>
							)}
							{activeStep === 3 && (
								<AnimatedBox isForwardAnimation={isForwardAnimation}>
									<EducationDetails
										activeStep={activeStep}
										setActiveStep={setActiveStep}
										steps={steps}
										setData={setData}
										data={data}
										setIsForwardAnimation={setIsForwardAnimation}
									/>
								</AnimatedBox>
							)}
							{activeStep === 4 && (
								<AnimatedBox isForwardAnimation={isForwardAnimation}>
									<ExperienceDetails
										activeStep={activeStep}
										setActiveStep={setActiveStep}
										steps={steps}
										setData={setData}
										data={data}
										setIsForwardAnimation={setIsForwardAnimation}
									/>
								</AnimatedBox>
							)}
							{activeStep === 5 && (
								<AnimatedBox isForwardAnimation={isForwardAnimation}>
									<CurrentOrganizationDetails
										activeStep={activeStep}
										setActiveStep={setActiveStep}
										steps={steps}
										setData={setData}
										data={data}
										setIsForwardAnimation={setIsForwardAnimation}
									/>
								</AnimatedBox>
							)}
						</Box>
					)}
				</React.Fragment>
			)}
		</Box>
	);
}

const AnimatedBox = ({
	children,
	isForwardAnimation,
}: {
	children: React.ReactNode;
	isForwardAnimation: boolean;
}) => {
	return (
		<motion.div
			className="container"
			initial={{
				opacity: 0,
				scale: 0.8,
				translateX: isForwardAnimation ? 1000 : -1000,
			}}
			animate={{ opacity: 1, scale: 1, translateX: 0 }}
			transition={{
				type: "spring",
				stiffness: 65,
				damping: 15,
			}}
		>
			{children}
		</motion.div>
	);
};
