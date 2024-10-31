import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [open, setOpen] = useState<boolean>(false);
	const toggleDrawer = () => setOpen(!open);

	const links = [
		{
			label: "Teams",
			href: "/teams",
			icon: <GroupsIcon />,
		},
		{
			label: "Players",
			href: "/players",
			icon: <PersonIcon />,
		},
		{
			label: "Stats",
			href: "/stats",
			icon: <QueryStatsIcon />,
		},
	];

	const DrawerList = (
		<Box
			sx={sx.mobile}
			width="200px"
			role="presentation"
			onClick={toggleDrawer}
		>
			<List sx={{ width: "inherit" }}>
				{links.map((link, index) => (
					<ListItem key={link.label} disablePadding>
						<ListItemButton>
							<ListItemIcon>{link.icon}</ListItemIcon>
							<ListItemText primary={link.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<AppBar position="static">
			<Toolbar>
				<Link to="/">
					<IconButton
						size="large"
						edge="start"
						aria-label="logo"
						sx={sx.header}
					>
						<SportsBasketballIcon />
					</IconButton>
				</Link>
				<Typography variant="h6" component="div" sx={sx.title}>
					NBA Snapshot
				</Typography>
				<Box sx={sx.header}>
					<Link to="/teams">
						<Button sx={sx.buttons}>Teams</Button>
					</Link>

					<Link to="/players">
						<Button sx={sx.buttons}>Players</Button>
					</Link>

					<Link to="/stats">
						<Button sx={sx.buttons}>Stats</Button>
					</Link>

					<Button color="inherit">Switch</Button>
				</Box>
				{/* MOBILE VERSION */}
				<Box sx={sx.mobile}>
					<IconButton
						size="large"
						color="inherit"
						edge="start"
						aria-label="menu"
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Drawer open={open} onClose={toggleDrawer} sx={sx.mobile}>
						{DrawerList}
					</Drawer>
				</Box>
				<IconButton
					size="large"
					color="inherit"
					edge="start"
					aria-label="logo"
					sx={sx.mobile}
				>
					<SportsBasketballIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={sx.titleMobile}>
					NBA Snapshot
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

const sx = {
	header: {
		display: { xs: "none", md: "flex" },
		color: "#fff",
	},
	title: {
		flexGrow: "1",
		display: { xs: "none", md: "flex" },
	},
	mobile: {
		display: { xs: "flex", md: "none" },
	},
	titleMobile: {
		flexGrow: "1",
		display: { xs: "flex", md: "none" },
	},
	buttons: {
		color: "white",
		PointerEvent: "none",
	},
};

export default Navbar;
