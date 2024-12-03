import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Players from "./pages/Players";
import Stats from "./pages/Stats";
import Teams from "./pages/Teams";

function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/teams" element={<Teams />} />
				<Route path="/players" element={<Players />} />
				<Route path="/stats" element={<Stats />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
