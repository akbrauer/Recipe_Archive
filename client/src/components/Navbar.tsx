import { Link } from "react-router-dom";

function Navbar(){
    return (
        <>
            <nav className="bg-amber-400 flex p-2 border">
                <div className="navbar-brand mr-8 text-md sm:text-xl">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar-collapse">
                    <ul className="flex">
                        <li className="nav-item mr-8 text-md sm:text-xl"><Link to="/recipes">All Recipes</Link></li>
                        <li className="nav-item mr-8 text-md sm:text-xl"><Link to="/recipes/new">New Recipe</Link></li>
                        <li className="nav-item text-md sm:text-xl"><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;