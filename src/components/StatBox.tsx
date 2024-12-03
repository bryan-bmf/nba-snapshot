import { Box, Card, CardContent, Typography } from "@mui/material";
import { AnyObject } from "../types";

const StatBox = (props: any) => {
	let stat = props.data;
	return (
		<Card variant="outlined" sx={sx.card}>
			<CardContent sx={sx.content}>
				<Typography variant="h6" sx={sx.title}>
					{stat.name}
				</Typography>
					<ol style={sx.ol}>
						{stat.leaders.map((player: AnyObject) => {
							let name = player.playerName;
							let team = (
								<span style={sx.team}>{player.playerTeam}</span>
							);

							return (
								<li key={player.playerName}>
									<Box sx={sx.li}>
										<Box>
											{name} {team}
										</Box>
										<Box>{player.stat}</Box>
									</Box>
								</li>
							);
						})}
					</ol>
			</CardContent>
		</Card>
	);
};

const sx = {
	card: {
		maxWidth: 300,
		margin: "1rem 0",
		width: 265
	},
	content: {
		padding: 2,
		"&:last-child": {
			paddingBottom: 1,
		},
		"li:first-of-type": {
			fontWeight: "bold",
		},
	},
	ol: {
		paddingLeft: "1.3em",
		fontWeight: "400",
		fontSize: "0.875rem",
		lineHeight: "1.43",
		letterSpacing: "0.01071em",
		fontFamily: "Roboto"
	},
	li: {
		display: "flex",
		justifyContent: "space-between",
	},
	team: {
		fontSize: "10px",
	},
	title: {
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
	},
};

export default StatBox;
