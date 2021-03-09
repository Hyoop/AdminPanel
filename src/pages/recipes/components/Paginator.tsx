import React from "react";

import "./Paginator.css";

const paginator = (props: { children: any }) => (
  <div className="paginator">{props.children}</div>
);

export default paginator;
