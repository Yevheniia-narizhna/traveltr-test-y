import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.headerCont}>
      <img className={s.iconLogo} src="/logo.svg" alt="Logo" />
      <div className={s.navigation}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
      </div>
    </div>
  );
};

export default Header;
