import { NavLink } from "react-router-dom";

const NavLinkItem = (props) => {
  const { path, name } = props;

  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={path}>
        {name}
      </NavLink>
    </li>
  );
};
export default NavLinkItem;
