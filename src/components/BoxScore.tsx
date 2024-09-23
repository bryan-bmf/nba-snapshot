import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { AnyObject } from "../types";

const BoxScore = ({ game }: Props) => {
	//find home/away teams index
	const homeIndex = game.competitions[0].competitors.findIndex(
		(team: AnyObject) => team.homeAway === "home"
	);
	const awayIndex = game.competitions[0].competitors.findIndex(
		(team: AnyObject) => team.homeAway === "away"
	);

	const home = game.competitions[0].competitors[homeIndex];
	const away = game.competitions[0].competitors[awayIndex];

	const startTime = game.status.type.shortDetail.split(" - ")[1];

	//home stuff
	const homeTeam = home.team.abbreviation;
	const homeTeamRecord = home.records[0].summary;
	const homeLogo = home.team.logo;

	//away stuff
	const awayTeam = away.team.abbreviation;
	const awayTeamRecord = away.records[0].summary;
	const awayLogo = away.team.logo;

	const teams = [
		{
			team: awayTeam,
			logo: awayLogo,
			record: awayTeamRecord,
		},
		{
			team: homeTeam,
			logo: homeLogo,
			record: homeTeamRecord,
		},
	];

	return (
        <Box sx={sx.out}>
            <Box sx={sx.box}>
                <Box>
                    <Typography variant="caption">{startTime}</Typography>
                </Box>
                <List sx={sx.list}>
                    {teams.map((team) => (
                        <ListItem key={team.team} sx={sx.item}>
                            <Box sx={sx.team}>
                                <img src={team.logo} alt={team.team} width="22" height="22" />
                                <ListItemText
                                    primary={team.team}
                                    primaryTypographyProps={{ variant: "caption" }}
                                    sx={sx.logo}
                                />
                            </Box>
                            <Box>
                                <ListItemText
                                    secondary={team.record}
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
		width: "120px",
		height: "75px",
		padding: 1,
	},
	item: {
		p: 0,
		justifyContent: "space-between",
		display: "flex",
		alignItems: "center",
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
        p: 0
    },
    out: {
        display: "flex",
    }
};

interface Props {
	game: AnyObject;
}

export default BoxScore;
