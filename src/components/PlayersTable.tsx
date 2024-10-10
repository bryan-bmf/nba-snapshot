import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useState } from "react";
import { playerData } from "../seed/data";

const PlayersTable = () => {
	const [orderBy, setOrderBy] = useState<string>("name");
	const [order, setOrder] = useState<string>("asc");

	const getHeight = (inches: number) => {
		const feet = Math.floor(inches / 12);
		const inchesRemaining = inches % 12;
		return `${feet}'${inchesRemaining}"`;
	};

	const handleSort = (field: string) => {
		setOrder(order === "asc" ? "desc" : "asc");
		setOrderBy(field);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead sx={sx.header}>
					<TableRow>
						<TableCell>
							<Box
								component="span"
								onClick={() => handleSort("name")}
								sx={{ cursor: "pointer" }}
							>
								Name
								{orderBy === "name" ? (
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
						<TableCell align="right">Team</TableCell>
						<TableCell align="right">Jersey</TableCell>
						<TableCell align="right">Position</TableCell>
						<TableCell align="right">Height</TableCell>
						<TableCell align="right">Weight (lbs)</TableCell>
						<TableCell align="right">Country</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{playerData.map((player) => (
						<TableRow
							key={player.PlayerID}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{`${player.LastName}, ${player.FirstName}`}
							</TableCell>
							<TableCell align="right">{player.Team}</TableCell>
							<TableCell align="right">{player.Jersey}</TableCell>
							<TableCell align="right">{player.Position}</TableCell>
							<TableCell align="right">
								{getHeight(player.Height)}
							</TableCell>
							<TableCell align="right">{player.Weight}</TableCell>
							<TableCell align="right">{player.BirthCountry}</TableCell>
						</TableRow>
					))}
				</TableBody>
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
