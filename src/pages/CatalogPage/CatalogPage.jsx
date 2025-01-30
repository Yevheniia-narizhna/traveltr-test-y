import CampersList from "../../components/CampersList/CampersList";
import Features from "../../components/Features/Features";
import s from "./CatalogPage.module.css";

const CatalogPage = () => {
  return (
    <div className={s.catalog}>
      <div className={s.features}>
        <Features />
      </div>
      <div className={s.camperslist}>
        <CampersList />
      </div>
    </div>
  );
};

export default CatalogPage;
