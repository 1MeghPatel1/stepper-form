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
import { Dispatch, SetStateAction, useState } from "react";
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
import { personaldataType } from "./types";

const StyledTextField = styled(TextField)({
	width: `${pxToRem(400)}rem`,
	backgroundColor: "transparent",
});

type propsType = {
	setActiveStep: Dispatch<SetStateAction<number>>;
	activeStep: number;
	steps: string[];
	setData: Dispatch<SetStateAction<object[]>>;
};

const PersonalDetails = ({
	setActiveStep,
	activeStep,
	steps,
	setData,
}: propsType) => {
	const handleNext = (values: FormikValues) => {
		const newData = { ...values, dateOfBirth: values.dateOfBirth.toDate() };
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setData((data) => [...data, newData]);
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
			firstName: "",
			middleName: "",
			lastName: "",
			email: "",
			mobile: "",
			dateOfBirth: dayjs(new Date().toISOString()),
			presentAdd: "",
			permenantAdd: "",
			imgFile: null,
		},
		validationSchema: validationSchema,
		onSubmit: handleNext,
	});

	const handleRemoveClick = () => {
		setFieldValue("imgFile", null);
		setImgUrl("");
	};

	const imgInput = document.querySelector("#imgInput") as HTMLInputElement;

	console.log(values);

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
				direction="column"
				spacing={3}
				sx={{ width: "90%", marginTop: "25px" }}
			>
				<Stack
					component="div"
					direction="row"
					spacing={3}
					justifyContent="space-between"
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
					direction="row"
					spacing={3}
					justifyContent="space-between"
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
						id="mobile"
						label="Mobile Number"
						variant="standard"
						value={values.mobile}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.mobile && Boolean(errors.mobile)}
						helperText={touched.mobile && errors.mobile}
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
										(touched?.dateOfBirth && errors?.dateOfBirth + "") ?? "",
									onChange: handleChange,
								},
							}}
							value={values.dateOfBirth}
							disableFuture
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
							name="imgFile"
							onChange={(e) => {
								const file = e.target.files?.[0] as File;
								setFieldValue("imgFile", file);
								setImgUrl(URL.createObjectURL(file));
								if (imgInput) {
									imgInput.value = "";
								}
							}}
							hidden
						/>
					</Button>
					{values.imgFile && (
						<Box sx={{ position: "relative", width: "max-content" }}>
							<Button
								variant="outlined"
								sx={{
									fontWeight: "400",
									textTransform: "inherit",
								}}
								onClick={handleOpen}
							>
								{values?.imgFile?.name}
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
					direction="row"
					spacing={3}
					justifyContent="space-between"
				>
					<TextField
						id="presentAdd"
						label="Present Address"
						variant="standard"
						fullWidth
						multiline
						rows={4}
						value={values.presentAdd}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.presentAdd && Boolean(errors.presentAdd)}
						helperText={touched.presentAdd && errors.presentAdd}
					/>
					<TextField
						id="permenantAdd"
						label="Permenant Address"
						variant="standard"
						fullWidth
						multiline
						rows={4}
						value={sameAddChecked ? values.presentAdd : values.permenantAdd}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.permenantAdd && Boolean(errors.permenantAdd)}
						helperText={touched.permenantAdd && errors.permenantAdd}
					/>
				</Stack>
				<FormControlLabel
					required
					control={
						<Checkbox
							onChange={() => {
								setSameAddChecked((prev) => !prev);
								setFieldValue("permenantAdd", values.presentAdd);
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
