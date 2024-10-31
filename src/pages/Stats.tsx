import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StatBox from "../components/StatBox";
import { AnyObject } from "../types";

const Stats = () => {
	const [stats, setStats] = useState<Array<AnyObject>>();

	const currentSeasonYear = () => {
		let currentYear = new Date().getFullYear();
		let month = new Date().getMonth();

		// if current month is between oct and dec, then current year is the latter of the season
		if (month >= 9 && month <= 11) currentYear += 1;

		return currentYear;
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

	const getStats = async () => {
		const url = `http://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/${currentSeasonYear()}/types/2/leaders?lang=en&region=us`;
		const data = await fetchAsync(url);
		let mainStats = data.categories.slice(0, 9);

		// get player info plus team and college
		const statsArr = await Promise.all(
			mainStats.map(async (stat: AnyObject) => {
				let obj: AnyObject = {};
				obj.id = stat.shortDisplayName;
				obj.name = stat.displayName;

				// get top 5 leaders
				let leaders = stat.leaders.slice(0, 5);
				let leadersArr = await Promise.all(
					leaders.map(async (leader: AnyObject) => {
						let playerObj: AnyObject = {};

						// get player and team info
						let player = await fetchAsync(leader.athlete.$ref);
						let team = await fetchAsync(leader.team.$ref);

						playerObj.playerName = player.fullName;
						playerObj.playerTeam = team.abbreviation;
						playerObj.stat = leader.displayValue;

						return playerObj;
					})
				);

				obj.leaders = leadersArr;
				return obj;
			})
		);

		// set state and show table once all the promises have been resolved
		if (statsArr && statsArr.length > 0 && statsArr[0] !== undefined) {
			setStats(statsArr);
		}
	};

	useEffect(() => {
		getStats();
	}, []);

	return (
		<Box sx={sx.container}>
			<Box sx={{ pb: 2, textAlign: "center" }}>
				<Typography variant="h3">Major Player Stats</Typography>
			</Box>
			<Box sx={sx.grid}>
				{stats && stats.map((stat: AnyObject) => <StatBox data={stat} />)}
			</Box>
		</Box>
	);
};

const sx = {
	container: {
		minWidth: 275,
	},
	grid: {
		display: "grid",
		gridTemplateColumns: ["auto", "auto auto auto"],
		justifyContent: "center",
		gap: 2,
	},
};

export default Stats;
