import { Link } from "react-router-dom";
import "./MainNavigation.css";

import MainSidebar from "./MainSidebar";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  return (
    <MainSidebar>
      <h1>
        <Link to="/" className="main-navigation___title">
          Admin Panel
        </Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainSidebar>
  );
};

export default MainNavigation;
