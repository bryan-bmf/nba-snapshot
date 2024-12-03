import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AnyObject } from "../types";
import BoxScore from "./BoxScore";

const Scoreboard = () => {
	const [games, setGames] = useState<Array<AnyObject>>();

	const fetchGames = async (controller: AbortController) => {
		try {
			const url =
				"http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";
			const resp = await fetch(url, {
				// attach the controller to the request
				signal: controller.signal,
			});
			const data = await resp.json();
			setGames(data.events);
		} catch (error) {
            console.error("Error fetching games:", error);
            setGames([]);
        }
	};

	useEffect(() => {
		//create the abort controller
		let controller = new AbortController();

		fetchGames(controller);
		// Cleanup function
		return () => controller?.abort();
	}, []);

	return (
		<Box sx={sx.scoreboard}>
			{games && games.map((game: AnyObject) => <BoxScore key={game.id} game={game} />)}
		</Box>
	);
};

const sx = {
	scoreboard: {
		display: "flex",
		overflow: "auto",
		mb: 4
	},
};

export default Scoreboard;
