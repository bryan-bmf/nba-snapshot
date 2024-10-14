import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AnyObject } from "../types";

const PlayersTable = (props: any) => {
	// const [players, setPlayers] = useState<Array<AnyObject>>(props.playersData);
	let players: Array<AnyObject> = [...props.playersData];
	const [orderBy, setOrderBy] = useState<string>("LastName");
	const [order, setOrder] = useState<string>("asc");
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	const columns = [
		{
			id: "LastName",
			numeric: false,
			label: "Name",
		},
		{
			id: "Team",
			numeric: false,
			label: "Team",
		},
		{
			id: "Jersey",
			numeric: true,
			label: "Jersey",
		},
		{
			id: "Position",
			numeric: false,
			label: "Position",
		},
		{
			id: "Height",
			numeric: true,
			label: "Height",
		},
		{
			id: "Weight",
			numeric: true,
			label: "Weight (lbs)",
		},
		{
			id: "BirthCountry",
			numeric: false,
			label: "Country",
		},
	];

	const getHeight = (inches: number) => {
		const feet = Math.floor(inches / 12);
		const inchesRemaining = inches % 12;
		return `${feet}'${inchesRemaining}"`;
	};

	const sortData = () => {
		let temp = [...players];
		temp.sort((a, b) => {
			let result = 0;
			if (a[orderBy] < b[orderBy]) {
				result = -1;
			} else if (a[orderBy] > b[orderBy]) {
				result = 1;
			}
			return result * (order === "asc" ? 1 : -1);
		});

		// setPlayers([...temp]);
		players = [...temp];
	};

	useMemo(() => {
		sortData();
	}, [order, orderBy, players]);

    // whenever a filter is applied, set page back to 0 and sort data
    useEffect(() => {
        setPage(0);
        sortData();
    }, [props.flag]);

	const handleSort = (field: string) => {
		setOrder(order === "asc" ? "desc" : "asc");
		setOrderBy(field);
	};

	const handlePageChange = (e: any, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead sx={sx.header}>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								align={column.numeric ? "right" : "left"}
							>
								<Box
									component="span"
									onClick={() => handleSort(column.id)}
									sx={{ cursor: "pointer" }}
								>
									{column.label}
									{orderBy === column.id ? (
										<Box component="span" sx={{ p: 0.5 }}>
											{order === "desc" ? (
												<ArrowDownwardIcon sx={sx.sortIcon} />
											) : (
												<ArrowUpwardIcon sx={sx.sortIcon} />
											)}
										</Box>
									) : null}
								</Box>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? players.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
						  )
						: players
					).map((player) => (
						<TableRow
							key={player.PlayerID}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row" align="left">
								{`${player.LastName}, ${player.FirstName}`}
							</TableCell>
							<TableCell align="left">{player.Team}</TableCell>
							<TableCell align="right">{player.Jersey}</TableCell>
							<TableCell align="left">{player.Position}</TableCell>
							<TableCell align="right">
								{getHeight(player.Height)}
							</TableCell>
							<TableCell align="right">{player.Weight}</TableCell>
							<TableCell align="left">{player.BirthCountry}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							count={players.length}
							page={page}
							onPageChange={handlePageChange}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

const sx = {
	header: {
		backgroundColor: "rgba(255, 7, 0, 0.55)",
	},
	sortIcon: {
		verticalAlign: "middle",
		opacity: 1,
		fontSize: "18px",
		marginBottom: "3px",
	},
};

export default PlayersTable;
