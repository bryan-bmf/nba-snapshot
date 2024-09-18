import MenuIcon from "@mui/icons-material/Menu";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const openMenu = () => setIsMenuOpen(!isMenuOpen);
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton size="large" color="inherit" edge="start" aria-label="logo" sx={sx.logo}>
					<SportsBasketballIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={sx.title}>
					NBA Snapshot
				</Typography>
				<Box sx={sx.links}>
					<Button color="inherit">Teams</Button>
					<Button color="inherit">Players</Button>
					<Button color="inherit">Stats</Button>
				</Box>
                {/* MOBILE VERSION */}
				<Box sx={sx.menu}>
					<IconButton size="large" color="inherit" edge="start" aria-label="menu" onClick={openMenu}>
						<MenuIcon />
					</IconButton>
                    <Menu open={isMenuOpen} onClose={openMenu} sx={sx.logoMobile}>
                        <MenuList>
                            <MenuItem>Teams</MenuItem>
                            <MenuItem>Players</MenuItem>
                            <MenuItem>Stats</MenuItem>
                        </MenuList>
                    </Menu>
				</Box>
                <IconButton size="large" color="inherit" edge="start" aria-label="logo" sx={sx.logoMobile}>
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
	logo: {
		display: { xs: "none", md: "flex" },
	},
	title: {
		flexGrow: "1",
		display: { xs: "none", md: "flex" },
	},
	links: {
		display: { xs: "none", md: "flex" },
	},
	menu: {
		display: { xs: "flex", md: "none" },
	},
    logoMobile: {
		display: { xs: "flex", md: "none" },
	},
	titleMobile: {
		flexGrow: "1",
		display: { xs: "flex", md: "none" },
	},
};

export default Header;
