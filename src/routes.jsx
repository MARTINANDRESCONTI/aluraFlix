import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Inicio from "./pages/Inicio/Inicio.jsx";
import NuevoVideo from "./pages/NuevoVideo/NuevoVideo.jsx";

function AppRoutes() {
return (
<BrowserRouter>
	<Routes>
		<Route path="/" element={<MainPage />}>
			<Route index element={<Inicio />} />
			<Route path="nuevo video" element={<NuevoVideo />} />
		</Route>
	</Routes>
</BrowserRouter>
);
}

export default AppRoutes;