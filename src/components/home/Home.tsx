import {
	Avatar,
	Box,
	Button,
	Fab,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
// import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
// import { getFormEntries } from "../../services/apiServices";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
	deleteFormEntry,
	formEntryType,
	getAllFormEntries,
} from "../../services/localHostServices";

const Home = () => {
	// const query = useQuery({
	// 	queryKey: ["formEntries"],
	// 	queryFn: getFormEntries,
	// });

	// console.log(query);
	// console.log(query.data);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
			const allFormEntries = JSON.parse(
				localStorage.getItem("allFormEntries")!
			);
			console.log(allFormEntries);
			if (allFormEntries?.length > 0) {
				setData(allFormEntries);
				setIsLoading(false);
			}
		}, 1000);
	}, []);

	const columns = [
		{
			name: "Profile Picture",
			cell: (row: formEntryType) => {
				console.log(row);
				return (
					<Avatar
						alt="Cindy Baker"
						src={
							row.formData.personalDetails.profileImage!.src
								? row.formData.personalDetails.profileImage!.src
								: ""
						}
					/>
				);
			},
			style: {
				minWidth: "5rem",
			},
			center: true,
		},
		{
			name: "Name",
			cell: (row: formEntryType) => (
				<Typography variant="body1">
					{row.formData.personalDetails.firstName +
						" " +
						row.formData.personalDetails.lastName}
				</Typography>
			),
		},
		{
			name: "Department",
			cell: (row: formEntryType) => (
				<Typography variant="body1">
					{row.formData.professionalDetails.department}
				</Typography>
			),
		},
		{
			name: "Designation",
			cell: (row: formEntryType) => (
				<Typography variant="body1">
					{row.formData.professionalDetails.designation}
				</Typography>
			),
		},
		{
			name: "Email",
			cell: (row: formEntryType) => (
				<Typography variant="body1">
					{row.formData.personalDetails.email}
				</Typography>
			),
		},
		{
			name: "Mobile Number",
			cell: (row: formEntryType) => (
				<Typography variant="body1">
					{row.formData.personalDetails.mobileNo}
				</Typography>
			),
		},
		{
			name: "uploadedResume",
			cell: () => (
				<Fab
					variant="circular"
					size="small"
					sx={{ boxShadow: "none", zIndex: 0 }}
				>
					<DescriptionIcon color="primary" />
				</Fab>
			),
			center: true,
		},
		{
			name: "Action",
			cell: (row: formEntryType) => (
				<Stack spacing={1} direction="row">
					<Fab
						size="small"
						color="primary"
						type="submit"
						sx={{ zIndex: 0 }}
						onClick={() => {
							navigate("/forms/edit/" + row.id);
						}}
					>
						<EditIcon />
					</Fab>
					<Fab
						size="small"
						sx={{ zIndex: 0 }}
						onClick={() => {
							deleteFormEntry(Number(row.id));
							const allFormEntries = getAllFormEntries();
							setData(allFormEntries);
						}}
					>
						<DeleteIcon />
					</Fab>
				</Stack>
			),
			center: true,
		},
	];

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

	// const tableData = [
	// 	{
	// 		empty: "No Records to Display",
	// 	},
	// ];

	console.log(data);

	return (
		<Stack
			pt={3}
			direction="column"
			alignItems="center"
			spacing={4}
			minHeight="85vh"
		>
			<Typography fontWeight={700} color="rgb(60, 60, 60)" variant="h5">
				Employee Management System
			</Typography>
			<Link to="/forms" style={{ position: "absolute", top: -10, right: 85 }}>
				<Button variant="contained">Add new Employee</Button>
			</Link>
			<Box boxShadow={isLoading ? 0 : 10} borderRadius={5} overflow="hidden">
				{!isLoading ? (
					<DataTable
						columns={columns}
						data={data}
						customStyles={customStyles}
						responsive
						fixedHeader
						fixedHeaderScrollHeight="70vh"
						pagination
						paginationRowsPerPageOptions={[5, 10, 15, 20]}
						paginationPerPage={5}
					/>
				) : (
					<Stack spacing={3} bgcolor="transparent">
						<Skeleton
							variant="rectangular"
							sx={{ bgcolor: "grey.300", borderRadius: "1rem" }}
							animation="wave"
							width="80vw"
							height="200px"
						/>
						<Skeleton
							variant="rectangular"
							sx={{ bgcolor: "grey.300", borderRadius: "1rem" }}
							animation="wave"
							width="80vw"
							height="100px"
						/>
						<Skeleton
							variant="rectangular"
							sx={{ bgcolor: "grey.300", borderRadius: "1rem" }}
							animation="wave"
							width="80vw"
							height="100px"
						/>
					</Stack>
				)}
			</Box>
		</Stack>
	);
};

export default Home;
