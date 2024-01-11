import { Stack, TextField, Typography, styled } from "@mui/material";
import { pxToRem } from "../../utils/helper";
import NavigationButtons from "../stepper/NavigationButtons";
import { FormikValues, useFormik } from "formik";
import validationSchema from "./schemas/currentOrganizationDetailsSchema";
import { currentOrganizationDetailsType, propsType } from "./types/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-in";
import dayjs from "dayjs";

const StyledTextField = styled(TextField)({
	width: `${pxToRem(500)}rem`,
	backgroundColor: "transparent",
});

const CurrentOrganizationDetails = ({
	setActiveStep,
	activeStep,
	steps,
	setData,
	data,
}: propsType) => {
	const handleNext = (values: FormikValues) => {
		const newData = {
			...values,
			appraisalDate: values.appraisalDate.format("YYYY-MM-DD"),
			joiningDate: values.joiningDate.format("YYYY-MM-DD"),
			currentCTC: Number(values.currentCTC),
		} as currentOrganizationDetailsType;
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setData((data) => {
			return { ...data, currentOrganizationDetails: newData };
		});
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const {
		values,
		handleSubmit,
		handleChange,
		handleBlur,
		errors,
		touched,
		setFieldValue,
	} = useFormik({
		initialValues: {
			appraisalDate:
				data.currentOrganizationDetails.appraisalDate !== ""
					? dayjs(data.currentOrganizationDetails.appraisalDate)
					: dayjs(new Date()),
			currentCTC: data.currentOrganizationDetails.currentCTC
				? data.currentOrganizationDetails.currentCTC
				: "",
			joiningDate:
				data.currentOrganizationDetails.joiningDate !== ""
					? dayjs(data.currentOrganizationDetails.joiningDate)
					: dayjs(new Date()),
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
				Current Organization Details
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
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale="en-in"
						>
							<DatePicker
								sx={{ width: `${pxToRem(500)}rem` }}
								label="Enter Your Joining Date"
								slotProps={{
									textField: {
										id: "joiningDate",
										variant: "standard",
										error: touched?.joiningDate && Boolean(errors.joiningDate),
										helperText:
											touched?.joiningDate && errors?.joiningDate + "" && "",
									},
								}}
								onChange={(newValue): void => {
									setFieldValue("joiningDate", newValue);
								}}
								value={values.joiningDate}
								disablePast
							/>
						</LocalizationProvider>
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale="en-in"
						>
							<DatePicker
								sx={{ width: `${pxToRem(500)}rem` }}
								label="Next Appraisal Date"
								slotProps={{
									textField: {
										id: "appraisalDate",
										variant: "standard",
										error:
											touched?.appraisalDate && Boolean(errors.appraisalDate),
										helperText:
											touched?.appraisalDate &&
											errors?.appraisalDate + "" &&
											"",
									},
								}}
								onChange={(newValue): void => {
									setFieldValue("appraisalDate", newValue);
								}}
								value={values.appraisalDate}
								disablePast
							/>
						</LocalizationProvider>
						<StyledTextField
							id="currentCTC"
							label="Current CTC"
							variant="standard"
							value={values.currentCTC}
							onChange={handleChange}
							error={touched.currentCTC && !!errors.currentCTC}
							helperText={!!errors.currentCTC && errors.currentCTC}
							onBlur={handleBlur}
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

export default CurrentOrganizationDetails;
