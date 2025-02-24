import { Link } from "react-router-dom";
import NavLinkItem from "./NavLinkItem";

const NAV_ITEMS = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Sign in" },
  { path: "/register", name: "Sign up" },
];

const Header = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          {NAV_ITEMS.map((item) => (
            <NavLinkItem key={item.path} path={item.path} name={item.name} />
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Header;
