import React from 'react';

import './Paginator.css';

const paginator = props => (
    <div className="paginator">
        {props.children}  
    </div>
);

export default paginator;