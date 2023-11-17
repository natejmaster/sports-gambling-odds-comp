import {useState} from 'react';
import NavTab from '../Navtab';


export default function NavTabs() {
    const [activeLink, setActiveLink] = useState('/');

    const links = [
        {key: 1, to: '/', label: 'Home'},
        {key: 2, to: '/user', label: 'User'},
    ];

    const handleLinkClick = (to) => {
        setActiveLink(to);
    };

    return (
        <NavTab links={links} activeLink={activeLink} onLinkClick={handleLinkClick}/>
    );
}