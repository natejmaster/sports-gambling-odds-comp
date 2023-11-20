import {useState} from 'react';
import NavTab from '../Navtab';

// function to create Navbar
export default function NavTabs() {
    // useState hook to set active link; default is home
    const [activeLink, setActiveLink] = useState('/');
// links to be displayed in Navbar
    const links = [
        {key: 1, to: '/', label: 'Home'},
        {key: 2, to: '/user', label: 'User'},
        {key: 3, to : '/scoreboard', label: 'Scoreboard'},
    
    ];

    const handleLinkClick = (to) => {
        setActiveLink(to);
    };

    return (
        <NavTab links={links} activeLink={activeLink} onLinkClick={handleLinkClick}/>
    );
}