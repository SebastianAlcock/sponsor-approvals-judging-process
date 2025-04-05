// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/Navbar.css';

const Navbar = ({currentPage}) => {
  if (currentPage === 'home') var homeClass = 'active'; else homeClass = '';
  if (currentPage === 'login') var loginClass = 'active'; else if (currentPage === 'signup') loginClass = 'active'; else loginClass = '';
  if (currentPage === 'directory') var directoryClass = 'active'; else directoryClass = '';
  if (currentPage === 'applications') var applicationsClass = 'active'; else applicationsClass = '';

	const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear token
    navigate('/'); // Redirect to login
  }

	// NOTE: Project and User pages will not exist in final nav
  return (
    <div className='navbar'>
			<span className='homelinks'>
				<Link to='/'>Automation Dashboard</Link>
			</span>
      <span className='navlinks'>
				<Link to='/' className={homeClass}>Home</Link>
        <Link to='/directory' className={directoryClass}>Directory</Link>
        <Link to='/applications' className={applicationsClass}>Applications</Link>
        
				{! localStorage.getItem('token') ?
					<Link to='/login' className={loginClass}>Login</Link>
					:
					<Link onClick={handleLogout}>Logout</Link>
				}
      </span>
    </div>
  );
};

export default Navbar;