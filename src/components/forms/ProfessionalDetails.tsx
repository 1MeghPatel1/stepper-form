import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	Fab,
	Stack,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { pxToRem } from "../../utils/helper";
import NavigationButtons from "../stepper/NavigationButtons";
import { professionalDataType, propsType } from "./types/types";
import { useFormik } from "formik";
import validationSchema from "./schemas/professionalDetailsSchema";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const StyledTextField = styled(TextField)({
	width: `${pxToRem(600)}rem`,
	backgroundColor: "transparent",
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const skillOptions = [
	"React",
	"Angular",
	"Vue",
	"Node",
	"Java",
	"SQL",
	"Android",
	"Flutter",
];

const ProfessionalDetails = ({
	setActiveStep,
	activeStep,
	steps,
	setData,
}: propsType) => {
	const handleNext = (values: professionalDataType) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setData((data) => {
			return { ...data, professionalDetails: values };
		});
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleOpen = () => {
		window.open(resumeUrl);
	};

	const handleRemoveClick = () => {
		setFieldValue("resume", null);
	};

	const [resumeUrl, setResumeUrl] = useState("");

	const {
		values,
		handleSubmit,
		handleChange,
		handleBlur,
		errors,
		touched,
		setFieldValue,
	} = useFormik<professionalDataType>({
		initialValues: {
			designation: "",
			department: "",
			skills: [],
			currentLocation: "",
			years: "",
			months: "",
			resume: null,
		},
		validationSchema: validationSchema,
		onSubmit: handleNext,
	});

	const resumeInput = document.querySelector(
		"#resumeInput"
	) as HTMLInputElement;

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			mt={`${pxToRem(20)}rem`}
		>
			<Typography variant="h6" component="h1">
				Professional Details
			</Typography>

			<Stack
				component="form"
				noValidate
				autoComplete="off"
				spacing={3}
				// direction="column"
				onSubmit={handleSubmit}
				sx={{
					width: "90%",
					marginTop: "25px",
					flexDirection: { sm: "column" },
				}}
			>
				<Stack
					spacing={7}
					sx={{
						minHeight: "55vh",
					}}
				>
					<Stack
						component="div"
						// direction="row"
						justifyContent="space-between"
						sx={{
							flexDirection: { xs: "column", sm: "row" },
						}}
					>
						<StyledTextField
							id="designation"
							label="Designation"
							variant="standard"
							value={values.designation}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.designation && Boolean(errors.designation)}
							helperText={touched.designation && errors.designation}
						/>
						<StyledTextField
							id="department"
							label="Department"
							variant="standard"
							value={values.department}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.department && Boolean(errors.department)}
							helperText={touched.department && errors.department}
						/>
					</Stack>
					<Stack
						component="div"
						// direction="row"
						justifyContent="space-between"
						sx={{
							flexDirection: { xs: "column", sm: "row" },
						}}
					>
						<Autocomplete
							multiple
							id="skills"
							options={skillOptions}
							disableCloseOnSelect
							getOptionLabel={(option) => option}
							onChange={(_, newValue) => {
								setFieldValue("skills", newValue);
							}}
							renderOption={(props, option, { selected }) => (
								<li {...props}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option}
								</li>
							)}
							style={{ width: 500 }}
							renderInput={(params) => (
								<StyledTextField
									{...params}
									label="Skills"
									variant="standard"
									error={touched.skills && Boolean(errors.skills)}
									helperText={touched.skills && errors.skills}
								/>
							)}
						/>
						<StyledTextField
							id="currentLocation"
							label="Current Location"
							variant="standard"
							value={values.currentLocation}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.currentLocation && Boolean(errors.currentLocation)}
							helperText={touched.currentLocation && errors.currentLocation}
						/>
					</Stack>
					<Stack
						component="div"
						// direction="row"
						justifyContent="flex-start"
						alignItems="flex-end"
						sx={{
							flexDirection: { xs: "column", sm: "row" },
							gap: 17,
						}}
					>
						<Stack direction="row" spacing={3} alignItems="flex-end">
							<Typography variant="h6">Experience -</Typography>
							<Autocomplete
								id="years"
								options={Array.from({ length: 10 }, (_, i) => i)}
								getOptionLabel={(option: number) =>
									option < 2 ? option + " Year" : option + " Years"
								}
								onChange={(_, newValue) => {
									setFieldValue("years", newValue);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Years"
										variant="standard"
										error={touched.years && Boolean(errors.years)}
										helperText={touched.years && errors.years}
									/>
								)}
								sx={{ width: `${pxToRem(220)}rem` }}
							/>

							<Autocomplete
								id="months"
								options={Array.from({ length: 12 }, (_, i) => i)}
								getOptionLabel={(option: number) =>
									option < 2 ? option + " Month" : option + " Months"
								}
								onChange={(_, newValue) => {
									setFieldValue("months", newValue);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Months"
										variant="standard"
										error={touched.months && Boolean(errors.months)}
										helperText={touched.months && errors.months}
									/>
								)}
								sx={{ width: `${pxToRem(220)}rem` }}
							/>
						</Stack>
						<Stack direction="row" spacing={2}>
							<Button
								variant="contained"
								component="label"
								sx={{ alignSelf: "flex-start" }}
							>
								Upload Resume
								<input
									id="resumeInput"
									accept="application/pdf"
									type="file"
									name="resumeFile"
									onChange={(e) => {
										const file = e.target.files?.[0] as File;
										setFieldValue("resume", file);
										setResumeUrl(URL.createObjectURL(file));
										if (resumeInput) {
											resumeInput.value = "";
										}
									}}
									hidden
								/>
							</Button>
							{values.resume && (
								<Box sx={{ position: "relative", width: "max-content" }}>
									<Button
										variant="outlined"
										sx={{
											fontWeight: "400",
											textTransform: "inherit",
										}}
										onClick={handleOpen}
									>
										{values?.resume?.name}
									</Button>
									<Fab
										sx={{
											position: "absolute",
											height: "5px",
											width: "35px",
											top: "-18px",
											right: "-20px",
										}}
										size="small"
										color="primary"
										aria-label="add"
										onClick={handleRemoveClick}
									>
										<CloseIcon fontSize="medium" />
									</Fab>
								</Box>
							)}
						</Stack>
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

export default ProfessionalDetails;
