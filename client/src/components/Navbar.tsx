import { Link } from "react-router-dom";

function Navbar(){
    return (
        <>
            <nav className="bg-amber-400 flex border">
                <div className="navbar-brand mr-6 text-md sm:text-xl">
                    <Link to="/"><div className="p-2">Home</div></Link>
                </div>
                <div className="navbar-collapse">
                    <ul className="flex">
                        <li className="nav-item mr-8 text-md sm:text-xl"><Link to="/recipes"><div className="p-2">All Recipes</div></Link></li>
                        <li className="nav-item mr-8 text-md sm:text-xl"><Link to="/recipes/new"><div className="p-2">New Recipe</div></Link></li>
                        <li className="nav-item text-md sm:text-xl"><Link to="/login"><div className="p-2">Login</div></Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;