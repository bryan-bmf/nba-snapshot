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
import { teamData } from "../seed/data";

const TeamModal = (props: any) => {
	let teams = teamData;

	const handleTeam = (e: SelectChangeEvent) => {
		let team = e.target.value;
		localStorage.setItem("team", team);

		setTimeout(() => {
			props.close();
		}, 500);
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
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Select your favorite team
				</Typography>
				<FormControl variant="standard" sx={sx.select}>
					<InputLabel>All Teams</InputLabel>
					<Select
						label="All Players"
						onChange={handleTeam}
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
};

export default TeamModal;
