import {
    Box,
    Button,
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
	const [team, setTeam] = useState<string>(localStorage.getItem("team") || "");

	const handleTeam = () => {
		localStorage.setItem("team", team);

		setTimeout(() => {
			props.close();
		}, 500);
	};

	const clearTeam = () => {
		localStorage.removeItem("team");
		setTeam("");
	};

	return (
		<Modal
			sx={sx.modal}
			open={props.open}
			onClose={props.close}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={sx.style}>
				<Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
					Select your favorite team
				</Typography>
				<FormControl variant="standard" sx={sx.select}>
					<InputLabel>All Teams</InputLabel>
					<Select
						label="All Players"
						value={team}
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
				<Box sx={sx.button}>
					<Button onClick={clearTeam}>Clear Team</Button>
					<Box>
						<Button onClick={() => props.close()}>Cancel</Button>
						<Button onClick={handleTeam}>Save</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

const sx = {
	style: {
		width: "100%",
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	},
	select: {
		display: "flex",
	},
	modal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: [325, 400],
		margin: "auto",
	},
	button: {
		display: "flex",
		justifyContent: "space-between",
		mt: 2,
	},
};

export default TeamModal;
