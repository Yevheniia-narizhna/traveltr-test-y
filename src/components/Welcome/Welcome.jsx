import { useNavigate } from "react-router-dom";
import s from "./Welcome.module.css";

const Welcome = () => {
  const navCatalog = useNavigate();

  const toCatalog = () => {
    navCatalog("/catalog");
  };

  return (
    <div className={s.welcomeCont}>
      <div className={s.contText}>
        <h1 className={s.title}>Campers of your dreams</h1>
        <p className={s.textWelcome}>
          You can find everything you want in our catalog
        </p>
        <button className={s.btnCatalog} onClick={toCatalog}>
          View Now
        </button>
      </div>
    </div>
  );
};

export default Welcome;
