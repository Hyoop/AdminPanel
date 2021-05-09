import "./MainSidebar.css";

const MainSidebar = (props: { children: any }) => {
  return <nav className="main-sidebar">{props.children}</nav>;
};

export default MainSidebar;
