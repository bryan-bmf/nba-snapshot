import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { teamData } from "../seed/data";

const TeamModal = (props: any) => {
	let teams = teamData;
	const [team, setTeam] = useState("");

	return (
		<Modal
			sx={sx.modal}
			open={props.open}
			onClose={props.close}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={sx.style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Select your favorite team
				</Typography>
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
							<MenuItem key={team.id} value={team.abbreviation}>
								{team.full_name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</Modal>
	);
};

const sx = {
	style: {
		// display: "flex",
		// justifyContent: "center",
		// alignItems: "center",
		width: "100%",
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	},
	select: {
		display: "flex",
		// minWidth: ["100%", 120],
	},
	modal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: [325, 400],
        margin: "auto",
	},
};

export default TeamModal;
