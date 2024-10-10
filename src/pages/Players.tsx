import { Box, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { playerData } from "../seed/data";

const Players = () => {
	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Name",
			headerClassName: "super-app-theme--header",
			sortable: true,
			width: 200,
			valueGetter: (value, row) =>
				`${row.LastName + "," || ""} ${row.FirstName || ""}`,
		},
		{
			field: "Team",
			headerName: "Team",
			headerClassName: "super-app-theme--header",
			sortable: true,
			width: 130,
		},
		{
			field: "Jersey",
			headerName: "Number",
			headerClassName: "super-app-theme--header",
			sortable: true,
			width: 130,
		},
		{
			field: "Position",
			headerName: "Position",
			headerClassName: "super-app-theme--header",
			sortable: true,
			width: 130,
		},
		{
			field: "Height",
			headerName: "Height",
			headerClassName: "super-app-theme--header",
			sortable: true,
			width: 130,
            valueGetter: (value, row) =>
				getHeight(row.Height),
		},
		{
			field: "Weight",
			headerName: "Weight (lbs)",
			headerClassName: "super-app-theme--header",
			sortable: true,
			width: 130,
		},
		// { field: "college", headerName: "College", sortable: true, width: 130 },
		// { field: "draft_year", headerName: "Drafted", sortable: true, width: 130 },
		{
			field: "BirthCountry",
			headerName: "Country",
			headerClassName: "super-app-theme--header",
			sortable: true,
			width: 130,
		},
	];

	const paginationModel = { page: 0, pageSize: 50 };

    const getHeight = (inches: number) => {
        const feet = Math.floor(inches / 12);
        const inchesRemaining = inches % 12;
        return `${feet}'${inchesRemaining}"`;
    }

	return (
		<Box sx={sx.container}>
			<Paper sx={sx.paper}>
				<DataGrid
					rows={playerData}
					columns={columns}
					pageSizeOptions={[10, 25, 50, 100]}
					sx={sx.table}
					getRowId={(row) => row.PlayerID}
					disableColumnSelector
					initialState={{
						pagination: { paginationModel },
						sorting: {
							sortModel: [{ field: "name", sort: "asc" }],
						},
					}}
				/>
			</Paper>
		</Box>
	);
};

const sx = {
	paper: { 
        height: "100vh", 
        width: [300, 600, "auto"] 
    },
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	table: {
		border: 0,
		"& .super-app-theme--header": {
			backgroundColor: "rgba(255, 7, 0, 0.55)",
		},
	},
};

export default Players;
