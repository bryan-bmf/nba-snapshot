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
	let gameDetails = game.status.type.shortDetail;
    let homeScore;
    let awayScore;
    let gameStatus = parseInt(game.status.type.id);
    let fontColor = null;
    if(gameStatus === 1)
        gameDetails = gameDetails.replace(" EDT", "");
    else {
        homeScore = home.score;
        awayScore = away.score;
        fontColor = sx.gameDetails;
    }

	// home stuff
	const homeId = home.id;
	const homeTeam = home.team.abbreviation;
	const homeTeamRecord = home.records[0].summary;
	const homeLogo = home.team.logo;

	// away stuff
	const awayId = away.id;
	const awayTeam = away.team.abbreviation;
	const awayTeamRecord = away.records[0].summary;
	const awayLogo = away.team.logo;

	// preseason, regular season or playoffs
	const seasonType = game.competitions[0].series.type;

    // calculate playoff series record for teams in playoffs 
    let homePlayoffSeriesRecord;
    let awayPlayoffSeriesRecord;
	if (seasonType === "playoff") {
		homePlayoffSeriesRecord = calculateSeriesRecord(homeId);
		awayPlayoffSeriesRecord = calculateSeriesRecord(awayId);
	}

	const teams = [
		{
			id: awayId,
			team: awayTeam,
			logo: awayLogo,
			record: seasonType === "playoff" ? awayPlayoffSeriesRecord : awayTeamRecord,
            score: awayScore
		},
		{
			id: homeId,
			team: homeTeam,
			logo: homeLogo,
			record: seasonType === "playoff" ? homePlayoffSeriesRecord : homeTeamRecord,
            score: homeScore
		},
	];

	return (
		<Box sx={sx.out}>
			<Box sx={sx.box}>
                {/* GAME DETAILS */}
				<Box>
					<Typography variant="caption" sx={fontColor}>{gameDetails}</Typography>
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
									primaryTypographyProps={{ variant: "caption" }}
									sx={sx.logo}
								/>
							</Box>
                            {/* TEAM RECORD OR GAME SCORE */}
							<Box>
                                {/* If the game is in progress, show game score instead of team record */}
								<ListItemText
									secondary={gameStatus > 1 ? team.score : team.record}
									secondaryTypographyProps={{ variant: "caption" }}
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
	box: {
		width: "100px",
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
	out: {
		display: "flex",
	},
    gameDetails: {
        color: "red",
        fontWeight: "bold",
    }
};

interface Props {
	game: AnyObject;
}

export default BoxScore;
