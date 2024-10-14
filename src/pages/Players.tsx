import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import PlayersTable from "../components/PlayersTable";
import { playerData } from "../seed/data";
import { AnyObject } from "../types";

const Players = () => {
	const [players, setPlayers] = useState<Array<AnyObject>>(playerData);
	const [filteredPlayers, setFilteredPlayers] = useState<Array<AnyObject>>(players);
	const [letter, setLetter] = useState<string>("");

	let countries = [
		...new Set(players.map((element) => element.BirthCountry)),
	].sort();

	let letters = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];

	const handleFilters = () => {
		//perform all filters at the same time
		let temp =
			players &&
			players.filter((player) => {
				return (
					(!letter || letter === player.LastName.substring(0,1))
				);
			});
		setFilteredPlayers(temp);
	};

    useEffect(() => handleFilters(), [letter]);

	return (
		<Box>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-standard-label">
					All Players
				</InputLabel>
				<Select
					id="demo-select-small"
					value={letter}
					label="All Players"
					onChange={(e: SelectChangeEvent) => setLetter(e.target.value)}
				>
					<MenuItem value="">
						<em>All Players</em>
					</MenuItem>
					{letters.map((letter) => (
						<MenuItem key={letter} value={letter}>
							{letter}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<PlayersTable playersData={filteredPlayers} />
		</Box>
	);
};

export default Players;
