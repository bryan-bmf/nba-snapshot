import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AnyObject } from "../types";
import NewsCard from "./NewsCard";

const NewsFeed = () => {
	const [news, setNews] = useState<Array<AnyObject>>();

	const getNews = async () => {
		try {
			const url =
				"http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news";
			const resp = await fetch(url);
			const data = await resp.json();
			setNews(data.articles);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getNews();
	}, []);

	return (
		<Box sx={sx.container}>
			<h1>News Feed</h1>
            {news && news.map(news => <NewsCard key={news.dataSourceIdentifier} data={news} />)}
		</Box>
	);
};

const sx = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
        p: 2
    }
}

export default NewsFeed;
