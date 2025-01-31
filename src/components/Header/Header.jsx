import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  const location = useLocation();
  const isDetailsPage = /^\/catalog\/[^/]+(\/features|\/reviews)?$/.test(
    location.pathname
  );
  return (
    <div className={s.headerCont}>
      <img className={s.iconLogo} src="/logo.svg" alt="Logo" />
      <div className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive && !isDetailsPage ? s.active : s.inactive
          }
        >
          Catalog
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
