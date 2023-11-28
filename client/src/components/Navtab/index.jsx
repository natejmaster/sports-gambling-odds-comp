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
                                    ? "red-bg round-top-corners mx-1  px-3 text-xs md:text-md lg:text-xl lg:mx-3 underline font-bold"
                                    : "tabs  round-top-corners mx-1 px-3 text-xs md:text-md lg:text-xl lg:mx-3 underline font-bold"
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