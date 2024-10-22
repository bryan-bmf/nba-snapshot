import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useMemo, useState } from "react";
import { AnyObject } from "../types";

const PlayersTable = (props: any) => {
	// const [players, setPlayers] = useState<Array<AnyObject>>(props.playersData);
	let players: Array<AnyObject> = [...props.playersData];
	const [orderBy, setOrderBy] = useState<string>("lastName");
	const [order, setOrder] = useState<string>("asc");
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	// check if mobile
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.only("xs"));

	const columns = [
		{
			id: "lastName",
			numeric: false,
			label: "Name",
		},
		{
			id: "team",
			numeric: false,
			label: "Team",
		},
		{
			id: "jersey",
			numeric: true,
			label: "Jersey",
		},
		{
			id: "position",
			numeric: false,
			label: "Position",
		},
		{
			id: "height",
			numeric: true,
			label: "Height",
		},
		{
			id: "weight",
			numeric: true,
			label: "Weight (lbs)",
		},
		{
			id: "college",
			numeric: false,
			label: "College",
		},
		{
			id: "drafted",
			numeric: true,
			label: "Drafted",
		},
		{
			id: "country",
			numeric: false,
			label: "Country",
		},
	];

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

		mobile ? setRowsPerPage(players.length) : setRowsPerPage(10);
	}, [props.flag, mobile]);

	const handleSort = (field: string) => {
		if (!mobile) {
			setOrder(order === "asc" ? "desc" : "asc");
			setOrderBy(field);
		}
	};

	const handlePageChange = (e: any, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Paper sx={sx.paper}>
			<TableContainer sx={sx.container}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow sx={sx.header}>
							{columns.map((column, index) => (
								<TableCell
									key={column.id}
									align={column.numeric ? "right" : "left"}
									sx={index === 0 && mobile ? sx.stickyHeader : null}
								>
									<Box
										component="span"
										onClick={() => handleSort(column.id)}
										sx={sx.label}
									>
										{column.label}
										{mobile ? null : (
											<>
												{orderBy === column.id ? (
													<Box component="span" sx={{ p: 0.5 }}>
														{order === "desc" ? (
															<ArrowDownwardIcon
																sx={sx.sortIcon}
															/>
														) : (
															<ArrowUpwardIcon
																sx={sx.sortIcon}
															/>
														)}
													</Box>
												) : null}
											</>
										)}
									</Box>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					{players.length < 1 ? (
						<TableBody>
							<TableRow>
								<TableCell colSpan={9} align="center">
									<Typography variant="h5" gutterBottom p={2}>
										No players found
									</Typography>
									<Button>Reset filters</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{(rowsPerPage > 0
								? players.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
								  )
								: players
							).map((player) => (
								<TableRow
									key={player.id}
									sx={{
										"&:last-child td, &:last-child th": { border: 0 },
									}}
								>
									<TableCell
										align="left"
										sx={mobile ? sx.stickyColumn : null}
									>
										{`${player.lastName}, ${player.firstName}`}
									</TableCell>
									<TableCell align="left">{player.team}</TableCell>
									<TableCell align="right">{player.jersey}</TableCell>
									<TableCell align="left">{player.position}</TableCell>
									<TableCell align="right">{player.height}</TableCell>
									<TableCell align="right">{player.weight}</TableCell>
									<TableCell align="left">{player.college}</TableCell>
									<TableCell align="right">{player.drafted}</TableCell>
									<TableCell align="left">{player.country}</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
					{mobile ? null : (
						<TableFooter sx={sx.footer}>
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
					)}
				</Table>
			</TableContainer>
		</Paper>
	);
};

const sx = {
	header: {
		backgroundColor: "rgba(255, 7, 0)",
		position: "sticky",
		top: 0,
		zIndex: 2,
	},
	sortIcon: {
		verticalAlign: "middle",
		opacity: 1,
		marginBottom: "3px",
		// fontSize: "x-small",
	},
	container: {
		overflow: "auto",
		maxHeight: "80vh",
	},
	paper: {
		width: "80%",
		p: 2,
		m: 2,
	},
	label: {
		cursor: "pointer",
		// fontSize: "x-small",
	},
	stickyColumn: {
		position: "sticky",
		left: 0,
		zIndex: 1,
		backgroundColor: "white",
		borderRight: "1px solid rgba(239, 239, 240)",
		boxShadow: "1px 0 0 0 rgba(239, 239, 240)",
		p: 2,
	},
	stickyHeader: {
		backgroundColor: "rgba(255, 7, 0)",
		position: "sticky",
		left: 0,
		borderRight: "1px solid rgba(239, 239, 240)",
		boxShadow: "1px 0 0 0 rgba(239, 239, 240)",
	},
	footer: {
		backgroundColor: "white",
		position: "sticky",
		bottom: 0,
	},
};

export default PlayersTable;
