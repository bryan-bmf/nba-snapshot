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
				<Typography variant="body2">
					<ol style={sx.ol}>
						{stat.leaders.map((player: AnyObject, index: number) => {
							let name = player.playerName;
							let team = (
								<span style={sx.team}>{player.playerTeam}</span>
							);

							return (
								<li>
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
				</Typography>
			</CardContent>
		</Card>
	);
};

const sx = {
	card: {
		maxWidth: 260,
		margin: "1rem 0",
	},
	content: {
		padding: 2,
		"&:last-child": {
			paddingBottom: 1,
		},
	},
	ol: {
		paddingLeft: "1.3em",
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
