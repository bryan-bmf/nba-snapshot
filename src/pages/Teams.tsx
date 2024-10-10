import { Box, Paper, Typography } from "@mui/material";
import { teamData } from "../seed/data";
import { AnyObject } from "../types";

const Teams = () => {

	let sortedData: AnyObject = {
		West: {
			Northwest: [],
			Pacific: [],
			Southwest: [],
		},
		East: {
			Atlantic: [],
			Southeast: [],
			Central: [],
		},
	};

	// sort teams by conference and division
	for (let team of teamData) {
		const east = team.division as keyof typeof sortedData.East;
		const west = team.division as keyof typeof sortedData.West;
		if (team.conference === "East") {
			sortedData.East[east].push(team);
		} else if (team.conference === "West") {
			sortedData.West[west].push(team);
		}
	}

	return (
		<Box sx={sx.flexContainer}>
			<Box sx={sx.container}>
				{/* HEADER ROW */}
				<Box sx={{ pb: 2 }}>
					<Typography variant="h3">NBA TEAMS</Typography>
				</Box>
				{/* CONFERENCE ROW */}
				<Box sx={sx.conference}>
					{Object.entries(sortedData).map((conference: AnyObject) => (
						<Paper key={conference[0]} sx={sx.paper} elevation={2}>
							{/* Conference title */}
							<Typography variant="h4" gutterBottom>
								{conference[0]}
							</Typography>

							{Object.entries(conference[1]).map(
								(division: AnyObject) => (
									<Box key={division[0]} sx={sx.division}>
										<Typography variant="h6" gutterBottom>
											{division[0]}
										</Typography>
										{division[1].map((team: AnyObject) => (
											<Typography
												key={team.id}
												variant="body1"
												gutterBottom
											>
												{team.full_name}
											</Typography>
										))}
									</Box>
								)
							)}
						</Paper>
					))}
				</Box>
			</Box>
		</Box>
	);
};

const sx = {
	flexContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		pt: 2,
	},
	container: {
		width: ["100vw", "90vw", "80vw", "75vw", "50vw"],
	},
	conference: {
		display: "flex",
		justifyContent: "space-evenly",
		p: [0, 2],
	},
	paper: {
		p: [0, 1],
		width: ["150px", "300px"],
	},
	division: {
		p: 1,
		height: ["275px", "200px"],
	},
};

export default Teams;
