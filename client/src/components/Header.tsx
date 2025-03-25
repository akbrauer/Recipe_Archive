import { Link } from "react-router-dom";

function Header(){
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/show">Show</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/all">All</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Header;