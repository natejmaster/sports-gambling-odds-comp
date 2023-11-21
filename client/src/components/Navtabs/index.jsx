import {useState} from 'react';
import NavTab from '../Navtab';
import Auth from '../../utils/auth';

// function to create Navbar
export default function NavTabs() {
    // useState hook to set active link; default is home
    const [activeLink, setActiveLink] = useState('/');
// links to be displayed in Navbar
 const homeLink = {
    key: 1,
        to: '/',
        label: 'Home'
    };

    const links = Auth.loggedIn() ? [homeLink, { key: 2, to: '/betpage', label: 'Place Bets!' }, { key: 3, to: '/scoreboard', label: 'Scoreboard' }] : [homeLink];

 
    const handleLinkClick = (to) => {
        setActiveLink(to);
    };

    return (
        <NavTab links={links} activeLink={activeLink} onLinkClick={handleLinkClick}/>
    );
}