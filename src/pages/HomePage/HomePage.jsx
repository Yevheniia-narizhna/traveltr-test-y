import Header from "../../components/Header/Header";
import Welcome from "../../components/Welcome/Welcome";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.homeCont}>
      <Header />
      <Welcome />
    </div>
  );
};

export default HomePage;
