import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const NewsCard = (props: any) => {
	console.log(props.data);
	let image = props.data.images[0];
	return (
		<Card sx={sx.card}>
			<CardMedia
				// sx={{ height: image.height, width: image.width }}
                sx={sx.image}
				image={image.url}
				title={image.caption}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{props.data.headline}
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{props.data.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Link to={props.data.links.web.href} target="_blank">
					<Button size="small">
						{props.data.type === "Media" ? "View Video" : "Read More"}
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};

const sx = {
    card: {
        maxWidth: "500px",
        maxHeight: "300px",
    },
    image: {
        maxWidth: "inherit",
        maxHeight: "inherit",
    }
}

export default NewsCard;
