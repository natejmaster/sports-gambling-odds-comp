import { Link } from "react-router-dom";
export default function NavTab({ links, activeLink, onLinkClick }) {
    return (
        <nav>
            <div>
                <ul className="flex flex-row">
                    {links.map((link) => (
                        <li
                            className={
                                link.to === activeLink
                                    ? "lightGrey-bg round-top-corners mx-1 px-3 lg:text-xl lg:mx-3"
                                    : "blue-bg round-top-corners mx-1 px-3   lg:text-xl lg:mx-3"
                            }
                            key={link.key}
                        >
                            <Link to={link.to} onClick={() => onLinkClick(link.to)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                
                        
            </div>
        </nav>
    )
}