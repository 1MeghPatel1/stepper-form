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
				ifscCode: data.bankDetails.ifscCode ? data.bankDetails.ifscCode : "",
				aadharCardNumber: data.bankDetails.aadharCardNumber
					? data.bankDetails.aadharCardNumber
					: "",
				panCardNumber: data.bankDetails.panCardNumber
					? data.bankDetails.panCardNumber
					: "",
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
							id="aadharCardNumber"
							label="Aadhar Card Number"
							variant="standard"
							value={values.aadharCardNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							error={
								touched.aadharCardNumber && Boolean(errors.aadharCardNumber)
							}
							helperText={touched.aadharCardNumber && errors.aadharCardNumber}
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
							id="ifscCode"
							label="IFSC Code"
							variant="standard"
							value={values.ifscCode}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.ifscCode && Boolean(errors.ifscCode)}
							helperText={touched.ifscCode && errors.ifscCode}
						/>
						<StyledTextField
							id="panCardNumber"
							label="Pan Card Number"
							variant="standard"
							value={values.panCardNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.panCardNumber && Boolean(errors.panCardNumber)}
							helperText={touched.panCardNumber && errors.panCardNumber}
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
