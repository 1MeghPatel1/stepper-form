import {
	Box,
	Button,
	Checkbox,
	Fab,
	FormControlLabel,
	Modal,
	Stack,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { pxToRem } from "./../../utils/helper";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-in";
import dayjs from "dayjs";
import { FormikValues, useFormik } from "formik";
import validationSchema from "./schemas/personalDetailsSchema";
import NavigationButtons from "../stepper/NavigationButtons";
import CloseIcon from "@mui/icons-material/Close";
import { personaldataType, propsType } from "./types/types";
import { useState } from "react";

const StyledTextField = styled(TextField)({
	width: `${pxToRem(400)}rem`,
	backgroundColor: "transparent",
});

const PersonalDetails = ({
	setActiveStep,
	activeStep,
	steps,
	setData,
	data,
}: propsType) => {
	const handleNext = (values: FormikValues) => {
		const newData = {
			...values,
			dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
		} as personaldataType;
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setData((data) => {
			return { ...data, personalDetails: newData };
		});
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const [imgUrl, setImgUrl] = useState("");

	const [sameAddChecked, setSameAddChecked] = useState(false);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const {
		values,
		handleSubmit,
		handleChange,
		handleBlur,
		errors,
		touched,
		setFieldValue,
	} = useFormik<personaldataType>({
		initialValues: {
			firstName: data.personalDetails.firstName
				? data.personalDetails.firstName
				: "",
			middleName: data.personalDetails.middleName
				? data.personalDetails.middleName
				: "",
			lastName: data.personalDetails.lastName
				? data.personalDetails.lastName
				: "",
			email: data.personalDetails.email ? data.personalDetails.email : "",
			mobileNo: data.personalDetails.mobileNo
				? data.personalDetails.mobileNo
				: "",
			dateOfBirth:
				data.personalDetails.dateOfBirth !== ""
					? dayjs(data.personalDetails.dateOfBirth)
					: dayjs(new Date()).subtract(18, "year"),
			presentAddress: data.personalDetails.presentAddress
				? data.personalDetails.presentAddress
				: "",
			permenantAddress: data.personalDetails.permenantAddress
				? data.personalDetails.permenantAddress
				: "",
			profileImage: data.personalDetails.profileImage
				? data.personalDetails.profileImage
				: null,
		},
		validationSchema: validationSchema,
		onSubmit: handleNext,
	});

	const handleRemoveClick = () => {
		setFieldValue("profileImage", null);
		setImgUrl("");
	};

	const imgInput = document.querySelector("#imgInput") as HTMLInputElement;

	return (
		<Stack
			direction="column"
			justifyContent="space-between"
			alignItems="center"
			mt={`${pxToRem(20)}rem`}
			minHeight="75vh"
		>
			<Typography variant="h6" component="h1" mt={2}>
				Personal Details
			</Typography>
			<Stack
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
				spacing={3}
				sx={{
					width: "90%",
					marginTop: "25px",
					flexDirection: { xs: "column" },
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
						id="firstName"
						label="First Name"
						variant="standard"
						value={values.firstName}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.firstName && Boolean(errors.firstName)}
						helperText={touched.firstName && errors.firstName}
					/>
					<StyledTextField
						id="middleName"
						label="Middle Name"
						variant="standard"
						value={values.middleName}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.middleName && Boolean(errors.middleName)}
						helperText={touched.middleName && errors.middleName}
					/>
					<StyledTextField
						id="lastName"
						label="Last Name"
						variant="standard"
						value={values.lastName}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.lastName && Boolean(errors.lastName)}
						helperText={touched.lastName && errors.lastName}
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
					<StyledTextField
						id="email"
						label="Email"
						variant="standard"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.email && Boolean(errors.email)}
						helperText={touched.email && errors.email}
					/>
					<StyledTextField
						id="mobileNo"
						label="Mobile Number"
						variant="standard"
						value={values.mobileNo}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.mobileNo && Boolean(errors.mobileNo)}
						helperText={touched.mobileNo && errors.mobileNo}
					/>
					<LocalizationProvider
						dateAdapter={AdapterDayjs}
						adapterLocale="en-in"
					>
						<DatePicker
							sx={{ width: `${pxToRem(400)}rem` }}
							label="Enter Your Birth Date"
							slotProps={{
								textField: {
									id: "dateOfBirth",
									variant: "standard",
									error: touched?.dateOfBirth && Boolean(errors.dateOfBirth),
									helperText:
										touched?.dateOfBirth && errors?.dateOfBirth + "" && "",
								},
							}}
							onChange={(newValue): void => {
								setFieldValue("dateOfBirth", newValue);
							}}
							value={values.dateOfBirth}
							maxDate={dayjs(new Date().toISOString()).subtract(18, "year")}
						/>
					</LocalizationProvider>
				</Stack>
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						component="label"
						sx={{ alignSelf: "flex-start" }}
					>
						Upload File
						<input
							id="imgInput"
							accept="image/*"
							type="file"
							name="profileImage"
							onChange={(e) => {
								const file = e.target.files?.[0] as File;
								setFieldValue("profileImage", file);
								setImgUrl(URL.createObjectURL(file));
								if (imgInput) {
									imgInput.value = "";
								}
							}}
							hidden
						/>
					</Button>
					{values.profileImage && (
						<Box sx={{ position: "relative", width: "max-content" }}>
							<Button
								variant="outlined"
								sx={{
									fontWeight: "400",
									textTransform: "inherit",
								}}
								onClick={handleOpen}
							>
								{values?.profileImage?.name}
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
				<Stack
					component="div"
					// direction="row"
					justifyContent="space-between"
					sx={{
						flexDirection: { xs: "column", sm: "row" },
						gap: 3,
					}}
				>
					<TextField
						id="presentAddress"
						label="Present Address"
						variant="standard"
						fullWidth
						multiline
						rows={4}
						value={values.presentAddress}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.presentAddress && Boolean(errors.presentAddress)}
						helperText={touched.presentAddress && errors.presentAddress}
					/>
					<TextField
						id="permenantAddress"
						label="Permenant Address"
						variant="standard"
						fullWidth
						multiline
						rows={4}
						value={
							sameAddChecked ? values.presentAddress : values.permenantAddress
						}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.permenantAddress && Boolean(errors.permenantAddress)}
						helperText={touched.permenantAddress && errors.permenantAddress}
					/>
				</Stack>
				<FormControlLabel
					required
					control={
						<Checkbox
							onChange={() => {
								setSameAddChecked((prev) => !prev);
								setFieldValue("permenantAddress", values.presentAddress);
							}}
						/>
					}
					label="permenant address same as present address?"
				/>
				<NavigationButtons
					handleBack={handleBack}
					activeStep={activeStep}
					steps={steps}
				/>
			</Stack>
			<Modal
				open={open}
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						bgcolor: "#FFFFEC",
						width: "60%",
						height: "70%",
						padding: "1rem",
						borderRadius: "20px",
					}}
				>
					<Typography variant="h4">Preview</Typography>
					<iframe
						style={{
							width: "100%",
							height: "90%",
							borderRadius: "20px",
							border: "none",
						}}
						src={imgUrl}
					></iframe>
				</Box>
			</Modal>
		</Stack>
	);
};

export default PersonalDetails;
