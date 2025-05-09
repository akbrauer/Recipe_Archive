import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation().pathname;
    console.log(location);
    const [isOpen, setIsOpen] = useState(false);

    const boldCurrentPage = (path: string) => {
        if(location === path){
            return "font-semibold";
        } else {
            return "md:hover:text-blue-700";
        };
    };
    
    return (
            <nav className="bg-amber-400">
                <div className="flex flex-wrap justify-between">
                    {/* items-center max-w-screen-xl */}
                    <div id="navbar-brand" className="text-md font- sm:text-xl hover:bg-gray-100 md:hover:bg-transparent">
                        <Link to="/"><div className={`py-2 px-3 md:px-5 ${boldCurrentPage('/')}`}>Home</div></Link>
                    </div>
                    <div id="navbar-right" className="flex md:order-2">
                        <button className={`hover:bg-gray-100 md:hover:bg-transparent ${boldCurrentPage('/login')}`}><Link to="/login"><div className="text-md sm:text-xl px-5">Login</div></Link></button>
                        <button id="btn-collapse" className="my-auto mx-2 p-0.5 md:hidden rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" onClick={() => setIsOpen(!isOpen)}>
                            <span className="sr-only">Open main menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div id="navbar-collapse" className={`border md:border-0 w-full md:w-auto md:flex ${isOpen ? "flex" : "hidden"}`}>
                        <ul className="flex flex-col md:flex-row w-full">
                            <li className={`text-md sm:text-xl hover:bg-gray-100 md:hover:bg-transparent ${boldCurrentPage('/recipes')}`}><Link to="/recipes"><div className="py-2 px-3 md:px-5">All Recipes</div></Link></li>
                            <li className={`text-md sm:text-xl hover:bg-gray-100 md:hover:bg-transparent ${boldCurrentPage('/recipes/new')}`}><Link to="/recipes/new"><div className="py-2 px-3 md:px-5">New Recipe</div></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar;