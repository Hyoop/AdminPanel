import React from "react";

import "./Legume.css";

const legume = (props: { name: String }) => (
  <article className="legume">
    <header className="legume__header">
      <h3 className="legume__meta">Vegetable:</h3>
      <h1 className="legume__name">{props.name}</h1>
    </header>
  </article>
);

export default legume;
