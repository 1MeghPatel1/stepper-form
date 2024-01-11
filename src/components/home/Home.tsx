import {
	Avatar,
	Box,
	Button,
	Fab,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { getFormEntries } from "../../services/apiServices";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
	const query = useQuery({
		queryKey: ["formEntries"],
		queryFn: getFormEntries,
	});

	console.log(query);
	console.log(query.data);

	const columns = [
		{
			name: "Profile Picture",
			cell: (row: any) => (
				<Avatar alt="Cindy Baker" src={row.personalData.profileImage} />
			),
			style: {
				minWidth: "5rem",
			},
			center: true,
		},
		{
			name: "Name",
			cell: (row: any) => (
				<Typography variant="body1">
					{row.personalData.firstName + " " + row.personalData.lastName}
				</Typography>
			),
		},
		{
			name: "Department",
			cell: (row: any) => (
				<Typography variant="body1">
					{row.professionalData.department}
				</Typography>
			),
		},
		{
			name: "Designation",
			cell: (row: any) => (
				<Typography variant="body1">
					{row.professionalData.designation}
				</Typography>
			),
		},
		{
			name: "Email",
			cell: (row: any) => (
				<Typography variant="body1">{row.personalData.email}</Typography>
			),
		},
		{
			name: "Mobile Number",
			cell: (row: any) => (
				<Typography variant="body1">{row.personalData.mobileNo}</Typography>
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
			cell: () => (
				<Stack spacing={1} direction="row">
					<Fab size="small" color="primary" type="submit" sx={{ zIndex: 0 }}>
						<EditIcon />
					</Fab>
					<Fab size="small" sx={{ zIndex: 0 }}>
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

	const tableData = [
		{
			empty: "No Records to Display",
		},
	];

	return (
		<Stack direction="column" alignItems="center" spacing={4}>
			<Typography fontWeight={700} color="rgb(60, 60, 60)" variant="h5">
				Employee Management System
			</Typography>
			<Link to="/forms" style={{ position: "absolute", top: 10, right: 85 }}>
				<Button variant="contained">Add new Employee</Button>
			</Link>
			<Box
				boxShadow={query.isLoading ? 0 : 10}
				borderRadius={5}
				overflow="hidden"
			>
				{!query.isLoading ? (
					<DataTable
						columns={columns}
						data={query.data ? query.data : tableData}
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
