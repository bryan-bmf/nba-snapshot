import {
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import PlayersTable from "../components/PlayersTable";
import { AnyObject } from "../types";

const Players = () => {
	const [players, setPlayers] = useState<Array<AnyObject>>();
	const [allPlayers, setAllPlayers] = useState<Array<AnyObject>>();
	const [letter, setLetter] = useState<string>("");
	const [team, setTeam] = useState<string>("");
	const [position, setPosition] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [filterChanged, setFilterChanged] = useState<boolean>(false);
	const [isLoading, setLoading] = useState(true); // Loading state

	let countries = allPlayers
		? [...new Set(allPlayers.map((element) => element.country))].sort()
		: [];

	let teams = allPlayers
		? [...new Set(allPlayers.map((element) => element.team))].sort()
		: [];

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
			allPlayers &&
			allPlayers.filter((player) => {
				return (
					(!letter || letter === player.lastName.substring(0, 1)) &&
					(!team || team === player.team) &&
					(!position || position === player.position) &&
					(!country || country === player.country)
				);
			});
		setPlayers(temp);
	};

	const fetchAsync = async (url: string) => {
		try {
			const resp = await fetch(url);
			const data = await resp.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getAllPlayers = async () => {
		const url =
			"https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/athletes?limit=1000&active=true";
		const data = await fetchAsync(url);
		const players = data.items;

		// get player info plus team and college
		const playersArr = await Promise.all(
			players.map(async (player: AnyObject) => {
				let obj: AnyObject = {};
				let currentPlayer = await fetchAsync(player.$ref);
				let team = await fetchAsync(currentPlayer.team.$ref);

				// not all players went to college
				obj.college = "";
				if (currentPlayer.college) {
					let college = await fetchAsync(currentPlayer.college.$ref);
					obj.college = college.abbrev;
				}

				// form player obj
				obj.id = currentPlayer.id;
				obj.firstName = currentPlayer.firstName;
				obj.lastName = currentPlayer.lastName;
				obj.shortName = currentPlayer.shortName;
				obj.weight = currentPlayer.weight;
				obj.height = currentPlayer.displayHeight;
				obj.country = currentPlayer.birthPlace.country;
				obj.jersey = currentPlayer.jersey;
				obj.position = currentPlayer.position.abbreviation;
				obj.team = team.abbreviation;
				obj.drafted = currentPlayer.draft ? currentPlayer.draft.year : "";

				return obj;
			})
		);

		// set state and show table once all the promises have been resolved
		if (playersArr && playersArr.length > 0 && playersArr[0] !== undefined) {
			setPlayers([...playersArr]);
			setAllPlayers([...playersArr]);
			setLoading(false);
		}
	};

	const handleClearFilters = () => {
		setLetter("");
		setTeam("");
		setPosition("");
		setCountry("");
		setFilterChanged(!filterChanged);
	};

	// initial api call
	useEffect(() => {
		getAllPlayers();
	}, []);

	useEffect(() => {
		handleFilters();
		// used to bring pagination back to default page
		setFilterChanged(!filterChanged);
	}, [letter, team, position, country]);

	if (isLoading) {
		return (
			<Box sx={sx.loading}>
				<CircularProgress size="3rem" />
				Loading table
			</Box>
		);
	}

	return (
		<Box sx={sx.page}>
			<Box>
				<FormControl variant="standard" sx={sx.select}>
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
				<FormControl variant="standard" sx={sx.select}>
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
				<FormControl variant="standard" sx={sx.select}>
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
				<FormControl variant="standard" sx={sx.select}>
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
			{players && (
				<PlayersTable
					playersData={players}
					flag={filterChanged}
					clearFilters={handleClearFilters}
				/>
			)}
		</Box>
	);
};

const sx = {
	select: {
		m: 1,
		minWidth: ["100%", 120],
	},
	page: {
		width: "100vw",
		// height: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	loading: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
		// marginTop: "20vh"
	},
};

export default Players;
