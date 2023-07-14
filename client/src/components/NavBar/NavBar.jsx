import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = ({ setCurrentPage }) => {

    return (
        <nav className={style.container}>
            <ul className={style.subcontainer}>
                <li>PI-Foods | Ignacio Fosco</li>
                <div>
                    <li>
                        <Link to='/home' className={style.link}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/create' className={style.link}>Create recipe</Link>
                    </li>
                    <li>
                        <SearchBar setCurrentPage={setCurrentPage} />
                    </li>
                </div>
            </ul>
        </nav>
    )
};

export default NavBar;