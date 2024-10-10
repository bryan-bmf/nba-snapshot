import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Players from "./pages/Players";

function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/teams" element={<Teams />} />
				<Route path="/players" element={<Players />} />
				
				{/* <Route path="*" element={<NotFound />} /> */}
			</Routes>
		</div>
	);
}

export default App;
