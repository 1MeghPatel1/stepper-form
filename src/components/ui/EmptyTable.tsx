import DataTable from "react-data-table-component";

const EmptyTable = () => {
	const columns = [
		{
			name: "Education Name",
			selector: (row: any) => row.empty,
		},
		{
			name: "University Name",
		},
		{
			name: "Result",
		},
		{
			name: "Year of Passing",
		},
		{
			name: "Action",
			cell: () => <div></div>,
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
		<div>
			<DataTable
				columns={columns}
				data={tableData}
				customStyles={customStyles}
			/>
		</div>
	);
};

export default EmptyTable;
