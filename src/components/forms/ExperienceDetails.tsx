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
	ExperienceDataRow as DataRow,
	experienceDetailsType,
	propsType,
} from "./types/types";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyTable from "../ui/EmptyTable";
import { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./schemas/experienceDetailsSchema";
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

const ExperienceDetails = ({
	setActiveStep,
	activeStep,
	steps,
	setData,
	data,
}: propsType) => {
	//initial table data
	const initialTableData =
		data.experienceDetails.length > 0
			? data.experienceDetails.map((row, i) => {
					const newRow = { ...row, id: i + 1 };
					return newRow;
			  })
			: [
					//fake data it is not rendered just used for logic, the component that renders on empty data is EmptyTable.tsx which is in ui directory
					{
						id: 0,
						companyName: "No Records to Display",
						position: "",
						totalYear: "",
						lastCTC: "",
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
			tableData[0].companyName === "No Records to Display"
		) {
			setError(true);
			setSnackOpen(true);
			return;
		}
		setData((data) => {
			return {
				...data,
				experienceDetails: tableData.map((row) => {
					const newRow = {
						companyName: row.companyName,
						position: row.position,
						totalYear: Number(row.totalYear),
						lastCTC: Number(row.lastCTC),
					};
					return newRow;
				}),
			};
		});
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	//formik initial values
	const initialValues: experienceDetailsType = {
		companyName: "",
		position: "",
		totalYear: "",
		lastCTC: "",
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
			if (tableData[0]?.companyName === "No Records to Display") {
				setTableData([{ ...values, id: 1 }]);
			} //when editing company row
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
		setFieldValue("companyName", row?.companyName);
		setFieldValue("position", row?.position);
		setFieldValue("totalYear", row?.totalYear);
		setFieldValue("lastCTC", row?.lastCTC);
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
		companyName: "New Input",
		position: "",
		totalYear: "",
		lastCTC: "",
	};

	//setting table rows dynamically when addNewInput state is true
	const tableRows = addNewInput ? [...tableData, newInputRow] : tableData;

	//table columns
	const columns = [
		{
			name: "Company Name",
			selector: (row: DataRow) => row.companyName,
			cell: (row: DataRow) => {
				if (row.companyName === "New Input") {
					return (
						<TextField
							id="companyName"
							label="Company Name"
							variant="standard"
							value={values.companyName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.companyName && Boolean(errors.companyName)}
							helperText={touched.companyName && errors.companyName}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="companyName"
							label="Company Name"
							variant="standard"
							value={values.companyName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.companyName && Boolean(errors.companyName)}
							helperText={touched.companyName && errors.companyName}
						/>
					);
				} else return row.companyName;
			},
		},
		{
			name: "Position",
			selector: (row: DataRow) => row.position,
			cell: (row: DataRow) => {
				if (row.companyName === "New Input") {
					return (
						<TextField
							id="position"
							label="Position"
							variant="standard"
							value={values.position}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.position && Boolean(errors.position)}
							helperText={touched.position && errors.position}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="position"
							label="Company Name"
							variant="standard"
							value={values.position}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.position && Boolean(errors.position)}
							helperText={touched.position && errors.position}
						/>
					);
				} else return row.position;
			},
		},
		{
			name: "Total Year",
			selector: (row: DataRow) => row.totalYear,
			cell: (row: DataRow) => {
				if (row.companyName === "New Input") {
					return (
						<TextField
							id="totalYear"
							label="TotalYear"
							variant="standard"
							value={values.totalYear}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.totalYear && Boolean(errors.totalYear)}
							helperText={touched.totalYear && errors.totalYear}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="totalYear"
							label="Company Name"
							variant="standard"
							value={values.totalYear}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.totalYear && Boolean(errors.totalYear)}
							helperText={touched.totalYear && errors.totalYear}
						/>
					);
				} else return row.totalYear;
			},
		},
		{
			name: "Last CTC",
			selector: (row: DataRow) => row.lastCTC,
			cell: (row: DataRow) => {
				if (row.companyName === "New Input") {
					return (
						<TextField
							id="lastCTC"
							label="Last CTC"
							variant="standard"
							value={values.lastCTC}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.lastCTC && Boolean(errors.lastCTC)}
							helperText={touched.lastCTC && errors.lastCTC}
						/>
					);
				} else if (editRowId === row.id) {
					return (
						<TextField
							id="lastCTC"
							label="Company Name"
							variant="standard"
							value={values.lastCTC}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.lastCTC && Boolean(errors.lastCTC)}
							helperText={touched.lastCTC && errors.lastCTC}
						/>
					);
				} else return row.lastCTC;
			},
		},
		{
			name: "Action",
			cell: (row: DataRow) => {
				if (row.companyName === "No Records to Display") {
					return <div></div>;
				} else if (row.companyName === "New Input" || editRowId === row.id) {
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
				Experience Details
			</Typography>
			<Button
				sx={{ position: "absolute", top: 0, right: 55 }}
				variant="contained"
				onClick={() => {
					setError(false);
					setAddNewInput(true);
				}}
			>
				Add new Experience Detail
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
								Experience Details Cannot Be completely Empty
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

export default ExperienceDetails;
