import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { AnyObject } from "../types";

const BoxScore = ({ game }: Props) => {

    // calculate team's series record
	const calculateSeriesRecord = (teamId: string) => {
		let seriesRecord = "0-0";
		let wins = 0;
		let losses = 0;

		game.competitions[0].series.competitors.forEach((team: AnyObject) => {
			// count wins if correct team
			if (team.id === teamId) {
				wins = team.wins;
			}
			// count other team's wins as losses for current team
			else {
				losses = team.wins;
			}
		});

		seriesRecord = `${wins}-${losses}`;
		return seriesRecord;
	};

	// find home/away teams index
	const homeIndex = game.competitions[0].competitors.findIndex(
		(team: AnyObject) => team.homeAway === "home"
	);
	const awayIndex = game.competitions[0].competitors.findIndex(
		(team: AnyObject) => team.homeAway === "away"
	);

    // teams
	const home = game.competitions[0].competitors[homeIndex];
	const away = game.competitions[0].competitors[awayIndex];

    // if game has not started, it will show date and time of game
    // else quarter and time left
	let gameDetails = game.status.type.shortDetail.replace(" EST", "");
    let homeScore;
    let awayScore;
    let gameStatus = parseInt(game.status.type.id);
    let fontColor = null;

	// game has not started yet
    if(gameStatus === 1)
        gameDetails = gameDetails.replace(" EDT", "");
	// game is in progress
    else {
        homeScore = home.score;
        awayScore = away.score;
        fontColor = sx.gameDetails;
    }

	// home stuff
	const homeId = home.id;
	const homeTeam = home.team.abbreviation;
	const homeTeamRecord = home.records ? home.records[0].summary : null;
	const homeLogo = home.team.logo;

	// away stuff
	const awayId = away.id;
	const awayTeam = away.team.abbreviation;
	const awayTeamRecord = away.records ? away.records[0].summary : null;
	const awayLogo = away.team.logo;

	// preseason, regular season or playoffs
	const seasonType = game.season.type;
    const seriesSummary = seasonType === 3 ? <Typography variant="caption" sx={sx.summary}>{game.competitions[0].series.summary}</Typography> : null;

    // calculate playoff series record for teams in playoffs 
    let homePlayoffSeriesRecord;
    let awayPlayoffSeriesRecord;
	if (seasonType === 3) {
		homePlayoffSeriesRecord = calculateSeriesRecord(homeId);
		awayPlayoffSeriesRecord = calculateSeriesRecord(awayId);
	}

	const teams = [
		{
			id: awayId,
			team: awayTeam,
			logo: awayLogo,
			record: seasonType === "playoff" ? awayPlayoffSeriesRecord : awayTeamRecord,
            score: awayScore,
			winner: gameStatus === 3 ? away.winner : null
		},
		{
			id: homeId,
			team: homeTeam,
			logo: homeLogo,
			record: seasonType === "playoff" ? homePlayoffSeriesRecord : homeTeamRecord,
            score: homeScore,
			winner: gameStatus === 3 ? home.winner : null
		},
	];

	return (
		<Box sx={sx.out}>
			<Box sx={sx.box}>
                {/* GAME DETAILS */}
				<Box>
					<Typography variant="caption" sx={fontColor}>{gameDetails}</Typography>
                    {/* Show summary if game has ended */}
                    {gameStatus === 3 ? seriesSummary : null}
				</Box>
				<List sx={sx.list}>
					{teams.map((team) => (
						<ListItem key={team.id} sx={sx.item}>
                            {/* TEAM LOGO AND NAME */}
							<Box sx={sx.team}>
								<img
									src={team.logo}
									alt={team.team}
									width="22"
									height="22"
								/>
								<ListItemText
									primary={team.team}
									primaryTypographyProps={team.winner ? {variant: "caption", fontWeight: "600"} : {variant: "caption"} }
									sx={sx.logo}
								/>
							</Box>
                            {/* TEAM RECORD OR GAME SCORE */}
							<Box>
                                {/* If the game is in progress, show game score instead of team record */}
								<ListItemText
									secondary={gameStatus > 1 ? team.score : team.record}
									secondaryTypographyProps={team.winner ? {variant: "caption", fontWeight: "bold", color: "black"} : {variant: "caption"} }
								/>
							</Box>
						</ListItem>
					))}
				</List>
			</Box>
			<Divider orientation="vertical" variant="middle" flexItem />
		</Box>
	);
};

const sx = {
    out: {
		display: "flex",
	},
	box: {
		width: "auto",
        maxWidth: "200px",
        minWidth: "100px",
		height: "75px",
		padding: 1,
	},
	item: {
		p: 0,
		display: "flex",
		justifyContent: "space-between",
	},
	team: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	logo: {
		marginLeft: "5px",
	},
	list: {
		p: 0,
	},
    gameDetails: {
        color: "red",
        fontWeight: "bold",
    },
    summary: {
        marginLeft: 2,
    },	
};

interface Props {
	game: AnyObject;
}

export default BoxScore;
