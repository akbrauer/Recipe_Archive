import NavItem from "./NavItem";
import ClerkLoginButton, { ClerkNavAuth } from "./ClerkLoginButton";
import { useState } from "react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<nav className="bg-primary text-white">
			<div className="flex flex-wrap justify-between">
				{/* items-center max-w-screen-xl */}
				<NavItem text="Home" linkTo="/" id="navbar-brand" />
				{/* <div className="text-2xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Recipe Archive</div> */}
				<div id="navbar-right" className="flex md:order-2">
					<ClerkLoginButton />
					<button
						id="btn-collapse"
						className="my-auto mx-2 p-0.5 md:hidden rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className="sr-only">Open main menu</span>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					</button>
				</div>
				<div id="navbar-collapse" className={`border md:border-0 w-full md:w-auto md:flex ${isOpen ? "flex" : "hidden"}`}>
					<ul className="flex flex-col md:flex-row w-full">
						<li><NavItem text="All Recipes" linkTo="/recipes" /></li>
						<li><ClerkNavAuth text="New Recipe" linkTo="/recipes/new"/></li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;


