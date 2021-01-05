import React from 'react';

import './Card.css';

const card = props => (
    <article className="card">
        <header className="card_header">
            <h3 className="card__meta">
                {props.title}
            </h3>
            <h1 className="card__content">{props.content}</h1>
        </header>
    </article>
);

export default card;