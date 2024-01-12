/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Alert,
	Box,
	Button,
	Fab,
	Slide,
	SlideProps,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { pxToRem } from "../../utils/helper";
import DataTable from "react-data-table-component";
import {
	EducationDataRow as DataRow,
	educationDetailsType,
	propsType,
} from "./types/types";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyTable from "../ui/EmptyTable";
import { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./schemas/educationalDetailsSchema";
import NavigationButtons from "../stepper/NavigationButtons";

const customStyles = {
	rows: {
		style: {
			backgroundColor: "#EEEDED", // override the row height
			minHeight: "5rem",
			minWidth: "90vw",
			fontSize: "1rem",
		},
	},
	headCells: {
		style: {
			backgroundColor: "#dddddd",
			fontSize: "1rem",
		},
	},
	cells: {
		style: {
			backgroundColor: "#EEEDED",
		},
	},
};

const EducationDetails = ({
	setActiveStep,
	activeStep,
	steps,
	setData,
	data,
	setIsForwardAnimation,
}: propsType) => {
	//initial table data
	const initialTableData =
		data.educationDetails.length > 0
			? data.educationDetails.map((row, i) => {
					const newRow = { ...row, id: i + 1 };
					return newRow;
			  })
			: [
					//fake data it is not rendered just used for logic the component that renders on empty data is EmptyTable.tsx which is in ui directory
					{
						id: 0,
						educationName: "No Records to Display",
						universityName: "",
						result: "",
						yearOfPassing: "",
					},
			  ];

	const [tableData, setTableData] = useState<DataRow[]>(initialTableData);
	const [addNewInput, setAddNewInput] = useState(false);
	const [error, setError] = useState(false);
	const [editRowId, setEditRowId] = useState<number | null>();
	const [snackOpen, setSnackOpen] = useState(false);

	const handleNext = () => {
		if (
			tableData.length === 0 ||
			tableData[0].educationName === "No Records to Display"
		) {
			setError(true);
			setSnackOpen(true);
			return;
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setIsForwardAnimation(true);
		setData((data) => {
			return {
				...data,
				educationDetails: tableData.map((row) => {
					const newRow = {
						educationName: row.educationName,
						universityName: row.universityName,
						result: row.result,
						yearOfPassing: Number(row.yearOfPassing),
					};
					return newRow;
				}),
			};
		});
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		setIsForwardAnimation(false);
	};

	//formik initial values
	const initialValues: educationDetailsType = {
		educationName: "",
		universityName: "",
		result: "",
		yearOfPassing: "",
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
		initialValues,
		validationSchema: validationSchema,
		onSubmit: (values, actions): void => {
			//first time when row is showing now records to display
			if (tableData[0]?.educationName === "No Records to Display") {
				setTableData([{ ...values, id: 1 }]);
			} //when editing education row
			else if (editRowId) {
				const newData = tableData.map((row) => {
					if (row.id === editRowId) {
						return { ...values, id: row.id };
					}
					return row;
				});
				setTableData(newData);
				setEditRowId(null);
			} //normally when adding new row
			else {
				setTableData((tableData) => [
					...tableData,
					{ ...values, id: tableData.length + 1 },
				]);
			}
			setAddNewInput(false);
			setEditRowId(null);
			actions.resetForm();
		},
	});

	const handleEdit = (rowId: number) => {
		const row = tableData.find((row) => row.id === rowId);
		setEditRowId(rowId);
		setFieldValue("educationName", row?.educationName);
		setFieldValue("universityName", row?.universityName);
		setFieldValue("result", row?.result);
		setFieldValue("yearOfPassing", row?.yearOfPassing);
	};

	const handleDelete = (rowId: number) => {
		setTableData((data) => data.filter((row) => row.id !== rowId));
	};

	const handleSnackClose = () => {
		setSnackOpen(false);
	};

	//row values when we are adding new rows
	const newInputRow = {
		id: tableData.length + 1,
		educationName: "New Input",
		universityName: "",
		result: "",
		yearOfPassing: "",
	};

	//setting table rows dynamically when addNewInput state is true
	const tableRows = addNewInput ? [...tableData, newInputRow] : tableData;

	const columns = [
		{
			name: "Education Name",
			selector: (row: DataRow) => row.educationName,
			cell: (row: DataRow) => {
				if (row.educationName === "New Input") {
					return (
						<TextField
							id="educationName"
							label="Education Name"
							variant="standard"
							value={values.educationName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.educationName && Boolean(errors.educationName)}
							helperText={touched.educationName && errors.educationName}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="educationName"
							label="Education Name"
							variant="standard"
							value={values.educationName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.educationName && Boolean(errors.educationName)}
							helperText={touched.educationName && errors.educationName}
						/>
					);
				} else return row.educationName;
			},
		},
		{
			name: "University Name",
			selector: (row: DataRow) => row.universityName,
			cell: (row: DataRow) => {
				if (row.educationName === "New Input") {
					return (
						<TextField
							id="universityName"
							label="University Name"
							variant="standard"
							value={values.universityName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.universityName && Boolean(errors.universityName)}
							helperText={touched.universityName && errors.universityName}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="universityName"
							label="Education Name"
							variant="standard"
							value={values.universityName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.universityName && Boolean(errors.universityName)}
							helperText={touched.universityName && errors.universityName}
						/>
					);
				} else return row.universityName;
			},
		},
		{
			name: "Result",
			selector: (row: DataRow) => row.result,
			cell: (row: DataRow) => {
				if (row.educationName === "New Input") {
					return (
						<TextField
							id="result"
							label="Result"
							variant="standard"
							value={values.result}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.result && Boolean(errors.result)}
							helperText={touched.result && errors.result}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="result"
							label="Education Name"
							variant="standard"
							value={values.result}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.result && Boolean(errors.result)}
							helperText={touched.result && errors.result}
						/>
					);
				} else return row.result;
			},
		},
		{
			name: "Year of Passing",
			selector: (row: DataRow) => row.yearOfPassing,
			cell: (row: DataRow) => {
				if (row.educationName === "New Input") {
					return (
						<TextField
							id="yearOfPassing"
							label="Year of Passing"
							variant="standard"
							value={values.yearOfPassing}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.yearOfPassing && Boolean(errors.yearOfPassing)}
							helperText={touched.yearOfPassing && errors.yearOfPassing}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="yearOfPassing"
							label="Education Name"
							variant="standard"
							value={values.yearOfPassing}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.yearOfPassing && Boolean(errors.yearOfPassing)}
							helperText={touched.yearOfPassing && errors.yearOfPassing}
						/>
					);
				} else return row.yearOfPassing;
			},
		},
		{
			name: "Action",
			cell: (row: DataRow) => {
				if (row.educationName === "No Records to Display") {
					return <div></div>;
				} else if (row.educationName === "New Input" || editRowId === row.id) {
					return (
						<Stack spacing={1} direction="row">
							<Fab size="small" color="primary" type="submit">
								<AddTaskIcon />
							</Fab>
							<Fab
								size="small"
								onClick={() => {
									setEditRowId(null);
									setAddNewInput(false);
								}}
							>
								<CloseIcon />
							</Fab>
						</Stack>
					);
				} else {
					return (
						<Stack spacing={1} direction="row">
							<Fab
								size="small"
								color="primary"
								type="submit"
								onClick={(e: React.MouseEvent<HTMLElement>) => {
									e.preventDefault();
									handleEdit(row.id);
								}}
							>
								<EditIcon />
							</Fab>
							<Fab size="small" onClick={() => handleDelete(row.id)}>
								<DeleteIcon />
							</Fab>
						</Stack>
					);
				}
			},
		},
	];

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			mt={`${pxToRem(20)}rem`}
			sx={{ position: "relative" }}
		>
			<Typography variant="h6" component="h1">
				Education Details
			</Typography>
			<Button
				sx={{ position: "absolute", top: 0, right: 55 }}
				variant="contained"
				onClick={() => {
					setError(false);
					setAddNewInput(true);
				}}
			>
				Add new Education Detail
			</Button>
			<Stack>
				<Stack mt={3} sx={{ height: "60vh" }}>
					<form onSubmit={handleSubmit}>
						<DataTable
							columns={columns}
							data={tableRows}
							customStyles={customStyles}
							noDataComponent={<EmptyTable />}
							responsive
							fixedHeader
							fixedHeaderScrollHeight="400px"
						/>
						{error && (
							<Typography color="error">
								Education Details Cannot Be completely Empty
							</Typography>
						)}
					</form>
				</Stack>
				<Box sx={{ paddingInline: "1.1rem" }}>
					<NavigationButtons
						handleBack={handleBack}
						activeStep={activeStep}
						steps={steps}
						handleNext={handleNext}
					/>
				</Box>
			</Stack>
			<Snackbar
				open={snackOpen}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				autoHideDuration={3000}
				onClose={handleSnackClose}
				TransitionComponent={SlideTransition}
			>
				<Alert
					onClose={handleSnackClose}
					severity="warning"
					sx={{ width: "100%" }}
				>
					You Have to Add Atleast One Record!
				</Alert>
			</Snackbar>
		</Stack>
	);
};

function SlideTransition(props: SlideProps) {
	return <Slide {...props} direction="left" />;
}

export default EducationDetails;
