import React from 'react';
import StyledLink  from '../Link';
import './MainNavigation.css';

import MainSidebar from './MainSidebar';
import NavLinks from './NavLinks';

const MainNavigation = props => {
  return <MainSidebar>
    <h1>
      <StyledLink to="/" className="main-navigation___title">Admin Panel</StyledLink>
    </h1>
    <nav>
          <NavLinks />
    </nav>

  </MainSidebar>
  
};

export default MainNavigation;
