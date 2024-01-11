import { Stack, TextField, Typography, styled } from "@mui/material";
import { pxToRem } from "../../utils/helper";
import NavigationButtons from "../stepper/NavigationButtons";
import { useFormik } from "formik";
import validationSchema from "./schemas/bankDetailsSchema";
import { bankDataType, propsType } from "./types/types";

const StyledTextField = styled(TextField)({
	width: `${pxToRem(600)}rem`,
	backgroundColor: "transparent",
});

const BankDetails = ({
	setActiveStep,
	activeStep,
	steps,
	setData,
	data,
}: propsType) => {
	const handleNext = (values: bankDataType) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setData((data) => {
			return { ...data, bankDetails: values };
		});
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
		useFormik({
			initialValues: {
				bankName: data.bankDetails.bankName ? data.bankDetails.bankName : "",
				accountName: data.bankDetails.accountName
					? data.bankDetails.accountName
					: "",
				accountNumber: data.bankDetails.accountNumber
					? data.bankDetails.accountNumber
					: "",
				IFSCCode: data.bankDetails.IFSCCode ? data.bankDetails.IFSCCode : "",
				aadhaarNumber: data.bankDetails.aadhaarNumber
					? data.bankDetails.aadhaarNumber
					: "",
				panNumber: data.bankDetails.panNumber ? data.bankDetails.panNumber : "",
			},
			validationSchema: validationSchema,
			onSubmit: handleNext,
		});

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

			<Stack
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={3}
				sx={{ width: "90%", marginTop: "25px" }}
			>
				<Stack
					// direction="row"
					// spacing={20}
					sx={{
						flexDirection: { xs: "column", sm: "row" },
						gap: { xs: 3, sm: 20 },
						minHeight: "55vh",
					}}
				>
					<Stack
						component="div"
						direction="column"
						spacing={3}
						justifyContent="space-around"
					>
						<StyledTextField
							id="bankName"
							label="Bank Name"
							variant="standard"
							value={values.bankName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.bankName && Boolean(errors.bankName)}
							helperText={touched.bankName && errors.bankName}
						/>
						<StyledTextField
							id="accountNumber"
							label="Account Number"
							variant="standard"
							value={values.accountNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.accountNumber && Boolean(errors.accountNumber)}
							helperText={touched.accountNumber && errors.accountNumber}
						/>
						<StyledTextField
							id="aadhaarNumber"
							label="Aadhar Card Number"
							variant="standard"
							value={values.aadhaarNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.aadhaarNumber && Boolean(errors.aadhaarNumber)}
							helperText={touched.aadhaarNumber && errors.aadhaarNumber}
						/>
					</Stack>
					<Stack
						component="div"
						direction="column"
						spacing={3}
						justifyContent="space-around"
					>
						<StyledTextField
							id="accountName"
							label="Account Name"
							variant="standard"
							value={values.accountName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.accountName && Boolean(errors.accountName)}
							helperText={touched.accountName && errors.accountName}
						/>
						<StyledTextField
							id="IFSCCode"
							label="IFSC Code"
							variant="standard"
							value={values.IFSCCode}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.IFSCCode && Boolean(errors.IFSCCode)}
							helperText={touched.IFSCCode && errors.IFSCCode}
						/>
						<StyledTextField
							id="panNumber"
							label="Pan Card Number"
							variant="standard"
							value={values.panNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.panNumber && Boolean(errors.panNumber)}
							helperText={touched.panNumber && errors.panNumber}
						/>
					</Stack>
				</Stack>
				<NavigationButtons
					handleBack={handleBack}
					activeStep={activeStep}
					steps={steps}
				/>
			</Stack>
		</Stack>
	);
};

export default BankDetails;
