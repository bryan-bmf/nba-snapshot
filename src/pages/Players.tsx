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
	const [filteredPlayers, setFilteredPlayers] =
		useState<Array<AnyObject>>(players);
	const [letter, setLetter] = useState<string>("");
	const [team, setTeam] = useState<string>("");
	const [position, setPosition] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [filterChanged, setFilterChanged] = useState<boolean>(false);

	let countries = [
		...new Set(players.map((element) => element.BirthCountry)),
	].sort();

	let teams = [...new Set(players.map((element) => element.Team))].sort();

	let positions = ["C", "PF", "SF", "SG", "PG"];

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
					(!letter || letter === player.LastName.substring(0, 1)) &&
					(!team || team === player.Team) &&
					(!position || position === player.Position) &&
					(!country || country === player.BirthCountry)
				);
			});
		setFilteredPlayers(temp);
	};

	useEffect(() => {
		handleFilters();
        // used to bring pagination back to default page
		setFilterChanged(!filterChanged);
	}, [letter, team, position, country]);

	return (
		<Box>
			<Box>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel>All Players</InputLabel>
					<Select
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
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel>All Teams</InputLabel>
					<Select
						value={team}
						label="All Players"
						onChange={(e: SelectChangeEvent) => setTeam(e.target.value)}
					>
						<MenuItem value="">
							<em>All Teams</em>
						</MenuItem>
						{teams.map((team) => (
							<MenuItem key={team} value={team}>
								{team}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel>All Positions</InputLabel>
					<Select
						value={position}
						label="All Positions"
						onChange={(e: SelectChangeEvent) =>
							setPosition(e.target.value)
						}
					>
						<MenuItem value="">
							<em>All Positions</em>
						</MenuItem>
						{positions.map((position) => (
							<MenuItem key={position} value={position}>
								{position}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel>All Countries</InputLabel>
					<Select
						value={country}
						label="All Countries"
						onChange={(e: SelectChangeEvent) =>
							setCountry(e.target.value)
						}
					>
						<MenuItem value="">
							<em>All Countries</em>
						</MenuItem>
						{countries.map((country) => (
							<MenuItem key={country} value={country}>
								{country}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<PlayersTable playersData={filteredPlayers} flag={filterChanged} />
		</Box>
	);
};

export default Players;
