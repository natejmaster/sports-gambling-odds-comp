import {useState} from 'react';
import NavTab from '../Navtab';
import Auth from '../../utils/auth';

// function to create Navbar
export default function NavTabs() {
    // useState hook to set active link; default is home
    const [activeLink, setActiveLink] = useState('/');

;
    // useEffect hook to refetch data on page load

    
        // Cleanup function to clear the interval when the component unmounts

// links to be displayed in Navbar
 const homeLink = {
    key: 1,
        to: '/',
        label: 'Home'
    };

    const links = Auth.loggedIn() ? [homeLink, { key: 2, to: '/betpage', label: 'Place Bets!' }, { key: 3, to: '/profile', label: 'Profile' }, { key: 4, to: '/leaderboard', label: 'Leaderboard'}, { key:5, to:'buyunits', label:'Buy Units'}] : [homeLink];

 
    const handleLinkClick = (to) => {
        setActiveLink(to);
    };

    return (
        <div className='flex'>
        <NavTab links={links} activeLink={activeLink} onLinkClick={handleLinkClick}/>
    
        </div>
    );
}