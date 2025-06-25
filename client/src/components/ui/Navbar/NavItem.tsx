import { Link, useLocation } from "react-router-dom";

const NavItem = ( { text, linkTo, id }: { text: string, linkTo: string, id?: string } ) => {
    const location = useLocation().pathname;
    const boldCurrentPage = (path: string) => {
        if(location === path){
            return "font-semibold";
        } else {
            return "md:hover:text-blue-700";
        };
    };
    return (
        <div id={ id } className={ `text-md font- sm:text-xl hover:bg-gray-100 md:hover:bg-transparent ${boldCurrentPage(linkTo)}` }>
            <Link to={ linkTo }><div className="py-2 px-3 md:px-5">{ text }</div></Link>
        </div>
    );
}

export default NavItem;