import { Box } from "@mui/material";
import biggums from "../assets/biggums.webp";
import bosh from "../assets/bosh.webp";
import high5 from "../assets/high5.webp";
import kid from "../assets/kid.webp";
import prince from "../assets/prince.webp";
import shaq from "../assets/shaq.webp";

const NotFound = () => {

    const gifs = [biggums, bosh, high5, kid, prince, shaq];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

	return (
		<Box sx={sx.container}>
			<h1>PAGE NOT FOUND</h1>
			<img src={randomGif} />
		</Box>
	);
};

const sx = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        flexDirection: "column"
    }
}

export default NotFound;
