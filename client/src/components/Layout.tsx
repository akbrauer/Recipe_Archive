import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar/Navbar";

function Layout() {
	return (
		<>
			<Navbar />
			<div className="max-w-screen-xl mx-auto p-1 sm:p-3" id="container">
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
