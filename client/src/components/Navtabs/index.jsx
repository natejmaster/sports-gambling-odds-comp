import {useState} from 'react';
import NavTab from '../Navtab';
import Auth from '../../utils/auth';
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
// function to create Navbar
export default function NavTabs() {
    // useState hook to set active link; default is home
    const [activeLink, setActiveLink] = useState('/');

    const { loading, data, refetch } = useQuery(QUERY_ME);
    const user = data?.me || {};
    // useEffect hook to refetch data on page load
    useEffect(() => {
        const refetchInterval = setInterval(() => {
          refetch();
        }, 1000);
    
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(refetchInterval);
      }, [refetch]);
// links to be displayed in Navbar
 const homeLink = {
    key: 1,
        to: '/',
        label: 'Home'
    };

    const links = Auth.loggedIn() ? [homeLink, { key: 2, to: '/betpage', label: 'Place Bets' }, { key: 3, to: '/profile', label: 'Profile' }, {key: 4, to: '/leaderboard', label: 'Leaderboard'},{key: 5, to: '/buyunits', label: 'Buy Units'}] : [homeLink];

 
    const handleLinkClick = (to) => {
        setActiveLink(to);
    };

    return (
        <div className='flex'>
        <NavTab links={links} activeLink={activeLink} onLinkClick={handleLinkClick}/>
        {Auth.loggedIn() ? (<p className='gold ml-auto px-4'>Balance: {user.units} Units</p>):(<></>)}
        </div>
    );
}