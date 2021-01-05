import React from 'react';

import './MainSidebar.css';

const MainSidebar = props => {
    return <nav className="main-sidebar" >
        {props.children}
    </nav>
}

export default MainSidebar;