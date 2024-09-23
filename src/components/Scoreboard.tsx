import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AnyObject } from "../types";
import BoxScore from "./BoxScore";

const Scoreboard = () => {

    const [games, setGames] = useState<Array<AnyObject>>();

    const fetchGames = async () => {
        const url = "http://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard";
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data.events);
        setGames(data.events);
        
    }

    useEffect(() => {
        fetchGames();
        // Cleanup function
        return () => {
            // Cancel any outstanding requests
            // e.g., fetch().cancel();
        };
    }, []);

	return (
		<Stack direction="row" >
			{games && games.map((game: (AnyObject)) => <BoxScore game={game} />)}
		</Stack>
	);
};



export default Scoreboard;
